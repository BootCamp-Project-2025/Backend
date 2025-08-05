/*
  Warnings:

  - Added the required column `chatId` to the `P2PCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "P2PCourse" ADD COLUMN     "chatId" TEXT NOT NULL;
