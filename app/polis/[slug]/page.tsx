import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { KeyPoints } from "@/components/KeyPoints";
import { KindBadge } from "@/components/KindBadge";
import { More } from "@/components/More";
import { Pager } from "@/components/Pager";
import { RelatedLinks } from "@/components/RelatedLinks";
import { RelatedMovies } from "@/components/RelatedMovies";
import { Rich } from "@/components/Rich";
import { SourceList } from "@/components/SourceList";
import { polisBySlug, poleis } from "@/data/poleis";
import { articleLd, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return poleis.map((polis) => ({ slug: polis.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const polis = polisBySlug(slug);
  if (!polis) return {};
  return pageMetadata({
    title: `${polis.nameKo} (${polis.nameEn})`,
    description: `${polis.nameKo}(${polis.greek}, ${polis.region}). ${polis.summary}`,
    path: `/polis/${polis.slug}`,
    type: "article",
  });
}

export default async function PolisDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const polis = polisBySlug(slug);
  if (!polis) notFound();

  const index = poleis.findIndex((item) => item.slug === polis.slug);
  const prev = poleis[index - 1];
  const next = poleis[index + 1];
  const path = `/polis/${polis.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "폴리스", path: "/polis" },
            { name: polis.nameKo, path },
          ]),
          articleLd({
            headline: `${polis.nameKo} (${polis.nameEn})`,
            description: polis.summary,
            path,
            about: [polis.nameEn, polis.greek, polis.region],
          }),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { href: "/polis", label: "폴리스" }, { label: polis.nameKo }]} />
      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs tracking-[0.2em] text-aegean">{polis.en}</p>
          <KindBadge kind={polis.kind} />
        </div>
        <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">{polis.nameKo}</h1>
        <p className="mt-2 text-sm text-muted">
          {polis.nameEn} · {polis.greek} · {polis.region} · {polis.years}
        </p>
        <p className="mt-3 text-base leading-8 text-ink">
          <Rich text={polis.summary} />
        </p>
      </header>
      <KeyPoints items={polis.points} />
      <More>
        {polis.more.map((paragraph) => (
          <p key={paragraph}>
            <Rich text={paragraph} />
          </p>
        ))}
      </More>
      <RelatedLinks links={polis.related} />
      {polis.movieSlugs.length ? (
        <RelatedMovies slugs={polis.movieSlugs} />
      ) : (
        <p className="mt-8 text-sm leading-7 text-muted">
          이 도시를 사건 그대로 다룬 유명한 극영화는 드뭅니다. 아테네의 일상인 것처럼 보이는 작품도 시대와 도시가 다른 경우가 있습니다.{" "}
          <Link href="/movies" className="text-olive underline decoration-line underline-offset-4 hover:text-aegean">
            영화 목록
          </Link>
          에서 어느 자리의 이야기인지 확인하세요.
        </p>
      )}
      <SourceList sources={polis.sources} />
      <Pager
        prev={prev ? { href: `/polis/${prev.slug}`, label: prev.nameKo } : undefined}
        next={next ? { href: `/polis/${next.slug}`, label: next.nameKo } : undefined}
      />
    </article>
  );
}
