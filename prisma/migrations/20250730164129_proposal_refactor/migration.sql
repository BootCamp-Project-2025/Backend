/*
  Warnings:

  - You are about to drop the column `estimatedTime` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Proposal` table. All the data in the column will be lost.
  - Added the required column `description` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('NEW', 'SENT', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "estimatedTime",
DROP COLUMN "message",
DROP COLUMN "price",
ADD COLUMN     "chatId" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "sessions" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "status" "ProposalStatus" NOT NULL DEFAULT 'NEW',
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;
