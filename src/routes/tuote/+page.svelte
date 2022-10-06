<script lang="ts">
	import { getSession } from 'lucia-sveltekit/client';
    import type { PageData } from './$types';
    import type { ActionData } from './$types'
    export let form : ActionData;
    export let data: PageData;
    // data.tuotteet = JSON.parse(data.tuotteet)
    export const session = getSession()
</script>
<h2>Tuotekategoriat</h2>

{#if $session}
    <form method="post">
        {#if form?.error}
            <p>Virhe: {form?.error} </p>
        {/if}
        {#if form?.success}
            <p>Tuotteen lisäys onnistui</p>
        {/if}
        <input type="hidden" name="_lucia" value="{$session?.access_token}">

        <label for="nimi">Tuotteen nimi</label>
        <input name="nimi" required value="{form?.tuote?.nimi ?? ''}">

        <label for="hinta">Tuotteen hinta</label>
        <input name="hinta" type="number" step="0.01" required value="{form?.tuote?.hinta ?? '9.99'}">

        <label for="kuvaus">Kuvaus</label>
        <textarea name="kuvaus">{form?.tuote?.kuvaus ?? ''}</textarea>


        <input type="submit" name="submit" value="Lisää tuote">
    </form>
{/if}

<table>
    <thead><tr>
        <th>Tuote</th><th>Kuvaus</th><th>Hinta</th>
    </tr></thead>
    <tbody>
        {#each data.tuotteet as t}
            <tr>
                <td>{t.nimi}</td><td>{t.kuvaus?? ''}</td><td>{t.hinta}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    @import url('/form.css');
</style>