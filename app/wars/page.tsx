import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CauseGrid } from "@/components/CauseGrid";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RelatedMovies } from "@/components/RelatedMovies";
import { wars } from "@/data/wars";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "전쟁",
  description: "페르시아 전쟁, 펠로폰네소스 전쟁, 코린토스 전쟁, 레욱트라, 카이로네이아, 알렉산드로스의 원정. 왜 싸웠는지, 누구와 싸웠는지, 끝나서 무엇이 바뀌었는지를 정리합니다.",
  path: "/wars",
});

export default function WarsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "전쟁", path: "/wars" },
          ]),
          itemListLd(
            "그리스의 주요 전쟁",
            "/wars",
            wars.map((war) => ({ name: war.title, path: `/wars/${war.slug}` })),
          ),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "전쟁" }]} />
      <PageHead
        kicker="WARS"
        title="전쟁"
        lead="폴리스의 지도는 연설보다 전쟁에서 자주 바뀌었습니다. 각 카드는 왜 싸웠는지, 누구와 싸웠는지, 끝나서 무엇이 바뀌었는지만 먼저 보여 줍니다. 트로이 전쟁은 역사 전쟁의 목록이 아니라 신화 연결에 두었습니다."
      />
      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {wars.map((war) => (
          <li key={war.slug} className="rounded-lg border border-line bg-card p-5">
            <p className="text-[11px] tracking-[0.16em] text-aegean">{war.en}</p>
            <h2 className="mt-1 font-serif text-2xl text-ink">
              <Link href={`/wars/${war.slug}`} className="hover:text-aegean">
                {war.title}
              </Link>
            </h2>
            <p className="mt-1 text-xs text-muted">{war.years}</p>
            <p className="mt-2 text-sm leading-6">{war.summary}</p>
            <CauseGrid cause={war.cause} who={war.who} result={war.result} />
            <Link href={`/wars/${war.slug}`} className="mt-3 inline-block text-sm text-aegean">
              세 가지 포인트와 조금만 더 →
            </Link>
          </li>
        ))}
      </ul>
      <div className="mx-auto max-w-3xl">
        <RelatedMovies topic="wars" />
      </div>
    </div>
  );
}
