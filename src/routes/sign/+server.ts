import type { RequestHandler } from './$types';
import { auth } from "$lib/server/lucia";
import { getSession } from "lucia-sveltekit/load";
import { json } from '@sveltejs/kit';


export const POST: RequestHandler = async ({ request }) => {
    try {
        const session = await auth.validateRequest(request);
        const data = await request.json();
        const u = session.user;
        return json('something')
    } catch {
        // ...
        return json('other')
    }
};