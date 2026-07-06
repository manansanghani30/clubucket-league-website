import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import logo from "@/assets/ligad1-logo.png";
import { usePublicConfig } from "@/hooks/use-public-api";
import { isModuleEnabled } from "@/lib/public-api";

const fallbackQuickLinks = [
  { to: "/", label: "Home" },
  { to: "/divisions", label: "Divisions" },
  { to: "/schedule", label: "Schedule" },
  { to: "/standing", label: "Standing", moduleKey: "standings" },
  { to: "/news", label: "News", moduleKey: "news" },
] satisfies { to: string; label: string; moduleKey?: string }[];

export function Footer() {
  const { data: config } = usePublicConfig();

  const quickLinks = fallbackQuickLinks.filter(
    (l) => !l.moduleKey || isModuleEnabled(config, l.moduleKey),
  );

  const logoUrl = config?.logoUrl || logo;
  const leagueName = config?.displayName || "LigaD1";
  const contactEmail =
    config?.contactEmail ||
    (typeof config?.settings?.contactEmail === "string"
      ? config.settings.contactEmail
      : "leonel@ligad1.com");
  const website =
    config?.website ||
    (typeof config?.settings?.website === "string" ? config.settings.website : "ligad1.com");
  const socialLinks = config?.socialLinks;
  const locales = config?.supportedLocales.map((item) => item.locale.toUpperCase()) || ["EN", "ES"];

  return (
    <footer className="text-[var(--cb-text-inverse)] pt-[calc(var(--cb-space-section)*2)] pb-[var(--cb-space-xl)] cb-section-inverse">
      <div className="max-w-[1200px] mx-auto px-[var(--cb-space-xl)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[calc(var(--cb-space-xl)+var(--cb-space-lg))]">
          <div>
            <img src={logoUrl} alt={leagueName} className="h-16 w-auto" />
            <p className="cb-caption mt-[var(--cb-space-md)]">{leagueName}</p>
            <div className="flex gap-[var(--cb-space-lg)] mt-[var(--cb-space-lg)]">
              {socialLinks?.instagram ? (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} className="hover:text-[var(--cb-brand-accent)] cursor-pointer" />
                </a>
              ) : (
                <Instagram size={20} className="hover:text-[var(--cb-brand-accent)] cursor-pointer" />
              )}
              {socialLinks?.twitter || socialLinks?.x ? (
                <a
                  href={socialLinks.twitter || socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={20} className="hover:text-[var(--cb-brand-accent)] cursor-pointer" />
                </a>
              ) : (
                <Twitter size={20} className="hover:text-[var(--cb-brand-accent)] cursor-pointer" />
              )}
              {socialLinks?.youtube ? (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} className="hover:text-[var(--cb-brand-accent)] cursor-pointer" />
                </a>
              ) : (
                <Youtube size={20} className="hover:text-[var(--cb-brand-accent)] cursor-pointer" />
              )}
              {socialLinks?.facebook ? (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} className="hover:text-[var(--cb-brand-accent)] cursor-pointer" />
                </a>
              ) : (
                <Facebook size={20} className="hover:text-[var(--cb-brand-accent)] cursor-pointer" />
              )}
            </div>
          </div>
          <div>
            <h4 className="cb-caption uppercase tracking-normal mb-[var(--cb-space-lg)]">
              Quick Links
            </h4>
            <ul className="space-y-[var(--cb-space-sm)]">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-inverse)] hover:text-[var(--cb-brand-accent)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="cb-caption uppercase tracking-normal mb-[var(--cb-space-lg)]">Contact</h4>
            <ul className="space-y-[var(--cb-space-sm)]">
              <li className="text-[length:var(--cb-font-size-body)]">{contactEmail}</li>
              <li className="text-[length:var(--cb-font-size-body)]">{website}</li>
              <li className="text-[length:var(--cb-font-size-body)] text-[var(--cb-text-muted)]">
                <span className="text-[var(--cb-text-inverse)]">{locales[0]}</span>
                {locales.length > 1 ? ` | ${locales.slice(1).join(" | ")}` : null}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--cb-border-strong)] mt-[calc(var(--cb-space-xl)*2)] pt-[var(--cb-space-xl)] flex flex-col md:flex-row justify-between text-[length:var(--cb-font-size-caption)]">
          <span className="text-[var(--cb-text-muted)]">&copy; 2026 {leagueName}. All rights reserved.</span>
          <span className="text-[var(--cb-text-muted)]">Powered by Clubucket</span>
        </div>
      </div>
    </footer>
  );
}
