/*
  Warnings:

  - You are about to drop the `Mood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mood" DROP CONSTRAINT "Mood_userId_fkey";

-- DropTable
DROP TABLE "Mood";

-- CreateTable
CREATE TABLE "moods" (
    "id" TEXT NOT NULL,
    "rating" "BaselineMood" NOT NULL,
    "dateLogged" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "moods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "moods" ADD CONSTRAINT "moods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
