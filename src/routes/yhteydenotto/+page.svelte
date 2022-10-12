<script lang="ts">
	const inputStyle = "border border-slate-900 text-black dark:bg-rose-700 dark:text-gray-100"
</script>

<svelte:head>
    <title>Ota yhteyttä - Kirjontastudio Helmi</title>
</svelte:head>

<form class="space-y-4 mt-8 flex flex-col px-8 w-96" method="post">
	<div>
	<label for="nimi">Nimi:</label>
	<input class="w-96 {inputStyle}" type="text" id="nimi" name="nimi" /></div>
	<div><label for="email">Sähköpostiosoite:</label>
	<input class="w-72 peer {inputStyle}" type="email" id="email" name="email" required />
		<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']"/>
		<p class="w-fit bg-red-600 peer-invalid:block hidden"
			>Kirjoita sähköpostiosoite (esim: matti@example.com)</p
		></div>
	<div>
	<label for="aihe">Aihe:</label>
	<input class="{inputStyle} w-72 peer outline-black" list="aiheet" id="aihe" name="aihe" required />
	<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']"/>
	<p class="w-fit bg-red-600 peer-invalid:block hidden"
	>Kirjoita viestisi aihe</p
>
	<datalist id="aiheet">
		<option value="Kysymys tuotteista" /><option value="Tilaus" /><option
			value="Yhteydenottopyyntö"
		/><option value="Ehdotus sivustoa koskien"></option></datalist
	></div>

	<div>
	<label for="viesti">Viesti:</label>

	<textarea class="{inputStyle} w-72 h-24 peer" id="viesti" name="viesti" required />
	<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']"/>
	<p class="w-fit bg-red-600 peer-invalid:block hidden"
			>Kirjoita viesti</p
		></div>

	<div id="tilausnappi">
		<input type="checkbox" id="uutiskirje" name="uutiskirje" />
		<label for="uutiskirje" id="uutiskirjeteksti"
			>Haluan tilata uutiskirjeen</label
		>
	</div>
	<input class="button p-2 my-4 dark:bg-white {inputStyle}" type="submit" id="submit" value="Lähetä" />
</form>

