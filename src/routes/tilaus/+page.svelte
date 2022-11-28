<script lang="ts">
    import type { ActionData } from './$types';
    import {inputStyle} from '$lib/tyylit'
    import {PUBLIC_BRAND} from '$env/static/public'
    import {goto} from '$app/navigation'
    // export let data: PageData;
    export let form: ActionData;
    
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

    const providers = form?.providers
</script>

<svelte:head>
	<title>Tilaus - {PUBLIC_BRAND}</title>
</svelte:head>
{#if form}
{#each form?.errors as error} 
    <p>error</p>
{/each}
<p class="text-xl mb-8">Email: {form.email}</p>
<p class="text-xl mb-8">Loppusumma: {form.amount.toFixed(2)}&nbsp;€</p>
<p class="text-xl mb-8">Valitse maksutapa</p>
{#each providers as provider}
    <form method='post' action={provider.url}>
    {#each provider.parameters as param}
        <input type='hidden' name={param.name} value={param.value} />
    {/each}
    <button class='w-32 h-32 mb-8 {inputStyle}'><img src={provider.svg} alt={provider.name}/></button>
    </form>
{/each}
{/else}
    {goto('/ostoskori')}
{/if}