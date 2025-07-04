import { TranscriptionEntity } from "./domain";
import { prisma } from "../../shared/lib/db"
import { Prisma, Transcription } from "@/generated/prisma";

const mapToEntity = (dbRecord: Transcription): TranscriptionEntity => {
  return { ...dbRecord, voice: new Blob([dbRecord.voice]) }
}

export const transcriptionsRepo = {
  listRecords: async (where: Prisma.TranscriptionWhereInput): Promise<TranscriptionEntity[]> => {
    const records = await prisma.transcription.findMany({ where: where })
    return records.map(mapToEntity)
  }
}
