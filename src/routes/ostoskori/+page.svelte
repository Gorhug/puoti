<script lang="ts">
    import type { PageData } from './$types';
    import { PUBLIC_BRAND } from '$env/static/public';
    export let data: PageData;

    import { kori } from '$lib/kori';
	import { inputStyle } from '$lib/tyylit';
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
<table>
    <th>TuoteId</th><th>à-hinta</th><th>lkm</th>
{#each $kori.tuotteet as tuote (tuote.tuoteId)}
    <tr animate:flip>
        <td>{tuote.tuoteId}</td>
        <td>{tuote.a_hinta.toFixed(2)}</td>
        <td>
            <button class="{inputStyle}" on:click={() => removeItem(tuote.tuoteId)}>&nbsp;-&nbsp;</button>
            {tuote.lkm} 
            <button class="{inputStyle}" on:click={() => addItem(tuote.tuoteId)}>&nbsp;+&nbsp;</button>
        </td>

    </tr>
{/each}
</table>