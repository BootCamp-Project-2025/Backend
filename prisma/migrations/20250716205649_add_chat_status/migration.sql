-- CreateEnum
CREATE TYPE "ChatStatus" AS ENUM ('ACTIVE', 'CLOSED');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "chatStatus" "ChatStatus" NOT NULL DEFAULT 'ACTIVE';
