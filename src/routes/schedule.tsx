import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Layout } from "@/components/Layout";
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
  usePublicSchedule,
  usePublicSeasons,
  usePublicDivisions,
  usePublicConfig,
} from "@/hooks/use-public-api";
import { generateInitials } from "@/lib/public-api";
import type { PublicFixture } from "@/types/public-api";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — LigaD1" },
      { name: "description", content: "All fixtures and results for the league." },
    ],
  }),
  component: Schedule,
});

type View = "fixtures" | "results";

function Schedule() {
  const [view, setView] = useState<View>("fixtures");
  const [divisionId, setDivisionId] = useState<string>("ALL");
  const [seasonId, setSeasonId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data: config } = usePublicConfig();
  const { data: seasons, isLoading: seasonsLoading } = usePublicSeasons();
  const { data: divisions } = usePublicDivisions();

  const activeDivisionId = divisionId && divisionId !== "ALL" ? divisionId : undefined;
  const { data, isLoading, error } = usePublicSchedule(
    seasonId,
    activeDivisionId,
    view === "fixtures" ? "scheduled" : "completed",
    page,
  );
  const fixtures = data?.items ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  useEffect(() => {
    setPage(1);
  }, [view, divisionId, seasonId]);

  const defaultSeasonId = useMemo(() => {
    if (seasonId) return seasonId;
    if (config?.activeSeasonId) return config.activeSeasonId;
    if (seasons && seasons.length > 0) {
      const active = seasons.find((s) => s.isActive || s.isCurrent);
      return active?.id || seasons[0].id;
    }
    return undefined;
  }, [seasonId, config, seasons]);

  useEffect(() => {
    if (!seasonId && defaultSeasonId) {
      setSeasonId(defaultSeasonId);
    }
  }, [seasonId, defaultSeasonId]);

  const tabs: { id: View; label: string }[] = [
    { id: "fixtures", label: "FIXTURES" },
    { id: "results", label: "RESULTS" },
  ];

  const groupedFixtures = useMemo(() => {
    if (!fixtures) return [];
    const groups = new Map<string, PublicFixture[]>();
    for (const f of fixtures) {
      const key = f.roundName || f.round?.toString() || f.matchDate?.slice(0, 10) || "other";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(f);
    }
    return Array.from(groups.entries());
  }, [fixtures]);

  return (
    <Layout>
      {/* Tier 1: Tabs */}
      <div className="bg-[#001D4C]">
        <div className="max-w-[1200px] mx-auto px-6 flex gap-2 pt-3">
          {tabs.map((t) => {
            const active = view === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setView(t.id)}
                className="text-[13px] font-bold tracking-wider px-7 py-3 rounded-t-2xl transition-colors"
                style={{
                  background: active ? "#FFFFFF" : "transparent",
                  color: active ? "#001D4C" : "rgba(255,255,255,0.7)",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier 2: Dropdown filters */}
      <div className="bg-white border-b border-[#E5E5E5] py-5">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center gap-3">
          <Select
            value={divisionId}
            onValueChange={setDivisionId}
            disabled={!divisions || divisions.length === 0}
          >
            <SelectTrigger className="w-[220px] h-11 text-[13px] font-semibold uppercase tracking-wide border-[#D1D5DB] rounded-md bg-white text-[#111]">
              <SelectValue placeholder="All Divisions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Divisions</SelectItem>
              {divisions?.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={seasonId || ""}
            onValueChange={(v) => setSeasonId(v || undefined)}
            disabled={seasonsLoading || !seasons || seasons.length === 0}
          >
            <SelectTrigger className="w-[220px] h-11 text-[13px] font-semibold uppercase tracking-wide border-[#D1D5DB] rounded-md bg-white text-[#111]">
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent>
              {seasons?.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <section className="bg-[#F7F7F7] py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-28 w-full rounded-[10px]" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-[14px] text-[#6B6B6B]">This section could not load.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 text-[13px] text-[#ED2D23] font-semibold hover:underline"
              >
                Retry
              </button>
            </div>
          ) : fixtures.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-[14px] text-[#6B6B6B]">No fixtures found for this filter.</p>
            </div>
          ) : (
            <div className="mb-12">
              {groupedFixtures.map(([groupKey, groupFixtures]) => (
                <div key={groupKey} className="mb-6">
                  <div className="bg-[#ECECEC] rounded-md px-5 py-2.5 mb-3">
                    <span className="text-[12px] uppercase font-bold text-[#111] tracking-wider">
                      {groupKey.length === 10 ? formatGroupDate(groupKey) : groupKey}
                    </span>
                  </div>
                  {groupFixtures.map((m, idx) => (
                    <MatchCard key={`${m.id}-${idx}`} m={m} />
                  ))}
                </div>
              ))}
              <PageNav page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

function formatGroupDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00.000Z");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function TeamLogoImg({ team }: { team: { logoUrl?: string; shortCode?: string; name: string } }) {
  if (team.logoUrl) {
    return (
      <img
        src={team.logoUrl}
        alt={team.name}
        className="w-10 h-10 rounded-[8px] object-contain border border-[#E5E5E5]"
      />
    );
  }
  return (
    <div className="w-10 h-10 rounded-[8px] bg-[#F3F4F6] text-[#6B6B6B] text-[11px] font-bold flex items-center justify-center border border-[#E5E5E5]">
      {team.shortCode || generateInitials(team.name)}
    </div>
  );
}

function MatchCard({ m }: { m: PublicFixture }) {
  const statusPill =
    m.status === "completed" ? "bg-[#F0FFF4] text-[#166534]" : "bg-[#F3F4F6] text-[#6B7280]";
  const statusLabel =
    m.status === "completed" ? "Completed" : m.status === "scheduled" ? "Upcoming" : m.status;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] px-7 py-5 mb-2.5">
      <div className="flex items-center gap-4">
        <div className="w-[15%] text-center">
          <div className="text-[13px] font-bold text-[#111]">{formatDate(m.matchDate)}</div>
          {m.kickoffTime && <div className="text-[12px] text-[#9CA3AF]">{m.kickoffTime}</div>}
        </div>
        <div className="w-[25%] flex items-center justify-end gap-2.5">
          <span className="text-[15px] font-semibold text-[#111] text-right">
            {m.homeTeam.name}
          </span>
          <TeamLogoImg team={m.homeTeam} />
        </div>
        <div className="w-[20%] text-center">
          {m.status === "completed" &&
          m.result?.homeScore != null &&
          m.result?.awayScore != null ? (
            <div className="text-[28px] font-extrabold text-[#111]">
              {m.result.homeScore} &ndash; {m.result.awayScore}
            </div>
          ) : (
            <div className="text-[20px] text-[#9CA3AF]">vs</div>
          )}
        </div>
        <div className="w-[25%] flex items-center gap-2.5">
          <TeamLogoImg team={m.awayTeam} />
          <span className="text-[15px] font-semibold text-[#111]">{m.awayTeam.name}</span>
        </div>
        <div className="w-[15%] text-right">
          <span
            className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full ${statusPill}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>
      {m.venue?.name && (
        <div className="mt-3 pt-3 border-t border-[#F0F0F0] flex items-center justify-center gap-1.5 text-[12px] text-[#6B7280]">
          <MapPin className="w-3.5 h-3.5" />
          <span>{m.venue.name}</span>
        </div>
      )}
    </div>
  );
}
