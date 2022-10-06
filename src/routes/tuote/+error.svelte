<script lang="ts">
    import { page } from '$app/stores';
</script>

<h2>{$page.status}: {$page.error?.message}</h2>
<p>Tuotetta ei löydy.</p>