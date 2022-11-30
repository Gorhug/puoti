import type { PageServerLoad, Actions } from './$types';
import { prisma_client } from '$lib/server/lucia';
import { error } from '@sveltejs/kit';
import type { TuoteKategoria } from '@prisma/client';
import { invalid } from '@sveltejs/kit';
import slug from 'slug'
import { cloudinary } from '$lib/server/cloudinary'

function kategoriaMapper(k: TuoteKategoria) {
    return {
        nimi: k.nimi,
        kategoria_id: k.kategoria_id
    }
}

function valitutMapper(k: TuoteKategoria) {
    return k.kategoria_id
}
const example = {
    "resources":
        [
        //     {
        //     "public_id": "samples/ecommerce/accessories-bag", "version": 1588962712, "format": "png",
        //     "width": 240, "height": 307, "type": "upload", "created_at": "2020-05-08T18:31:52Z",
        //     "metadata": [{
        //         "external_id": "color_id", "label": "Colors", "type": "set", "value":
        //             [{ "external_id": "color1", "value": "red" }, { "external_id": "color2", "value": "green" }]
        //     }]
        // },
        // {
        //     "public_id": "samples/ecommerce/shoes", "version": 1315740184, "format": "png",
        //     "width": 162, "height": 38, "type": "upload", "created_at": "2011-09-11T11:23:04Z"
        // }
        ],
    "updated_at": "2020-05-08T21:11:37Z"
}

export const load: PageServerLoad = async ({ params }) => {
    let luoja: string = ''

    const tuote_id = params.tuote_id
    const tuote = await prisma_client.tuote.findUnique({
        where: { tuote_id: tuote_id },
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
    const request = new Request(cloudinary.url(tuote_id + '.json', { type: 'list' }))
    let img_list = example
    try {
        const response = await fetch(request)
        img_list = await response.json()
    } catch (e) {
  //      console.log(e)
    }
    const simple_list: string[] = []
    for (const img of img_list.resources) {
        simple_list.push(cloudinary.url(img.public_id + '.webp', {
            transformation: [
                { width: 400, height: 400, crop: "pad", background: '#500b20' }
            ],
        }
        ))
    }
    return {
        tuote_id,
        tuote_nimi: tuote.nimi,
        luoja,
        luotu: tuote.luotu,
        paivitettu: tuote.paivitetty,
        kuvaus: tuote.kuvaus,
        hinta: tuote.hinta.toFixed(2),
        valitut: tuote.kategoriat.map(valitutMapper),
        kategoriat: kategoriat.map(kategoriaMapper),
        simple_list
    };
};

export const actions: Actions = {
    default: async ({ request, params, locals }) => {
        const tuote_id = params.tuote_id
        let user_id = ''
        let errors: Array<string> = []
        const { session, user } = await locals.getSessionUser()
        if (!session) {
            return invalid(401, { error: 'Authentication required', nimi: '', kuvaus: '' })
        }
        user_id = user.userId
        const form = await request.formData()
        // const data = form.entries
        // const missing = form.missing

        const tuote = await prisma_client.tuote.findUnique({
            where: { tuote_id: tuote_id },
            include: { kategoriat: true }
        })
        const tuotteenKategoriat = new Set(tuote?.kategoriat.map(valitutMapper) ?? [])

        if (tuote?.luoja_id != user_id) {
            return invalid(401, { error: 'Vain tuotteen luoja voi päivittää tuotteen' })
        }


        const valitut = JSON.parse(form.get('kategoriat')?.toString() ?? '')
        let kategoriat: { kategoria_id: string }[] = []
        let luotavat: { kategoria_id: string, nimi: string }[] = []
        let poistettavat: { kategoria_id: string }[] = []
        for (let k of valitut) {
            if (k.$created) {
                luotavat.push({ nimi: k.kategoria_id, kategoria_id: slug(k.kategoria_id) })
                continue
            }
            kategoriat.push({ kategoria_id: k.kategoria_id })
            tuotteenKategoriat.delete(k.kategoria_id)
        }
        for (const d of tuotteenKategoriat) {
            poistettavat.push({ kategoria_id: d })
        }
        try {
            const res = await prisma_client.tuote.update({
                where: {
                    tuote_id: tuote_id
                },
                // include: { kategoriat: true },
                data: {
                    kategoriat: {
                        connect: kategoriat,
                        create: luotavat,
                        disconnect: poistettavat
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