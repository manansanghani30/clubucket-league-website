import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/ligad1-logo.png";
import { usePublicConfig } from "@/hooks/use-public-api";
import { useLocale } from "@/lib/locale";
import { isModuleEnabled } from "@/lib/public-api";

type NavLink = { to: string; label: string; moduleKey?: string };

const fallbackNavLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/divisions", label: "Divisions", moduleKey: "divisions" },
  { to: "/schedule", label: "Schedule", moduleKey: "schedule" },
  { to: "/standing", label: "Standing", moduleKey: "standings" },
  { to: "/news", label: "News", moduleKey: "news" },
  { to: "/highlights", label: "Highlights", moduleKey: "highlights" },
  { to: "/about", label: "About Us", moduleKey: "aboutUs" },
];

const fallbackLocales = [
  { label: "English", locale: "en" },
  { label: "Spanish", locale: "es" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const { data: config } = usePublicConfig();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const navLinks = fallbackNavLinks.filter((l) => !l.moduleKey || isModuleEnabled(config, l.moduleKey));

  const registrationEnabled = config?.enabledModules.register === true;

  const logoUrl = config?.logoUrl || logo;
  const leagueName = config?.displayName || "LigaD1";
  const locales = config?.supportedLocales.length ? config.supportedLocales : fallbackLocales;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] h-[68px] text-[var(--cb-text-inverse)] cb-section-inverse"
    >
      <div className="max-w-[1200px] mx-auto px-[var(--cb-space-xl)] h-full flex items-center gap-[var(--cb-space-lg)]">
        <Link to="/" className="flex items-center gap-[var(--cb-space-sm)] leading-none shrink-0">
          <img src={logoUrl} alt={leagueName} className="h-12 w-auto" />
        </Link>

        <div className="flex-1" />

        <nav className="flex items-center gap-[var(--cb-space-xl)]">
          {navLinks.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className="relative font-[var(--cb-font-weight-heading)] uppercase tracking-normal transition-colors text-[length:var(--cb-font-size-body)] hover:text-[var(--cb-brand-accent)]"
                style={{ color: active ? "var(--cb-brand-accent)" : "var(--cb-text-inverse)" }}
              >
                {l.label}
                {active && (
                  <span
                    className="absolute -bottom-2 left-0 right-0 h-[2px]"
                    style={{ background: "var(--cb-brand-accent)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-[var(--cb-space-md)] shrink-0">
          <div className="text-[length:var(--cb-font-size-caption)] flex items-center gap-[var(--cb-space-xs)]">
            {locales.map((item, idx) => (
              <span key={item.locale} className="flex items-center gap-[var(--cb-space-xs)]">
                {idx > 0 && <span className="text-[var(--cb-text-muted)]">|</span>}
                <button
                  onClick={() => setLocale(item.locale)}
                  className={
                    locale === item.locale
                      ? "text-[var(--cb-text-inverse)] underline decoration-[var(--cb-brand-accent)] decoration-2 underline-offset-4"
                      : "text-[var(--cb-text-muted)]"
                  }
                >
                  {item.locale.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          {registrationEnabled && (
            <div className="relative" ref={ref}>
              <button
                onClick={() => setOpen((o) => !o)}
                className="cb-button-primary"
              >
                Register
              </button>
              {open && (
                <div className="absolute right-0 mt-[var(--cb-space-xs)] w-[240px] cb-panel cb-shadow-panel overflow-hidden">
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="block cb-body px-[var(--cb-space-lg)] py-[var(--cb-space-md)] hover:bg-[var(--cb-surface-muted)]"
                  >
                    New Team Membership
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
