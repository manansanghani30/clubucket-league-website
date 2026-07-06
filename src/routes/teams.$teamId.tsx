import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Globe } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicTeam } from "@/hooks/use-public-api";
import { generateInitials } from "@/lib/public-api";

export const Route = createFileRoute("/teams/$teamId")({
  head: () => ({ meta: [{ title: "Team Profile — LigaD1" }] }),
  component: TeamProfile,
});

function TeamProfile() {
  const { teamId } = Route.useParams();
  const { data: team, isLoading, error } = usePublicTeam(teamId);

  if (error && !isLoading) {
    return (
      <Layout>
        <div className="w-full bg-[#001D4C] h-[220px] flex items-center justify-center" />
        <section className="bg-[#F7F7F7] py-[60px]">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <p className="text-[14px] text-[#6B6B6B]">Team not found.</p>
            <Link
              to="/divisions"
              className="mt-4 inline-block text-[13px] text-[#ED2D23] font-semibold hover:underline"
            >
              &larr; Back to Divisions
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  if (!team && !isLoading) throw notFound();

  const players = team?.players || [];
  const coaches = team?.coaches || [];
  const socialLinks = team?.socialLinks;

  return (
    <Layout>
      <div className="w-full bg-[#001D4C] h-[220px] flex items-center justify-center">
        <div className="text-center px-6">
          {team ? (
            <>
              <div className="text-[12px] text-[#9CA3AF]">
                <Link to="/divisions" className="hover:text-white">
                  Divisions
                </Link>
                {team.divisionName && (
                  <>
                    <span className="text-white/40 mx-2">&rsaquo;</span>
                    <span>{team.divisionName}</span>
                  </>
                )}
                <span className="text-white/40 mx-2">&rsaquo;</span>
                <span className="text-white">{team.name}</span>
              </div>
              <div className="mx-auto mt-3 w-[72px] h-[72px] rounded-[14px] flex items-center justify-center border-2 border-white overflow-hidden">
                {team.logoUrl ? (
                  <img
                    src={team.logoUrl}
                    alt={team.name}
                    className="w-full h-full object-contain bg-white"
                  />
                ) : (
                  <div className="w-full h-full bg-[#E5E5E5] text-[#6B6B6B] font-bold flex items-center justify-center text-[18px]">
                    {team.initials || generateInitials(team.name)}
                  </div>
                )}
              </div>
              <h1 className="text-white text-[36px] font-extrabold uppercase mt-3">{team.name}</h1>
              {socialLinks && (
                <div className="flex items-center justify-center gap-3 mt-2">
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      aria-label="Instagram"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      aria-label="Facebook"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      aria-label="X (Twitter)"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  {socialLinks.website && (
                    <a
                      href={socialLinks.website}
                      aria-label="Website"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Globe size={18} />
                    </a>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <Skeleton className="h-4 w-48 mx-auto bg-white/20" />
              <Skeleton className="w-[72px] h-[72px] rounded-[14px] mx-auto mt-3 bg-white/20" />
              <Skeleton className="h-9 w-56 mx-auto mt-3 bg-white/20" />
            </>
          )}
        </div>
      </div>

      <section className="bg-[#F7F7F7] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link
            to="/divisions"
            className="inline-block text-[13px] text-[#6B6B6B] hover:text-[#ED2D23] mb-4"
          >
            &larr; Back to Divisions
          </Link>

          <h2 className="text-[22px] font-bold text-[#111] mb-5">Squad</h2>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[14px] overflow-hidden">
                  <Skeleton className="aspect-[3/4] w-full rounded-none" />
                  <div className="px-4 pt-3 pb-4 space-y-2">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : players.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {players.map((p, idx) => (
                <div
                  key={`${p.id || p.name}-${idx}`}
                  className="bg-white rounded-[14px] overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                >
                  <div className="relative aspect-[3/4] bg-gradient-to-b from-[#E5E7EB] to-[#CBD5E1] flex items-center justify-center text-[#6B7280] font-bold text-[56px]">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      generateInitials(p.name)
                    )}
                  </div>
                  <div className="px-4 pt-3 pb-4">
                    <div className="flex items-center gap-1.5 text-[#111] font-extrabold text-[18px]">
                      <span aria-hidden>&#9917;</span>
                      <span>{p.number ?? "-"}</span>
                    </div>
                    <h3 className="mt-2 text-[15px] font-extrabold text-[#111] leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-[12px] text-[#6B6B6B] mt-0.5">{team?.name || ""}</p>
                    <p className="mt-3 text-[11px] font-bold text-[#9CA3AF] tracking-[1.5px]">
                      {(p.position || "").toUpperCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-[#6B6B6B]">No players listed yet.</p>
          )}

          <h2 className="text-[22px] font-bold text-[#111] mb-5 mt-14">Coaches</h2>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[14px] overflow-hidden">
                  <Skeleton className="aspect-[3/4] w-full rounded-none" />
                  <div className="px-4 pt-3 pb-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : coaches.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {coaches.map((c, idx) => (
                <div
                  key={`${c.id || c.name}-${idx}`}
                  className="bg-white rounded-[14px] overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                >
                  <div className="relative aspect-[3/4] bg-gradient-to-b from-[#1f2a44] to-[#001D4C] flex items-center justify-center text-white font-bold text-[56px]">
                    {c.imageUrl ? (
                      <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      generateInitials(c.name)
                    )}
                  </div>
                  <div className="px-4 pt-3 pb-4">
                    <h3 className="text-[15px] font-extrabold text-[#111] leading-tight">
                      {c.name}
                    </h3>
                    <p className="text-[12px] text-[#6B6B6B] mt-0.5">{team?.name || ""}</p>
                    <p className="mt-3 text-[11px] font-bold text-[#9CA3AF] tracking-[1.5px] uppercase">
                      {c.role || ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-[#6B6B6B]">No coaches listed yet.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
