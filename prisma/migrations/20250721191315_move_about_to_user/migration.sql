/*
  Warnings:

  - You are about to drop the column `about` on the `Freelancer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Freelancer" DROP COLUMN "about";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT NOT NULL DEFAULT '';
