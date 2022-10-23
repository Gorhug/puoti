import type { Tuote } from '@prisma/client';

export function tuoteMapper(t: Tuote) {
    return {
        nimi: t.nimi,
        kuvaus: t.kuvaus,
        hinta: t.hinta.toFixed(2),
        tuote_id: t.tuote_id
    }
}