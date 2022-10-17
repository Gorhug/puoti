import type { PageServerLoad, Actions } from './$types';
import { prisma_client, auth } from '$lib/server/lucia';
import { error, json } from '@sveltejs/kit';
import type { ServerSession } from 'lucia-sveltekit/types';
import type { TuoteKategoria } from '@prisma/client';
import { invalid } from '@sveltejs/kit';
import slug from 'slug'

function kategoriaMapper(k: TuoteKategoria) {
    return {
        nimi: k.nimi,
        kategoria_id: k.kategoria_id
    }
}

function valitutMapper(k: TuoteKategoria) {
    return k.kategoria_id
}

export const load: PageServerLoad = async ({ request, params }) => {
    let session: ServerSession
    let luoja: string = ''

    const tuote_id = params.tuote_id
    const tuote = await prisma_client.tuote.findUnique({ 
        where: {  tuote_id: tuote_id },
        include: { kategoriat: true }
     })

    const kategoriat = await prisma_client.tuoteKategoria.findMany()

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
    
    return { tuote_id, tuote_nimi: tuote.nimi, luoja, luotu: tuote.luotu, paivitettu: tuote.paivitetty, valitut: tuote.kategoriat.map(valitutMapper), kategoriat: kategoriat.map(kategoriaMapper)};
};

export const actions: Actions = {
    default: async ({ cookies, request, params }) => {
        const tuote_id = params.tuote_id
        let user_id = ''
        let errors: Array<string> = []
        try {
            const session = await auth.validateFormSubmission(request)
            user_id = session.user.user_id
        } catch (e) {
            console.log(e)
            return invalid(401, { error: 'Authentication required', nimi: '', kuvaus: '' })
        }

        const form = await request.formData()
        // const data = form.entries
        // const missing = form.missing

        const tuote = await prisma_client.tuote.findUnique({ 
            where: {  tuote_id: tuote_id },
         })

        if (tuote?.luoja_id != user_id) {
            return invalid(401, {error: 'Vain tuotteen luoja voi päivittää tuotteen'})
        }

  
        const valitut = JSON.parse(form.get('kategoriat')?.toString()??'')
        let kategoriat : {kategoria_id: string}[] = []
        let luotavat : {kategoria_id: string, nimi: string}[] = []
        for (let k of valitut) {
            if (k.$created) {
                luotavat.push({nimi: k.kategoria_id, kategoria_id: slug(k.kategoria_id)})
                continue
            }
            kategoriat.push({kategoria_id: k.kategoria_id})
        }

        try {
            const res = await prisma_client.tuote.update({
                    where: {
                        tuote_id: tuote_id
                    },
                    include: { kategoriat: true },
                    data: {
                        kategoriat: {
                            connect: kategoriat,
                            create: luotavat
                        }
                    }
                }
            )
            return { success: true }
        } catch (e) {
            console.log(e)
            return invalid(500, { error: 'Kategorioiden päivitys epäonnistui', errors })
        }


    }
}