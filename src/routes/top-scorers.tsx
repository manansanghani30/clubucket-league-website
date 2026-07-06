import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageNav } from "@/components/PageNav";
import {
  usePublicTopScorersPaginated,
  usePublicSeasons,
  usePublicDivisions,
  usePublicConfig,
} from "@/hooks/use-public-api";
import { generateInitials } from "@/lib/public-api";
import type { PublicTopScorer } from "@/types/public-api";

export const Route = createFileRoute("/top-scorers")({
  head: () => ({
    meta: [
      { title: "Top Scorers — LigaD1" },
      { name: "description", content: "Leading goal-scorers across the league." },
    ],
  }),
  component: TopScorers,
});

function TopScorers() {
  const { data: config } = usePublicConfig();
  const { data: seasons } = usePublicSeasons();
  const { data: divisions } = usePublicDivisions();

  const [seasonId, setSeasonId] = useState<string | undefined>(undefined);
  const [divisionId, setDivisionId] = useState<string>("ALL");
  const [page, setPage] = useState(1);

  const activeDivisionId = divisionId && divisionId !== "ALL" ? divisionId : undefined;
  const { data, isLoading, error } = usePublicTopScorersPaginated(
    page,
    seasonId || config?.activeSeasonId,
    activeDivisionId,
  );

  const scorers = data?.items;
  const meta = data?.meta;

  return (
    <Layout>
      <PageHeader title="Top Scorers" subtitle="Leading goal-scorers across the league." />

      <section className="bg-white py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            {seasons && seasons.length > 0 && (
              <Select
                value={seasonId || ""}
                onValueChange={(v) => {
                  setSeasonId(v || undefined);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="All Seasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Seasons</SelectItem>
                  {seasons.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {divisions && divisions.length > 0 && (
              <Select
                value={divisionId}
                onValueChange={(v) => {
                  setDivisionId(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="All Divisions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Divisions</SelectItem>
                  {divisions.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="overflow-hidden rounded-md border border-[#E5E5E5]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1FA13B] text-[#0B1F12] text-[13px] font-extrabold uppercase tracking-wider h-14">
                  <th className="w-[8%] text-left pl-8">#</th>
                  <th className="w-[36%] text-left">Player</th>
                  <th className="w-[22%] text-left">Team</th>
                  <th className="w-[22%] text-left">Position</th>
                  <th className="w-[12%] text-left pr-8">Goals</th>
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
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <Skeleton className="h-5 w-36" />
                        </div>
                      </td>
                      <td>
                        <Skeleton className="h-5 w-24" />
                      </td>
                      <td>
                        <Skeleton className="h-5 w-20" />
                      </td>
                      <td className="pr-8">
                        <Skeleton className="h-5 w-8" />
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  <tr className="border-t border-[#EDEDED]" style={{ height: 72 }}>
                    <td colSpan={5} className="text-center text-[14px] text-[#6B6B6B] py-10">
                      This section could not load.
                      <button
                        onClick={() => window.location.reload()}
                        className="ml-2 text-[13px] text-[#ED2D23] font-semibold hover:underline"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : !scorers || scorers.length === 0 ? (
                  <tr className="border-t border-[#EDEDED]" style={{ height: 72 }}>
                    <td colSpan={5} className="text-center text-[14px] text-[#6B6B6B] py-16">
                      No top scorers found for the selected filters.
                    </td>
                  </tr>
                ) : (
                  scorers.map((s, idx) => (
                    <Row key={`${s.playerId || s.playerName}-${idx}`} s={s} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {meta && <PageNav page={page} totalPages={meta.totalPages ?? 1} onPageChange={setPage} />}
        </div>
      </section>
    </Layout>
  );
}

function Row({ s }: { s: PublicTopScorer }) {
  return (
    <tr className="border-t border-[#EDEDED] bg-white hover:bg-[#FAFAFA]" style={{ height: 72 }}>
      <td className="pl-8 text-[15px] text-[#111]">{s.rank}</td>
      <td>
        <div className="flex items-center gap-4">
          {s.imageUrl ? (
            <img
              src={s.imageUrl}
              alt={s.playerName}
              className="w-12 h-12 rounded-full object-cover border border-[#E5E5E5]"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#F3F4F6] text-[#6B6B6B] text-[13px] font-bold flex items-center justify-center border border-[#E5E5E5]">
              {generateInitials(s.playerName)}
            </div>
          )}
          <span className="text-[15px] font-semibold text-[#111]">{s.playerName}</span>
        </div>
      </td>
      <td className="text-[15px] text-[#111]">{s.teamName || "-"}</td>
      <td className="text-[15px] text-[#6B6B6B]">{s.position || "-"}</td>
      <td className="pr-8 text-[15px] font-bold text-[#111]">{s.goals}</td>
    </tr>
  );
}
