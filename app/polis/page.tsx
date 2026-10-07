import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { KindBadge } from "@/components/KindBadge";
import { PageHead } from "@/components/PageHead";
import { poleis } from "@/data/poleis";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "폴리스",
  description: "폴리스는 도시와 그 농지를 묶은 정치 공동체입니다. 아테네, 스파르타, 코린토스, 테바이, 아르고스, 밀레토스, 시라쿠사를 짧게 정리합니다.",
  path: "/polis",
});

export default function PolisPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "폴리스", path: "/polis" },
          ]),
          itemListLd(
            "주요 그리스 폴리스",
            "/polis",
            poleis.map((polis) => ({ name: polis.nameKo, path: `/polis/${polis.slug}` })),
          ),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "폴리스" }]} />
      <PageHead
        kicker="POLEIS"
        title="폴리스"
        lead="폴리스는 성벽 안의 동네만이 아닙니다. 도시와 들판과 시민권이 한 덩어리인 나라입니다. 아래 일곱은 전체를 대표하는 목록이 아니라, 길을 잡는 도시입니다. 델포이와 올림피아처럼 도시국가가 아닌 성소는 지도에 있습니다."
      />
      <ul className="mt-8 grid gap-3">
        {poleis.map((polis) => (
          <li key={polis.slug}>
            <Link href={`/polis/${polis.slug}`} className="block rounded-lg border border-line bg-card p-4 hover:border-aegean">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] tracking-[0.16em] text-aegean">{polis.nameEn}</p>
                <KindBadge kind={polis.kind} />
              </div>
              <h2 className="mt-1 font-serif text-xl text-ink">{polis.nameKo}</h2>
              <p className="mt-1 text-xs text-muted">
                {polis.greek} · {polis.region} · {polis.years}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{polis.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-7 text-muted">
        위치를 같이 보려면 <Link href="/map" className="text-olive underline decoration-line underline-offset-4 hover:text-aegean">지도</Link>로 가면 됩니다.
      </p>
    </div>
  );
}
