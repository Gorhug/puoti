<script lang="ts">
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { inputStyle } from '$lib/tyylit';

	const user = getUser();

	import { PUBLIC_BRAND, PUBLIC_CLOUD_APIKEY, PUBLIC_CLOUD_NAME } from '$env/static/public';
	import { invalidateAll } from '$app/navigation';

	let cloud_widget;
	async function generateSignature(cb, data_to_sign) {
		const heads = new Headers();
		heads.append('content-type', 'application/json');
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
		cloud_widget = cloudinary.createUploadWidget({
			api_key: PUBLIC_CLOUD_APIKEY,
			cloudName: PUBLIC_CLOUD_NAME,
			uploadPreset: 'avatar',
			uploadSignature: generateSignature,
			cropping: true,
			sources: ['unsplash'],
			multiple: false,
			folder: 'avatar',
			croppingAspectRatio: 1.0,
			publicId: $user?.username,
			tags: ['users', 'profile', 'avatar'],
			resourseType: 'image',
			maxImageFileSize: 2000000,
			maxImageWidth: 2000
		});
	}
</script>

{#if browser}
	<script src="https://upload-widget.cloudinary.com/global/all.js" on:load={createWidget}></script>
{/if}
<svelte:head>
	<title>Oma sivu - {PUBLIC_BRAND}</title>
</svelte:head>

<h2 class="text-lg mb-8">Profile</h2>

<div>
	<p>Username: {$user?.username}</p>
</div>
<div>
	<img src={$page.data.avatar_url} alt="avatar" />
</div>
{#if browser}
	<div>
		<button id="upload_widget" class="cloudinary-button" on:click={cloud_widget.open}
			>Vaihda avatarkuva</button
		>
	</div>
{/if}
<button
	class="p-2 mt-8 {inputStyle}"
	on:click={async () => {
		await signOut();
		await invalidateAll();
	}}>Kirjaudu ulos</button
>
