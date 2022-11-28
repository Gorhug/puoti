import type { PageServerLoad, Actions } from './$types';
import { invalid, redirect } from '@sveltejs/kit';
import { prisma_client } from '$lib/server/lucia';
import {type Tuote, Prisma} from '@prisma/client'
import { type PaytrailHeaders, calculateHmac, hmacHelper } from '$lib/server/hmac';
import { dev } from '$app/environment';
import { env as p_env } from '$env/dynamic/private'
import crypto from 'crypto'

export const load: PageServerLoad = async ({request}) => {
    if (request.method == 'GET') {
        throw redirect(302, '/ostoskori')
    }
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
const paytrail_url = new URL('https://services.paytrail.com/payments')


const response_ex = {
    "transactionId": "5770642a-9a02-4ca2-8eaa-cc6260a78eb6",
    "href": "https://services.paytrail.com/pay/5770642a-9a02-4ca2-8eaa-cc6260a78eb6",
    "reference": "809759248",
    "providers": [
      {
        "url": "https://maksu.pivo.fi/api/payments",
        "icon": "https://static.paytrail.com/static/img/pivo_140x75.png",
        "svg": "https://static.paytrail.com/static/img/payment-methods/pivo-siirto.svg",
        "name": "Pivo",
        "group": "mobile",
        "id": "pivo",
        "parameters": [
          {
            "name": "acquiring_id",
            "value": "checkout"
          },
          {
            "name": "amount",
            "value": "base64 MTUyNQ=="
          },
          {
            "name": "cancel_url",
            "value": "base64 aHR0cHM6Ly9hcGkuY2hlY2tvdXQuZmkvcGF5bWVudHMvODA2MjEzOTIvcGl2by9jYW5jZWw="
          },
          {
            "name": "merchant_business_id",
            "value": "base64 MTIzNDU2LTc="
          },
          {
            "name": "merchant_name",
            "value": "base64 VGVzdGkgT3k="
          },
          {
            "name": "reference",
            "value": "base64 ODA5NzU5MjQ4"
          },
          {
            "name": "reject_url",
            "value": "base64 aHR0cHM6Ly9hcGkuY2hlY2tvdXQuZmkvcGF5bWVudHMvODA2MjEzOTIvcGl2by9jYW5jZWw="
          },
          {
            "name": "return_url",
            "value": "base64 aHR0cHM6Ly9hcGkuY2hlY2tvdXQuZmkvcGF5bWVudHMvODA2MjEzOTIvcGl2by9zdWNjZXNz"
          },
          {
            "name": "stamp",
            "value": "base64 ODA5NzU5MjQ4"
          },
          {
            "name": "message",
            "value": "base64 Y2hlY2tvdXQubXljYXNoZmxvdy5maQ=="
          },
          {
            "name": "merchant_webstore_url",
            "value": "base64 aHR0cDovL2NoZWNrb3V0Lm15Y2FzaGZsb3cuZmk="
          },
          {
            "name": "signature",
            "value": "checkout_qa 86b43453732cf8aeb91b08dd42707fd6973819f4f23abffbfd27563f351d6b07"
          }
        ]
      },
      {
        "url": "https://v1.api.paymenthighway.io/form/view/masterpass",
        "icon": "https://static.paytrail.com/static/img/masterpass_arrow_140x75.png",
        "svg": "https://static.paytrail.com/static/img/payment-methods/masterpass.svg",
        "name": "Masterpass",
        "group": "mobile",
        "id": "masterpass",
        "parameters": [
          {
            "name": "sph-account",
            "value": "test"
          },
          {
            "name": "sph-merchant",
            "value": "test_merchantId"
          },
          {
            "name": "sph-api-version",
            "value": "20170627"
          },
          {
            "name": "sph-timestamp",
            "value": "2018-07-06T11:10:14Z"
          },
          {
            "name": "sph-request-id",
            "value": "00228f0f-85b3-433a-8071-b38e63a3b024"
          },
          {
            "name": "sph-amount",
            "value": "1525"
          },
          {
            "name": "sph-currency",
            "value": "EUR"
          },
          {
            "name": "sph-order",
            "value": "809759248"
          },
          {
            "name": "language",
            "value": "FI"
          },
          {
            "name": "description",
            "value": "checkout.mycashflow.fi"
          },
          {
            "name": "sph-success-url",
            "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/success"
          },
          {
            "name": "sph-cancel-url",
            "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/cancel"
          },
          {
            "name": "sph-failure-url",
            "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/failure"
          },
          {
            "name": "sph-webhook-success-url",
            "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/callback/success"
          },
          {
            "name": "sph-webhook-cancel-url",
            "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/callback/cancel"
          },
          {
            "name": "sph-webhook-failure-url",
            "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/callback/failure"
          },
          {
            "name": "sph-webhook-delay",
            "value": "60"
          },
          {
            "name": "signature",
            "value": "SPH1 testKey 17294419ee622be500d1acd654fde3b5462c0ea51d0a9285809d0856febeb81c"
          }
        ]
      }
    ],
    "customProviders": {
      "applepay": {
        "parameters": [
          {
            "name": "checkout-transaction-id",
            "value": "5770642a-9a02-4ca2-8eaa-cc6260a78eb6"
          },
          {
            "name": "checkout-account",
            "value": "test"
          },
          {
            "name": "checkout-method",
            "value": "POST"
          },
          {
            "name": "checkout-algorithm",
            "value": "sha256"
          },
          {
            "name": "checkout-timestamp",
            "value": "2018-07-06T11:10:14Z"
          },
          {
            "name": "checkout-nonce",
            "value": "4ae5346f-bfee-4350-ad03-046c9e836d5e"
          },
          {
            "name": "signature",
            "value": "fc0d880e3edd845711da5feda1b166491beded1f8d475a54f515f34bee889525"
          },
          {
            "name": "amount",
            "value": "15.25"
          },
          {
            "name": "label",
            "value": "Checkout Finland Oy"
          },
          {
            "name": "currency",
            "value": "EUR"
          }
        ]
      }
    }
  }



export const actions: Actions = {
    default: async ({ url, request }) => {
        
        let errors: string[] = []

        
        const form = await request.formData()
        const tuotteet_l = JSON.parse(form.get('tuotteet')?.toString() ?? '')
      //  const tuotteet_l = [{ tuoteId: 'testi', lkm: 2}]
  
  
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
        // return {email, amount, errors, providers: response_ex.providers}
        const tilaus_db = await prisma_client.tilaus.create({
            data: {
                email,
                summa: amount,
                tuotteet: {create: tuotteet}
            }
        })
        const timestamp = tilaus_db.luotu.toISOString()
        const p_headers : PaytrailHeaders = {
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
          const hmac = calculateHmac(p_env.PAYTRAIL_SECRET, p_headers, body)
          
          const headers = new Headers(p_headers)
          headers.append('signature', hmac)
          headers.append('platform', 'puoti-kirjontastudiohelmi')
          headers.append('content-type','application/json; charset=utf-8')
          const response = await fetch(paytrail_url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
          })
          
 
          const r_body = await response.json()
  
          if (!hmacHelper(p_env.PAYTRAIL_SECRET, response.headers, r_body)) {
            errors.push('Maksupalvelun antama vastaus ei ole oikein allekirjoitettu')
          }
          return {email, amount, errors, providers: r_body.providers}
    }
}