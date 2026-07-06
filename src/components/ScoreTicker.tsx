import { tickerFixtures, teamByName } from "@/data/league";

function Item({ home, away, h, a }: { jornada: string; home: string; away: string; h: number; a: number }) {
  const homeT = teamByName(home);
  const awayT = teamByName(away);
  return (
    <div className="flex items-center gap-3 px-4 py-2 mx-2 bg-white rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.08)] shrink-0 border border-[#EEE]">
      <div className="w-6 h-6 rounded-full bg-[#001D4C] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
        {homeT.initials}
      </div>
      <div className="text-[13px] font-bold text-[#111] tabular-nums whitespace-nowrap">
        {h} <span className="text-[#9CA3AF] mx-0.5">–</span> {a}
      </div>
      <div className="w-6 h-6 rounded-full bg-[#ED2D23] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
        {awayT.initials}
      </div>
    </div>
  );
}

export function ScoreTicker() {
  const items = [...tickerFixtures, ...tickerFixtures];
  return (
    <div className="bg-[#001D4C] w-full py-3">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="overflow-hidden relative">
          <div className="ticker-track flex items-center w-max">
            {items.map((f, i) => (
              <Item key={i} {...f} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
