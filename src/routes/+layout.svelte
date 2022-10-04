<script lang="ts">
	import { handleSilentRefresh, getSession } from 'lucia-sveltekit/client';
	const session = getSession();
	
	handleSilentRefresh();
	// import type { LayoutData } from './$types';
	
	// export let data: LayoutData;
</script>

<header>
	<nav>
		<a href="/">Etusivu</a>
		<a href="/yhteydenotto">Ota yhteyttä</a>
		{#if $session}
		<a href="/profile">{$session?.user.username}</a>
		{:else}
		<a href="/login">Kirjaudu sisään</a>
		{/if}

	</nav>
</header>
<main>
	<slot />
</main>
<footer>&copy; 2022 Ilkka Forsblom</footer>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Lora&family=Satisfy&family=Raleway&display=swap');
	:global(h1) {
		font-family: 'Satisfy', cursive;
	}
	:global(p) {
		font-family: 'Lora', serif;
	}
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		border: 4px;
		border-style: outset;
		min-width: 100vw;
		text-align: center;
		font-family: 'Raleway', sans-serif;
	}
	nav {
		font-family: 'Raleway', sans-serif;
		overflow: hidden;
		background-color: darkolivegreen;
		/* Set the navbar to fixed position */
		position: fixed;

		top: 0;
		left: 0;
		width: 100%;
	}

	/* Links inside the navbar */
	nav a {
		float: left;
		display: block;
		color: var(--vaaleaneutraali);
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
	}

	/* Change background on mouse-over */
	nav a:hover {
		background: #ddd;
		color: black;
	}
	main {
		margin-top: 50px;
	}

	/* fontit logolle: Satisfy ja Courgette */
</style>
