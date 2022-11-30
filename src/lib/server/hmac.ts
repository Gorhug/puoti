import crypto from 'crypto'
import {env as p_env} from '$env/dynamic/private'
const ACCOUNT = p_env.PAYTRAIL_ACCOUNT;
const SECRET = p_env.PAYTRAIL_SECRET;

/**
 * Calculate HMAC
 *
 * @param {string} secret Merchant shared secret
 * @param {object} params Headers or query string parameters
 * @param {object|undefined} body Request body or empty string for GET requests
 */
export const calculateHmac = (secret: string, params: PaytrailHeaders, body: object|undefined = undefined) => {
  const hmacPayload = Object.keys(params)
    .sort()
    .map((key) => [key, params[key]].join(':'))
    .concat(body ? JSON.stringify(body) : '')
    .join('\n');

  return crypto.createHmac('sha256', secret).update(hmacPayload).digest('hex');
};

export function hmacCheck(secret: string, params: URLSearchParams|Headers, body: object|undefined = undefined) {
  let r_sig
  const r_headers: PaytrailHeaders = {}

  for (const [name, value] of params.entries()) {
    if (name.startsWith('checkout-')) {
        r_headers[name] = value
    } else if (name == 'signature') {
        r_sig = value
    }
  }
  return r_sig == calculateHmac(secret, r_headers, body) 
  
}
export interface PaytrailHeaders {
 [propertyName: string]: string
}

const headers : PaytrailHeaders = {
  'checkout-account': ACCOUNT,
  'checkout-algorithm': 'sha256',
  'checkout-method': 'POST',
  'checkout-nonce': '564635208570151',
  'checkout-timestamp': '2018-07-06T10:01:31.904Z',
};

const body = {
  stamp: 'unique-identifier-for-merchant',
  reference: '3759170',
  amount: 1525,
  currency: 'EUR',
  language: 'FI',
  items: [
    {
      unitPrice: 1525,
      units: 1,
      vatPercentage: 24,
      productCode: '#1234',
      deliveryDate: '2018-09-01',
    },
  ],
  customer: {
    email: 'test.customer@example.com',
  },
  redirectUrls: {
    success: 'https://ecom.example.com/cart/success',
    cancel: 'https://ecom.example.com/cart/cancel',
  },
};

//  Expected HMAC: 3708f6497ae7cc55a2e6009fc90aa10c3ad0ef125260ee91b19168750f6d74f6
export function testHmac () {
   return calculateHmac(SECRET, headers, body);
}

