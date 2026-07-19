/*
  Warnings:

  - You are about to drop the column `Place` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Place",
ADD COLUMN     "place" TEXT;
