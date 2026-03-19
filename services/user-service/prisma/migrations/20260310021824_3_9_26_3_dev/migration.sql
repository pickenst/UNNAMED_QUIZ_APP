/*
  Warnings:

  - Changed the type of `plan` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "plans" AS ENUM ('FREE', 'PRO', 'PREM');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "plan",
ADD COLUMN     "plan" "plans" NOT NULL;

-- DropEnum
DROP TYPE "Plan";
