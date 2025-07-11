import { Transcription } from "@/features/dashboard";

export default async function TranscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="p-5">
      <Transcription transcriptionId={id} />
    </div>
  )
}
