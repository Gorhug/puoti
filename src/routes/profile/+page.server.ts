import { dev } from '$app/environment';
import { auth } from '$lib/server/lucia';
import { invalid, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { cloudinary } from '$lib/server/cloudinary';

export const load: PageServerLoad = async ({ cookies, request, locals }) => {
	try {
		const session = await auth.validateRequestByCookie(request)
		const avatar_img = 'avatar/' + session.user.username + '.webp'
		const avatar_url = cloudinary.url(avatar_img,
			{
				transformation: [
					{ width: 200, crop: "scale" }
				],
				default_image: 'no_avatar.webp'
			})
		
		return {
			avatar_url
		};
	} catch {
		throw redirect(302, '/login');
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		try {
			await auth.validateFormSubmission(request);
			const formData = await request.formData();
			const notes = formData.get('notes')?.toString();
			if (notes === undefined)
				return invalid(400, {
					error: 'Invalid input'
				});
			cookies.set('notes', notes, {
				httpOnly: true,
				secure: !dev,
				path: '/'
			});
			return {
				success: true
			};
		} catch (e) {
			console.log(e)
			return invalid(403, {
				error: 'Authentication required'
			});
		}
	}
};