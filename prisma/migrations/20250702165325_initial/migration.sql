-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxRecords" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "features" TEXT[],

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceRecord" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "voice" BYTEA NOT NULL,
    "text" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoiceRecord_pkey" PRIMARY KEY ("id")
);
