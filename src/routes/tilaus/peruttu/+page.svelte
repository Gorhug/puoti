<script lang="ts">
    import type { PageData } from './$types';
    import {PUBLIC_BRAND} from '$env/static/public'

    export let data: PageData;
</script>
<svelte:head>
	<title>Maksu peruttu - {PUBLIC_BRAND}</title>
</svelte:head>

{#if data.errors.length > 0}
	{#each data.errors as error}
		<p class="text-xl mb-4">{error}</p>
	{/each}
{/if}
	
<p class="text-xl">Maksu peruttu</p>
