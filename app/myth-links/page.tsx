import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideBlock } from "@/components/GuideBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RelatedMovies } from "@/components/RelatedMovies";
import { compareLinks, godLinks, mythIntro, mythLinks, storyLinks } from "@/data/myth";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { MYTH_NAME, MYTH_URL, ROME_NAME, ROME_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "신과 전설 연결",
  description: "아테나, 제우스, 아폴론, 트로이 전쟁, 오디세이아를 나두신화의 신·이야기·그리스 vs 로마 글로 연결합니다. 역사 기록과 서사시를 구분합니다.",
  path: "/myth-links",
});

export default function MythLinksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "신과 전설 연결", path: "/myth-links" },
          ]),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "신과 전설 연결" }]} />
      <PageHead
        kicker="GODS"
        title="신과 전설 연결"
        lead="역사 글을 읽다 만나는 신의 이름과 시의 제목입니다. 이야기 전문은 자매 사이트 나두신화에 두고, 여기서는 폴리스·전쟁과 닿는 한 줄만 적습니다."
      />

      <div className="mt-8 max-w-3xl">
        <GuideBlock en={mythIntro.en} title={mythIntro.title} summary={mythIntro.summary} points={mythIntro.points} more={mythIntro.more} kind="mixed" />
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">신</h2>
        <p className="mt-1 text-sm text-muted">이름은 {MYTH_NAME}의 신 항목으로 이어집니다. 로마 이름과의 차이는 비교 글에 있습니다.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {godLinks.map((god) => (
            <li key={god.slug} id={god.slug} className="scroll-mt-28 rounded-lg border border-line bg-card p-4">
              <p className="text-[11px] tracking-[0.16em] text-aegean">{god.en}</p>
              <h3 className="mt-1 font-serif text-xl text-ink">{god.title}</h3>
              <p className="mt-2 text-sm leading-6">{god.summary}</p>
              <p className="mt-2 text-sm text-muted">{god.note}</p>
              <a href={god.href} className="mt-3 inline-block text-sm text-olive underline decoration-line underline-offset-4 hover:text-aegean" rel="noopener noreferrer">
                {MYTH_NAME}에서 읽기
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">이야기</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {storyLinks.map((story) => (
            <li key={story.slug} id={story.slug} className="scroll-mt-28 rounded-lg border border-line bg-card p-4">
              <p className="text-[11px] tracking-[0.16em] text-aegean">{story.en}</p>
              <h3 className="mt-1 font-serif text-xl text-ink">{story.title}</h3>
              <p className="mt-2 text-sm leading-6">{story.summary}</p>
              <p className="mt-2 text-sm text-muted">{story.note}</p>
              <a href={story.href} className="mt-3 inline-block text-sm text-olive underline decoration-line underline-offset-4 hover:text-aegean" rel="noopener noreferrer">
                {MYTH_NAME}에서 읽기
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">그리스 vs 로마</h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">
          같은 신에게 붙인 다른 이름, 그리고 그 차이가 생긴 자리는 {MYTH_NAME}가 맡습니다. 로마 국가의 정치와 전쟁은 {ROME_NAME}입니다.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {compareLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="inline-block rounded-full border border-line bg-card px-3 py-1.5 text-sm hover:border-aegean" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={ROME_URL} className="inline-block rounded-full border border-line bg-card px-3 py-1.5 text-sm hover:border-aegean" rel="noopener noreferrer">
              {ROME_NAME}
            </a>
          </li>
        </ul>
      </section>

      <nav className="mt-8 flex flex-wrap gap-3 text-sm" aria-label="관련 글">
        {mythLinks.map((link) =>
          link.href.startsWith("/") ? (
            <Link key={link.href} href={link.href} className="rounded-full border border-line bg-card px-3 py-1.5 hover:border-aegean">
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href} className="rounded-full border border-line bg-card px-3 py-1.5 hover:border-aegean" rel="noopener noreferrer">
              {link.label}
            </a>
          ),
        )}
        <a href={MYTH_URL} className="rounded-full border border-line bg-card px-3 py-1.5 hover:border-aegean" rel="noopener noreferrer">
          {MYTH_NAME} 홈
        </a>
      </nav>
      <div className="max-w-3xl">
        <RelatedMovies topic="myth" />
      </div>
    </div>
  );
}
