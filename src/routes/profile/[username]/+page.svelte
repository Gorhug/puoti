<script lang="ts">
    import type { PageData } from './$types';
    import { linkStyle } from '$lib/tyylit';
    export let data: PageData;
    import {PUBLIC_BRAND} from '$env/static/public'
</script>
<svelte:head>
    <title>{data.username} - {PUBLIC_BRAND}</title>
</svelte:head>
<div>
	<img src="{data.avatar_url}" alt="avatar">
</div>
<table>
    <thead>
        <th>Tuote</th><th>Hinta</th>
    </thead>
    <tbody>
        {#each data.tuotteet as tuote}
        <tr>
            <td><a class="{linkStyle}" href="/tuote/{tuote.tuote_id}">{tuote.nimi}</a></td>
            <td class="text-right">{tuote.hinta}</td>
        </tr>
        {/each}
    </tbody>
</table>