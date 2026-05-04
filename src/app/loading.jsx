export default function Loading() {
  return (
    <main className="bg-muted px-4 py-10 md:py-14" aria-busy="true">
      <div className="container mx-auto max-w-282.5">
        <div className="h-9 w-60 animate-pulse rounded-2xl bg-white/80" />
        <div className="mt-3 h-4 w-96 animate-pulse rounded-2xl bg-white/70" />

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[20px] bg-white p-4 ring-1 ring-border"
            >
              <div className="h-24 w-full animate-pulse rounded-2xl bg-muted" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
                <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-muted" />
              </div>
              <div className="mt-4 h-9 w-full animate-pulse rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
