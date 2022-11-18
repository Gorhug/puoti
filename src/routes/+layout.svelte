<script lang="ts">
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';

	handleSession(page);
	import '../app.css';

	import { PUBLIC_BRAND } from '$env/static/public';
	import { getUser } from '@lucia-auth/sveltekit/client';

	const user = getUser();
	const userId = $user?.userId;
	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
	const linkStyle =
		'hover:border-b-4 border-rose-950 hover:bg-rose-200 border px-4 dark:text-gray-200 dark:border-gray-200 hover:dark:bg-rose-700';

	let links = [
		['', 'Etusivu'],
		['yhteydenotto', 'Ota yhteyttä'],
		['kategoria', 'Tuotekategoriat']
	];
	if ($user) {
		links.push(['tuote', 'Lisää tuote'], ['profile', 'Oma sivu']);
	} else {
		links.push(['login', 'Kirjaudu']);
	}
	import { kori } from '$lib/kori';
	$: total = $kori.tuotteet.reduce((sum, item) => sum + item.a_hinta * item.lkm, 0);
	$: lkm = $kori.tuotteet.reduce((sum, item) => sum + item.lkm, 0)
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
	<div class="dark:text-gray-200 p-2 tracking-tighter italic font-medium text-rose-950 relative">
		<a href="/ostoskori" class="flex flex-col {linkStyle}"> 
			<span class="flex flex-row"><svg
				width="16px"
				height="16px"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="bi bi-cart w-6 h-6" 
			>
				<path
					d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
				/>
			</svg><span class="rounded-full dark:bg-red-800 bg-red-400 ml-2 p-1">{lkm}</span></span><span>{total.toFixed(2)}&nbsp;€</span></a
		>
	</div>

	<input id="laatikko" type="checkbox" class="peer" hidden />
	<div class="hidden md:flex md:flex-row flex-col peer-checked:flex">
		<span />
		{#each links as [route, desc]}
			<a
				href="/{route}"
				class="{linkStyle} {$page.route.id === route ? 'bg-rose-200 dark:bg-rose-700' : ''}"
				>{desc}</a
			>
		{/each}

		<label for="laatikko">
			<span class="z-10 absolute top-10 right-10 sm:hidden"
				><svg
					class="fill-white stroke-black stroke-2 dark:stroke-white dark:fill-rose-950"
					width="24px"
					height="24px"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
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
		<span class="flex md:hidden absolute top-10 right-10">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 h-6n fill-white stroke-black stroke-2 dark:stroke-white dark:fill-rose-950"
				
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
<footer
	class="fixed bottom-0 w-full border-4 border-double text-center footerteksti bg-white dark:bg-rose-950 dark:text-gray-200"
>
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
