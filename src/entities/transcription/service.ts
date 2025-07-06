import { hf } from "@/shared/lib/hf"
import { createId } from '@paralleldrive/cuid2';
import { transcriptionsRepo } from "./repository"
import { TranscriptionEntity } from "./domain";
import { uploadFile } from "@/shared/utils/files";


export const transcriptionService = {
  listUserTranscriptions: async (userId: string) => {
    return await transcriptionsRepo.listTranscriptions({ userId })
  },
  createVoiceRecord: async (voiceFile: File, origin: string, userId: string) => {
    // TODO: check user subscription
    if (!voiceFile.type) {
      throw new Error("Can't create voice file without mime type!")
    }
    const uploadedFileUrl = await uploadFile(origin, userId, voiceFile)
    const ent: TranscriptionEntity = {
      id: createId(),
      name: voiceFile.name,
      userId,
      voiceFile: { id: createId(), url: uploadedFileUrl, mimeType: voiceFile.type },
      text: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await transcriptionsRepo.save(ent)
    return ent
  },
  getTranscription: async (transcriptionId: string) => {
    return await transcriptionsRepo.getTranscription({ id: transcriptionId })
  },
  makeTranscription: async (recordId: string): Promise<TranscriptionEntity> => {
    const record = await transcriptionsRepo.getTranscription({ id: recordId })
    if (!record) {
      throw new Error("Transcription not found")
    }
    const resp = await fetch(record.voiceFile.url)
    const voiceFileBlob = await resp.blob()
    const res = await hf.automaticSpeechRecognition({ data: voiceFileBlob, model: "openai/whisper-large-v3", provider: "hf-inference" })
    record.text = res.text
    await transcriptionsRepo.updateTranscriptionById(recordId, record)
    return record
  }
}
