<script lang="ts">
	import { getSession } from 'lucia-sveltekit/client';
    import type { PageData } from './$types';
    import type { ActionData } from './$types'
    export let form : ActionData;
    export let data: PageData;
    export const session = getSession()
</script>
<h2>Tuotekategoriat</h2>

{#if $session}
    <form method="post">
        {#if form?.error}
            <p>Virhe: {form?.error} </p>
        {/if}
        {#if form?.success}
            <p>Kategorian lisäys onnistui</p>
        {/if}
        <input type="hidden" name="_lucia" value="{$session?.access_token}">
        <label for="nimi">Kategorian nimi</label>
        <input id="nimi" name="nimi" required value="{form?.nimi ?? ''}">
        <label for="kuvaus">Kuvaus</label>
        <textarea id="kuvaus" name="kuvaus">{form?.kuvaus ?? ''}</textarea>
        <input type="submit" name="submit" value="Lisää kategoria">
    </form>
{/if}

<table>
    <thead><tr>
        <th>Kategoria</th><th>Kuvaus</th>
    </tr></thead>
    <tbody>
        {#each data.kategoriat as k}
            <tr>
                <td>{k.nimi}</td><td>{k.kuvaus ?? ''}</td>
            </tr>
        {/each}
    </tbody>
</table>

