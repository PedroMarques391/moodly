-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "baselineMood" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "copingStrategies" TEXT[],
ADD COLUMN     "goals" TEXT[],
ADD COLUMN     "triggers" TEXT[],
ALTER COLUMN "updatedAt" DROP DEFAULT;
