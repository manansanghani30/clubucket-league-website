import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import seasonHighlights from "@/assets/season-highlights.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — LigaD1" },
      { name: "description", content: "Learn about LigaD1, Mexico's premier semi-professional soccer league." },
      { property: "og:title", content: "About Us — LigaD1" },
      { property: "og:description", content: "Learn about LigaD1, Mexico's premier semi-professional soccer league." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <PageHeader title="About Us" subtitle="The story behind LigaD1" />

      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#ED2D23] text-[14px] font-extrabold uppercase tracking-[2.5px]">Who We Are</div>
            <h2 className="text-[32px] font-bold text-[#111] mt-3">More Than a League. A Community.</h2>
            <p className="text-[15px] text-[#6B6B6B] leading-[1.7] mt-5">
              LigaD1 is Mexico's premier semi-professional soccer league, bringing together the most competitive clubs from across the country. Founded to bridge the gap between amateur football and the professional game, LigaD1 gives talented players a real platform to grow.
            </p>
            <p className="text-[15px] text-[#6B6B6B] leading-[1.7] mt-3">
              With multiple competitive divisions and a rapidly growing fan base, LigaD1 is more than a competition — it's a movement built on passion, discipline, and community.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img src={seasonHighlights} alt="LigaD1 season highlights" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            { title: "Our Mission", body: "Develop the next generation of Mexican soccer talent through competitive, well-organized league play." },
            { title: "Our Vision", body: "Become the most respected semi-professional league in Latin America, known for fair play and community impact." },
            { title: "Our Values", body: "Passion, discipline, community, and respect — on the field and beyond." },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-[10px] p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <h3 className="text-[18px] font-bold text-[#001D4C]">{c.title}</h3>
              <p className="text-[14px] text-[#6B6B6B] leading-[1.7] mt-3">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
