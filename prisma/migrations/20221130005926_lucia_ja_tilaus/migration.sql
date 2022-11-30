/*
  Warnings:

  - You are about to drop the column `identifier_token` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `refresh_token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `paivitetty` on table `Tuote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paivitetty` on table `TuoteKategoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uutiskirje` on table `Viesti` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `provider_id` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `paivitetty` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_user_id_fkey";

-- DropIndex
DROP INDEX "user_identifier_token_key";

-- AlterTable
ALTER TABLE "Tuote" ALTER COLUMN "paivitetty" SET NOT NULL;

-- AlterTable
ALTER TABLE "TuoteKategoria" ALTER COLUMN "paivitetty" SET NOT NULL;

-- AlterTable
ALTER TABLE "Viesti" ALTER COLUMN "uutiskirje" SET NOT NULL,
ALTER COLUMN "uutiskirje" SET DEFAULT false;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "identifier_token",
ADD COLUMN     "provider_id" TEXT NOT NULL,
ALTER COLUMN "paivitetty" SET NOT NULL;

-- DropTable
DROP TABLE "refresh_token";

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tilaus" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "summa" INTEGER NOT NULL,
    "status" TEXT,
    "toimitettu" BOOLEAN NOT NULL DEFAULT false,
    "transaction_id" TEXT,
    "luotu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paivitetty" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tilaus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TuoteTilaukset" (
    "tilaus_id" TEXT NOT NULL,
    "tuote_id" TEXT NOT NULL,
    "lkm" INTEGER NOT NULL,
    "a_hinta" INTEGER NOT NULL,
    "luotu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paivitetty" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TuoteTilaukset_pkey" PRIMARY KEY ("tilaus_id","tuote_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_id_key" ON "session"("id");

-- CreateIndex
CREATE INDEX "session_user_id_idx" ON "session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tilaus_id_key" ON "Tilaus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_provider_id_key" ON "user"("provider_id");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuoteTilaukset" ADD CONSTRAINT "TuoteTilaukset_tilaus_id_fkey" FOREIGN KEY ("tilaus_id") REFERENCES "Tilaus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuoteTilaukset" ADD CONSTRAINT "TuoteTilaukset_tuote_id_fkey" FOREIGN KEY ("tuote_id") REFERENCES "Tuote"("tuote_id") ON DELETE RESTRICT ON UPDATE CASCADE;
