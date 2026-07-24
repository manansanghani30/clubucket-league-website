import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

export function PageNav({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-[var(--cb-space-section)]">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
            className={page <= 1 ? "pointer-events-none opacity-40" : "cursor-pointer transition-colors cb-focus"}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={
                "flex h-11 w-11 items-center justify-center font-[var(--cb-font-weight-heading)] cb-pill transition-colors cb-focus " +
                (p === page
                  ? "bg-[var(--cb-brand-primary)] text-[var(--cb-text-inverse)]"
                  : "text-[var(--cb-text-secondary)] hover:bg-[var(--cb-surface-muted)]")
              }
            >
              {p}
            </button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
            className={page >= totalPages ? "pointer-events-none opacity-40" : "cursor-pointer transition-colors cb-focus"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
