import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { teams, divisions } from "@/data/league";

export const Route = createFileRoute("/divisions")({
  head: () => ({ meta: [{ title: "Divisions — LigaD1" }, { name: "description", content: "All LigaD1 divisions and clubs —" }] }),
  component: Divisions,
});

function Divisions() {
  return (
    <Layout>
      
      <section className="bg-[#F7F7F7] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-10">
          {divisions.map((div) => {
            const divTeams = teams.filter((t) => t.division === div);
            return <DivisionCard key={div} title={div} divTeams={divTeams} />;
          })}
        </div>
      </section>
    </Layout>
  );
}

function DivisionCard({ title, divTeams }: { title: string; divTeams: typeof teams }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loop = [...divTeams, ...divTeams];
  const CARD_STEP = 230; // card width 210 + gap 20

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -CARD_STEP : CARD_STEP, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const id = setInterval(() => {
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft = el.scrollLeft - half;
      }
      el.scrollBy({ left: CARD_STEP, behavior: "smooth" });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white rounded-[10px] overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
      <div className="bg-[#F7F7F7] px-8 py-5 border-b border-[#E5E5E5]">
        <h2 className="text-[22px] font-bold text-[#001D4C]">{title}</h2>
      </div>
      <div className="relative px-6 py-10">
        <button
          type="button"
          onClick={() => scrollBy("left")}
          aria-label="Scroll left"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#001D4C] text-white flex items-center justify-center shadow-md hover:bg-[#ED2D23] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy("right")}
          aria-label="Scroll right"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#001D4C] text-white flex items-center justify-center shadow-md hover:bg-[#ED2D23] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div
          ref={scrollerRef}
          className="overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex items-stretch gap-5" style={{ width: "max-content" }}>
            {loop.map((t, idx) => (
              <Link
                key={`${t.id}-${idx}`}
                to="/teams/$teamId"
                params={{ teamId: t.id }}
                className="w-[210px] shrink-0 group/team bg-white rounded-[14px] border border-[#EDEDED] hover:border-[#ED2D23] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
              >
                <div className="relative px-5 pt-5 pb-3 flex items-center justify-center h-[170px]">
                  <div className="w-[110px] h-[110px] rounded-[14px] bg-[#F3F4F6] text-[#6B6B6B] text-[20px] font-bold flex items-center justify-center transition-transform group-hover/team:scale-105">
                    {t.initials}
                  </div>
                </div>
                <div className="px-4 pb-5 text-center">
                  <div className="text-[15px] font-bold text-[#111] leading-tight group-hover/team:text-[#ED2D23] transition-colors">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-[#6B6B6B] mt-1">
                    {t.division}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

