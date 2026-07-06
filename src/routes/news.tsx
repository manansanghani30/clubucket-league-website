import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { NewsCard } from "@/routes/index";
import { news } from "@/data/league";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "News & Updates — LigaD1" }, { name: "description", content: "Latest news, match reports, and updates from LigaD1." }] }),
  component: News,
});

function News() {
  return (
    <Layout>
      <PageHeader title="News & Updates" subtitle="Latest from LigaD1" />
      <section className="bg-[#F7F7F7] py-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {news.map((n) => <NewsCard key={n.title} {...n} />)}
        </div>
      </section>
    </Layout>
  );
}
