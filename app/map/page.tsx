import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideBlock } from "@/components/GuideBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RelatedLinks } from "@/components/RelatedLinks";
import { regions } from "@/data/places";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "지도",
  description: "아테네, 스파르타, 코린토스, 테바이, 델포이, 델로스, 이오니아, 마케도니아, 시라쿠사, 알렉산드리아. 그리스 세계가 한 도시가 아님을 지도 카드로 정리합니다.",
  path: "/map",
});

export default function MapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "지도", path: "/map" },
          ]),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "지도" }]} />
      <PageHead
        kicker="PLACES"
        title="지도"
        lead="그리스는 수도 하나의 나라 이름이 아니었습니다. 같은 말을 쓰는 도시국가와 성소, 북쪽 왕국, 바다 건너 새 도시가 모여 있었습니다. 경계는 세기마다 움직였습니다."
      />
      <div className="mt-8 space-y-12">
        {regions.map((region) => (
          <section key={region.id} id={region.id} className="scroll-mt-28">
            <p className="text-[11px] tracking-[0.16em] text-aegean">{region.en}</p>
            <h2 className="mt-1 font-serif text-2xl text-ink">{region.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{region.lead}</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {region.places.map((place) => (
                <GuideBlock key={place.id} id={place.id} en={place.en} title={place.title} summary={place.summary} points={place.points} more={place.more}>
                  {place.links ? <RelatedLinks links={place.links} /> : null}
                </GuideBlock>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
