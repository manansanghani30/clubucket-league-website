import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/Layout";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PageNav } from "@/components/PageNav";
import { usePublicNews } from "@/hooks/use-public-api";
import { normalizeContentImage, normalizeContentExcerpt } from "@/lib/public-api";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates — LigaD1" },
      { name: "description", content: "Latest news, match reports, and updates from LigaD1." },
    ],
  }),
  component: News,
});

function News() {
  const { locale } = useLocale();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePublicNews(locale, page);
  const items = data?.items ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <Layout>
      <PageHeader title="News & Updates" subtitle="Latest from LigaD1" />
      <section className="bg-[#F7F7F7] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[10px] overflow-hidden"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
                >
                  <Skeleton className="h-[190px] w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-[14px] text-[#6B6B6B]">This section could not load.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 text-[13px] text-[#ED2D23] font-semibold hover:underline"
              >
                Retry
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[14px] text-[#6B6B6B]">No news articles available.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {items.map((n, idx) => (
                  <Link key={`${n.id}-${idx}`} to="/news/$slug" params={{ slug: n.slug || n.id }}>
                    <NewsCard
                      category={n.category || ""}
                      title={n.title}
                      date={n.date || ""}
                      excerpt={normalizeContentExcerpt(n)}
                      image={normalizeContentImage(n)}
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
