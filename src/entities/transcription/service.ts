import { hf } from "@/shared/lib/hf"
import { createId } from '@paralleldrive/cuid2';
import { transcriptionsRepo } from "./repository"
import { TranscriptionEntity } from "./domain";
import { Result } from "@/shared/utils/error-handling";
import { checkCanCreateRecord } from "../subscription/domain";
import { subscriptionsService } from "../subscription/service";
import { TranscriptionErrorCodes } from "./errors";
import { getFileStorage } from "@/shared/lib/files";


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
    const fileStorage = getFileStorage()
    const uploadedFileUrl = await fileStorage.uploadVoiceFile(origin, userId, voiceFile)
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
    const titleGenerationPrompt = `
Create a summarizing title which shortly describes provided text by following requirements below:
1) output must contain only resulting title and nothing else.
2) Try to stick to maximum a few words. 
3) Output language must be the same as the input language (e.g if input is in english, output must be in english and if input is in russian output must be in russian as well)
Below are few examples which might help you,
where 'Input' is given text and Output is approximate title which would be suitable for the given text:

Input: 1 2 3 4 5 6 7 8
Output: Numbers enumeration

Input: Ученые из Массачусетского технологического института разработали новый метод хранения энергии, который в 10 раз эффективнее традиционных аккумуляторов.
Output: Метод хранения энергии

Input: OpenAI представила новую функцию в ChatGPT, которая позволяет пользователям создавать собственные GPT-агенты без навыков программирования.
Output: ChatGPT ИИ-агенты

Here is the text to create title for: ${res.text}
`
    const titleGenerationRes = await hf.chatCompletion({
      max_tokens: 50,
      messages: [{ role: "user", content: titleGenerationPrompt }],
      model: "meta-llama/Llama-3.1-8B-Instruct",
      provider: "sambanova"
    })
    console.log(titleGenerationRes.choices[0])
    const generatedTitle = titleGenerationRes.choices[0].message.content
    if (generatedTitle) {
      record.name = generatedTitle
    }
    await transcriptionsRepo.updateTranscriptionById(recordId, record)
    return { type: "success", value: record }
  }
}
