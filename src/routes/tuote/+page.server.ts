import type { PageServerLoad, Actions } from './$types';
import { prisma_client, auth } from '$lib/server/lucia';
import { invalid } from '@sveltejs/kit';
import slug from 'slug'
import { npm_config_init_module } from '$env/static/private';


const required = new Set(['nimi', 'hinta', 'hinta'])
const optional = ['kuvaus']
const expected = new Set([...required, ...optional])

export const load: PageServerLoad = async () => {
    const tuotteet = await prisma_client.tuote.findMany({
        select: {
            nimi: true,
            kuvaus: true,
            hinta: true
        }})
    const ret = JSON.stringify(tuotteet)
    return {
          tuotteet: ret
    };
};

function processForm(data: FormData) {
    let missing = required
    let entries: Map<string, string> = new Map()
    for (let [name, value] of data) {
        if (expected.has(name)) {
            value = value.toString().trim()
            if (value.length) {
                entries.set(name, value)
                missing.delete(name)
            }
        }

    }
    return { entries, missing }
}


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

        const form = processForm(await request.formData())
        const data = form.entries
        let missing = form.missing



        let hinta = data.get('hinta') ?? ''
        hinta = Number.parseFloat(hinta).toFixed(2)
        if (Number.isNaN(hinta)) {
            errors.push('Hinta ei ole numero')
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
            const missArray = [...missing.values()]
            return invalid(400, { error: 'Tuotetietoja puuttuu tai virheellisiä', tuote, missArray, errors })
        }

        try {
            const res = await prisma_client.tuote.create({
                data: tuote
            })
            return { success: true }
        } catch (e) {
            console.log(e)
            return invalid(500, { error: 'Tuotteen luonti epäonnistui', tuote, missing, errors })
        }


    }
}