<script lang="ts">
	import { handleSilentRefresh, getSession } from 'lucia-sveltekit/client';
	const session = getSession();
	import '../app.css';
	import { page } from '$app/stores';
	import {PUBLIC_BRAND} from '$env/static/public'
	handleSilentRefresh();
	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
	const linkStyle = 'hover:border-b-4 border-rose-950 hover:bg-rose-200 border px-4 dark:text-gray-200 dark:border-gray-200 hover:dark:bg-rose-700';

	let links = [
		['', 'Etusivu'],
		['yhteydenotto', 'Ota yhteyttä'],
		['kategoria', 'Tuotekategoriat']
	];
	if ($session) {
		links.push(['tuote', 'Lisää tuote'], ['profile', 'Oma sivu']);
	} else {
		links.push(['login', 'Kirjaudu']);
	}
</script>

<div class="h-full w-full fixed -z-10 dark:bg-rose-950" />
<h1 class="text-4xl pb-1 font-serif text-center logoteksti text-rose-950 dark:text-gray-200">
	{PUBLIC_BRAND}
</h1>

<nav class="w-full flex justify-between px-4 py-8 mx-auto bg-white dark:bg-rose-950 sticky top-0">
	<div>
		<h3
			class="border border-rose-950 dark:text-gray-200 dark:border-gray-200 rounded-full p-2 tracking-tighter italic font-medium text-rose-950 logoteksti"
		>
			Helmi
		</h3>
	</div>
	<input id="laatikko" type="checkbox" class="peer" hidden />
	<div class="hidden sm:flex sm:flex-row flex-col peer-checked:flex">
		<span />
		{#each links as [route, desc]}
			<a href="/{route}" class="{linkStyle} {$page.routeId === route ? 'bg-rose-200 dark:bg-rose-700' : ''}"
				>{desc}</a
			>
		{/each}

		<label for="laatikko">
			<span class="z-10 absolute top-10 right-10 sm:hidden"
				><svg class="fill-white stroke-black stroke-2 dark:fill-rose-950" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
					><rect x="0" width="24" height="24" stroke-width="0" /><g
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
<main class="text-rose-950 dark:bg-rose-950 dark:text-gray-200 px-4 sm:px-8 mb-24">
	<slot />
</main>
<footer class="fixed bottom-0 w-full border-4 border-double text-center footerteksti bg-white dark:bg-rose-950 dark:text-gray-200">
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
	:global(.markdown h1) {
		font-size: xx-large;
	}
	:global(.markdown h2) {
		font-size: x-large;
	}
	:global(.markdown h3) {
		font-size: larger;
	}
	:global(.markdown h4) {
		font-size: large;
	}
	:global(.markdown h5) {
		font-size: medium;
	}
	:global(.markdown ul) {
		list-style: disc;
		margin-left: 20px;
		padding-left: 20px;
	}
	:global(.markdown ol) {
		list-style-type: upper-roman;
		margin: 20px;
		padding: 20px;
	}

	:global(.markdown td) {
		border: thin solid black;
	}
	/* fontit logolle: Satisfy ja Courgette */
</style>
