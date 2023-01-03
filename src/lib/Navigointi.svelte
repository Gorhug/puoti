<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';

	let user = getUser();

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
	//   class="{linkStyle} {$page.route.id === route ? 'bg-rose-200 dark:bg-rose-700' : ''}"
</script>

<nav class="list-nav">
	<ul>
		{#each links as [route, desc]}
			<li><a href="/{route}">{desc}</a></li>
		{/each}
	</ul>
</nav>
