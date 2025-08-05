/*
  Warnings:

  - You are about to drop the column `subcategory` on the `Request` table. All the data in the column will be lost.
  - Added the required column `subCategory` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "subcategory",
ADD COLUMN     "subCategory" TEXT NOT NULL;
