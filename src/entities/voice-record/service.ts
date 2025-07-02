import { voiceRecordsRepo } from "./repository"

export const voiceRecordService = {
  listUserRecords: async (userId: string) => {
    return await voiceRecordsRepo.listRecords({ userId })
  }
}
