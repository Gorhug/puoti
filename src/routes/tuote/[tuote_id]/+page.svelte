<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { getSession } from 'lucia-sveltekit/client';
	import { browser } from '$app/environment';
	import Svelecte from 'svelecte';
	import { inputStyle } from '$lib/tyylit'
	import { Remarkable } from 'remarkable'
	const session = getSession();
	export let form: ActionData
	export let data: PageData;

	const md = new Remarkable()

	let valinnat: string[] = []
	let valitut = data.valitut

	import { PUBLIC_CLOUD_APIKEY, PUBLIC_CLOUD_NAME } from '$env/static/public';

	let cloud_widget;
	let gallery_widget;
	async function generateSignature(cb, data_to_sign) {
		const heads = new Headers();
		heads.append('Authorization', `Bearer ${$session?.access_token}`);
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
		if (data.luoja == $session?.user.username) {
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
	function createGallery() {
		gallery_widget = cloudinary.galleryWidget({
			cloudName: PUBLIC_CLOUD_NAME,
			mediaAssets: [
				{
					tag: data.tuote_id,
					mediaType: 'image'
				}
			],
			displayProps: {
				mode: 'classic'
			},
			navigationButtonProps: {
				color: '#FFFFFF',
				iconColor: '#000000'
			},
			container: '#my-gallery'
		});
		gallery_widget.render();
	}
</script>

<svelte:head>
    <title>{data.tuote_nimi} - Kirjontastudio Helmi</title>
</svelte:head>

<h2 class="text-2xl my-4">{data.tuote_nimi}</h2>

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
{#if data.luoja == $session?.user.username}
{#if form?.error}
<p>Virhe: {form?.error}</p>
{/if}
{#if form?.success}
<p>Kategorioiden päivitys onnistui</p>
{/if}
	<div class="dark:bg-gray-200 dark:text-rose-950">
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
		<input type="hidden" name="_lucia" value={$session?.access_token} />
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
<div id="my-gallery">
	{#if browser}
		<script src="https://product-gallery.cloudinary.com/all.js" on:load={createGallery}>
		</script>
	{/if}
</div>

<style>
	#my-gallery {
		width: 50vw;
		height: 25vh;
	}
	button {
		display: block;
	}

	/* :global(#selectTeksti) {
		background-color: white;
		color: black;
	} */
	/* @media (prefers-color-scheme: dark) {
		:global(.svelecti) {
			--sv-bg: rgb(190,18,60);
			--sv-color: rgb(243,244,246);
			--sv-min-height: 38px;
			--sv-border-color: #ccc;
			--sv-border: 1px solid var(--sv-border-color);
			--sv-active-border: 1px solid #555;
			--sv-active-outline: none;
			--sv-disabled-bg: #f2f2f2;
			--sv-disabled-border-color: #e6e6e6;
			--sv-placeholder-color: #ccccc6;
			--sv-icon-color: #ccc;
			--sv-icon-hover: #999;
			--sv-loader-border: 3px solid #dbdbdb;
			--sv-dropdown-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
			--sv-dropdown-height: 250px;
			--sv-item-selected-bg: #efefef;
			--sv-item-color: #333333;
			--sv-item-active-color: var(--sv-item-color);
			--sv-item-active-bg: rgb(190,18,60);
			--sv-item-btn-bg: var(--sv-item-selected-bg);
			--sv-item-btn-bg-hover: #ddd;
			--sv-item-btn-icon: var(--sv-item-color);
			--sv-highlight-bg: yellow;
			--sv-highlight-color: var(--sv-item-color);
		}
	}  */
</style>
