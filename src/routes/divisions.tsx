import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicDivisions } from "@/hooks/use-public-api";
import { generateInitials } from "@/lib/public-api";
import type { PublicDivision } from "@/types/public-api";

export const Route = createFileRoute("/divisions")({
  head: () => ({
    meta: [
      { title: "Divisions — LigaD1" },
      { name: "description", content: "All LigaD1 divisions and clubs —" },
    ],
  }),
  component: Divisions,
});

function Divisions() {
  const { data, isLoading, error } = usePublicDivisions();

  return (
    <Layout>
      <section className="bg-[#F7F7F7] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-10">
          {isLoading ? (
            <>
              <DivisionCardSkeleton />
              <DivisionCardSkeleton />
            </>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-[14px] text-[#6B6B6B]">This section could not load.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 text-[13px] text-[#ED2D23] font-semibold hover:underline"
              >
                Retry
              </button>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[15px] text-[#6B6B6B]">No divisions are published yet.</p>
            </div>
          ) : (
            data.map((div, idx) => (
              <DivisionCard key={`${div.id || div.name}-${idx}`} division={div} />
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}

function DivisionCard({ division }: { division: PublicDivision }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const CARD_STEP = 230;

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -CARD_STEP : CARD_STEP, behavior: "smooth" });
  };

  const teams = division.teams || [];

  return (
    <div
      className="bg-white rounded-[10px] overflow-hidden"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
    >
      <div className="bg-[#F7F7F7] px-8 py-5 border-b border-[#E5E5E5]">
        <h2 className="text-[22px] font-bold text-[#001D4C]">{division.name}</h2>
      </div>
      <div className="relative px-6 py-10">
        {teams.length > 0 ? (
          <>
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
                {teams.map((t, idx) => (
                  <Link
                    key={`${t.id}-${idx}`}
                    to="/teams/$teamId"
                    params={{ teamId: t.id }}
                    className="w-[210px] shrink-0 group/team bg-white rounded-[14px] border border-[#EDEDED] hover:border-[#ED2D23] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
                  >
                    <div className="relative px-5 pt-5 pb-3 flex items-center justify-center h-[170px]">
                      {t.logoUrl ? (
                        <img
                          src={t.logoUrl}
                          alt={t.name}
                          className="w-[110px] h-[110px] object-contain transition-transform group-hover/team:scale-105"
                        />
                      ) : (
                        <div className="w-[110px] h-[110px] rounded-[14px] bg-[#F3F4F6] text-[#6B6B6B] text-[20px] font-bold flex items-center justify-center transition-transform group-hover/team:scale-105">
                          {t.initials || generateInitials(t.name)}
                        </div>
                      )}
                    </div>
                    <div className="px-4 pb-5 text-center">
                      <div className="text-[15px] font-bold text-[#111] leading-tight group-hover/team:text-[#ED2D23] transition-colors">
                        {t.name}
                      </div>
                      <div className="text-[12px] text-[#6B6B6B] mt-1">{division.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-[14px] text-[#6B6B6B] text-center py-4">
            No teams in this division yet.
          </p>
        )}
      </div>
    </div>
  );
}

function DivisionCardSkeleton() {
  return (
    <div
      className="bg-white rounded-[10px] overflow-hidden"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
    >
      <div className="bg-[#F7F7F7] px-8 py-5 border-b border-[#E5E5E5]">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="px-6 py-10">
        <div className="flex items-stretch gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[210px] shrink-0">
              <Skeleton className="h-[170px] w-full rounded-[14px]" />
              <div className="px-4 pb-5 mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-3 w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
