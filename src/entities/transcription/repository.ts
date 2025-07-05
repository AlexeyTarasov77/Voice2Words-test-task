import { TranscriptionEntity } from "./domain";
import { prisma } from "../../shared/lib/db"
import { Prisma, Transcription } from "@/generated/prisma";

const mapToEntity = (dbRecord: Transcription): TranscriptionEntity => {
  return { ...dbRecord, voice: new Blob([dbRecord.voice]) }
}

export const transcriptionsRepo = {
  listTranscriptions: async (where: Prisma.TranscriptionWhereInput): Promise<TranscriptionEntity[]> => {
    const records = await prisma.transcription.findMany({ where: where })
    return records.map(mapToEntity)
  },
  create: async (data: Prisma.TranscriptionCreateInput): Promise<TranscriptionEntity> => {
    const record = await prisma.transcription.create({ data })
    return mapToEntity(record)
  },
  getTranscription: async (where: Prisma.TranscriptionWhereUniqueInput): Promise<TranscriptionEntity | null> => {
    const record = await prisma.transcription.findUnique({ where })
    return record ? mapToEntity(record) : null
  },
  updateTranscription: async (where: Prisma.TranscriptionWhereUniqueInput, data: Prisma.TranscriptionUpdateInput) => {
    const record = await prisma.transcription.update({ where, data })
    return record ? mapToEntity(record) : null
  }
}
