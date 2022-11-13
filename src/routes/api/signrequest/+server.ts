import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { cloudinary } from '$lib/server/cloudinary';
import { env } from '$env/dynamic/private'

export const POST: RequestHandler = async ({ request, locals }) => {
    const session = await locals.getSession();
    if(session) {
        const data = await request.json();
        const api_secret = env.CLOUD_SECRET;
        // console.log(data)
        const signature = cloudinary.utils.api_sign_request(data, api_secret)
        return json({ signature: signature })
    } else {
        return json( {
            error: 'Authentication required'
        });
    }
};