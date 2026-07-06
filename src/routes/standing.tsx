import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicStandings, usePublicDivisions, usePublicConfig } from "@/hooks/use-public-api";
import { generateInitials } from "@/lib/public-api";
import type { PublicStandingRow } from "@/types/public-api";

export const Route = createFileRoute("/standing")({
  head: () => ({
    meta: [
      { title: "Standings — LigaD1" },
      { name: "description", content: "League standings updated after each match." },
    ],
  }),
  component: Standing,
});

function Standing() {
  const { data: config } = usePublicConfig();
  const { data: divisions } = usePublicDivisions();
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | undefined>(undefined);

  const divisionId = selectedDivisionId || divisions?.[0]?.id;
  const seasonId = config?.activeSeasonId;

  const { data: standings, isLoading, error } = usePublicStandings(seasonId, divisionId);

  return (
    <Layout>
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-[1200px] mx-auto px-6 flex gap-8">
          {divisions?.map((d) => {
            const active = d.id === divisionId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDivisionId(d.id)}
                className="relative py-4 text-[13px] uppercase font-semibold cursor-pointer"
                style={{ color: active ? "#111" : "#6B6B6B", fontWeight: active ? 700 : 600 }}
              >
                {d.name}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ED2D23] pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <section className="bg-white py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="overflow-hidden rounded-md border border-[#E5E5E5]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1FA13B] text-[#0B1F12] text-[13px] font-extrabold uppercase tracking-wider h-14">
                  <th className="w-[8%] text-left pl-8">POST</th>
                  <th className="w-[34%] text-left">TEAM</th>
                  <th className="w-[10%] text-left">P</th>
                  <th className="w-[10%] text-left">L</th>
                  <th className="w-[10%] text-left">F</th>
                  <th className="w-[10%] text-left">TO</th>
                  <th className="w-[8%] text-left">GD</th>
                  <th className="w-[10%] text-left pr-8">POINTS</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-t border-[#EDEDED]" style={{ height: 72 }}>
                      <td className="pl-8">
                        <Skeleton className="h-5 w-6" />
                      </td>
                      <td>
                        <div className="flex items-center gap-4">
                          <Skeleton className="w-10 h-10 rounded-[8px]" />
                          <Skeleton className="h-5 w-32" />
                        </div>
                      </td>
                      <td>
                        <Skeleton className="h-5 w-6" />
                      </td>
                      <td>
                        <Skeleton className="h-5 w-6" />
                      </td>
                      <td>
                        <Skeleton className="h-5 w-6" />
                      </td>
                      <td>
                        <Skeleton className="h-5 w-6" />
                      </td>
                      <td>
                        <Skeleton className="h-5 w-6" />
                      </td>
                      <td className="pr-8">
                        <Skeleton className="h-5 w-8" />
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  <tr className="border-t border-[#EDEDED]" style={{ height: 72 }}>
                    <td colSpan={8} className="text-center text-[14px] text-[#6B6B6B]">
                      This section could not load.
                      <button
                        onClick={() => window.location.reload()}
                        className="ml-2 text-[13px] text-[#ED2D23] font-semibold hover:underline"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : !standings || standings.length === 0 ? (
                  <tr className="border-t border-[#EDEDED]" style={{ height: 72 }}>
                    <td colSpan={8} className="text-center text-[14px] text-[#6B6B6B]">
                      Standings are not available yet.
                    </td>
                  </tr>
                ) : (
                  standings.map((r, idx) => <Row key={`${r.id}-${idx}`} r={r} />)
                )}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-[#9CA3AF] mt-4">
            P: Played &middot; L: Lost &middot; F: Goals For &middot; TO: Goals Against &middot; GD:
            Goal Difference
          </p>
        </div>
      </section>
    </Layout>
  );
}

function Row({ r }: { r: PublicStandingRow }) {
  const gd = r.goalDifference ?? r.goalsFor - r.goalsAgainst;
  return (
    <tr className="border-t border-[#EDEDED] bg-white hover:bg-[#FAFAFA]" style={{ height: 72 }}>
      <td className="pl-8 text-[15px] text-[#111]">{r.rank}</td>
      <td>
        <div className="flex items-center gap-4">
          {r.team.logoUrl ? (
            <img
              src={r.team.logoUrl}
              alt={r.team.name}
              className="w-10 h-10 rounded-[8px] object-contain border border-[#E5E5E5]"
            />
          ) : (
            <div className="w-10 h-10 rounded-[8px] bg-[#F3F4F6] text-[#6B6B6B] text-[11px] font-bold flex items-center justify-center border border-[#E5E5E5]">
              {r.team.shortCode || generateInitials(r.team.name)}
            </div>
          )}
          <span className="text-[15px] text-[#111]">{r.team.name}</span>
        </div>
      </td>
      <td className="text-[15px] text-[#111]">{r.played}</td>
      <td className="text-[15px] text-[#111]">{r.losses}</td>
      <td className="text-[15px] text-[#111]">{r.goalsFor}</td>
      <td className="text-[15px] text-[#111]">{r.goalsAgainst}</td>
      <td className="text-[15px] text-[#111]">{gd > 0 ? `+${gd}` : gd}</td>
      <td className="pr-8 text-[15px] text-[#111]">{r.points}</td>
    </tr>
  );
}
