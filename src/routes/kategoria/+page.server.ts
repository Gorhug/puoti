import type { PageServerLoad, Actions } from './$types';
import { prisma_client, auth } from '$lib/server/lucia';
import { invalid } from '@sveltejs/kit';
import slug from 'slug'


export const load: PageServerLoad = async () => {
    const kategoriat = prisma_client.tuoteKategoria.findMany()
    return {
        kategoriat
    };
};

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        try {
            await auth.validateFormSubmission(request)
        } catch (e) {
            console.log(e)
            return invalid(401, { error: 'Authentication required', nimi: '', kuvaus: '' })
        }

        const data = await request.formData()
        let nimi = data.get('nimi')
        let kuvaus = data.get('kuvaus')
        kuvaus = kuvaus? kuvaus.toString().trim() : ''

        if (!nimi) {
            nimi = ''
            return invalid(400, {
                error: 'Kategorian nimi puuttuu',
                nimi, kuvaus
            })
        }
        nimi = nimi.toString().trim()
        const kategoria_id = slug(nimi)
        try {
            const res = await prisma_client.tuoteKategoria.create({
                data: {
                    kategoria_id: kategoria_id,
                    nimi: nimi,
                    kuvaus: kuvaus
                }
            })
            return { success: true }
        } catch (e) {
            console.log(e)
            return invalid(500, {error: 'Kategorian luonti epäonnistui', nimi, kuvaus})
        }


    }
}