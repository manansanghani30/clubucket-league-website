import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicAbout } from "@/hooks/use-public-api";
import { useLocale } from "@/lib/locale";
import seasonHighlights from "@/assets/season-highlights.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — LigaD1" },
      {
        name: "description",
        content: "Learn about LigaD1, Mexico's premier semi-professional soccer league.",
      },
      { property: "og:title", content: "About Us — LigaD1" },
      {
        property: "og:description",
        content: "Learn about LigaD1, Mexico's premier semi-professional soccer league.",
      },
    ],
  }),
  component: About,
});

const staticSections = [
  {
    title: "Our Mission",
    body: "Develop the next generation of Mexican soccer talent through competitive, well-organized league play.",
  },
  {
    title: "Our Vision",
    body: "Become the most respected semi-professional league in Latin America, known for fair play and community impact.",
  },
  {
    title: "Our Values",
    body: "Passion, discipline, community, and respect — on the field and beyond.",
  },
];

function About() {
  const { locale } = useLocale();
  const { data: about, isLoading } = usePublicAbout(locale);

  const hasData = about && (about.title || about.summary || about.bodySections?.length);

  const heroTitle = about?.title || "More Than a League. A Community.";
  const heroSummary =
    about?.summary ||
    "LigaD1 is Mexico's premier semi-professional soccer league, bringing together the most competitive clubs from across the country. Founded to bridge the gap between amateur football and the professional game, LigaD1 gives talented players a real platform to grow.";
  const heroImage = about?.imageUrl || seasonHighlights;
  const sections = about?.bodySections?.length ? about.bodySections : staticSections;

  return (
    <Layout>
      <PageHeader title="About Us" subtitle="The story behind LigaD1" />

      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {isLoading ? (
            <>
              <div className="space-y-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-72" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
              <Skeleton className="h-[400px] w-full rounded-xl" />
            </>
          ) : (
            <>
              <div>
                <div className="text-[#ED2D23] text-[14px] font-extrabold uppercase tracking-[2.5px]">
                  Who We Are
                </div>
                <h2 className="text-[32px] font-bold text-[#111] mt-3">{heroTitle}</h2>
                <p className="text-[15px] text-[#6B6B6B] leading-[1.7] mt-5">{heroSummary}</p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={heroImage} alt="LigaD1" className="w-full h-full object-cover" />
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-[#F7F7F7] py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[10px] p-6"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
                >
                  <Skeleton className="h-5 w-28 mb-3" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))
            : sections.map((s) => (
                <div
                  key={s.title}
                  className="bg-white rounded-[10px] p-6"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
                >
                  <h3 className="text-[18px] font-bold text-[#001D4C]">{s.title}</h3>
                  <p className="text-[14px] text-[#6B6B6B] leading-[1.7] mt-3">{s.body}</p>
                </div>
              ))}
        </div>
      </section>
    </Layout>
  );
}
