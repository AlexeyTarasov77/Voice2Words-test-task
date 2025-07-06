"use server"

import { transcriptionService } from "@/entities/transcription/service"
import { auth } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const createVoiceRecordAction = async (voiceFileData: BlobPart, voiceFilename: string, voiceFileType: string) => {
  const voiceFile = new File([voiceFileData], voiceFilename, { type: voiceFileType })
  const { userId } = await auth.protect()
  const headersList = await headers()
  const origin = headersList.get('origin')
  if (!origin) throw new Error("Invalid request without origin header")
  const transcription = await transcriptionService.createVoiceRecord(voiceFile, origin, userId)
  return redirect("/dashboard/" + transcription.id)
}

export const makeTranscriptionAction = async (recordId: string) => {
  const updatedTranscription = await transcriptionService.makeTranscription(recordId)
  return updatedTranscription.text
}
