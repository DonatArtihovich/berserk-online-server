-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "elements" TEXT[],
    "name" TEXT NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "rarity" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "elite" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "painter" TEXT NOT NULL,
    "elements" TEXT[],
    "hitId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "health" INTEGER NOT NULL,
    "moves" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "set" TEXT NOT NULL,
    "unique" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "deckId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hit" (
    "id" SERIAL NOT NULL,
    "weak" INTEGER NOT NULL,
    "medium" INTEGER NOT NULL,
    "hard" INTEGER NOT NULL,

    CONSTRAINT "Hit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Card_name_key" ON "Card"("name");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_hitId_fkey" FOREIGN KEY ("hitId") REFERENCES "Hit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
