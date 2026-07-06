export function NewsCard({
  category,
  title,
  date,
  excerpt,
  image,
}: {
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}) {
  return (
    <article className="cb-card cb-shadow-panel overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={800}
          height={512}
          className="w-full h-[190px] object-cover"
        />
      ) : (
        <div className="h-[190px] cb-card-muted flex items-center justify-center cb-caption">
          Match Photo
        </div>
      )}
      <div className="p-[var(--cb-space-lg)]">
        <div className="cb-eyebrow">{category}</div>
        <h3 className="cb-title mt-[var(--cb-space-sm)] line-clamp-2">{title}</h3>
        <div className="cb-caption mt-[var(--cb-space-xs)]">{date}</div>
        <p className="cb-body mt-[var(--cb-space-sm)] line-clamp-2">{excerpt}</p>
      </div>
    </article>
  );
}
