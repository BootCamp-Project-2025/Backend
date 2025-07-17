/*
  Warnings:

  - You are about to drop the column `name` on the `Module` table. All the data in the column will be lost.
  - Added the required column `title` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Lesson_title_key";

-- DropIndex
DROP INDEX "Module_name_key";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;
