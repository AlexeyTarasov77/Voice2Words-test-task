import { CheckLine } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="min-w-48 min-h-48 rounded-full flex items-center justify-center bg-emerald-500">
        <CheckLine className="w-1/2 h-1/2" />
      </div>
      <h3 className="text-2xl font-bold mt-5">Thank you for your payment!</h3>
    </div>
  )
}
