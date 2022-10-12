<script lang="ts">
	import { getSession } from 'lucia-sveltekit/client';
    import type { PageData } from './$types';
    import type { ActionData } from './$types'
    import {inputStyle} from '$lib/tyylit'
    export let form : ActionData;
    export let data: PageData;

    export const session = getSession()
  
</script>
<h2 class="text-2xl text-center pb-5">Tuotteet</h2>

{#if $session}
<h3 class="text-xl pb-3">Lisää tuote:</h3>
    <form method="post" class="flex flex-col px-8">
        {#if form?.error}
            <p>Virhe: {form?.error} </p>
        {/if}
        {#if form?.success}
            <p>Tuotteen lisäys onnistui</p>
        {/if}
        <input type="hidden" name="_lucia" value="{$session?.access_token}">

        <label for="nimi">Tuotteen nimi:</label>
        <input class="{inputStyle}" id="nimi" name="nimi" required value="{form?.tuote?.nimi ?? ''}">

        <label for="hinta">Tuotteen hinta:</label>
        <span><input class="{inputStyle} w-20" id="hinta" name="hinta" type="number" step="0.01" required value="{form?.tuote?.hinta ?? '9.99'}"> &euro;</span>

        <label for="kuvaus">Kuvaus:</label>
        <textarea class="{inputStyle}" id="kuvaus" name="kuvaus">{form?.tuote?.kuvaus ?? ''}</textarea>


        <input type="submit" name="submit" value="Lisää tuote" class="button p-2 my-4 {inputStyle}">
    </form>
{/if}

<table>
    <thead><tr>
        <th>Tuote</th><th>Kuvaus</th><th>Hinta</th>
    </tr></thead>
    <tbody>
        {#each data.tuotteet as t}
            <tr>
                <td><a class="hover:underline font-sans tracking-tighter italic" href="/tuote/{t.tuote_id}">{t.nimi}</a></td><td>{t.kuvaus?? ''}</td><td>{t.hinta}</td>
            </tr>
        {/each}
    </tbody>
</table>