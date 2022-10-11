<script lang="ts">
	import { enhance } from '$app/forms';
	import { signOut, getSession } from 'lucia-sveltekit/client';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	const session = getSession();
	
	import { PUBLIC_CLOUD_APIKEY, PUBLIC_CLOUD_NAME } from '$env/static/public';


	let cloud_widget;
	async function generateSignature(cb, data_to_sign) {
		const heads = new Headers();
		heads.append('Authorization', `Bearer ${$session?.access_token}`);
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
		 cloud_widget = cloudinary.createUploadWidget( {
				api_key:  PUBLIC_CLOUD_APIKEY ,
				cloudName:  PUBLIC_CLOUD_NAME ,
				uploadSignature:  generateSignature,
				cropping: true,
				sources: ["unsplash"],
				multiple: false,
				folder: "avatar",
				croppingAspectRatio: 1.0,
				publicId: $session?.user.username,
				tags: ["users", "profile", "avatar"],
				resourseType: 'image',
				maxImageFileSize: 2000000, 
				maxImageWidth: 2000
			});
	}
	
</script>

{#if browser}
	<script src="https://upload-widget.cloudinary.com/global/all.js" on:load={createWidget}></script>
{/if}

<h2>Profile</h2>

<div>
	<p>Username: {$session?.user.username}</p>
</div>
<div>
	<img src="{$page.data.avatar_url}" alt="avatar">
</div>
{#if browser}
<div>
	<button id="upload_widget" class="cloudinary-button" on:click={cloud_widget.open}>Vaihda avatarkuva</button>

</div>
{/if}
<button on:click={() => signOut('/')}>Sign out</button>
