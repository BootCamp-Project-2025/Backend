/*
  Warnings:

  - You are about to drop the column `resources` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `position` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "resources",
ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "LessonId" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_url_key" ON "Resource"("url");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_LessonId_fkey" FOREIGN KEY ("LessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
