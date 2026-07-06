import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileAppPrompt } from "./MobileAppPrompt";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="pt-[68px]">
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
      <MobileAppPrompt />
    </div>
  );
}

export function PageHeader({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="w-full bg-[#001D4C] py-8 flex items-center justify-center">
      <div className="text-center px-6">
        {label && (
          <div className="text-[11px] text-[#ED2D23] uppercase tracking-[2.5px] mb-3">{label}</div>
        )}
        <h1 className="text-white font-extrabold text-[28px] leading-tight">{title}</h1>
        {subtitle && <p className="text-[#9CA3AF] text-[16px] mt-3">{subtitle}</p>}
      </div>
    </div>
  );
}

export function TeamLogo({
  initials,
  size = 40,
  dark = false,
}: {
  initials: string;
  size?: number;
  dark?: boolean;
}) {
  return (
    <div
      className="rounded-[8px] flex items-center justify-center font-bold shrink-0"
      style={{
        width: size,
        height: size,
        background: dark ? "#2A2A2A" : "#E5E5E5",
        color: dark ? "#FFFFFF" : "#6B6B6B",
        fontSize: Math.max(10, size * 0.28),
      }}
    >
      {initials}
    </div>
  );
}
