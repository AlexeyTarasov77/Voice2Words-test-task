import { AudioRecorder } from "@/shared/ui/audio/recorder";
import { Button } from "@/shared/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { FileDropbox } from "@/shared/ui/dropbox";
import { Trash } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createVoiceRecordAction } from "../api/transcriptions";
import { TranscriptionErrorCodes } from "@/entities/transcription/errors";

export function NewRecordModal() {
  const [voiceFile, setVoiceFile] = useState<File | null>(null)
  const handleFileUpload = async (f: File) => {
    if (!f.type.startsWith("audio")) {
      return toast.error(`Please select file with valid audio format! ${f.type} is not supported`)
    }
    setVoiceFile(f)
  }
  const [errorCode, dispatch, isPending] = useActionState(async () => createVoiceRecordAction(await voiceFile!.arrayBuffer(), voiceFile!.name, voiceFile!.type), null)
  useEffect(() => {
    if (errorCode !== null) {
      switch (errorCode) {
        case TranscriptionErrorCodes.INVALID_VOICE_FILE:
          toast.error("Selected file is not supported. Please try select another one")
          break;
        case TranscriptionErrorCodes.LIMIT_EXCEEDED:
          toast.error(`You've reached limit of transcriptions in your current subscription.`)
          break;
        default:
          toast.error("Unexpected error! Please, try again later")
      }
    }
  }, [errorCode])
  const handleSubmit = () => {
    if (!voiceFile) {
      return toast.error("Select voice file to create record!")
    }
    if (!voiceFile.type) {
      return toast.error("Unable to determine file type. Please try to use another file")
    }
    startTransition(dispatch)
  }
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Transcription</DialogTitle>
          <DialogDescription>
            Make new record or upload it from your device to make transcription.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Upload from device</h3>
            <FileDropbox accept="audio/*" handleFileUpload={handleFileUpload} />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Record New</h3>
            <AudioRecorder
              onRecordingComplete={(file) => setVoiceFile(file)}
              showVisualizer={true}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
            />
          </div>
        </div>
        {voiceFile && (
          <div className="flex justify-between items-center">
            <h5 className="text-lg">Selected record</h5>
            <div className="flex gap-2 items-center max-h-10">
              <audio className="max-w-60 max-h-10" controls src={URL.createObjectURL(voiceFile)} />
              <Button className="rounded-full" onClick={() => setVoiceFile(null)}><Trash /></Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button isLoading={isPending} onClick={handleSubmit}>Create record</Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
