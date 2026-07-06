import type { PublicFixture } from "@/types/public-api";
import { generateInitials } from "@/lib/public-api";

function TeamBadge({ team, accent = false }: { team: PublicFixture["homeTeam"]; accent?: boolean }) {
  if (team.logoUrl) {
    return (
      <img
        src={team.logoUrl}
        alt={team.name}
        className="w-6 h-6 rounded-full object-contain bg-[var(--cb-surface-panel)] border border-[var(--cb-border-subtle)] shrink-0"
      />
    );
  }

  return (
    <div
      className="w-6 h-6 rounded-full text-[var(--cb-text-inverse)] text-[length:var(--cb-font-size-caption)] font-[var(--cb-font-weight-heading)] flex items-center justify-center shrink-0"
      style={{ background: accent ? "var(--cb-brand-accent)" : "var(--cb-brand-primary)" }}
    >
      {team.shortCode || generateInitials(team.name)}
    </div>
  );
}

function Item(f: PublicFixture) {
  return (
    <div className="flex items-center gap-[var(--cb-space-md)] px-[var(--cb-space-lg)] py-[var(--cb-space-sm)] mx-[var(--cb-space-xs)] cb-panel cb-shadow-panel shrink-0">
      <TeamBadge team={f.homeTeam} />
      <div className="text-[length:var(--cb-font-size-caption)] font-[var(--cb-font-weight-heading)] text-[var(--cb-text-primary)] tabular-nums whitespace-nowrap">
        {f.result?.homeScore ?? "-"} <span className="text-[var(--cb-text-muted)] mx-[calc(var(--cb-space-xs)/2)]">&ndash;</span>{" "}
        {f.result?.awayScore ?? "-"}
      </div>
      <TeamBadge team={f.awayTeam} accent />
    </div>
  );
}

export function ScoreTicker({ results }: { results?: PublicFixture[] }) {
  if (!results || results.length === 0) return null;
  const items = [...results, ...results];
  return (
    <div className="w-full py-[var(--cb-space-md)] bg-[var(--cb-brand-primary)]">
      <div className="max-w-[1200px] mx-auto px-[var(--cb-space-xl)]">
        <div className="overflow-hidden relative">
          <div className="ticker-track flex items-center w-max">
            {items.map((f, i) => (
              <Item key={`${f.id || i}`} {...f} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
