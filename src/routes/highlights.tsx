import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { NewsCard } from "@/routes/index";
import { highlights } from "@/data/league";

export const Route = createFileRoute("/highlights")({
  head: () => ({
    meta: [
      { title: "Highlights — LigaD1" },
      { name: "description", content: "Match highlights, top goals, and standout moments from LigaD1." },
      { property: "og:title", content: "Highlights — LigaD1" },
      { property: "og:description", content: "Match highlights, top goals, and standout moments from LigaD1." },
    ],
  }),
  component: Highlights,
});

function Highlights() {
  return (
    <Layout>
      <PageHeader title="Highlights" subtitle="The best moments from LigaD1" />
      <section className="bg-[#F7F7F7] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {highlights.map((h) => <NewsCard key={h.title} {...h} />)}
        </div>
      </section>
    </Layout>
  );
}
