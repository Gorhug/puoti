
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { cloudinary } from '$lib/server/cloudinary';

export const load: PageServerLoad = async ({ request, locals }) => {
	const { session, user } = await locals.getSessionUser()
	if (session) {
		const avatar_img = 'avatar/' + user.username + '.webp'
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
	} else {
		throw redirect(302, '/login');
	}
};

