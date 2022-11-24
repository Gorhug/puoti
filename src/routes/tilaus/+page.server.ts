import type { PageServerLoad, Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { prisma_client } from '$lib/server/lucia';
import {type Tuote, Prisma} from '@prisma/client'
import { type PaytrailHeaders, calculateHmac } from '$lib/server/hmac';
import { dev } from '$app/environment';
import { env as p_env } from '$env/dynamic/private'
import crypto from 'crypto'

export const load: PageServerLoad = async () => {
    return {};
};


// const getUser = await prisma.user.findMany({
//     where: {
//       id: { in: [22, 91, 14, 2, 5] },
//     },
//   })
interface Item {
    unitPrice: number,
    units: number,
    vatPercentage: number,
    productCode: string,
}

export const actions: Actions = {
    default: async ({ url, request }) => {
 
        let errors: string[] = []

        
        const form = await request.formData()
       //const tuotteet_l = JSON.parse(form.get('tuotteet')?.toString() ?? '')
        const tuotteet_l = [{ tuoteId: 'testi', lkm: 2}]
  
  
        const tilaus : Map<string, number> = new Map()
 
        for (const tuote_l of tuotteet_l) {
            const lkm = tuote_l.lkm

            if (lkm <= 0) {
                errors.push(`Tuotteen ${tuote_l.tuoteId} lukumäärä ei ollut positiivinen`)
                continue
            }

            
            tilaus.set(tuote_l.tuoteId, lkm)
 
        }
        const db_tuotteet = await prisma_client.tuote.findMany({
            where: {
                tuote_id: { in: [... tilaus.keys()] }
            }
        })
        let summa = new Prisma.Decimal(0)
        const items : Item[] = []
        const tuotteet = []
        for (const tuote of db_tuotteet) {
            const lkm = tilaus.get(tuote.tuote_id)
            if (lkm) {
                const a_hinta = tuote.hinta.times(100).toDecimalPlaces(0).toNumber()
                items.push({
                    unitPrice: a_hinta,
                    units: lkm,
                    vatPercentage: 24,
                    productCode: tuote.tuote_id

                })
                tuotteet.push({
                    lkm,
                    a_hinta,
                    tuote: {
                        connect: {
                            id: tuote.tuote_id
                        }
                    }
                })
                summa = summa.plus(tuote.hinta.times(lkm))
            }
        }

        const email = form.get('email')?.toString() ?? ''
        const amount = summa.times(100).toDecimalPlaces(0).toNumber()
        const tilaus_db = await prisma_client.tilaus.create({
            data: {
                email,
                summa: amount,
                tuotteet: {create: tuotteet}
            }
        })
        const timestamp = new Date().toISOString()
        const headers : PaytrailHeaders = {
            'checkout-account': p_env.PAYTRAIL_ACCOUNT,
            'checkout-algorithm': 'sha256',
            'checkout-method': 'POST',
            'checkout-nonce': crypto.randomBytes(16).toString("base64"),
            'checkout-timestamp': timestamp,
          };
        const palvelin = `https://${url.host}`
        const body = {
            stamp: tilaus_db.id,
            reference: 'helmi',
            amount,
            currency: 'EUR',
            language: 'FI',
            items,
            customer: {
              email,
            },
            redirectUrls: {
              success: `${palvelin}/tilaus/onnistui`,
              cancel: `${palvelin}/tilaus/peruttu`,
            },
          };
          const hmac = calculateHmac(p_env.PAYTRAIL_SECRET, headers, body)
          
    }
}