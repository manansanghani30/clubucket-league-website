import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Check } from "lucide-react";
import { Layout, PageHeader } from "@/components/Layout";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "New Team Membership — LigaD1" }, { name: "description", content: "Submit a request to join LigaD1." }] }),
  component: Register,
});

const inputCls = "w-full h-10 px-3.5 text-[14px] border border-[#D1D5DB] rounded-md focus:outline-none focus:border-[#111]";
const labelCls = "block text-[13px] font-semibold text-[#111] mb-1.5";

function Register() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <PageHeader title="New Team Membership" subtitle="Submit a request to join LigaD1." />
      <section className="bg-[#F7F7F7] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[3fr_2fr] gap-8">
          <div className="bg-white rounded-[10px] p-10" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 size={40} className="text-[#166534] mx-auto" />
                <h3 className="text-[20px] font-bold mt-4">Request Submitted!</h3>
                <p className="text-[14px] text-[#6B6B6B] mt-3 max-w-md mx-auto">
                  Thank you for your interest. Our team will review your application and reach out within 3–5 business days.
                </p>
                <Link to="/" className="inline-block mt-6 bg-[#001D4C] text-white rounded-md px-5 py-2.5 text-[13px] font-semibold">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <h2 className="text-[20px] font-bold">Team Registration Request</h2>
                <p className="text-[14px] text-[#6B6B6B] mt-2">
                  Fill in the details below and our team will get back to you within 3–5 business days.
                </p>

                <div className="mt-7 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div><label className={labelCls}>Team Name *</label><input className={inputCls} required /></div>
                    <div><label className={labelCls}>City *</label><input className={inputCls} required /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div><label className={labelCls}>Contact Person Full Name *</label><input className={inputCls} required /></div>
                    <div><label className={labelCls}>Describe your Role</label><input className={inputCls} placeholder="e.g. Team Manager" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div><label className={labelCls}>Email Address *</label><input type="email" className={inputCls} required /></div>
                    <div><label className={labelCls}>Phone Number *</label><input className={inputCls} required /></div>
                  </div>
                  <div>
                    <label className={labelCls}>Division Interest</label>
                    <select className={inputCls}>
                      <option>Bajío Zone</option>
                      <option>Downtown Area</option>
                      <option>No Preference</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Tell us about your team</label>
                    <textarea
                      rows={4}
                      className="w-full px-3.5 py-2.5 text-[14px] border border-[#D1D5DB] rounded-md focus:outline-none focus:border-[#111]"
                      placeholder="Share any relevant background — how long active, number of players, previous league experience..."
                    />
                  </div>
                </div>

                <button type="submit" className="w-full mt-7 bg-[#ED2D23] text-white rounded-full py-3 text-[15px] font-bold uppercase hover:bg-[#c0241b]">
                  Submit Request
                </button>
                <p className="text-[11px] text-[#9CA3AF] text-center mt-3">
                  By submitting this form you agree to be contacted by LigaD1 regarding your application.
                </p>
              </form>
            )}
          </div>

          <aside className="bg-[#001D4C] rounded-[10px] p-8 text-white h-fit">
            <h3 className="text-[18px] font-bold">Why Join LigaD1?</h3>
            <ul className="mt-5 space-y-4">
              {[
                "Compete in one of Mexico's most organised semi-professional leagues",
                "Full access to LigaD1's scheduling, standings, and digital platform",
                "Exposure for your players and club to scouts and fans across the region",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check size={16} className="text-[#ED2D23] shrink-0 mt-0.5" />
                  <span className="text-[14px] text-white/85 leading-[1.7]">{t}</span>
                </li>
              ))}
            </ul>
            <div className="h-px bg-white/10 my-6" />
            <p className="text-[14px] font-semibold">Have questions?</p>
            <p className="text-[13px] text-[#9CA3AF] mt-1">info@ligad1.com</p>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
