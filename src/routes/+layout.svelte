<script lang="ts">
	import { handleSilentRefresh, getSession } from 'lucia-sveltekit/client';
	const session = getSession();
	import '../app.css';
	import { page } from '$app/stores';

	handleSilentRefresh();
	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
	const linkStyle = 'hover:border-b-4 border-rose-950 hover:bg-rose-200 border px-4';

	let links = [
		['', 'Etusivu'],
		['yhteydenotto', 'Ota yhteyttä'],
		['tuote', 'Tuotteet']
	];
	if ($session) {
		links.push(['profile', 'Oma sivu']);
	} else {
		links.push(['login', 'Kirjaudu']);
	}
</script>

<div class="h-full w-full fixed -z-10 dark:bg-rose-950" />
<h1 class="text-4xl pb-1 font-serif text-center logoteksti text-rose-950 dark:text-gray-200">
	Kirjontastudio Helmi
</h1>

<nav class="w-full flex justify-between px-4 py-8 mx-auto bg-white sticky top-0">
	<div>
		<h3
			class="border border-rose-950 rounded-full p-2 tracking-tighter italic font-medium text-rose-950 logoteksti"
		>
			Helmi
		</h3>
	</div>
	<input id="laatikko" type="checkbox" class="peer" hidden />
	<div class="hidden sm:flex sm:flex-row flex-col peer-checked:flex">
		<span />
		{#each links as [route, desc]}
			<a href="/{route}" class="{linkStyle} {$page.routeId === route ? 'bg-rose-200' : ''}"
				>{desc}</a
			>
		{/each}

		<label for="laatikko">
			<span class="z-10 absolute top-10 right-10 sm:hidden"
				><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
					><rect x="0" fill="white" width="24" height="24" /><g
						><path
							d="M18.36 19.78L12 13.41l-6.36 6.37-1.42-1.42L10.59 12 4.22 5.64l1.42-1.42L12 10.59l6.36-6.36 1.41 1.41L13.41 12l6.36 6.36z"
						/></g
					></svg
				></span
			>
		</label>
	</div>
	<label for="laatikko">
		<span class="flex sm:hidden absolute top-10 right-10">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</span></label
	>
</nav>
<main class="text-rose-950 dark:bg-rose-950 dark:text-gray-200 px-4 sm:px-8">
	<slot />
</main>
<footer class="fixed bottom-0 w-full border-4 border-double text-center footerteksti bg-white">
	&copy; 2022 Ilkka Forsblom
</footer>

<style>
	/* printtivärit */
	@import url('https://fonts.googleapis.com/css2?family=Lora&family=Satisfy&family=Raleway&display=swap');
	.logoteksti {
		font-family: 'Satisfy', cursive;
	}
	main {
		font-family: 'Lora', serif;
	}
	.footerteksti {
		font-family: 'Raleway', sans-serif;
	}

	@media print {
		nav {
			display: none;
		}
		footer {
			position: relative;
		}
		* {
			color: black;
			background-color: white;
		}
	}

	/* fontit logolle: Satisfy ja Courgette */
</style>
