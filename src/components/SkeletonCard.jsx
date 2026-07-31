function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="h-52 w-full animate-pulse bg-neutral-200" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-10 animate-pulse rounded-full bg-neutral-200" />
        </div>
        <div className="h-3 w-24 animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-16 animate-pulse rounded bg-neutral-200" />
      </div>
    </div>
  )
}

export default SkeletonCard
