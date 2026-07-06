import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import logo from "@/assets/ligad1-logo.png";
import { usePublicConfig } from "@/hooks/use-public-api";

const fallbackQuickLinks = [
  { to: "/", label: "Home" },
  { to: "/divisions", label: "Divisions" },
  { to: "/schedule", label: "Schedule" },
  { to: "/standing", label: "Standing" },
  { to: "/news", label: "News" },
] as const;

export function Footer() {
  const { data: config } = usePublicConfig();

  const enabledModules = Array.isArray(config?.enabledModules) ? config.enabledModules : null;
  const quickLinks = enabledModules
    ? fallbackQuickLinks.filter((l) => {
        if (l.to === "/") return true;
        const moduleKey = l.to.replace("/", "");
        return enabledModules.includes(moduleKey);
      })
    : fallbackQuickLinks;

  const logoUrl = config?.logoUrl || logo;
  const leagueName = config?.name || "LigaD1";
  const contactEmail = config?.contactEmail || "leonel@ligad1.com";
  const website = config?.website || "ligad1.com";
  const socialLinks = config?.socialLinks;

  return (
    <footer className="bg-[#001D4C] text-white pt-[60px] pb-[30px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src={logoUrl} alt={leagueName} className="h-16 w-auto" />
            <p className="text-[13px] text-[#9CA3AF] mt-3">{leagueName}</p>
            <div className="flex gap-4 mt-5">
              {socialLinks?.instagram ? (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} className="hover:text-[#ED2D23] cursor-pointer" />
                </a>
              ) : (
                <Instagram size={20} className="hover:text-[#ED2D23] cursor-pointer" />
              )}
              {socialLinks?.twitter ? (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} className="hover:text-[#ED2D23] cursor-pointer" />
                </a>
              ) : (
                <Twitter size={20} className="hover:text-[#ED2D23] cursor-pointer" />
              )}
              {socialLinks?.youtube ? (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} className="hover:text-[#ED2D23] cursor-pointer" />
                </a>
              ) : (
                <Youtube size={20} className="hover:text-[#ED2D23] cursor-pointer" />
              )}
              {socialLinks?.facebook ? (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} className="hover:text-[#ED2D23] cursor-pointer" />
                </a>
              ) : (
                <Facebook size={20} className="hover:text-[#ED2D23] cursor-pointer" />
              )}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] uppercase text-[#9CA3AF] tracking-[1px] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-[10px]">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[14px] text-white hover:text-[#ED2D23]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase text-[#9CA3AF] tracking-[1px] mb-4">Contact</h4>
            <ul className="space-y-[10px]">
              <li className="text-[14px]">{contactEmail}</li>
              <li className="text-[14px]">{website}</li>
              <li className="text-[14px] text-[#9CA3AF]">
                <span className="text-white">EN</span> | ES
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.08] mt-12 pt-6 flex flex-col md:flex-row justify-between text-[12px]">
          <span className="text-[#6B6B6B]">&copy; 2026 {leagueName}. All rights reserved.</span>
          <span className="text-[#9CA3AF]">Powered by Clubucket</span>
        </div>
      </div>
    </footer>
  );
}
