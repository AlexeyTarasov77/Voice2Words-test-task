import { hf } from "@/shared/lib/hf"
import { transcriptionsRepo } from "./repository"

export const transcriptionService = {
  listUserTranscriptions: async (userId: string) => {
    return await transcriptionsRepo.listTranscriptions({ userId })
  },
  createVoiceRecord: async (voiceFile: File, userId: string) => {
    return await transcriptionsRepo.create({ filename: voiceFile.name, voice: new Uint8Array(await voiceFile.arrayBuffer()), userId })
  },
  getTranscription: async (transcriptionId: string) => {
    return await transcriptionsRepo.getTranscription({ id: transcriptionId })
  },
  makeTranscription: async (recordId: string, voice: Blob): Promise<string> => {
    const res = await hf.automaticSpeechRecognition({ data: voice, model: "openai/whisper-large-v3", provider: "hf-inference" })
    const updatedTrascription = await transcriptionsRepo.updateTranscription({ id: recordId }, { text: res.text })
    if (!updatedTrascription) {
      throw new Error("Transcription not found")
    }
    return res.text
  }
}
