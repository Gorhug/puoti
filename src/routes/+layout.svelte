<script lang="ts">
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	

	handleSession(page);

	import '../theme.postcss'; // <--
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch } from "@skeletonlabs/skeleton";
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import { PUBLIC_BRAND } from '$env/static/public';

	import { kori } from '$lib/kori';
	import Navigointi from '$lib/Navigointi.svelte';

	$: total = $kori.tuotteet.reduce((sum, item) => sum + item.a_hinta * item.lkm, 0);
	$: lkm = $kori.tuotteet.reduce((sum, item) => sum + item.lkm, 0);


function drawerOpen(): void {
	drawerStore.open();
}
function drawerClose(): void {
	drawerStore.close();
}
			
</script>

<Drawer>
	<div class="flex flex-row justify-between">
		<h1 class="my-2">Blogi</h1>
		<button on:click={drawerClose}>×</button>
		
	</div>
	<hr />
	<Navigointi />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4 hidden lg:block">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button on:click={drawerOpen} class="btn btn-sm text-3xl lg:hidden">≡</button>
				<h1 class="hidden sm:block">{PUBLIC_BRAND}</h1>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="hidden lg:block">
			<Navigointi />
		</div>
	</svelte:fragment>

	





	<slot />


</AppShell>

<style>


</style>
