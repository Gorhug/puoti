import { hmacHelper, type PaytrailHeaders } from '$lib/server/hmac';
import type { PageServerLoad } from './$types';
import {env as p_env} from '$env/dynamic/private'

export const load: PageServerLoad = async ({url}) => {
    const errors : string[] = []
    if (hmacHelper(p_env.PAYTRAIL_SECRET, url.searchParams)) {
        const id = url.searchParams.get('checkout-stamp')
        if (id) {

        }
    } else {
        errors.push('Maksunvälittäjän allekirjoitus puuttuu tai virheellinen')
    }
    return {errors};
};