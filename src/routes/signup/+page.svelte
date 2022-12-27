<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;

	import { enhance } from '$app/forms';
	import { PUBLIC_BRAND } from '$env/static/public';
	import { inputStyle, linkStyle } from '$lib/tyylit';
	export let form: { message?: string };
</script>

<svelte:head>
	<title>Luo tili - {PUBLIC_BRAND}</title>
</svelte:head>

<h2 class="text-xl">Luo käyttäjätili:</h2>
<form
	class="space-y-4 mt-8"
	method="post"
	use:enhance={({ data, cancel }) => {
		form = {};
		const username = data.get('username')?.toString() || '';
		const password = data.get('password')?.toString() || '';
		if (!username || !password) {
			form.message = 'Invalid input';
			cancel();
		}
		return async ({result, update}) => {
			if (result.type === 'success') {
				document.location.reload()
			} else {
				update()
			}
		}
	}}
>
	<div>
		<label for="username">käyttäjänimi:</label><br />
		<input
			class="peer {inputStyle}"
			id="username"
			name="username"
			pattern="^[a-z0-9-]+$"
			required
			minlength="4"
			maxlength="32"
		/>
		<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']" /><br />
		<span class="w-fit bg-red-500 peer-invalid:block hidden"
			>4-32 merkkiä, sallitut merkit: pienet aakkoset a-z, numerot, väliviiva</span
		>
	</div>
	<div>
		<label for="password">salasana: </label><br />
		<input
			class="peer {inputStyle}"
			type="password"
			id="password"
			name="password"
			required
			minlength="8"
			maxlength="128"
		/>
		<span class="peer-invalid:after:content-['❗'] peer-valid:after:content-['✅']" /><br />
		<p class="w-fit bg-red-500 peer-invalid:block hidden">
			vähintään 8 merkkiä (kaikki merkit sallittu)
		</p>
	</div>
	<input type="submit" value="Luo tili" class="p-2 my-4 {inputStyle}" />
</form>
<p class="error">{form?.message || ''}</p>
<p class="mt-8">
	<a class={linkStyle} href="/login">Kirjaudu sisään</a>
</p>
