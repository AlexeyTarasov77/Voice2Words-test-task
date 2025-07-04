import { transcriptionsRepo } from "./repository"

export const transcriptionService = {
  listUserRecords: async (userId: string) => {
    return await transcriptionsRepo.listRecords({ userId })
  }
}
