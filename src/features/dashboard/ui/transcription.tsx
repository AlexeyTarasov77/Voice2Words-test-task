"use client"
import useSWR from "swr";
import { TranscriptionEntity } from "@/entities/transcription/domain";
import { fetcher } from "@/shared/lib/api";
import { toast } from "sonner";
import { startTransition, use, useActionState, useEffect } from "react";
import { TranscriptionErrorCodes } from "@/entities/transcription/errors";
import { notFound } from "next/navigation";
import { makeTranscriptionAction } from "../api/transcriptions";
import { Skeleton } from "@/shared/ui/skeleton";
import { LoadingSpinner } from "@/shared/ui/loader";
import { matchResult } from "@/shared/utils/error-handling";

export function Transcription({ transcriptionId }: { transcriptionId: string }) {
  // const transcription = await transcriptionService.getTranscription(transcriptionId)
  // if (!transcription) return notFound()
  const { data: transcription, error, isLoading, mutate } = useSWR<TranscriptionEntity>(`/api/transcriptions/${transcriptionId}`, fetcher)
  const [transcriptionRes, dispatchTranscription, isTranscriptionPending] = useActionState(() => transcription && makeTranscriptionAction(transcription.id), null)
  if (transcriptionRes) {
    matchResult(transcriptionRes, {
      onSuccess: (v) => mutate(v, { revalidate: false }),
      onFailure: (code) => code === TranscriptionErrorCodes.NOT_FOUND ? notFound() : toast.error("Unexpected error. Please try again later")
    })
  }

  useEffect(() => {
    if (!transcription) return
    if (!transcription.text && !isTranscriptionPending) startTransition(dispatchTranscription)
  }, [transcription])
  if (error) {
    toast.error(error instanceof Error ? error.message : "Failed to fetch transcription")
    return
  }
  if (isLoading) return <LoadingSpinner />
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl mb-2">{transcription!.name}</h1>
      {isTranscriptionPending ?
        Array(4).map(_ => <Skeleton className="h-4 w-full" />) :
        <p className="text-secondary-foreground">{transcription!.text}</p>
      }
      <audio className="w-full" controls src={transcription!.voiceFile.url} />
    </div>
  )
}
