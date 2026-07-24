import { cn } from "@/lib/utils";

export function EmptyState({
  message = "No items found.",
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
      <p className="cb-body">{message}</p>
    </div>
  );
}
