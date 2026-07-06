import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Globe } from "lucide-react";
import { Layout } from "@/components/Layout";
import { getTeam, fcAztecaSquad, type Player } from "@/data/league";

export const Route = createFileRoute("/teams/$teamId")({
  head: () => ({ meta: [{ title: "Team Profile — LigaD1" }] }),
  component: TeamProfile,
});

const positionLabel: Record<Player["position"], string> = {
  GK: "GOALKEEPER",
  DEF: "DEFENDER",
  MID: "MIDFIELD",
  FWD: "FORWARD",
};

function TeamProfile() {
  const { teamId } = Route.useParams();
  const team = getTeam(teamId);
  if (!team) throw notFound();
  const squad = fcAztecaSquad; // demo: same roster for any team

  return (
    <Layout>
      <div className="w-full bg-[#001D4C] h-[220px] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-[12px] text-[#9CA3AF]">
            <Link to="/divisions" className="hover:text-white">Divisions</Link>
            <span className="text-white/40 mx-2">›</span>
            <span>{team.division}</span>
            <span className="text-white/40 mx-2">›</span>
            <span className="text-white">{team.name}</span>
          </div>
          <div className="mx-auto mt-3 w-[72px] h-[72px] rounded-[14px] bg-[#E5E5E5] text-[#6B6B6B] font-bold flex items-center justify-center border-2 border-white">
            {team.initials}
          </div>
          <h1 className="text-white text-[36px] font-extrabold uppercase mt-3">{team.name}</h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <a href="#" aria-label="Instagram" className="text-white/70 hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="text-white/70 hover:text-white transition-colors"><Facebook size={18} /></a>
            <a href="#" aria-label="X (Twitter)" className="text-white/70 hover:text-white transition-colors"><Twitter size={18} /></a>
            <a href="#" aria-label="Website" className="text-white/70 hover:text-white transition-colors"><Globe size={18} /></a>
          </div>
          
        </div>
      </div>

      <section className="bg-[#F7F7F7] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link to="/divisions" className="inline-block text-[13px] text-[#6B6B6B] hover:text-[#ED2D23] mb-4">← Back to Divisions</Link>

          <h2 className="text-[22px] font-bold text-[#111] mb-5">Squad</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {squad.map((p) => (
              <div
                key={p.number}
                className="bg-white rounded-[14px] overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              >
                <div className="relative aspect-[3/4] bg-gradient-to-b from-[#E5E7EB] to-[#CBD5E1] flex items-center justify-center text-[#6B7280] font-bold text-[56px]">
                  {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="px-4 pt-3 pb-4">
                  <div className="flex items-center gap-1.5 text-[#111] font-extrabold text-[18px]">
                    <span aria-hidden>⚽</span>
                    <span>{p.number}</span>
                  </div>
                  <h3 className="mt-2 text-[15px] font-extrabold text-[#111] leading-tight">{p.name}</h3>
                  <p className="text-[12px] text-[#6B6B6B] mt-0.5">{team.name}</p>
                  <p className="mt-3 text-[11px] font-bold text-[#9CA3AF] tracking-[1.5px]">
                    {positionLabel[p.position]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Coaches */}
          <h2 className="text-[22px] font-bold text-[#111] mb-5 mt-14">Coaches</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {coaches.map((c) => (
              <div
                key={c.name}
                className="bg-white rounded-[14px] overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              >
                <div className="relative aspect-[3/4] bg-gradient-to-b from-[#1f2a44] to-[#001D4C] flex items-center justify-center text-white font-bold text-[56px]">
                  {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="px-4 pt-3 pb-4">
                  <h3 className="text-[15px] font-extrabold text-[#111] leading-tight">{c.name}</h3>
                  <p className="text-[12px] text-[#6B6B6B] mt-0.5">{team.name}</p>
                  <p className="mt-3 text-[11px] font-bold text-[#9CA3AF] tracking-[1.5px] uppercase">
                    {c.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

const coaches = [
  { name: "Miguel Hernández", role: "Head Coach", nationality: "Mexico" },
  { name: "Luis Ramírez", role: "Assistant", nationality: "Mexico" },
  { name: "Sergio Pérez", role: "GK Coach", nationality: "Mexico" },
  { name: "Andrea Castillo", role: "Fitness", nationality: "Mexico" },
];
