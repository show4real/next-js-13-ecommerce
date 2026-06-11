export default function Loading() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary-100 border-t-accent" />
      <p className="text-sm font-medium text-primary/70">Loading…</p>
    </div>
  );
}
