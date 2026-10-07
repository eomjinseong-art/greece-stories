import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideBlock } from "@/components/GuideBlock";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RelatedMovies } from "@/components/RelatedMovies";
import { SourceList } from "@/components/SourceList";
import { eras } from "@/data/eras";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { MYTH_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "그리스의 시대",
  description: "미케네, 초기 철기, 고졸기, 고전기, 헬레니즘. 호메로스의 트로이 이야기와 청동기 궁전을 나누고 다섯 시대의 시간표를 짧게 정리합니다.",
  path: "/origins",
});

const legend = {
  en: "THE LEGEND",
  title: "시 속의 영웅들",
  summary: "트로이 전쟁, 테세우스, 헤라클레스는 그리스 도시가 자기 과거를 설명하려고 부른 이야기입니다. 민회의 연대기가 아닙니다.",
  points: [
    "『일리아스』는 전쟁 10년 중 짧은 며칠입니다. 목마와 함락은 그 시 밖에 있는 전승입니다.",
    "테세우스가 아테네의 마을을 하나로 합쳤다는 이야기는 도시의 기원 신화입니다.",
    "신탁과 신의 개입은 시와 헤로도토스 안에도 나옵니다. 그것만으로 연대를 확정하지는 않습니다.",
  ] as const,
  more: [
    `이야기 전문은 [나두신화의 트로이 전쟁](${MYTH_URL}/stories/trojan-war)과 [오디세이아](${MYTH_URL}/stories/odyssey)에 있습니다. 이 사이트는 그 시와 청동기 유적 사이의 간격만 표시합니다.`,
    "호메로스라는 이름 자체도 한 사람의 전기로 확정되지 않습니다. [호메로스](/people/homer)에서 무엇을 모르고 있는지를 적었습니다.",
    "영화 [트로이](/movies#troy)는 신들을 빼고 시간을 압축합니다. 시를 각색한 극이지, 시의 다음 판도 역사 재연도 아닙니다.",
  ],
};

const history = {
  en: "THE HISTORY",
  title: "궁전과 문자",
  summary: "전설을 걷어내도, 기원전 2천 년 후반의 그리스 본토에는 궁전 국가가 있었습니다. 그들의 글은 신화가 아니라 창고 장부입니다.",
  points: [
    "선형문자 B는 그리스어입니다. 점토판은 곡물, 가축, 사람의 목록입니다.",
    "미케네의 사자문과 티린스의 성벽은 그 궁전 시대의 돌입니다. 누가 왕이었는지는 판이 말해 주지 않습니다.",
    "기원전 1200년 무렵 여러 궁전이 끝납니다. 원인을 바다 민족이나 지진 하나로 단정하지 않습니다.",
  ] as const,
  more: [
    "글이 사라진 뒤의 수 세기를 암흑기라고 부른 적이 있습니다. 글이 없어서 어두운 것이지 사람이 없었다는 뜻은 아니라, 이 사이트는 초기 철기 시대라는 말을 앞에 둡니다.",
    "알파벳은 페니키아 글자를 빌려 기원전 8세기 무렵 다시 나타납니다. 그때부터 법과 시가 우리 쪽에 문장으로 남기 시작합니다.",
    "아래 다섯 칸은 교과서에서 쓰는 구분입니다. 경계 해는 반올림입니다. 480년과 323년은 전쟁이 끝난 해에 가깝고, 사람들의 살림은 그 전날과 다음 날이 갑자기 달라지지 않았습니다.",
  ],
};

const sources = [
  { work: "선형문자 B 문서", ref: "필로스·크노소스 등의 행정 점토판. 신화 문헌이 아닙니다" },
  { work: "호메로스", ref: "『일리아스』, 『오디세이아』. 서사시" },
  { work: "헤로도토스", ref: "『역사』. 페르시아 전쟁과 그 이전의 이야기" },
  { work: "투키디데스", ref: "전쟁사 1권. 먼 과거에 대한 그의 짧은 추론" },
  { work: "Robin Osborne", ref: "Greece in the Making. 초기 그리스를 나누는 현대 입문서. 문장은 옮기지 않았습니다" },
];

export default function OriginsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "탄생·시대", path: "/origins" },
          ]),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "탄생·시대" }]} />
      <PageHead
        kicker="ORIGINS"
        title="그리스의 시대"
        lead="그리스가 어려운 이유는 신화의 영웅, 청동기 궁전, 도시국가, 알렉산드로스의 왕국이 한 단어로 불리기 때문입니다. 먼저 시와 궁전을 나누고, 그다음 다섯 시대만 잡으면 됩니다."
      />
      <div className="mt-8 space-y-4">
        <GuideBlock {...legend} kind="legend" />
        <GuideBlock {...history} kind="history" />
        {eras.map((era) => (
          <GuideBlock key={era.id} id={era.id} en={era.en} title={era.title} summary={`${era.years}. ${era.summary}`} points={era.points} more={era.more} kind={era.kind} />
        ))}
      </div>
      <p className="mt-6 text-sm leading-7 text-muted">
        도시가 어디인지 같이 보려면{" "}
        <Link href="/map" className="text-olive underline decoration-line underline-offset-4 hover:text-aegean">
          지도
        </Link>
        로, 사람 이름은{" "}
        <Link href="/people" className="text-olive underline decoration-line underline-offset-4 hover:text-aegean">
          인물
        </Link>
        로 가면 됩니다.
      </p>
      <RelatedMovies topic="origins" />
      <SourceList sources={sources} />
    </article>
  );
}
