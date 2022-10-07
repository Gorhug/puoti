<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>
<h2>{data.tuote_nimi}</h2>
<ul>
    <li>Luoja: <a href="/profile/{data.luoja}">{data.luoja}</a></li>
    <li>Luotu: {new Intl.DateTimeFormat('fi-FI', {timeStyle: 'short', dateStyle: 'full'}).format(data.luotu)}</li>
    {#if data.paivitettu}
    <li>Päivitetty: {new Intl.DateTimeFormat('fi-FI', {timeStyle: 'short', dateStyle: 'full'}).format(data.paivitettu)}</li>
    {/if}

</ul>