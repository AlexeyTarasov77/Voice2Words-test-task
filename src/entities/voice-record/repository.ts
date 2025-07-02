import { VoiceRecordEntity } from "./domain";
import { prisma } from "../../shared/lib/db"
import { Prisma, VoiceRecord } from "@/generated/prisma";

const mapToEntity = (dbRecord: VoiceRecord): VoiceRecordEntity => {
  return { ...dbRecord, voice: new Blob([dbRecord.voice]) }
}

export const voiceRecordsRepo = {
  listRecords: async (where: Prisma.VoiceRecordWhereInput): Promise<VoiceRecordEntity[]> => {
    const records = await prisma.voiceRecord.findMany({ where: where })
    return records.map(mapToEntity)
  }
}
