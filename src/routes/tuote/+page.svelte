<script lang="ts">
	import { getSession } from 'lucia-sveltekit/client';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';
	import { inputStyle } from '$lib/tyylit';
	import { Remarkable } from 'remarkable';
	import { tick } from 'svelte';
	var md = new Remarkable();
	export let form: ActionData;
	export let data: PageData;
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
    
    async function vieritaEsikatselu(e: Event) {
        await tick()
        const esikatselu = document.getElementById('esikatselu')
        esikatselu?.scrollTo({top: e.target.scrollTop})
    }
	let markdown = form?.tuote?.kuvaus ?? oletusKuvaus;
	export const session = getSession();
</script>

<h2 class="text-2xl text-center pb-5">Tuotteet</h2>

{#if $session}
	<h3 class="text-xl pb-3">Lisää tuote:</h3>
	<form method="post" class="flex flex-col px-8">
		{#if form?.error}
			<p>Virhe: {form?.error}</p>
		{/if}
		{#if form?.success}
			<p>Tuotteen lisäys onnistui</p>
		{/if}
		<input type="hidden" name="_lucia" value={$session?.access_token} />

		<label for="nimi">Tuotteen nimi:</label>
		<input class={inputStyle} id="nimi" name="nimi" required value={form?.tuote?.nimi ?? ''} />

		<label for="hinta">Tuotteen hinta:</label>
		<span
			><input
				class="{inputStyle} w-20"
				id="hinta"
				name="hinta"
				type="number"
				step="0.01"
				required
				value={form?.tuote?.hinta ?? '9.99'}
			/> &euro;</span
		>

		
		<div class="flex flex-col md:flex-row">
            <div class="w-full">
            <label for="kuvaus">Kuvaus:</label>
			<textarea
				class="{inputStyle} w-full h-48 overflow-scroll"
				id="kuvaus"
				name="kuvaus"
				bind:value={markdown}
                on:scroll={vieritaEsikatselu}
			/></div>
            <div class="w-full">
                <span>Esikatselu:</span>
			<div id="esikatselu" class="markdown w-full h-48 space-y-3 overflow-scroll border border-dashed border-black">{@html md.render(markdown)}</div>
            </div>
		</div>
		<input type="submit" name="submit" value="Lisää tuote" class="button p-2 my-4 {inputStyle}" />
	</form>
{/if}

<table>
	<thead
		><tr>
			<th>Tuote</th><th>Kuvaus</th><th>Hinta</th>
		</tr></thead
	>
	<tbody>
		{#each data.tuotteet as t}
			<tr>
				<td
					><a class="hover:underline font-sans tracking-tighter italic" href="/tuote/{t.tuote_id}"
						>{t.nimi}</a
					></td
				><td>{t.kuvaus ?? ''}</td><td>{t.hinta}</td>
			</tr>
		{/each}
	</tbody>
</table>
<style>
    :global(.markdown h1) {
        font-size: xx-large;
    }
    :global(.markdown h2) {
        font-size: x-large;
    }
    :global(.markdown h3) {
        font-size: larger;
    }
    :global(.markdown h4) {
        font-size: large;
    }
    :global(.markdown h5) {
        font-size:medium;
    }
    :global(.markdown ul) {
        list-style: disc;
        margin-left: 20px;
        padding-left: 20px;
    }
    :global(.markdown ol) {
        list-style-type:upper-roman;
        margin: 20px;
        padding: 20px;
    }

    :global(.markdown td) {
        border: thin solid black;
    }

</style>
