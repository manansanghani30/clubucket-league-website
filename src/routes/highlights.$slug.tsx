import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicHighlightsItem } from "@/hooks/use-public-api";
import { normalizeContentImage } from "@/lib/public-api";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/highlights/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `Highlights — ${params.slug} — LigaD1` }],
  }),
  component: HighlightsDetail,
});

function HighlightsDetail() {
  const { slug } = Route.useParams();
  const { locale } = useLocale();
  const { data: item, isLoading } = usePublicHighlightsItem(slug, locale);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-[750px] mx-auto px-[var(--cb-space-xl)] py-[calc(var(--cb-space-section)*2)]">
          <Skeleton className="h-4 w-24 mb-[var(--cb-space-xl)]" />
          <Skeleton className="h-8 w-full mb-[var(--cb-space-md)]" />
          <Skeleton className="h-5 w-48 mb-[var(--cb-space-xl)]" />
          <Skeleton className="h-[400px] w-full rounded-[var(--cb-radius-lg)] mb-[var(--cb-space-xl)]" />
          <div className="space-y-[var(--cb-space-md)]">
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
        <div className="max-w-[750px] mx-auto px-[var(--cb-space-xl)] py-[calc(var(--cb-space-section)*2)] text-center">
          <p className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)]">Highlight not found.</p>
          <Link
            to="/highlights"
            className="inline-flex items-center gap-[var(--cb-space-xs)] mt-[var(--cb-space-md)] text-[length:var(--cb-font-size-caption)] text-[var(--cb-brand-accent)] font-[var(--cb-font-weight-heading)] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Highlights
          </Link>
        </div>
      </Layout>
    );
  }

  const imageUrl = normalizeContentImage(item);
  const isVideo = item.mediaUrl || item.category?.toLowerCase().includes("video");

  return (
    <Layout>
      <article className="max-w-[750px] mx-auto px-[var(--cb-space-xl)] py-[calc(var(--cb-space-section)*2)]">
        <Link
          to="/highlights"
          className="inline-flex items-center gap-[var(--cb-space-xs)] text-[length:var(--cb-font-size-caption)] text-[var(--cb-text-secondary)] font-[var(--cb-font-weight-heading)] hover:text-[var(--cb-brand-accent)]"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Highlights
        </Link>

        {item.category && (
          <div className="text-[length:var(--cb-font-size-caption)] uppercase font-[var(--cb-font-weight-heading)] text-[var(--cb-brand-accent)] mt-[var(--cb-space-lg)] tracking-normal">
            {item.category}
          </div>
        )}

        <h1 className="text-[length:var(--cb-font-size-screen)] font-[var(--cb-font-weight-heading)] text-[var(--cb-text-primary)] mt-[var(--cb-space-sm)] leading-tight">{item.title}</h1>

        <div className="flex items-center gap-[var(--cb-space-sm)] text-[length:var(--cb-font-size-caption)] text-[var(--cb-text-muted)] mt-[var(--cb-space-sm)]">
          {item.date && <span>{item.date}</span>}
          {item.author && (
            <>
              <span>&middot;</span>
              <span>{item.author}</span>
            </>
          )}
        </div>

        {isVideo && item.mediaUrl ? (
          <div className="mt-[var(--cb-space-xl)] aspect-video rounded-[var(--cb-radius-lg)] overflow-hidden bg-[var(--cb-surface-inverse)]">
            <iframe
              src={item.mediaUrl}
              title={item.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full rounded-[var(--cb-radius-lg)] mt-[var(--cb-space-xl)] object-cover max-h-[460px]"
          />
        ) : null}

        <div className="mt-[var(--cb-space-xl)] text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)] leading-[1.8] space-y-[var(--cb-space-lg)]">
          {item.bodySections?.length ? (
            item.bodySections.map((section, i) => (
              <div key={i}>
                {section.title && (
                  <h2 className="text-[length:var(--cb-font-size-title)] font-[var(--cb-font-weight-heading)] text-[var(--cb-text-primary)] mt-[var(--cb-space-xl)] mb-[var(--cb-space-sm)]">{section.title}</h2>
                )}
                <p>{section.body}</p>
              </div>
            ))
          ) : item.body ? (
            item.body.split("\n").map((line, i) => <p key={i}>{line}</p>)
          ) : item.summary ? (
            <p>{item.summary}</p>
          ) : null}

          {item.ctaUrl && !item.mediaUrl && (
            <div className="mt-[var(--cb-space-lg)]">
              <a
                href={item.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[var(--cb-brand-accent)] text-[var(--cb-text-inverse)] rounded-full px-[var(--cb-space-xl)] py-[var(--cb-space-sm)] text-[length:var(--cb-font-size-caption)] font-[var(--cb-font-weight-heading)] uppercase hover:opacity-90"
              >
                {item.ctaText || "Learn More"}
              </a>
            </div>
          )}

          {item.tags?.length && (
            <div className="flex flex-wrap gap-[var(--cb-space-xs)] mt-[var(--cb-space-xl)] pt-[var(--cb-space-lg)] border-t border-[var(--cb-border-subtle)]">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[length:var(--cb-font-size-caption)] bg-[var(--cb-surface-muted)] text-[var(--cb-text-secondary)] px-[var(--cb-space-sm)] py-[var(--cb-space-xs)] rounded-full font-[var(--cb-font-weight-heading)]"
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
