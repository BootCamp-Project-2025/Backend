/*
  Warnings:

  - You are about to drop the column `chatStatus` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "chatStatus",
ADD COLUMN     "status" "ChatStatus" NOT NULL DEFAULT 'ACTIVE';
