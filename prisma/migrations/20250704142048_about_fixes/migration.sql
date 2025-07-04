/*
  Warnings:

  - The `year` column on the `Certification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roles` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'FREELANCER');

-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_userId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "Freelancer" DROP CONSTRAINT "Freelancer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_freelancerId_fkey";

-- AlterTable
ALTER TABLE "Certification" ALTER COLUMN "certification" SET DEFAULT '',
ALTER COLUMN "institution" SET DEFAULT '',
DROP COLUMN "year",
ADD COLUMN     "year" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "career" SET DEFAULT '',
ALTER COLUMN "university" SET DEFAULT '',
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "position" SET DEFAULT '',
ALTER COLUMN "employer" SET DEFAULT '',
ALTER COLUMN "country" SET DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Freelancer" ALTER COLUMN "about" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "name" SET DEFAULT '',
ALTER COLUMN "level" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "name" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userName" SET DEFAULT '',
DROP COLUMN "roles",
ADD COLUMN     "roles" "UserRole"[] DEFAULT ARRAY['CLIENT']::"UserRole"[];

-- AddForeignKey
ALTER TABLE "Freelancer" ADD CONSTRAINT "Freelancer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
