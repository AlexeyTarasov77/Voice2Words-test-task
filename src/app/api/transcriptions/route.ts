import { transcriptionService } from "@/entities/transcription/service"
import { auth } from "@clerk/nextjs/server"

export async function GET() {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthenticated (middleware not working)")
  const transcriptions = await transcriptionService.listUserTranscriptions(userId)
  return Response.json(transcriptions)
}
