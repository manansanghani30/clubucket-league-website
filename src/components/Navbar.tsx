import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import logo from "@/assets/ligad1-logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/divisions", label: "Divisions" },
  { to: "/schedule", label: "Schedule" },
  { to: "/standing", label: "Standing" },
  { to: "/news", label: "News" },
  { to: "/highlights", label: "Highlights" },
  { to: "/about", label: "About Us" },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const [lang, setLang] = useState<"EN" | "ES">("EN");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] h-[68px] bg-[#001D4C] text-white">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 leading-none shrink-0">
          <img src={logo} alt="LigaD1" className="h-12 w-auto" />
        </Link>


        {/* Spacer */}
        <div className="flex-1" />

        {/* Primary nav */}
        <nav className="flex items-center gap-7">
          {navLinks.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className="relative text-[14px] font-semibold uppercase tracking-[1.2px] transition-colors hover:text-[#ED2D23]"
                style={{ color: active ? "#ED2D23" : "#FFFFFF" }}
              >
                {l.label}
                {active && <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#ED2D23]" />}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-[12px] flex items-center gap-1">
            <button onClick={() => setLang("EN")} className={lang === "EN" ? "text-white underline decoration-[#ED2D23] decoration-2 underline-offset-4" : "text-white/70"}>EN</button>
            <span className="text-white/40">|</span>
            <button onClick={() => setLang("ES")} className={lang === "ES" ? "text-white underline decoration-[#ED2D23] decoration-2 underline-offset-4" : "text-white/70"}>ES</button>
          </div>
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="text-[13px] font-bold uppercase bg-[#ED2D23] text-white rounded-full px-5 py-2 hover:bg-[#c0241b] transition-colors"
            >
              Register
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-[240px] bg-white text-[#111] border border-[#E5E5E5] rounded-lg shadow-lg overflow-hidden">
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block text-[14px] px-5 py-3 hover:bg-[#F7F7F7]"
                >
                  New Team Membership
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

  );
}
