import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import seasonHighlights from "@/assets/season-highlights.jpg";
import { Layout } from "@/components/Layout";
import { divisions, news, highlights } from "@/data/league";
import { ScoreTicker } from "@/components/ScoreTicker";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import sponsorCentury from "@/assets/sponsor-century.png";
import sponsorGoMedia from "@/assets/sponsor-gomedia.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LigaD1 — The Heart of Mexican Soccer" },
      { name: "description", content: "LigaD1 — Mexico's premier semi-professional soccer league." },
    ],
  }),
  component: Home,
});

function HeroSlider() {
  const [i, setI] = useState(0);
  const slides = [hero1, hero2, hero3];
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 1200);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-[#001D4C]">
      {slides.map((src, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: idx === i ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.25))" }} />
        </div>
      ))}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          
          <h1 className="text-white text-[52px] font-extrabold uppercase leading-[1.05]">The Heart of Mexican Soccer</h1>
          <p className="text-white/80 text-[18px] mt-5">LigaD1</p>
          <div className="mt-8">
            <Link to="/schedule" className="inline-block bg-[#ED2D23] text-white rounded-full px-7 py-3 text-[14px] font-bold uppercase hover:bg-[#c0241b]">
              View Schedule
            </Link>
          </div>
        </div>
      </div>
      <button onClick={() => setI((i - 1 + slides.length) % slides.length)} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60">
        <ChevronLeft size={22} />
      </button>
      <button onClick={() => setI((i + 1) % slides.length)} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60">
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((s, idx) => (
          <button key={s} onClick={() => setI(idx)} className="w-2.5 h-2.5 rounded-full" style={{ background: idx === i ? "#FFFFFF" : "rgba(255,255,255,0.35)" }} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <Layout>
      <div className="relative">
        <HeroSlider />
        <div className="absolute inset-x-0 top-0 z-20 pointer-events-none">
          <div className="pointer-events-auto">
            <ScoreTicker />
          </div>
        </div>
      </div>

      {/* About */}
      <section className="bg-[#F7F7F7] py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#ED2D23] text-[16px] font-extrabold uppercase tracking-[2.5px]">About LigaD1</div>
            <h2 className="text-[32px] font-bold text-[#111] mt-3">More Than a League. A Community.</h2>
            <p className="text-[15px] text-[#6B6B6B] leading-[1.7] mt-5">
              LigaD1 is Mexico's premier semi-professional soccer league, bringing together the most competitive clubs from across the country. Founded to bridge the gap between amateur football and the professional game, LigaD1 gives talented players a real platform to grow.
            </p>
            <p className="text-[15px] text-[#6B6B6B] leading-[1.7] mt-3">
              With three competitive divisions and a rapidly growing fan base, LigaD1 is more than a competition — it's a movement built on passion, discipline, and community.
            </p>
            <button className="mt-7 text-[#ED2D23] text-[14px] uppercase font-semibold hover:underline">Learn more →</button>
          </div>
          <div className="rounded-xl overflow-hidden min-h-[280px]">
            <img
              src={seasonHighlights}
              alt="Season Highlights 2026"
              width={1280}
              height={896}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Divisions */}
      <section className="bg-[#001D4C] py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[40px] md:text-[44px] font-extrabold uppercase tracking-tight">
            <span className="text-white">OUR </span>
            <span className="text-[#ED2D23]">DIVISIONS</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.map((div) => {
              return (
                <Link
                  key={div}
                  to="/divisions"
                  className="group relative bg-white rounded-[12px] p-6 overflow-hidden hover:-translate-y-1 transition-all duration-300"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                >
                  <span className="absolute top-0 left-0 h-1 w-0 bg-[#ED2D23] group-hover:w-full transition-all duration-300" />
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-[10px] border-2 border-[#001D4C] flex items-center justify-center bg-white">
                      <span className="text-[10px] font-extrabold text-[#001D4C]">LIGAD1</span>
                    </div>
                  </div>
                  <h3 className="mt-6 text-[22px] font-extrabold uppercase tracking-tight text-[#001D4C] leading-tight">
                    {div}
                  </h3>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[12px] uppercase font-bold tracking-[1.5px] text-[#ED2D23]">
                      View Standings
                    </span>
                    <div className="w-9 h-9 rounded-md bg-[#ED2D23] text-white flex items-center justify-center group-hover:bg-[#c0241b] transition-colors">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Scorers */}
      <TopScorersSection />





      {/* News */}
      <section className="bg-[#F7F7F7] pt-10 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[32px] font-bold">Latest News</h2>
            <Link to="/news" className="text-[13px] uppercase font-semibold text-[#ED2D23]">View All News →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {news.slice(0, 3).map((n) => (
              <NewsCard key={n.title} {...n} />
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[#F7F7F7] pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[32px] font-bold">Highlights</h2>
            <Link to="/highlights" className="text-[13px] uppercase font-semibold text-[#ED2D23]">View All Highlights →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {highlights.slice(0, 3).map((h) => (
              <NewsCard key={h.title} {...h} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="bg-white border-t-4 border-b-4 border-[#ED2D23] py-14">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[20px] font-bold tracking-[3px] text-[#111] uppercase">Sponsors</h2>
          <div className="mt-8 flex items-center justify-center gap-16 flex-wrap">
            <img src={sponsorCentury} alt="Century Sports" className="h-16 object-contain" />
            <img src={sponsorGoMedia} alt="Go Media" className="h-12 object-contain" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

const topScorers = [
  { name: "Arnold J. Mendez", number: 19, club: "Inter City FC", position: "FORWARD" },
  { name: "Mateja Bozic", number: 18, club: "FC Bartlesville Buffaloes", position: "FORWARD" },
  { name: "Finley W. Mitchell", number: 15, club: "AC Raleigh", position: "FORWARD" },
  { name: "Saber Charif", number: 14, club: "Nomads SC", position: "FORWARD" },
  { name: "Tom Marriott", number: 13, club: "SCU Heat", position: "MIDFIELD" },
  { name: "Abubaker Mayanja", number: 13, club: "Tar Devils SC", position: "FORWARD" },
  { name: "Sebastian Ruiz", number: 13, club: "NY Renegades FC", position: "MIDFIELD" },
];

function TopScorersSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -230 : 230, behavior: "smooth" });
  };
  return (
    <section className="bg-[#F7F7F7] pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[32px] font-bold">Top Scorers</h2>
          <div className="flex gap-2">
            <button onClick={() => scrollBy("left")} aria-label="Scroll left" className="w-10 h-10 rounded-full bg-[#001D4C] text-white flex items-center justify-center hover:bg-[#ED2D23] transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scrollBy("right")} aria-label="Scroll right" className="w-10 h-10 rounded-full bg-[#001D4C] text-white flex items-center justify-center hover:bg-[#ED2D23] transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div ref={scrollerRef} className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex items-stretch gap-5" style={{ width: "max-content" }}>
            {topScorers.map((p) => (
              <div
                key={p.name}
                className="w-[210px] shrink-0 bg-white rounded-[14px] overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              >
                <div className="relative aspect-[3/4] bg-gradient-to-b from-[#E5E7EB] to-[#CBD5E1] flex items-center justify-center text-[#6B7280] font-bold text-[48px]">
                  {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="px-4 pt-3 pb-4">
                  <div className="flex items-center gap-1.5 text-[#111] font-extrabold text-[18px]">
                    <span aria-hidden>⚽</span>
                    <span>{p.number}</span>
                  </div>
                  <h3 className="mt-2 text-[15px] font-extrabold text-[#111] leading-tight">{p.name}</h3>
                  <p className="text-[12px] text-[#6B6B6B] mt-0.5">{p.club}</p>
                  <p className="mt-3 text-[11px] font-bold text-[#9CA3AF] tracking-[1.5px]">{p.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsCard({ category, title, date, excerpt, image }: { category: string; title: string; date: string; excerpt: string; image?: string }) {
  return (
    <article className="bg-white rounded-[10px] overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
      {image ? (
        <img src={image} alt={title} loading="lazy" width={800} height={512} className="w-full h-[190px] object-cover" />
      ) : (
        <div className="h-[190px] bg-[#D1D5DB] flex items-center justify-center text-[#9CA3AF] text-[13px]">Match Photo</div>
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
