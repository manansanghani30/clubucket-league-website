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
      <div className="bg-[var(--cb-surface-panel)] border-b border-[var(--cb-border-subtle)]">
        <div className="max-w-[1200px] mx-auto px-[var(--cb-space-xl)] flex gap-[var(--cb-space-xl)]">
          {divisions?.map((d) => {
            const active = d.id === divisionId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDivisionId(d.id)}
                className="relative py-[var(--cb-space-md)] text-[length:var(--cb-font-size-caption)] uppercase font-[var(--cb-font-weight-heading)] cursor-pointer"
                style={{
                  color: active ? "var(--cb-text-primary)" : "var(--cb-text-muted)",
                  fontWeight: active ? "var(--cb-font-weight-heading)" : 600,
                }}
              >
                {d.name}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--cb-brand-accent)] pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <section className="bg-[var(--cb-surface-panel)] py-[var(--cb-space-section)]">
        <div className="max-w-[1200px] mx-auto px-[var(--cb-space-xl)]">
          <div className="overflow-hidden rounded-[var(--cb-radius-md)] border border-[var(--cb-border-subtle)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--cb-status-success)] text-[var(--cb-text-primary)] text-[length:var(--cb-font-size-caption)] font-[var(--cb-font-weight-heading)] uppercase tracking-normal h-14">
                  <th className="w-[8%] text-left pl-[var(--cb-space-xl)]">POST</th>
                  <th className="w-[34%] text-left">TEAM</th>
                  <th className="w-[10%] text-left">P</th>
                  <th className="w-[10%] text-left">L</th>
                  <th className="w-[10%] text-left">F</th>
                  <th className="w-[10%] text-left">TO</th>
                  <th className="w-[8%] text-left">GD</th>
                  <th className="w-[10%] text-left pr-[var(--cb-space-xl)]">POINTS</th>
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
                          <Skeleton className="w-10 h-10 rounded-[var(--cb-radius-md)]" />
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
                      <td className="pr-[var(--cb-space-xl)]">
                        <Skeleton className="h-5 w-8" />
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  <tr className="border-t border-[var(--cb-border-subtle)]" style={{ height: 72 }}>
                    <td colSpan={8} className="text-center text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)]">
                      This section could not load.
                      <button
                        onClick={() => window.location.reload()}
                        className="ml-[var(--cb-space-xs)] text-[length:var(--cb-font-size-caption)] text-[var(--cb-brand-accent)] font-[var(--cb-font-weight-heading)] hover:underline"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : !standings || standings.length === 0 ? (
                  <tr className="border-t border-[var(--cb-border-subtle)]" style={{ height: 72 }}>
                    <td colSpan={8} className="text-center text-[length:var(--cb-font-size-body)] text-[var(--cb-text-secondary)]">
                      Standings are not available yet.
                    </td>
                  </tr>
                ) : (
                  standings.map((r, idx) => <Row key={`${r.id}-${idx}`} r={r} />)
                )}
              </tbody>
            </table>
          </div>

          <p className="text-[length:var(--cb-font-size-caption)] text-[var(--cb-text-muted)] mt-[var(--cb-space-md)]">
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
    <tr className="border-t border-[var(--cb-border-subtle)] bg-[var(--cb-surface-panel)] hover:bg-[var(--cb-surface-muted)]" style={{ height: 72 }}>
      <td className="pl-[var(--cb-space-xl)] text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{r.rank}</td>
      <td>
        <div className="flex items-center gap-[var(--cb-space-md)]">
          {r.team.logoUrl ? (
            <img
              src={r.team.logoUrl}
              alt={r.team.name}
              className="w-10 h-10 rounded-[var(--cb-radius-md)] object-contain border border-[var(--cb-border-subtle)]"
            />
          ) : (
            <div className="w-10 h-10 rounded-[var(--cb-radius-md)] bg-[var(--cb-surface-muted)] text-[var(--cb-text-secondary)] text-[length:var(--cb-font-size-caption)] font-[var(--cb-font-weight-heading)] flex items-center justify-center border border-[var(--cb-border-subtle)]">
              {r.team.shortCode || generateInitials(r.team.name)}
            </div>
          )}
          <span className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{r.team.name}</span>
        </div>
      </td>
      <td className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{r.played}</td>
      <td className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{r.losses}</td>
      <td className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{r.goalsFor}</td>
      <td className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{r.goalsAgainst}</td>
      <td className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{gd > 0 ? `+${gd}` : gd}</td>
      <td className="pr-[var(--cb-space-xl)] text-[length:var(--cb-font-size-body)] text-[var(--cb-text-primary)]">{r.points}</td>
    </tr>
  );
}
