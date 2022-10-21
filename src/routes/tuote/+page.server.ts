import type { PageServerLoad, Actions } from './$types';
import { prisma_client, auth } from '$lib/server/lucia';
import { invalid } from '@sveltejs/kit';
import slug from 'slug'
import { npm_config_init_module } from '$env/static/private';
import type { Tuote } from '@prisma/client';
import { Prisma } from '@prisma/client'
import { processForm } from '$lib/lomake'

const required = ['nimi', 'hinta']
const optional = ['kuvaus']
const expected = [...required, ...optional]

function tuoteMapper(t: Tuote) {
    return {
        nimi: t.nimi,
        kuvaus: t.kuvaus,
        hinta: t.hinta.toFixed(2),
        tuote_id: t.tuote_id
    }
}



export const load: PageServerLoad = async () => {
    const tuotteet = await prisma_client.tuote.findMany()
  
    return {
          tuotteet: tuotteet.map(tuoteMapper)
    };
};




export const actions: Actions = {
    default: async ({ cookies, request }) => {
        let user_id = ''
        let errors: Array<string> = []
        try {
            const session = await auth.validateFormSubmission(request)
            user_id = session.user.user_id
        } catch (e) {
            console.log(e)
            return invalid(401, { error: 'Authentication required', nimi: '', kuvaus: '' })
        }

        const form = processForm(await request.formData(), required, expected)
        const data = form.entries
        const missing = form.missing



        let hinta = data.get('hinta') ?? ''
        try {
            hinta = new Prisma.Decimal(hinta).toFixed(2)
        } catch (e)  {
            errors.push('Hinnan pitää olla numero')
        } 
        const nimi = data.get('nimi') ?? ''

        const tuote = {
            nimi: nimi,
            hinta: hinta,
            kuvaus: data.get('kuvaus') ?? '',
            luoja_id: user_id,
            tuote_id: slug(nimi)
        }

        if (missing.size  || errors.length ) {
            return invalid(400, { error: 'Tuotetietoja puuttuu tai virheellisiä', data, missing, errors })
        }

        try {
            const res = await prisma_client.tuote.create({
                data: tuote
            })
            return { success: true }
        } catch (e) {
            console.log(e)
            return invalid(500, { error: 'Tuotteen luonti epäonnistui', data, missing, errors })
        }


    }
}