<script lang="ts">
    import type { PageData } from './$types';
    import {PUBLIC_BRAND} from '$env/static/public'
    export let data: PageData;
</script>
<svelte:head>
	<title>Tilaus onnistui - {PUBLIC_BRAND}</title>
</svelte:head>

{#if data.errors.length > 0}
    {#each data.errors as error}
        <p class="text-xl">{error}</p>        
    {/each}
{:else}
<p class="text-xl">Tilaus onnistui</p>
{/if}