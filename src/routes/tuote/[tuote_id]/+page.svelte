<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { browser } from '$app/environment';
	import Svelecte from 'svelecte';
	import { inputStyle } from '$lib/tyylit'
	import { Remarkable } from 'remarkable'
	// import { slide } from 'svelte/transition'
	
	const user = getUser()
	export let form: ActionData
	export let data: PageData;

	const md = new Remarkable()

	let valinnat: string[] = []
	let valitut = data.valitut

	import { PUBLIC_BRAND, PUBLIC_CLOUD_APIKEY, PUBLIC_CLOUD_NAME } from '$env/static/public';
	
	const carouselPhotos = data.simple_list
	let index = 0
	
	const next = () => {
		index = (index + 1) % carouselPhotos.length
	}

	let cloud_widget;
	let gallery_widget;
	async function generateSignature(cb, data_to_sign) {
		const heads = new Headers();
		heads.append('content-type', 'application/json');
		// console.log(data_to_sign)
		var requestOptions = {
			method: 'POST',
			headers: heads,
			body: JSON.stringify(data_to_sign)
		};

		const response = await fetch('/api/signrequest', requestOptions);
		const data = await response.json();
		if (data.error) {
			console.log(data.error);
			cb(false);
		} else cb(data.signature);
	}
	function createWidget() {
		if (data.luoja == $user?.username) {
			cloud_widget = cloudinary.createUploadWidget({
				api_key: PUBLIC_CLOUD_APIKEY,
				cloudName: PUBLIC_CLOUD_NAME,
				uploadSignature: generateSignature,
				cropping: false,
				sources: ['unsplash'],
				multiple: true,
				maxFiles: 5,
				folder: 'tuote/' + data.tuote_id,
				tags: ['tuote', data.tuote_id],
				resourseType: 'image',
				maxImageFileSize: 2000000,
				maxImageWidth: 2000
			});
		}
	}


	import { kori } from '$lib/kori';
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
	function addItem() {
		const tuoteId = data.tuote_id
		const nimi = data.tuote_nimi
		const a_hinta = parseFloat(data.hinta)
		for (let item of $kori.tuotteet) {
			if (item.tuoteId === tuoteId) {
				++item.lkm
                item.a_hinta = a_hinta
                $kori = $kori
				return;
			}
		}
        $kori.tuotteet.push({tuoteId, nimi, lkm: 1, a_hinta })
        $kori = $kori
	}

</script>

<svelte:head>
    <title>{data.tuote_nimi} - {PUBLIC_BRAND}</title>
</svelte:head>

<h2 class="text-2xl my-4">{data.tuote_nimi}</h2>

<h2 class="text-2xl my-4">{data.hinta}&nbsp;€</h2>
<button class="{inputStyle}" on:click={addItem}>Lisää ostoskoriin</button>
<p>

	{#each [carouselPhotos[index]] as src (index)}
	<img {src} alt="tuotekuva {index+1}" />	
{/each}

<button  class="{inputStyle}" on:click={next}>Seuraava kuva</button>

</p>


<p class="my-8 markdown">
{@html md.render(data.kuvaus?? '')}
</p>
<ul>
	<li>Luoja: <a href="/profile/{data.luoja}">{data.luoja}</a></li>
	<li>
		Luotu: {new Intl.DateTimeFormat('fi-FI', { timeStyle: 'short', dateStyle: 'full' }).format(
			data.luotu
		)}
	</li>
	{#if data.paivitettu}
		<li>
			Päivitetty: {new Intl.DateTimeFormat('fi-FI', {
				timeStyle: 'short',
				dateStyle: 'full'
			}).format(data.paivitettu)}
		</li>
	{/if}
</ul>
{#if data.luoja == $user?.username}
{#if form?.error}
<p>Virhe: {form?.error}</p>
{/if}
{#if form?.success}
<p>Kategorioiden päivitys onnistui</p>
{/if}
	<div class="dark:bg-gray-200 dark:text-rose-950 svelecti">
		<Svelecte
			options={data.kategoriat}
			valueField="kategoria_id"
			labelField="nimi"
			placeholder="Valitse ja/tai lisää tuotekategoriat"
			multiple={true}
			creatable={true}
			inputId="selectTeksti"
			bind:readSelection={valinnat}
			bind:value={valitut}
		/>
	</div>
	<form method="post">
		<input type="hidden" name="kategoriat" value="{JSON.stringify(valinnat)}"/>
		<input type="submit" name="submit" value="Lisää tuotekategoriat" class="p-2 my-4 {inputStyle}" />
	</form>

	{#if browser}
		<script
			src="https://upload-widget.cloudinary.com/global/all.js"
			on:load={createWidget}></script>

		<div>
			<button id="upload_widget" class="cloudinary-button" on:click={cloud_widget.open}
				>Lisää kuvia</button
			>
		</div>
	{/if}
{/if}


<style>
	/* #my-gallery {
		width: 50vw;
		height: 25vh;
	} */
	button {
		display: block;
	}

	/* :global(#selectTeksti) {
		background-color: white;
		color: black;
	} */
	@media (prefers-color-scheme: dark) {
		.svelecti :global(.sv-control) {
			background-color: #500b20;
			color: aliceblue;
		}
	}  
</style>
