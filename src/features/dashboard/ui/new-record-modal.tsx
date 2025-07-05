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
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function NewRecordModal() {
  const [recordBlob, setRecordBlob] = useState<Blob | null>(null)
  const fileInputRef = useRef<null | HTMLInputElement>(null)
  useEffect(() => {
    if (!fileInputRef.current?.files?.length) return
    const file = fileInputRef.current!.files![0]
    console.log(file.type)
  }, [fileInputRef.current?.files])
  const handleFileUpload = (f: File) => {
    console.log(f.type)
    if (!f.type.startsWith("audio")) {
      return toast.error("Please select file with valid audio format!")
    }
    setRecordBlob(f)
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
              onRecordingComplete={(blob) => setRecordBlob(blob)}
              showVisualizer={true}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
            />
          </div>
        </div>
        {recordBlob && (
          <div className="flex justify-between items-center">
            <h5 className="text-lg">Selected record</h5>
            <div className="flex gap-2 items-center max-h-10">
              <audio className="max-w-60 max-h-10" controls src={URL.createObjectURL(recordBlob)} />
              <Button className="rounded-full" onClick={() => setRecordBlob(null)}><Trash /></Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button>Create record</Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
