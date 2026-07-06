import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import logo from "@/assets/ligad1-logo.png";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/divisions", label: "Divisions" },
  { to: "/schedule", label: "Schedule" },
  { to: "/standing", label: "Standing" },
  { to: "/news", label: "News" },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#001D4C] text-white pt-[60px] pb-[30px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src={logo} alt="LigaD1" className="h-16 w-auto" />
            <p className="text-[13px] text-[#9CA3AF] mt-3">Liga Nacional de Fútbol de México</p>
            <div className="flex gap-4 mt-5">
              <Instagram size={20} className="hover:text-[#ED2D23] cursor-pointer" />
              <Twitter size={20} className="hover:text-[#ED2D23] cursor-pointer" />
              <Youtube size={20} className="hover:text-[#ED2D23] cursor-pointer" />
              <Facebook size={20} className="hover:text-[#ED2D23] cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="text-[11px] uppercase text-[#9CA3AF] tracking-[1px] mb-4">Quick Links</h4>
            <ul className="space-y-[10px]">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[14px] text-white hover:text-[#ED2D23]">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase text-[#9CA3AF] tracking-[1px] mb-4">Contact</h4>
            <ul className="space-y-[10px]">
              <li className="text-[14px]">leonel@ligad1.com</li>
              <li className="text-[14px]">ligad1.com</li>
              <li className="text-[14px] text-[#9CA3AF]"><span className="text-white">EN</span> | ES</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.08] mt-12 pt-6 flex flex-col md:flex-row justify-between text-[12px]">
          <span className="text-[#6B6B6B]">© 2026 LigaD1. All rights reserved.</span>
          <span className="text-[#9CA3AF]">Powered by Clubucket</span>
        </div>
      </div>
    </footer>
  );
}
