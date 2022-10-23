import type { PageServerLoad } from './$types';
import { prisma_client } from '$lib/server/lucia';
import { tuoteMapper } from '$lib//server/mappers';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({params}) => {
    const kategoria_id = params.kategoria_id
    const kategoria = await prisma_client.tuoteKategoria.findUnique({
        where: {
            kategoria_id: kategoria_id
        },
        include: {
            tuotteet: true
        }
    })
    if (!kategoria) {
        throw error(404, 'Kategoriaa ei löydy')
    }
    return { tuotteet: kategoria.tuotteet.map(tuoteMapper) };
};