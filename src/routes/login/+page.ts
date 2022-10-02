import { redirect } from '@sveltejs/kit';
import type { LoadEvent } from 'lucia-sveltekit/kit';
import { getSession } from 'lucia-sveltekit/load';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event: LoadEvent<Partial<Record<string, string>>, Record<string, any> | null, Record<string, any>>) => {
	const session = await getSession(event);
	if (session) throw redirect(302, '/profile');
	return {};
}