<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;

	import { applyAction, enhance } from '$app/forms';

	export let form: { message?: string };
</script>

<h2>Create an account</h2>
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
		return async ({ result }) => {
			if (result.type === 'redirect') {
				window.location.href = result.location; // invalidateAll() + goto() will not work
			}
			if (result.type === 'invalid') {
				applyAction(result);
			}
		};
	}}
>
	<label for="username">käyttäjänimi (sallittu: aakkoset a-z, numerot, väliviiva)</label><br />
	<input id="username" name="username" pattern="/^[a-z0-9-]$/g" minlength="4" maxlength="32"/><br />
	<label for="password">salasana</label><br />
	<input type="password" id="password" name="password" minlength="8" maxlength="128"/><br />
	<input type="submit" value="Continue" class="button" />
</form>
<p class="error">{form?.message || ''}</p>
<a href="/login" class="link">Kirjaudu sisään</a>
