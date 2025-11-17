-- CreateTable
CREATE TABLE "Mood" (
    "id" TEXT NOT NULL,
    "rating" "BaselineMood" NOT NULL,
    "dateLogged" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
