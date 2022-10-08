<script lang="ts">
	import type { PageData } from './$types';
	import { getSession } from 'lucia-sveltekit/client';
	const session = getSession();

	export let data: PageData;

	import { PUBLIC_CLOUD_APIKEY, PUBLIC_CLOUD_NAME } from '$env/static/public';

	let cloud_widget;
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
				sources: ['local', 'unsplash'],
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
</script>

<h2>{data.tuote_nimi}</h2>
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
<svelte:head>
	<script
		src="https://upload-widget.cloudinary.com/global/all.js"
		on:load={createWidget()}></script>
</svelte:head>
{#if data.luoja == $session?.user.username}
<div>
	<button id="upload_widget" class="cloudinary-button" on:click="{cloud_widget.open()}">Lisää kuvia</button>
</div>

{/if}
