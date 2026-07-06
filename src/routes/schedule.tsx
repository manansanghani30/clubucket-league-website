import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Layout, TeamLogo } from "@/components/Layout";
import { resultados, proximos, teamByName, type Fixture } from "@/data/league";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [{ title: "Schedule — LigaD1" }, { name: "description", content: "All fixtures and results for the league." }] }),
  component: Schedule,
});

type View = "fixtures" | "results";
type DivFilter = "ALL" | "Bajío Zone" | "Downtown Area";

function matchesDivision(m: Fixture, filter: DivFilter) {
  if (filter === "ALL") return true;
  const h = teamByName(m.home).division;
  const a = teamByName(m.away).division;
  return h === filter || a === filter;
}

function MatchCard({ m }: { m: Fixture }) {
  const home = teamByName(m.home);
  const away = teamByName(m.away);
  const statusPill =
    m.status === "Completed"
      ? "bg-[#F0FFF4] text-[#166534]"
      : "bg-[#F3F4F6] text-[#6B7280]";

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] px-7 py-5 mb-2.5">
      <div className="flex items-center gap-4">
        <div className="w-[15%] text-center">
          <div className="text-[13px] font-bold text-[#111]">{m.date}</div>
          <div className="text-[12px] text-[#9CA3AF]">{m.time}</div>
        </div>
        <div className="w-[25%] flex items-center justify-end gap-2.5">
          <span className="text-[15px] font-semibold text-[#111] text-right">{m.home}</span>
          <TeamLogo initials={home.initials} size={40} />
        </div>
        <div className="w-[20%] text-center">
          {m.status === "Completed" ? (
            <div className="text-[28px] font-extrabold text-[#111]">{m.homeScore} – {m.awayScore}</div>
          ) : (
            <div className="text-[20px] text-[#9CA3AF]">vs</div>
          )}
        </div>
        <div className="w-[25%] flex items-center gap-2.5">
          <TeamLogo initials={away.initials} size={40} />
          <span className="text-[15px] font-semibold text-[#111]">{m.away}</span>
        </div>
        <div className="w-[15%] text-right">
          <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full ${statusPill}`}>
            {m.status}
          </span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-[#F0F0F0] flex items-center justify-center gap-1.5 text-[12px] text-[#6B7280]">
        <MapPin className="w-3.5 h-3.5" />
        <span>{m.venue}</span>
      </div>
    </div>
  );
}

function SectionGroup({ groups, filter }: { groups: typeof resultados; filter: DivFilter }) {
  return (
    <div className="mb-12">
      {groups.map((g) => {
        const filtered = g.matches.filter((m) => matchesDivision(m, filter));
        if (filtered.length === 0) return null;
        return (
          <div key={g.jornada} className="mb-6">
            <div className="bg-[#ECECEC] rounded-md px-5 py-2.5 mb-3">
              <span className="text-[12px] uppercase font-bold text-[#111] tracking-wider">{g.jornada} — {g.label}</span>
            </div>
            {filtered.map((m, idx) => <MatchCard key={idx} m={m} />)}
          </div>
        );
      })}
    </div>
  );
}

function Schedule() {
  const [view, setView] = useState<View>("fixtures");
  const [division, setDivision] = useState<DivFilter>("ALL");
  const [season, setSeason] = useState<string>("spring-2026");

  const tabs: { id: View; label: string }[] = [
    { id: "fixtures", label: "FIXTURES" },
    { id: "results", label: "RESULTS" },
  ];

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
          <Select value={division} onValueChange={(v) => setDivision(v as DivFilter)}>
            <SelectTrigger className="w-[220px] h-11 text-[13px] font-semibold uppercase tracking-wide border-[#D1D5DB] rounded-md bg-white text-[#111]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Divisions</SelectItem>
              <SelectItem value="Bajío Zone">Bajío Zone</SelectItem>
              <SelectItem value="Downtown Area">Downtown Area</SelectItem>
            </SelectContent>
          </Select>

          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="w-[220px] h-11 text-[13px] font-semibold uppercase tracking-wide border-[#D1D5DB] rounded-md bg-white text-[#111]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spring-2026">Spring 2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <section className="bg-[#F7F7F7] py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionGroup groups={view === "results" ? resultados : proximos} filter={division} />
        </div>
      </section>
    </Layout>
  );
}
