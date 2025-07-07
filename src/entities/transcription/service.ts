import { hf } from "@/shared/lib/hf"
import { createId } from '@paralleldrive/cuid2';
import { transcriptionsRepo } from "./repository"
import { TranscriptionEntity } from "./domain";
import { uploadFile } from "@/shared/utils/files";
import { Result } from "@/shared/utils/error-handling";
import { checkCanCreateRecord } from "../subscription/domain";
import { subscriptionsService } from "../subscription/service";
import { TranscriptionErrorCodes } from "./errors";


export const transcriptionService = {
  listUserTranscriptions: async (userId: string) => {
    return await transcriptionsRepo.listTranscriptions({ userId })
  },
  createVoiceRecord: async (voiceFile: File, origin: string, userId: string): Promise<Result<TranscriptionEntity>> => {
    const userSubscription = await subscriptionsService.getCurrentSub()
    const transcriptionsCount = await transcriptionsRepo.getTranscriptionsCount({ userId })
    if (!checkCanCreateRecord(userSubscription, transcriptionsCount)) {
      return { type: "error", code: TranscriptionErrorCodes.LIMIT_EXCEEDED }
    }
    if (!voiceFile.type) {
      return { type: "error", code: TranscriptionErrorCodes.INVALID_VOICE_FILE }
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
    return { type: "success", value: ent }
  },
  getTranscription: async (transcriptionId: string) => {
    return await transcriptionsRepo.getTranscription({ id: transcriptionId })
  },
  makeTranscription: async (recordId: string): Promise<Result<TranscriptionEntity>> => {
    const record = await transcriptionsRepo.getTranscription({ id: recordId })
    if (!record) {
      return { type: "error", code: TranscriptionErrorCodes.NOT_FOUND }
    }
    const resp = await fetch(record.voiceFile.url)
    const voiceFileBlob = await resp.blob()
    const res = await hf.automaticSpeechRecognition({ data: voiceFileBlob, model: "openai/whisper-large-v3", provider: "hf-inference" })
    record.text = res.text
    await transcriptionsRepo.updateTranscriptionById(recordId, record)
    return { type: "success", value: record }
  }
}
