"use server"

import { transcriptionService } from "@/entities/transcription/service"
import { matchResult } from "@/shared/utils/error-handling"
import { auth } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const createVoiceRecordAction = async (voiceFileData: BlobPart, voiceFilename: string, voiceFileType: string) => {
  const voiceFile = new File([voiceFileData], voiceFilename, { type: voiceFileType })
  const { userId } = await auth.protect()
  const headersList = await headers()
  const origin = headersList.get('origin')
  if (!origin) throw new Error("Invalid request without origin header")
  const res = await transcriptionService.createVoiceRecord(voiceFile, origin, userId)
  return matchResult(res, {
    onSuccess: (v) => redirect("/dashboard/" + v.id),
    onFailure: (code) => code
  })
}

export const makeTranscriptionAction = async (recordId: string) => {
  return await transcriptionService.makeTranscription(recordId)
}
