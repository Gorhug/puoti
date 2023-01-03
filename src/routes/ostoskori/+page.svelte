<script lang="ts">
    import type { PageData } from './$types';
    import { PUBLIC_BRAND } from '$env/static/public';
  //  export let data: PageData;
  import type { ActionData } from './$types';
  export let form: ActionData;
    import { kori } from '$lib/kori';
	import { inputStyle, linkStyle } from '$lib/tyylit';
	import { flip } from 'svelte/animate';
	
	function removeItem(tuote: string) {
		for (let item of $kori.tuotteet) {
			if (item.tuoteId === tuote) {
				--item.lkm;
				if (item.lkm <= 0) {
					$kori.tuotteet = $kori.tuotteet.filter((cartItem) => cartItem.tuoteId != tuote);
				}
                $kori = $kori
				return;
			}
		}
	}
    function addItem(tuote: string) {
		const tuoteId = tuote
		for (let item of $kori.tuotteet) {
			if (item.tuoteId === tuoteId) {
				++item.lkm
                $kori = $kori
				return;
			}
		}
	}
</script>

<svelte:head>
	<title>Ostoskori - {PUBLIC_BRAND}</title>
</svelte:head>
<div class="table-container sm:w-2/3">
<table class="table">
	<thead>
    <th class="text-left">Tuote</th><th class="text-right">à-hinta</th><th class="text-right">lkm</th>
</thead>
<tbody>
{#each $kori.tuotteet as tuote (tuote.tuoteId)}
    <tr animate:flip>
        <td><a href=/tuote/{tuote.tuoteId} class={linkStyle}>{tuote.nimi}</a></td>
        <td class="text-right">{tuote.a_hinta.toFixed(2)}</td>
        <td class="text-right">
            <button class="{inputStyle} text-lg" on:click={() => removeItem(tuote.tuoteId)}>&nbsp;-&nbsp;</button>
            {tuote.lkm} 
            <button class="{inputStyle} text-lg" on:click={() => addItem(tuote.tuoteId)}>&nbsp;+&nbsp;</button>
        </td>

    </tr>
{/each}
</tbody>
</table>
</div>
{#if $kori.tuotteet.length > 0}
<form class="space-y-4 mt-8 flex flex-col px-8 w-96" method="POST" action="/tilaus">
<div>
	<input type="hidden" name="tuotteet" value="{JSON.stringify($kori.tuotteet)}"/>
	<label for="email">Sähköpostiosoite:</label>
	<input
		class="w-72 peer {inputStyle}"
		type="email"
		id="email"
		name="email"
		maxlength="200"
		value={form?.data?.get('email') ?? ''}
		required
	/>
	<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']" />
	<p class="w-fit bg-red-600 peer-invalid:block hidden">
		Kirjoita sähköpostiosoite (esim: matti@example.com)
	</p>

	<input class="p-2 my-4 {inputStyle}" type="submit" id="submit" value="Siirry maksamaan" />
	<p class="m-8 text-xl">Huom! Tämä on demosivusto, käytä maksuun 
		<a class={linkStyle} target="_blank" rel="noreferrer" href="https://docs.paytrail.com/#/payment-method-providers?id=test-credentials">testitunnuksia</a></p>
	{#if false}
		<input
			formnovalidate
			class="p-2 my-4 {inputStyle}"
			type="submit"
			id="submit"
			value="Lähetä ilman selainvalidointia"
		/>
	{/if}
</div>
</form>
{/if}