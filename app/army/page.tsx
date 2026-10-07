import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideBlock } from "@/components/GuideBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RelatedMovies } from "@/components/RelatedMovies";
import { SourceList } from "@/components/SourceList";
import { armySources, armyTopics } from "@/data/army";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "군대",
  description: "그리스 중장보병, 팔랑크스, 삼단노선. 시민 민병과 스파르타의 훈련, 마케도니아의 긴 창, 아테네 해군의 노 젓는 사람을 구분합니다.",
  path: "/army",
});

export default function ArmyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "군대", path: "/army" },
          ]),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "군대" }]} />
      <PageHead
        kicker="THE ARMY"
        title="군대"
        lead="폴리스의 전쟁은 대개 자기 장비를 들고 나온 시민이 치렀습니다. 스파르타의 훈련, 아테네의 배, 마케도니아의 긴 창은 같은 ‘그리스 군대’가 아닙니다. 아래는 고전기 폴리스를 중심으로, 달라지는 지점만 표시합니다."
      />
      <div className="mt-8 space-y-4">
        {armyTopics.map((topic) => (
          <GuideBlock key={topic.id} id={topic.id} en={topic.en} title={topic.title} summary={topic.summary} points={topic.points} more={topic.more} kind="history" />
        ))}
      </div>
      <RelatedMovies topic="army" />
      <SourceList sources={armySources} />
    </article>
  );
}
