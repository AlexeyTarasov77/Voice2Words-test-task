/*
  Warnings:

  - You are about to drop the `VoiceRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VoiceRecord";

-- CreateTable
CREATE TABLE "Transcription" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "voice" BYTEA NOT NULL,
    "text" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transcription_pkey" PRIMARY KEY ("id")
);
