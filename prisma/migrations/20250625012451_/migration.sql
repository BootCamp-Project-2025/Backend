-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "category" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "language" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "subCategory" TEXT NOT NULL DEFAULT '';
