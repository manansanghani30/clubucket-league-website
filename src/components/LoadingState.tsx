import { cn } from "@/lib/utils";

export function LoadingState({
  message = "Loading…",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-[var(--cb-space-section)] text-center",
        className,
      )}
    >
      <div className="w-8 h-8 border-2 border-[var(--cb-border-subtle)] border-t-[var(--cb-brand-accent)] rounded-full animate-spin mb-[var(--cb-space-md)]" />
      <p className="cb-body">{message}</p>
    </div>
  );
}
