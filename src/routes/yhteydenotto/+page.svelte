<script lang="ts">
	import { inputStyle } from '$lib/tyylit';
	import type { ActionData } from './$types';
	import { dev } from '$app/environment';
	import { PUBLIC_BRAND } from '$env/static/public';
	export let form: ActionData;

	let markdown = form?.data?.get('viesti') ?? '';
</script>

<svelte:head>
	<title>Ota yhteyttä - {PUBLIC_BRAND}</title>
</svelte:head>

<form class="space-y-4 mt-8 flex flex-col px-8 w-96" method="post">
	{#if form?.error}
		<p>Virhe: {form?.error}</p>
		{#each form.errors as e}
			<p>{e}</p>
		{/each}
		Puuttuu:
		{#each [...form.missing.values()] as m}
			&nbsp;{m}&nbsp;
		{/each}
	{/if}
	{#if form?.success}
		<p>Viestin lähetys onnistui</p>
	{/if}
	<div>
		<label for="nimi">Nimi:</label>
		<input
			class="w-96 {inputStyle}"
			type="text"
			id="nimi"
			name="nimi"
			maxlength="128"
			value={form?.data?.get('nimi') ?? ''}
		/>
	</div>
	<div>
		<label for="email">Sähköpostiosoite:</label>
		<input
			class="w-72 peer {inputStyle}"
			type="email"
			id="email"
			name="email"
			maxlength="320"
			value={form?.data?.get('email') ?? ''}
			required
		/>
		<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']" />
		<p class="w-fit bg-red-600 peer-invalid:block hidden">
			Kirjoita sähköpostiosoite (esim: matti@example.com)
		</p>
	</div>
	<div>
		<label for="aihe">Aihe:</label>
		<input
			class="{inputStyle} w-72 peer outline-black"
			maxlength="128"
			list="aiheet"
			id="aihe"
			name="aihe"
			value={form?.data?.get('aihe') ?? ''}
			required
		/>
		<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']" />
		<p class="w-fit bg-red-600 peer-invalid:block hidden">Kirjoita viestisi aihe</p>
		<datalist id="aiheet">
			<option value="Kysymys tuotteista" /><option value="Tilaus" /><option
				value="Yhteydenottopyyntö"
			/><option value="Ehdotus sivustoa koskien" /></datalist
		>
	</div>

	<div>
		<label for="viesti">Viesti:</label>

		<textarea
			class="{inputStyle} w-72 h-24 peer"
			id="viesti"
			name="viesti"
			bind:value={markdown}
			required
			maxlength="2048"
		/>
		<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']" />
		<p class="w-fit bg-red-600 peer-invalid:block hidden">Kirjoita viesti</p>
	</div>

	<div id="tilausnappi">
		<input type="checkbox" id="uutiskirje" name="uutiskirje" />
		<label for="uutiskirje" id="uutiskirjeteksti">Haluan tilata uutiskirjeen</label>
	</div>
	<input class="p-2 my-4 {inputStyle}" type="submit" id="submit" value="Lähetä" />
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
