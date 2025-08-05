/*
  Warnings:

  - You are about to drop the column `subcategory` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "subcategory",
ADD COLUMN     "subCategory" TEXT NOT NULL DEFAULT '';
