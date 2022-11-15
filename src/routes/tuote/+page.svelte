<script lang="ts">
	// import { getSession } from 'lucia-sveltekit/client';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';
	import { inputStyle } from '$lib/tyylit';
	import { Remarkable } from 'remarkable';
	import { tick } from 'svelte';
	var md = new Remarkable();
	export let form: ActionData;
	export let data: PageData;
	import { dev } from '$app/environment';
	import { get } from 'svelte/store';
	import { PUBLIC_BRAND } from '$env/static/public';

	const oletusKuvaus = `
# Lyhyt Markdown ohje
## Perusmuotoilut

Kursivointi *tähdillä* tai _alaviivoilla_.

Lihavointi **tuplatähdillä** or __tupla-alaviivoilla__.

Yhdistettynä **tähtiä sekä _alaviivoja_**.

Yliviivaus tapahtuu 2 tildellä. ~~Tämä pois.~~

Vaakaviiva sisällön erotteluun:
___
## Listat


1. Ensimmäinen listan jäsen
2. Toinen jäsen.


* Numeroimattomissa listoissa voi käyttää tähtiä
- Tai miinuksia

### Taulukkoesimerkki

| Sarake        |    Toiminta      | Esimerkki |
| ------------- |:----------------:| ------:|
| kolmas         | oikealle tasattu | 999,00€ |
| keskimmäinen       | keskitetty       |  0,80€ |

    `;
	let esikatselu: HTMLElement;
	let editori: HTMLElement;

	async function vieritaEsikatselu(e: Event) {
		await tick();
		//const esikatselu = document.getElementById('esikatselu');
		esikatselu?.scrollTo({ top: editori.scrollTop });
	}

	async function vieritaEditori(e: Event) {
		await tick();
		editori.scrollTo({ top: esikatselu.scrollTop });
	}

	let markdown = form?.data?.get('kuvaus') ?? oletusKuvaus;
	export const user = getUser();
</script>

<svelte:head>
	<title>Lisää tuote - {PUBLIC_BRAND}</title>
</svelte:head>

<h2 class="text-2xl text-center pb-5">Tuotteet</h2>

{#if $user}
	<h3 class="text-xl pb-3">Lisää tuote:</h3>
	<form method="post" class="flex flex-col px-8">
		{#if form?.error}
		<hr>
			<p>Virhe: {form?.error}</p>
			{#each form?.errors as e}
				<p>{e}</p>
			{/each}
			Puuttuu:
			{#each [...form.missing?.values()] as m}
				&nbsp;{m}&nbsp;
			{/each}
			<hr>
		{/if}
		{#if form?.success}
			<p>Tuotteen lisäys onnistui: <a class="hover:underline font-sans tracking-tighter italic" href="/tuote/{form?.tuote_id}"
				>{form?.nimi}</a
			></p>
		{/if}

		<label for="nimi">Tuotteen nimi:</label>
		<input class={inputStyle} id="nimi" name="nimi" required value={form?.data?.get('nimi') ?? ''} />

		<label for="hinta">Tuotteen hinta:</label>
		<span
			><input
				class="{inputStyle} w-20"
				id="hinta"
				name="hinta"
				type="number"
				step="0.01"
				required
				value={form?.data?.get('hinta') ?? '9.99'}
			/> &euro;</span
		>

		<div class="flex flex-col md:flex-row">
			<div class="w-full">
				<label for="kuvaus">Kuvaus:</label><button type="button" class="ml-4 px-4 {inputStyle}" on:click={() => { markdown=''}}>Tyhjennä kuvaus</button>
				<textarea
					class="{inputStyle} w-full h-48 overflow-scroll"
					id="kuvaus"
					name="kuvaus"
					bind:value={markdown}
					bind:this={editori}
					on:scroll={vieritaEsikatselu}
				/>
			</div>
			<div class="w-full">
				<span>Esikatselu:</span>
				<div
					bind:this={esikatselu}
					on:scroll={vieritaEditori}
					id="esikatselu"
					class="markdown w-full h-48 space-y-3 overflow-scroll border border-dashed border-black"
				>
					{@html md.render(markdown)}
				</div>
			</div>
		</div>
		<input type="submit" name="submit" value="Lisää tuote" class="p-2 my-4 {inputStyle}" />
		{#if dev}
		<input
			formnovalidate
			class="p-2 my-4 {inputStyle}"
			type="submit"
			id="submit"
			value="Lähetä ilman selainvalidointia"
		/>
	{/if}
	</form>
{/if}

<h2 class="text-2xl my-4">Tuotteesi joilla ei ole kategoriaa</h2>
<table>
	<thead
		><tr>
			<th>Tuote</th><th>Hinta</th>
		</tr></thead
	>
	<tbody>
		{#each data.tuotteet as t}
			<tr>
				<td
					><a class="hover:underline font-sans tracking-tighter italic" href="/tuote/{t.tuote_id}"
						>{t.nimi}</a
					></td
				>
				<td class="text-right">{t.hinta}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>

</style>
