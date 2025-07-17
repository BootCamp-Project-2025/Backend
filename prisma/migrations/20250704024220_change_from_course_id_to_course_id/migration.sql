/*
  Warnings:

  - You are about to drop the column `CourseId` on the `Module` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_CourseId_fkey";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "CourseId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
