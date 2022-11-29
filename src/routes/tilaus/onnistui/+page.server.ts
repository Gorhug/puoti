import { hmacCheck, type PaytrailHeaders } from '$lib/server/hmac';
import type { PageServerLoad } from './$types';
import {env as p_env} from '$env/dynamic/private'
import { prisma_client } from '$lib/server/lucia';

export const load: PageServerLoad = async ({url}) => {
    const errors : string[] = []
    if (hmacCheck(p_env.PAYTRAIL_SECRET, url.searchParams)) {
        const id = url.searchParams.get('checkout-stamp')
        const status = url.searchParams.get('checkout-status')
        const transaction_id = url.searchParams.get('checkout-transaction-id')
        if (!status || status == 'fail') {
            errors.push('Maksu peruttu tai hylätty.')
        } 
        if (id) {
            await prisma_client.tilaus.update({
                where: {
                    id
                },
                data: {
                    transaction_id,
                    status
                }
            })
        }
    } else {
        errors.push('Maksunvälittäjän allekirjoitus puuttuu tai virheellinen')
    }
    return {errors};
};