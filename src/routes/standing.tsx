import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { standings, teamByName, divisions } from "@/data/league";

export const Route = createFileRoute("/standing")({
  head: () => ({ meta: [{ title: "Standings — LigaD1" }, { name: "description", content: "League standings updated after each match." }] }),
  component: Standing,
});

function Standing() {
  const [tab, setTab] = useState<(typeof divisions)[number]>("Bajío Zone");
  const rows = standings[tab];

  return (
    <Layout>

      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-[1200px] mx-auto px-6 flex gap-8">
          {divisions.map((d) => {
            const active = d === tab;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setTab(d)}
                className="relative py-4 text-[13px] uppercase font-semibold cursor-pointer"
                style={{ color: active ? "#111" : "#6B6B6B", fontWeight: active ? 700 : 600 }}
              >
                {d}
                {active && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ED2D23] pointer-events-none" />}
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
                {rows.map((r, i) => {
                  const team = teamByName(r.team);
                  const dif = r.gf - r.gc;
                  return (
                    <tr
                      key={r.team}
                      className="border-t border-[#EDEDED] bg-white hover:bg-[#FAFAFA]"
                      style={{ height: 72 }}
                    >
                      <td className="pl-8 text-[15px] text-[#111]">{i + 1}</td>
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-[8px] bg-[#F3F4F6] text-[#6B6B6B] text-[11px] font-bold flex items-center justify-center border border-[#E5E5E5]">
                            {team.initials}
                          </div>
                          <span className="text-[15px] text-[#111]">{r.team}</span>
                        </div>
                      </td>
                      <td className="text-[15px] text-[#111]">{r.pj}</td>
                      <td className="text-[15px] text-[#111]">{r.p}</td>
                      <td className="text-[15px] text-[#111]">{r.gf}</td>
                      <td className="text-[15px] text-[#111]">{r.gc}</td>
                      <td className="text-[15px] text-[#111]">{dif > 0 ? `+${dif}` : dif}</td>
                      <td className="pr-8 text-[15px] text-[#111]">{r.pts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-[#9CA3AF] mt-4">
            P: Played · L: Lost · F: Goals For · TO: Goals Against · GD: Goal Difference
          </p>
        </div>
      </section>
    </Layout>
  );
}
