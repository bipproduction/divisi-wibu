/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Project_userId_fkey` ON `Project`;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
