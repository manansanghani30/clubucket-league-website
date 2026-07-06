import { useEffect, useState } from "react";

export function MobileAppPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    const dismissed = localStorage.getItem("ligad1_app_prompt_dismissed");
    if (isMobile && !dismissed) setShow(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem("ligad1_app_prompt_dismissed", "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center px-6"
      style={{ background: "rgba(0,0,0,0.80)", backdropFilter: "blur(8px)" }}
    >
      <div className="bg-white rounded-2xl p-10 max-w-[340px] w-full text-center shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-[#ED2D23] text-white text-2xl font-bold flex items-center justify-center mx-auto">L1</div>
        <h3 className="text-[17px] font-bold text-[#111] mt-5">For the best live experience —</h3>
        <p className="text-[14px] text-[#6B6B6B] mt-3">Get the fastest push notifications and live stats for all games.</p>
        <button className="w-full mt-7 bg-[#ED2D23] text-white rounded-full py-3 text-[14px] font-bold uppercase">
          Get the LigaD1 App
        </button>
        <button onClick={dismiss} className="block mt-4 text-[13px] text-[#6B6B6B] hover:underline mx-auto">
          Continue in browser →
        </button>
      </div>
    </div>
  );
}
