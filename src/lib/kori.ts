import storage from '$lib/store'

interface Kori {
    tuotteet: {
        tuoteId: string,
        lkm: number,
        a_hinta: number
    }[]
}

export const kori = storage<Kori>("kori", { tuotteet: [] })
