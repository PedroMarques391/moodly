/*
  Warnings:

  - The `baselineMood` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BaselineMood" AS ENUM ('very_low', 'low', 'neutral', 'good', 'very_good');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "baselineMood",
ADD COLUMN     "baselineMood" "BaselineMood";
