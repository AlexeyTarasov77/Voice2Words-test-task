/*
  Warnings:

  - You are about to drop the column `filename` on the `Transcription` table. All the data in the column will be lost.
  - You are about to drop the column `voice` on the `Transcription` table. All the data in the column will be lost.
  - Added the required column `name` to the `Transcription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transcription" DROP COLUMN "filename",
DROP COLUMN "voice",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "VoiceFile" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "transcriptionId" TEXT NOT NULL,

    CONSTRAINT "VoiceFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoiceFile_transcriptionId_key" ON "VoiceFile"("transcriptionId");

-- AddForeignKey
ALTER TABLE "VoiceFile" ADD CONSTRAINT "VoiceFile_transcriptionId_fkey" FOREIGN KEY ("transcriptionId") REFERENCES "Transcription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
