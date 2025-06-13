/*
  Warnings:

  - The `level` column on the `Skill` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('beginner', 'intermediate', 'advanced');

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "level",
ADD COLUMN     "level" "SkillLevel" NOT NULL DEFAULT 'beginner';
