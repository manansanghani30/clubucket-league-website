import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-[var(--cb-space-xs)] text-[var(--cb-brand-accent)] font-[var(--cb-font-weight-heading)] hover:underline transition-colors",
        className,
      )}
    >
      <ChevronLeft className="w-4 h-4" />
      {children}
    </Link>
  );
}
