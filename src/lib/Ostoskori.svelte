<script lang="ts">
	import { kori } from '$lib/kori';
	function removeItem(tuote: string) {
		for (let item of $kori.tuotteet) {
			if (item.tuoteId === tuote) {
				--item.lkm;
				if (item.lkm <= 0) {
					$kori.tuotteet = $kori.tuotteet.filter((cartItem) => cartItem.tuoteId != tuote);
				}
                $kori = $kori
				return;
			}
		}
	}
	function addItem(tuoteId: string, a_hinta: number) {
		for (let item of $kori.tuotteet) {
			if (item.tuoteId === tuoteId) {
				++item.lkm
                item.a_hinta = a_hinta
                $kori = $kori
				return;
			}
		}
        $kori.tuotteet.push({tuoteId, lkm: 1, a_hinta })
        $kori = $kori
	}
    $: total = $kori.tuotteet.reduce((sum, item) => sum + item.a_hinta * item.lkm, 0)
</script>
<span>{$kori.tuotteet.length}: {total} €</span>