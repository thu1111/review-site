/*
  Warnings:

  - Added the required column `password` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "password" TEXT NOT NULL;
