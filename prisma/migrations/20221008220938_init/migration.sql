-- CreateTable
CREATE TABLE "Viesti" (
    "nimi" TEXT,
    "email" TEXT NOT NULL,
    "aihe" TEXT NOT NULL,
    "viesti" TEXT NOT NULL,
    "uutiskirje" BOOLEAN,
    "milloin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Viesti_pkey" PRIMARY KEY ("email","milloin")
);

-- CreateTable
CREATE TABLE "TuoteKategoria" (
    "kategoria_id" TEXT NOT NULL,
    "nimi" TEXT NOT NULL,
    "kuvaus" TEXT,
    "luotu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paivitetty" TIMESTAMP(3),

    CONSTRAINT "TuoteKategoria_pkey" PRIMARY KEY ("kategoria_id")
);

-- CreateTable
CREATE TABLE "Tuote" (
    "tuote_id" TEXT NOT NULL,
    "nimi" TEXT NOT NULL,
    "kuvaus" TEXT,
    "hinta" DECIMAL(65,30) NOT NULL,
    "luoja_id" TEXT NOT NULL,
    "luotu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paivitetty" TIMESTAMP(3),

    CONSTRAINT "Tuote_pkey" PRIMARY KEY ("tuote_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "identifier_token" TEXT NOT NULL,
    "hashed_password" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "luotu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paivitetty" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" SERIAL NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TuoteToTuoteKategoria" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TuoteKategoria_nimi_key" ON "TuoteKategoria"("nimi");

-- CreateIndex
CREATE UNIQUE INDEX "Tuote_nimi_key" ON "Tuote"("nimi");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_identifier_token_key" ON "user"("identifier_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_id_key" ON "refresh_token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_refresh_token_key" ON "refresh_token"("refresh_token");

-- CreateIndex
CREATE INDEX "refresh_token_user_id_idx" ON "refresh_token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_TuoteToTuoteKategoria_AB_unique" ON "_TuoteToTuoteKategoria"("A", "B");

-- CreateIndex
CREATE INDEX "_TuoteToTuoteKategoria_B_index" ON "_TuoteToTuoteKategoria"("B");

-- AddForeignKey
ALTER TABLE "Tuote" ADD CONSTRAINT "Tuote_luoja_id_fkey" FOREIGN KEY ("luoja_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TuoteToTuoteKategoria" ADD CONSTRAINT "_TuoteToTuoteKategoria_A_fkey" FOREIGN KEY ("A") REFERENCES "Tuote"("tuote_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TuoteToTuoteKategoria" ADD CONSTRAINT "_TuoteToTuoteKategoria_B_fkey" FOREIGN KEY ("B") REFERENCES "TuoteKategoria"("kategoria_id") ON DELETE CASCADE ON UPDATE CASCADE;
