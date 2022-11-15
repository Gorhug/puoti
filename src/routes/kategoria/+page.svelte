<script lang="ts">
//	import { getUser } from '@lucia-auth/sveltekit/client';
    import type { PageData } from './$types';
    import type { ActionData } from './$types'
    import { linkStyle } from '$lib/tyylit';
	import { PUBLIC_BRAND } from '$env/static/public';
    export let form : ActionData;
    export let data: PageData;
    // export const user = getUser()
</script>
<svelte:head>
	<title>Tuotekategoriat - {PUBLIC_BRAND}</title>
</svelte:head>
<h2 class="text-2xl mb-4">Tuotekategoriat</h2>

<!-- {#if $user} -->
{#if false}
    <form method="post">
        {#if form?.error}
            <p>Virhe: {form?.error} </p>
        {/if}
        {#if form?.success}
            <p>Kategorian lisäys onnistui</p>
        {/if}

        <label for="nimi">Kategorian nimi</label>
        <input id="nimi" name="nimi" required value="{form?.nimi ?? ''}">
        <label for="kuvaus">Kuvaus</label>
        <textarea id="kuvaus" name="kuvaus">{form?.kuvaus ?? ''}</textarea>
        <input type="submit" name="submit" value="Lisää kategoria">
    </form>
{/if}

<table>
    <thead><tr>
        <th>Kategoria</th><th>tuotteiden lkm</th>
    </tr></thead>
    <tbody>
        {#each data.kategoriat as k}
            <tr>
                <td><a class="{linkStyle}" href="/kategoria/{k.kategoria_id}">{k.nimi}</a></td><td class="text-right">{k._count.tuotteet}</td>
            </tr>
        {/each}
    </tbody>
</table>

