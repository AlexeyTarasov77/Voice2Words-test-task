/*
  Warnings:

  - You are about to drop the column `name` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[level]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionLevel" AS ENUM ('FREE', 'PREMIUM');

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "name",
ADD COLUMN     "level" "SubscriptionLevel" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_level_key" ON "Subscription"("level");
