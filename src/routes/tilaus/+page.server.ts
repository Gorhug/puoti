import type { PageServerLoad, Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { prisma_client } from '$lib/server/lucia';
import {type Tuote, Prisma} from '@prisma/client'

export const load: PageServerLoad = async () => {
    return {};
};


// const getUser = await prisma.user.findMany({
//     where: {
//       id: { in: [22, 91, 14, 2, 5] },
//     },
//   })

export const actions: Actions = {
    default: async ({ request }) => {
 
        let errors: string[] = []

        
        const form = await request.formData()
       //const tuotteet_l = JSON.parse(form.get('tuotteet')?.toString() ?? '')
        const tuotteet_l = [{ tuoteId: 'testi', lkm: 2}]
      //  const db_tuotteet : {tuote: Tuote, lkm:number}[] = []
  
        const tilaus : Map<string, {
            tuote: Tuote | null,
            lkm: number
        }> = new Map()
        for (const tuote_l of tuotteet_l) {
            const lkm = tuote_l.lkm

            if (lkm <= 0) {
                errors.push(`Tuotteen ${tuote_l.tuoteId} lukumäärä ei ollut positiivinen`)
                continue
            }

            
            tilaus.set(tuote_l.tuoteId, {tuote: null, lkm})
 
        }
        const db_tuotteet = await prisma_client.tuote.findMany({
            where: {
                tuote_id: { in: [... tilaus.keys()] }
            }
        })
        let summa = new Prisma.Decimal(0)
        for (const tuote of db_tuotteet) {
            const t = tilaus.get(tuote.tuote_id)
            if (t) {
                tilaus.set(tuote.tuote_id, {tuote, lkm: t.lkm})
                summa = summa.plus(tuote.hinta.times(t.lkm))
            }
        }

    }
}