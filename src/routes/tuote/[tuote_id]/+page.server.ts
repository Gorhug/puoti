import type { PageServerLoad } from './$types';
import { prisma_client, auth } from '$lib/server/lucia';
import { error } from '@sveltejs/kit';
import type { ServerSession } from 'lucia-sveltekit/types';

export const load: PageServerLoad = async ({ request, params }) => {
    let session: ServerSession
    let luoja: string = ''

    const tuote_id = params.tuote_id
    const tuote = await prisma_client.tuote.findUnique({ where: { tuote_id: tuote_id } })
    if (!tuote) {
        throw error(404, 'Tuotetta ei löytynyt')
    }
    const luojaData = await prisma_client.user.findUnique({
        where: { id: tuote.luoja_id },
        select: { username: true }
    })
    if (luojaData) {
        luoja = luojaData.username
    }
    
    return { tuote_id, tuote_nimi: tuote.nimi, luoja, luotu: tuote.luotu, paivitettu: tuote.paivitetty};
};