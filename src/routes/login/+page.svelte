<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_BRAND } from '$env/static/public';
	import {inputStyle, linkStyle} from '$lib/tyylit'
	
	export let form: { message?: string };

</script>

<svelte:head>
    <title>Kirjaudu sisään - {PUBLIC_BRAND}</title>
</svelte:head>

<div>
	<h1 class="text-xl py-4">Kirjaudu sisään:</h1>
	<form
		method="post"
		use:enhance={({ data, cancel }) => {
			form = {};
			const username = data.get('username')?.toString() || '';
			const password = data.get('password')?.toString() || '';
			if (!username || !password) {
				form.message = 'Invalid input';
				cancel();
			}
			// return async({result, update}) => {
			// 	if (result.type == 'redirect') {
			// 		await invalidateAll()
			// 	}
			// 	update()
			// }
		}}
	>
		<label for="username">Käyttäjänimi:</label><br />
		<input class="{inputStyle}" id="username" name="username" /><br />
		<label for="password">Salasana:</label><br />
		<input class="{inputStyle}" type="password" id="password" name="password" /><br />
		<input class="{inputStyle} p-2 mt-4" type="submit" value="Kirjaudu" />
	</form>
	<p class="error">{form?.message || ''}</p>
	<p class="mt-8">
	<a class="{linkStyle}" href="/signup">Luo uusi tili</a>
	</p>
</div>