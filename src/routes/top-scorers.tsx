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

      <section className="bg-[var(--cb-surface-panel)] py-[var(--cb-space-section)]">
        <div className="max-w-[1200px] mx-auto px-[var(--cb-space-xl)]">
          <div className="flex items-center gap-[var(--cb-space-md)] mb-[var(--cb-space-xl)]">
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

          <div className="overflow-hidden rounded-[var(--cb-radius-md)] border border-[var(--cb-border-subtle)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--cb-status-success)] text-[var(--cb-text-primary)] text-[length:var(--cb-font-size-caption)] font-[var(--cb-font-weight-heading)] uppercase tracking-normal h-14">
                  <th className="w-[8%] text-left pl-[var(--cb-space-xl)]">#</th>
                  <th className="w-[36%] text-left">Player</th>
                  <th className="w-[22%] text-left">Team</th>
                  <th className="w-[22%] text-left">Position</th>
                  <th className="w-[12%] text-left pr-[var(--cb-space-xl)]">Goals</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-t border-[var(--cb-border-subtle)]" style={{ height: 72 }}>
                      <td className="pl-[var(--cb-space-xl)]">
                        <Skeleton className="h-5 w-6" />
                      </td>
                      <td>
                        <div className="flex items-center gap-[var(--cb-space-md)]">
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
                      <td className="pr-[var(--cb-space-xl)]">
                        <Skeleton className="h-5 w-8" />
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  <tr className="border-t border-[var(--cb-border-subtle)]" style={{ height: 72 }}>
                    <td colSpan={5} className="text-center text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)] py-[var(--cb-space-section)]">
                      This section could not load.
                      <button
                        onClick={() => window.location.reload()}
                        className="ml-[var(--cb-space-xs)] text-[length:var(--cb-font-size-caption)] text-[var(--cb-brand-accent)] font-[var(--cb-font-weight-heading)] hover:underline"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : !scorers || scorers.length === 0 ? (
                  <tr className="border-t border-[var(--cb-border-subtle)]" style={{ height: 72 }}>
                    <td colSpan={5} className="text-center text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)] py-[calc(var(--cb-space-section)*2)]">
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
    <tr className="border-t border-[var(--cb-border-subtle)] bg-[var(--cb-surface-panel)] hover:bg-[var(--cb-surface-muted)]" style={{ height: 72 }}>
      <td className="pl-[var(--cb-space-xl)] text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{s.rank}</td>
      <td>
        <div className="flex items-center gap-[var(--cb-space-md)]">
          {s.imageUrl ? (
            <img
              src={s.imageUrl}
              alt={s.playerName}
              className="w-12 h-12 rounded-full object-cover border border-[var(--cb-border-subtle)]"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[var(--cb-surface-muted)] text-[var(--cb-text-secondary)] text-[length:var(--cb-font-size-caption)] font-[var(--cb-font-weight-heading)] flex items-center justify-center border border-[var(--cb-border-subtle)]">
              {generateInitials(s.playerName)}
            </div>
          )}
          <span className="text-[length:var(--cb-font-size-body)] font-[var(--cb-font-weight-heading)] text-[var(--cb-text-primary)]">{s.playerName}</span>
        </div>
      </td>
      <td className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{s.teamName || "-"}</td>
      <td className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)]">{s.position || "-"}</td>
      <td className="pr-[var(--cb-space-xl)] text-[length:var(--cb-font-size-body)] font-[var(--cb-font-weight-heading)] text-[var(--cb-text-primary)]">{s.goals}</td>
    </tr>
  );
}
