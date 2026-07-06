import type { PublicFixture } from "@/types/public-api";
import { generateInitials } from "@/lib/public-api";

function Item(f: PublicFixture) {
  const shortCode = f.homeTeam.shortCode || generateInitials(f.homeTeam.name);
  const awayCode = f.awayTeam.shortCode || generateInitials(f.awayTeam.name);
  return (
    <div className="flex items-center gap-3 px-4 py-2 mx-2 bg-white rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.08)] shrink-0 border border-[#EEE]">
      <div className="w-6 h-6 rounded-full bg-[#001D4C] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
        {shortCode}
      </div>
      <div className="text-[13px] font-bold text-[#111] tabular-nums whitespace-nowrap">
        {f.result?.homeScore ?? "-"} <span className="text-[#9CA3AF] mx-0.5">&ndash;</span>{" "}
        {f.result?.awayScore ?? "-"}
      </div>
      <div className="w-6 h-6 rounded-full bg-[#ED2D23] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
        {awayCode}
      </div>
    </div>
  );
}

export function ScoreTicker({ results }: { results?: PublicFixture[] }) {
  if (!results || results.length === 0) return null;
  const items = [...results, ...results];
  return (
    <div className="bg-[#001D4C] w-full py-3">
      <div className="max-w-[1200px] mx-auto px-6">
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
