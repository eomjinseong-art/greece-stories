import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { KindBadge } from "@/components/KindBadge";
import { PageHead } from "@/components/PageHead";
import { people } from "@/data/people";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "인물",
  description: "호메로스, 솔론, 레오니다스, 페리클레스, 소크라테스, 플라톤, 알렉산드로스까지. 그리스 역사를 잡는 인물을 전설과 역사를 구분해 짧게 정리합니다.",
  path: "/people",
});

export default function PeoplePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "인물", path: "/people" },
          ]),
          itemListLd(
            "그리스 역사를 읽는 인물",
            "/people",
            people.map((person) => ({ name: person.nameKo, path: `/people/${person.slug}` })),
          ),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "인물" }]} />
      <PageHead
        kicker="PEOPLE"
        title="인물"
        lead="왕 명단도, 철학자 백과도 아닙니다. 제도가 바뀔 때 서 있던 사람들과, 기록이 얇은 이름을 같이 두었습니다. 소크라테스와 플라톤은 글의 종류가 다르므로 본문에 주의 상자를 붙였습니다."
      />
      <ul className="mt-8 grid gap-3">
        {people.map((person) => (
          <li key={person.slug}>
            <Link href={`/people/${person.slug}`} className="block rounded-lg border border-line bg-card p-4 hover:border-aegean">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] tracking-[0.16em] text-aegean">{person.nameEn}</p>
                <KindBadge kind={person.kind} />
              </div>
              <h2 className="mt-1 font-serif text-xl text-ink">{person.nameKo}</h2>
              <p className="mt-1 text-xs text-muted">
                {person.greek} · {person.role} · {person.years}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{person.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
