"use server"

import { transcriptionService } from "@/entities/transcription/service"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const createVoiceRecordAction = async (voiceFileData: BlobPart, voiceFileName: string) => {
  const voiceFile = new File([voiceFileData], voiceFileName)
  const { userId } = await auth.protect()
  const transcription = await transcriptionService.createVoiceRecord(voiceFile, userId)
  return redirect("/dashboard/" + transcription.id)
}

export const createTranscriptionAction = async (recordId: number) => {

}
