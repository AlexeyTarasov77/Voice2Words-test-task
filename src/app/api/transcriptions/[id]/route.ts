
import { transcriptionService } from "@/entities/transcription/service"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const transcription = await transcriptionService.getTranscription(id)
  if (!transcription) {
    return new Response(null, { status: 404 })
  }
  return Response.json(transcription)
}
