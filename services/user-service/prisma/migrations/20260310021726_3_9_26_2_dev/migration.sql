/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserQuiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserQuiz" DROP CONSTRAINT "UserQuiz_userId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserQuiz";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email_addr" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_quizzes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "s3Ref" TEXT,
    "openaiRef" TEXT,
    "context" TEXT,

    CONSTRAINT "user_quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_addr_key" ON "users"("email_addr");

-- AddForeignKey
ALTER TABLE "user_quizzes" ADD CONSTRAINT "user_quizzes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
