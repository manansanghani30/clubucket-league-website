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
    <article
      className="bg-white rounded-[10px] overflow-hidden"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
    >
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
        <div className="h-[190px] bg-[#D1D5DB] flex items-center justify-center text-[#9CA3AF] text-[13px]">
          Match Photo
        </div>
      )}
      <div className="p-5">
        <div className="text-[11px] uppercase font-bold text-[#ED2D23]">{category}</div>
        <h3 className="text-[16px] font-bold text-[#111] mt-2 line-clamp-2">{title}</h3>
        <div className="text-[12px] text-[#9CA3AF] mt-1.5">{date}</div>
        <p className="text-[13px] text-[#6B6B6B] mt-2 line-clamp-2">{excerpt}</p>
      </div>
    </article>
  );
}
