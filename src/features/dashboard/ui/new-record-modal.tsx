import { AudioRecorder } from "@/shared/ui/audio/recorder";
import { Button } from "@/shared/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
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
            <div className="px-6 py-14 border-neutral-400 border-dashed border-2 rounded-xl gap-6 flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-xl">Drag and drop audio file here</h4>
                <h4 className="text-lg text-secondary-foreground">Or browse files from your computer</h4>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={(e) => e.target.files?.length && handleFileUpload(e.target.files[0])} />
              <Button className="rounded-full" onClick={() => fileInputRef.current!.click()}>
                Browse Files
              </Button>
            </div>
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
