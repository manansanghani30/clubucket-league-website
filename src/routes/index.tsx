import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import seasonHighlights from "@/assets/season-highlights.jpg";
import { Layout } from "@/components/Layout";
import { ScoreTicker } from "@/components/ScoreTicker";
import { NewsCard } from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import { useLocale } from "@/lib/locale";
import {
  usePublicConfig,
  usePublicHome,
  usePublicAbout,
  usePublicDivisions,
  usePublicTopScorers,
  usePublicSchedule,
  usePublicSponsors,
} from "@/hooks/use-public-api";
import { generateInitials, normalizeContentImage, normalizeContentExcerpt } from "@/lib/public-api";
import type { PublicTopScorer, PublicSponsor } from "@/types/public-api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LigaD1 — The Heart of Mexican Soccer" },
      {
        name: "description",
        content: "LigaD1 — Mexico's premier semi-professional soccer league.",
      },
    ],
  }),
  component: Home,
});

const fallbackSlides = [hero1, hero2, hero3];

function HeroSlider({
  slides,
}: {
  slides?: {
    imageUrl?: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
  }[];
}) {
  const [current, setCurrent] = useState(0);
  const count = slides && slides.length > 0 ? slides.length : fallbackSlides.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % count), 5000);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-[#001D4C]">
      {(!slides || slides.length === 0
        ? fallbackSlides.map((src) => ({ imageUrl: src }))
        : slides
      ).map((slide, slideIdx) => (
        <div
          key={slideIdx}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: slideIdx === current ? 1 : 0,
            backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})` : undefined,
            backgroundColor: slide.imageUrl ? undefined : "#001D4C",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.25))" }}
          />
        </div>
      ))}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          {slides && slides[current]?.headline ? (
            <>
              <h1 className="text-white text-[52px] font-extrabold uppercase leading-[1.05]">
                {slides[current].headline}
              </h1>
              {slides[current].subheadline && (
                <p className="text-white/80 text-[18px] mt-5">{slides[current].subheadline}</p>
              )}
              {slides[current].ctaText && (
                <div className="mt-8">
                  <Link
                    to={slides[current].ctaLink || "/schedule"}
                    className="inline-block bg-[#ED2D23] text-white rounded-full px-7 py-3 text-[14px] font-bold uppercase hover:bg-[#c0241b]"
                  >
                    {slides[current].ctaText}
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <h1 className="text-white text-[52px] font-extrabold uppercase leading-[1.05]">
                The Heart of Mexican Soccer
              </h1>
              <p className="text-white/80 text-[18px] mt-5">LigaD1</p>
              <div className="mt-8">
                <Link
                  to="/schedule"
                  className="inline-block bg-[#ED2D23] text-white rounded-full px-7 py-3 text-[14px] font-bold uppercase hover:bg-[#c0241b]"
                >
                  View Schedule
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {count > 1 && (
        <>
          <button
            onClick={() => setCurrent((current - 1 + count) % count)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => setCurrent((current + 1) % count)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
          >
            <ChevronRight size={22} />
          </button>
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
            {Array.from({ length: count }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrent(dotIdx)}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: dotIdx === current ? "#FFFFFF" : "rgba(255,255,255,0.35)" }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function Home() {
  const { locale } = useLocale();
  const { data: config } = usePublicConfig();
  const { data: home, isLoading: homeLoading, error: homeError } = usePublicHome(locale);
  const { data: divisionsData } = usePublicDivisions();
  const seasonId = config?.activeSeasonId;
  const { data: topScorersData } = usePublicTopScorers(seasonId);
  const { data: scheduleData, isLoading: scheduleLoading } = usePublicSchedule(
    seasonId,
    undefined,
    "completed",
  );
  const { data: aboutData } = usePublicAbout(locale);
  const { data: sponsorsData } = usePublicSponsors(locale);

  const apiDivisions = home?.divisions || divisionsData;
  const topScorers = home?.topScorers || topScorersData;
  const latestNews = home?.latestNews;
  const highlightsData = home?.highlights;
  const sponsors = home?.sponsors && home.sponsors.length > 0 ? home.sponsors : sponsorsData;
  const recentResults = scheduleData?.items?.slice(0, 8);

  return (
    <Layout>
      <div className="relative">
        <HeroSlider slides={home?.heroSlides} />
        <div className="absolute inset-x-0 top-0 z-20 pointer-events-none">
          <div className="pointer-events-auto">
            {scheduleLoading ? (
              <div className="bg-[#001D4C] w-full py-3">
                <div className="max-w-[1200px] mx-auto px-6">
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-[180px] rounded-md bg-white/20" />
                    <Skeleton className="h-10 w-[180px] rounded-md bg-white/20" />
                    <Skeleton className="h-10 w-[180px] rounded-md bg-white/20" />
                  </div>
                </div>
              </div>
            ) : (
              <ScoreTicker results={recentResults} />
            )}
          </div>
        </div>
      </div>

      {homeError && (
        <section className="bg-[#F7F7F7] py-10">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <p className="text-[14px] text-[#6B6B6B]">This section could not load.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-[13px] text-[#ED2D23] font-semibold hover:underline"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* About */}
      <section className="bg-[#F7F7F7] py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#ED2D23] text-[16px] font-extrabold uppercase tracking-[2.5px]">
              {aboutData?.title || home?.aboutContent?.title ? "About" : "About LigaD1"}
            </div>
            <h2 className="text-[32px] font-bold text-[#111] mt-3">
              {aboutData?.title || home?.aboutContent?.title || "More Than a League. A Community."}
            </h2>
            {aboutData?.summary || home?.aboutContent?.body ? (
              <p className="text-[15px] text-[#6B6B6B] leading-[1.7] mt-5">
                {aboutData?.summary || home?.aboutContent?.body}
              </p>
            ) : null}
            <Link
              to="/about"
              className="mt-7 inline-block text-[#ED2D23] text-[14px] uppercase font-semibold hover:underline"
            >
              Learn more &rarr;
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden min-h-[280px]">
            <img
              src={aboutData?.imageUrl || home?.aboutContent?.imageUrl || seasonHighlights}
              alt="About"
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
          {apiDivisions && apiDivisions.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiDivisions.map((div, idx) => (
                <Link
                  key={`${div.id || div.name}-${idx}`}
                  to="/divisions"
                  className="group relative bg-white rounded-[12px] p-6 overflow-hidden hover:-translate-y-1 transition-all duration-300"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                >
                  <span className="absolute top-0 left-0 h-1 w-0 bg-[#ED2D23] group-hover:w-full transition-all duration-300" />
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-[10px] border-2 border-[#001D4C] flex items-center justify-center bg-white">
                      <span className="text-[10px] font-extrabold text-[#001D4C]">
                        {config?.name ? generateInitials(config.name) : "L1"}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-6 text-[22px] font-extrabold uppercase tracking-tight text-[#001D4C] leading-tight">
                    {div.name}
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
              ))}
            </div>
          ) : homeLoading ? (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-[12px] p-6">
                  <Skeleton className="w-12 h-12 rounded-[10px]" />
                  <Skeleton className="h-7 w-3/4 mt-6" />
                  <Skeleton className="h-4 w-1/3 mt-6" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Top Scorers */}
      {topScorers && topScorers.length > 0 && <TopScorersSection scorers={topScorers} />}

      {/* News */}
      {latestNews && latestNews.length > 0 ? (
        <section className="bg-[#F7F7F7] pt-10 pb-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[32px] font-bold">Latest News</h2>
              <Link to="/news" className="text-[13px] uppercase font-semibold text-[#ED2D23]">
                View All News &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {latestNews.slice(0, 3).map((item, idx) => (
                <Link
                  key={`${item.id || item.title}-${idx}`}
                  to="/news/$slug"
                  params={{ slug: item.slug || item.id }}
                >
                  <NewsCard
                    category={item.category || ""}
                    title={item.title}
                    date={item.date || ""}
                    excerpt={normalizeContentExcerpt(item)}
                    image={normalizeContentImage(item)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : homeLoading ? (
        <SectionSkeleton />
      ) : null}

      {/* Highlights */}
      {highlightsData && highlightsData.length > 0 ? (
        <section className="bg-[#F7F7F7] pb-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[32px] font-bold">Highlights</h2>
              <Link to="/highlights" className="text-[13px] uppercase font-semibold text-[#ED2D23]">
                View All Highlights &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {highlightsData.slice(0, 3).map((item, idx) => (
                <Link
                  key={`${item.id || item.title}-${idx}`}
                  to="/highlights/$slug"
                  params={{ slug: item.slug || item.id }}
                >
                  <NewsCard
                    category={item.category || ""}
                    title={item.title}
                    date={item.date || ""}
                    excerpt={normalizeContentExcerpt(item)}
                    image={normalizeContentImage(item)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : homeLoading ? (
        <SectionSkeleton />
      ) : null}

      {/* Sponsors */}
      {sponsors && sponsors.length > 0 && <SponsorsSection sponsors={sponsors} />}
    </Layout>
  );
}

function SectionSkeleton() {
  return (
    <section className="bg-[#F7F7F7] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[10px] overflow-hidden">
              <Skeleton className="h-[190px] w-full rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopScorersSection({ scorers }: { scorers: PublicTopScorer[] }) {
  return (
    <section className="bg-[#F7F7F7] pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[32px] font-bold">Top Scorers</h2>
          <Link to="/top-scorers" className="text-[13px] uppercase font-semibold text-[#ED2D23]">
            View All &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex items-stretch gap-5" style={{ width: "max-content" }}>
            {scorers.map((p, idx) => (
              <div
                key={`${p.playerId || p.playerName}-${idx}`}
                className="w-[210px] shrink-0 bg-white rounded-[14px] overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              >
                <div className="relative aspect-[3/4] bg-gradient-to-b from-[#E5E7EB] to-[#CBD5E1] flex items-center justify-center text-[#6B7280] font-bold text-[48px]">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.playerName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    generateInitials(p.playerName)
                  )}
                </div>
                <div className="px-4 pt-3 pb-4">
                  <div className="flex items-center gap-1.5 text-[#111] font-extrabold text-[18px]">
                    <span aria-hidden>&#9917;</span>
                    <span>{p.goals}</span>
                  </div>
                  <h3 className="mt-2 text-[15px] font-extrabold text-[#111] leading-tight">
                    {p.playerName}
                  </h3>
                  <p className="text-[12px] text-[#6B6B6B] mt-0.5">{p.teamName || ""}</p>
                  <p className="mt-3 text-[11px] font-bold text-[#9CA3AF] tracking-[1.5px]">
                    {p.position || ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SponsorsSection({ sponsors }: { sponsors: PublicSponsor[] }) {
  return (
    <section className="bg-white border-t-4 border-b-4 border-[#ED2D23] py-14">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-[20px] font-bold tracking-[3px] text-[#111] uppercase">Sponsors</h2>
        <div className="mt-8 flex items-center justify-center gap-16 flex-wrap">
          {sponsors.map((s, idx) =>
            s.logoUrl ? (
              <img
                key={`${s.id}-${idx}`}
                src={s.logoUrl}
                alt={s.name}
                className="h-16 object-contain"
              />
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
