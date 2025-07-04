import { transcriptionsRepo } from "./repository"

export const transcriptionService = {
  listUserTranscriptions: async (userId: string) => {
    return await transcriptionsRepo.listTranscriptions({ userId })
  }
}
