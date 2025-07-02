import { SkeletonCard } from "@/shared/ui/card";

export default function Loading() {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col">
        <p className="text-3xl font-bold leading-tight min-w-72">Choose the plan that's right for you</p>
        <div className="grid grid-cols-2 gap-10">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  )
}
