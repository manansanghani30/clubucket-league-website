import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicNewsItem } from "@/hooks/use-public-api";
import { normalizeContentImage } from "@/lib/public-api";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/news/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `News — ${params.slug} — LigaD1` }],
  }),
  component: NewsDetail,
});

function NewsDetail() {
  const { slug } = Route.useParams();
  const { locale } = useLocale();
  const { data: item, isLoading } = usePublicNewsItem(slug, locale);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-[750px] mx-auto px-6 py-14">
          <Skeleton className="h-4 w-24 mb-8" />
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-5 w-48 mb-8" />
          <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <div className="max-w-[750px] mx-auto px-6 py-14 text-center">
          <p className="text-[15px] text-[#6B6B6B]">Article not found.</p>
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 mt-4 text-[13px] text-[#ED2D23] font-semibold hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to News
          </Link>
        </div>
      </Layout>
    );
  }

  const imageUrl = normalizeContentImage(item);

  return (
    <Layout>
      <article className="max-w-[750px] mx-auto px-6 py-14">
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6B6B] font-semibold hover:text-[#ED2D23]"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to News
        </Link>

        {item.category && (
          <div className="text-[11px] uppercase font-bold text-[#ED2D23] mt-6 tracking-[1px]">
            {item.category}
          </div>
        )}

        <h1 className="text-[32px] font-bold text-[#111] mt-3 leading-tight">{item.title}</h1>

        <div className="flex items-center gap-3 text-[13px] text-[#9CA3AF] mt-3">
          {item.date && <span>{item.date}</span>}
          {item.author && (
            <>
              <span>&middot;</span>
              <span>{item.author}</span>
            </>
          )}
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full rounded-xl mt-8 object-cover max-h-[460px]"
          />
        )}

        <div className="mt-8 text-[15px] text-[#6B6B6B] leading-[1.8] space-y-4">
          {item.bodySections?.length ? (
            item.bodySections.map((section, i) => (
              <div key={i}>
                {section.title && (
                  <h2 className="text-[20px] font-bold text-[#111] mt-8 mb-3">{section.title}</h2>
                )}
                <p>{section.body}</p>
              </div>
            ))
          ) : item.body ? (
            item.body.split("\n").map((line, i) => <p key={i}>{line}</p>)
          ) : item.summary ? (
            <p>{item.summary}</p>
          ) : null}

          {item.mediaUrl && (
            <div className="mt-6">
              <a
                href={item.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ED2D23] font-semibold hover:underline"
              >
                {item.ctaText || "Watch Video"}
              </a>
            </div>
          )}

          {item.ctaUrl && !item.mediaUrl && (
            <div className="mt-6">
              <a
                href={item.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#ED2D23] text-white rounded-full px-6 py-3 text-[13px] font-bold uppercase hover:bg-[#c0241b]"
              >
                {item.ctaText || "Learn More"}
              </a>
            </div>
          )}

          {item.tags?.length && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#E5E5E5]">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-[#F3F4F6] text-[#6B7280] px-3 py-1 rounded-full font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}
