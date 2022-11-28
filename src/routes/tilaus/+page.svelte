<script lang="ts">
    import type { ActionData } from './$types';
    import {inputStyle} from '$lib/tyylit'
    import {PUBLIC_BRAND} from '$env/static/public'
    import {goto} from '$app/navigation'
    // export let data: PageData;
    export let form: ActionData;

    const providers = form?.providers
</script>

<svelte:head>
	<title>Tilaus - {PUBLIC_BRAND}</title>
</svelte:head>

{#if form}

{#each form?.errors as error} 
    <p>error</p>
{/each}

<p class="text-xl mb-8">Email: {form.email}</p>
<p class="text-xl mb-8">Loppusumma: {(form.amount/100).toFixed(2)}&nbsp;€</p>
<p class="text-xl mb-8">Valitse maksutapa</p>

{#each providers as provider}
    <form method='post' action={provider.url}>
    {#each provider.parameters as param}
        <input type='hidden' name={param.name} value={param.value} />
    {/each}
    <button class='w-32 h-32 mb-8 {inputStyle}'><img src={provider.svg} alt={provider.name}/></button>
    </form>
{/each}

{/if}