import { TranscriptionEntity } from "./domain";
import { prisma } from "../../shared/lib/db"
import { Prisma } from "@/generated/prisma";

const transcriptionInclude = { voiceFile: true }

const mapToEntity = (dbRecord: Prisma.TranscriptionGetPayload<{ include: typeof transcriptionInclude }>): TranscriptionEntity => {
  if (!dbRecord.voiceFile) throw new Error("invalid record without voice file")
  return { ...dbRecord, voiceFile: dbRecord.voiceFile }
}

export const transcriptionsRepo = {
  listTranscriptions: async (where: Prisma.TranscriptionWhereInput): Promise<TranscriptionEntity[]> => {
    const records = await prisma.transcription.findMany({ where, include: transcriptionInclude })
    return records.map(mapToEntity)
  },
  save: async (data: TranscriptionEntity) => {
    await prisma.transcription.create({ data: { ...data, voiceFile: { create: data.voiceFile } } })
  },
  getTranscription: async (where: Prisma.TranscriptionWhereUniqueInput): Promise<TranscriptionEntity | null> => {
    const record = await prisma.transcription.findUnique({ where, include: transcriptionInclude })
    return record ? mapToEntity(record) : null
  },
  updateTranscriptionById: async (id: string, data: Partial<TranscriptionEntity>) => {
    const record = await prisma.transcription.update({ where: { id }, data: { ...data, voiceFile: undefined } })
    return record ? { ...data, ...record } : null
  }
}
