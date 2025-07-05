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
import { startTransition, useActionState, useState } from "react";
import { toast } from "sonner";
import { createVoiceRecordAction } from "../api/transcriptions";

export function NewRecordModal() {
  const [voiceFile, setVoiceFile] = useState<File | null>(null)
  const handleFileUpload = async (f: File) => {
    if (!f.type.startsWith("audio")) {
      return toast.error(`Please select file with valid audio format! ${f.type} is not supported`)
    }
    setVoiceFile(f)
  }
  const [_, dispatch, isPending] = useActionState(async () => createVoiceRecordAction(await voiceFile!.arrayBuffer(), voiceFile!.name), null)
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
              onRecordingComplete={(blob) => setVoiceFile(new File([blob], "Record " + new Date().toLocaleString()))}
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
          <Button isLoading={isPending} onClick={() => voiceFile ? startTransition(dispatch) : toast.error("Select voice file to create record!")}>Create record</Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
