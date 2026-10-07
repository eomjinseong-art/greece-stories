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
import { people, personBySlug } from "@/data/people";
import { articleLd, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return people.map((person) => ({ slug: person.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = personBySlug(slug);
  if (!person) return {};
  return pageMetadata({
    title: `${person.nameKo} (${person.nameEn})`,
    description: `${person.nameKo}(${person.greek}, ${person.years}). ${person.summary}`,
    path: `/people/${person.slug}`,
    type: "article",
  });
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = personBySlug(slug);
  if (!person) notFound();

  const index = people.findIndex((item) => item.slug === person.slug);
  const prev = people[index - 1];
  const next = people[index + 1];
  const path = `/people/${person.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "인물", path: "/people" },
            { name: person.nameKo, path },
          ]),
          articleLd({
            headline: `${person.nameKo} (${person.nameEn})`,
            description: person.summary,
            path,
            about: [person.nameEn, person.greek, person.role],
          }),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { href: "/people", label: "인물" }, { label: person.nameKo }]} />
      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs tracking-[0.2em] text-aegean">{person.en}</p>
          <KindBadge kind={person.kind} />
        </div>
        <h1 className="mt-1 font-serif text-3xl text-ink sm:text-4xl">{person.nameKo}</h1>
        <p className="mt-2 text-sm text-muted">
          {person.nameEn} · {person.greek} · {person.role} · {person.years}
        </p>
        <p className="mt-3 text-base leading-8 text-ink">
          <Rich text={person.summary} />
        </p>
      </header>
      {person.careful ? (
        <aside className="mt-4 rounded-md border border-wine/40 bg-wine/5 p-4 text-sm leading-7">
          <p className="text-[11px] tracking-[0.16em] text-wine">주의</p>
          <p className="mt-1">
            <Rich text={person.careful} />
          </p>
        </aside>
      ) : null}
      <KeyPoints items={person.points} />
      <More>
        {person.more.map((paragraph) => (
          <p key={paragraph}>
            <Rich text={paragraph} />
          </p>
        ))}
      </More>
      <RelatedLinks links={person.related} />
      {person.movieSlugs.length ? (
        <RelatedMovies slugs={person.movieSlugs} />
      ) : (
        <p className="mt-8 text-sm leading-7 text-muted">
          이 사람을 전기처럼 다룬 유명한 극영화는 목록에서 빼 두었습니다. 시대가 다른 작품을 그의 삶처럼 보면 헷갈리기 쉽습니다.{" "}
          <Link href="/movies" className="text-olive underline decoration-line underline-offset-4 hover:text-aegean">
            영화 목록
          </Link>
          에서 어느 시대의 이야기인지 확인하세요.
        </p>
      )}
      <SourceList sources={person.sources} />
      <Pager
        prev={prev ? { href: `/people/${prev.slug}`, label: prev.nameKo } : undefined}
        next={next ? { href: `/people/${next.slug}`, label: next.nameKo } : undefined}
      />
    </article>
  );
}
