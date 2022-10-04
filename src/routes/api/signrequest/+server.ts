import type { RequestHandler } from './$types';
import { auth } from "$lib/server/lucia";
import { getSession } from "lucia-sveltekit/load";
import { json } from '@sveltejs/kit';
import { cloudinary } from '$lib/server/cloudinary';
import { env } from '$env/dynamic/private'

export const POST: RequestHandler = async ({ request }) => {
    try {
        const session = await auth.validateRequest(request);
        const data = await request.json();
        const api_secret = env.CLOUD_SECRET;
 
        const signature = cloudinary.utils.api_sign_request(data, api_secret)
        return json({ signature: signature })
    } catch {
        return json( {
            error: 'Authentication required'
        });
    }
};