/*
  Warnings:

  - A unique constraint covering the columns `[user]` on the table `password-reset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "password-reset.user_unique" ON "password-reset"("user");
