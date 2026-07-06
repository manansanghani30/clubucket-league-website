import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/Layout";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PageNav } from "@/components/PageNav";
import { usePublicHighlights } from "@/hooks/use-public-api";
import { normalizeContentImage, normalizeContentExcerpt } from "@/lib/public-api";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/highlights")({
  head: () => ({
    meta: [
      { title: "Highlights — LigaD1" },
      {
        name: "description",
        content: "Match highlights, top goals, and standout moments from LigaD1.",
      },
      { property: "og:title", content: "Highlights — LigaD1" },
      {
        property: "og:description",
        content: "Match highlights, top goals, and standout moments from LigaD1.",
      },
    ],
  }),
  component: Highlights,
});

function Highlights() {
  const { locale } = useLocale();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePublicHighlights(locale, page);
  const items = data?.items ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <Layout>
      <PageHeader title="Highlights" subtitle="The best moments from LigaD1" />
      <section className="bg-[var(--cb-surface-muted)] py-[calc(var(--cb-space-section)*2)]">
        <div className="max-w-[1200px] mx-auto px-[var(--cb-space-xl)]">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-[var(--cb-space-xl)]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[var(--cb-surface-panel)] rounded-[var(--cb-radius-md)] overflow-hidden cb-shadow-panel">
                  <Skeleton className="h-[190px] w-full rounded-none" />
                  <div className="p-[var(--cb-space-lg)] space-y-[var(--cb-space-md)]">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-[var(--cb-space-section)]">
              <p className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)]">This section could not load.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-[var(--cb-space-sm)] text-[length:var(--cb-font-size-caption)] text-[var(--cb-brand-accent)] font-[var(--cb-font-weight-heading)] hover:underline"
              >
                Retry
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-[var(--cb-space-section)]">
              <p className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)]">No highlights available.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-[var(--cb-space-xl)]">
                {items.map((h, idx) => (
                  <Link
                    key={`${h.id}-${idx}`}
                    to="/highlights/$slug"
                    params={{ slug: h.slug || h.id }}
                  >
                    <NewsCard
                      category={h.category || ""}
                      title={h.title}
                      date={h.date || ""}
                      excerpt={normalizeContentExcerpt(h)}
                      image={normalizeContentImage(h)}
                    />
                  </Link>
                ))}
              </div>
              <PageNav page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
