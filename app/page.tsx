import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { eras } from "@/data/eras";
import { people } from "@/data/people";
import { poleis } from "@/data/poleis";
import { wars } from "@/data/wars";
import { jsonLd, pageMetadata, websiteLd } from "@/lib/seo";
import { BRAND_LINE, EGYPT_NAME, EGYPT_URL, HOME_SECTIONS, MYTH_NAME, MYTH_URL, ROME_NAME, ROME_URL, SITE_SUB, SITE_TAGLINE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "홈",
  description: `${SITE_TAGLINE}. ${SITE_SUB}`,
  path: "/",
});

const PATH = [
  { href: "/origins", label: "다섯 시대가 어떻게 다른지" },
  { href: "/polis/athens", label: "아테네는 그리스 전체가 아닙니다" },
  { href: "/polis/sparta", label: "스파르타는 왜 다르게 굴러갔나" },
  { href: "/wars/persian-wars", label: "페르시아 전쟁에서 누가 같은 편이었나" },
  { href: "/people/pericles", label: "페리클레스 시대의 연설은 녹음이 아닙니다" },
  { href: "/wars/peloponnesian-war", label: "아테네와 스파르타가 싸운 이유" },
  { href: "/people/alexander", label: "알렉산드로스 원정 뒤 무엇이 갈라졌나" },
  { href: "/myth-links", label: "신화 본문은 나두신화로" },
];

const SISTERS = [
  {
    href: MYTH_URL,
    en: "MYTH",
    title: MYTH_NAME,
    body: "신들의 이야기, 트로이 전쟁, 그리스 신과 로마 신의 이름 차이. 역사 글이 아니라 신화 사전입니다.",
  },
  {
    href: ROME_URL,
    en: "ROME",
    title: ROME_NAME,
    body: "왕정·공화정·제정, 포에니 전쟁, 클레오파트라. 그리스 폴리스가 로마의 속주가 된 뒤의 이야기입니다.",
  },
  {
    href: EGYPT_URL,
    en: "EGYPT",
    title: EGYPT_NAME,
    body: "같은 집안의 자매 사이트입니다. 이집트의 긴 역사는 이 폴리스 글과 따로, 그 주소에서 이어 읽습니다.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <JsonLd data={jsonLd([websiteLd(`${SITE_TAGLINE}. ${SITE_SUB}`)])} />
      <section className="py-12 text-center sm:py-16">
        <p className="text-xs tracking-[0.3em] text-aegean">GREECE STORIES</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">그리스이야기</h1>
        <p className="mt-4 text-lg text-muted">{SITE_TAGLINE}</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">{SITE_SUB}</p>
        <p className="mt-3 text-xs text-aegean">{BRAND_LINE}</p>
        <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-muted">
          전설은 전설이라고 적습니다. 시대 {eras.length}칸, 폴리스 {poleis.length}곳, 인물 {people.length}명, 큰 전쟁 {wars.length}개를 짧은 글로 정리했습니다.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link href="/origins" className="rounded-full bg-aegean px-4 py-2 text-white hover:bg-aegean-deep">
            시대부터 보기
          </Link>
          <a href={MYTH_URL} className="rounded-full border border-line bg-card px-4 py-2 hover:border-aegean" rel="noopener noreferrer">
            {MYTH_NAME}에서 신화 읽기
          </a>
          <a href={ROME_URL} className="rounded-full border border-line bg-card px-4 py-2 hover:border-aegean" rel="noopener noreferrer">
            {ROME_NAME}
          </a>
        </div>
      </section>

      <div className="meander opacity-50" aria-hidden />

      <section className="mt-10" aria-labelledby="era-heading">
        <h2 id="era-heading" className="font-serif text-2xl text-ink">
          다섯 시대
        </h2>
        <p className="mt-1 text-sm text-muted">그리스를 한 단어로 외우면 어렵습니다. 먼저 이 다섯 칸만 나누세요.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eras.map((era) => (
            <Link key={era.id} href={`/origins#${era.id}`} className="rounded-lg border border-line bg-card p-5 hover:border-aegean">
              <p className="text-[11px] tracking-[0.16em] text-aegean">{era.en}</p>
              <h3 className="mt-1 font-serif text-2xl text-ink">{era.title}</h3>
              <p className="mt-1 text-xs text-muted">{era.years}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{era.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="menu-heading">
        <h2 id="menu-heading" className="font-serif text-2xl text-ink">
          모든 길
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {HOME_SECTIONS.map((section, index) => (
            <Link key={section.href} href={section.href} className="group rounded-lg border border-line bg-card p-5 transition hover:border-aegean hover:shadow-sm">
              <p className="font-serif text-xs text-aegean">
                {String(index + 1).padStart(2, "0")} · {section.en}
              </p>
              <h3 className="mt-1 font-serif text-xl text-ink group-hover:text-aegean">{section.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{section.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="sisters-heading">
        <h2 id="sisters-heading" className="font-serif text-2xl text-ink">
          자매 사이트
        </h2>
        <p className="mt-1 text-sm text-muted">신화, 로마의 역사, 그리고 이집트이야기는 같은 나두의 다른 방입니다.</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {SISTERS.map((site) => (
            <a
              key={site.href}
              href={site.href}
              rel="noopener noreferrer"
              className="group rounded-lg border border-line bg-card p-5 transition hover:border-aegean hover:shadow-sm"
            >
              <p className="text-[11px] tracking-[0.16em] text-aegean">{site.en}</p>
              <h3 className="mt-1 font-serif text-xl text-ink group-hover:text-aegean">{site.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{site.body}</p>
              <p className="mt-3 text-sm text-aegean">{site.title} 보기 →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-ink">처음 읽는 순서</h2>
          <ol className="mt-4 space-y-2 text-sm">
            {PATH.map((item, index) => (
              <li key={item.href}>
                <Link href={item.href} className="text-olive underline decoration-line underline-offset-4 hover:text-aegean">
                  {index + 1}. {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-lg border border-line bg-card p-5">
          <h2 className="font-serif text-2xl text-ink">전설과 역사</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            호메로스의 트로이, 리쿠르고스의 법, 소크라테스의 한 문장은 종류가 다릅니다. 배지로 전설·역사·섞임을 나누고, 없는 인용문은 만들지 않습니다. 영화 제목은 실제로 나온 작품만 적습니다.
          </p>
          <Link href="/sources" className="mt-3 inline-block text-sm text-aegean">
            적는 기준 보기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
