import { useRef } from "react";
import { Button } from "@/shared/ui/button";

export function FileDropbox({ handleFileUpload, className, ...inputProps }: React.ComponentProps<"input"> & { handleFileUpload: (f: File) => void, className?: string, }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  return (
    <div
      className="px-6 py-14 border-neutral-400 border-dashed border-2 rounded-xl gap-6 flex flex-col justify-center items-center"
      onDrop={(e) => {
        e.preventDefault();
        e.dataTransfer.files.length && handleFileUpload(e.dataTransfer.files[0])
      }}
      onDragEnter={(e) => { e.preventDefault(); e.stopPropagation() }}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
    >
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-xl">Drag and drop audio file here</h4>
        <h4 className="text-lg text-secondary-foreground">Or browse files from your computer</h4>
      </div>
      <input type="file" ref={fileInputRef} className="hidden" {...inputProps}
        onChange={(e) => e.target.files?.length && handleFileUpload(e.target.files[0])} />
      <Button className="rounded-full" onClick={() => fileInputRef.current!.click()}>
        Browse Files
      </Button>
    </div>
  )
}
