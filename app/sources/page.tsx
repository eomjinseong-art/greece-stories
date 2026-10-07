import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import { EGYPT_NAME, EGYPT_URL, MYTH_NAME, MYTH_URL, ROME_NAME, ROME_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "출처",
  description: "그리스이야기가 근거로 삼은 헤로도토스, 투키디데스, 크세노폰, 아리스토텔레스, 플루타르코스, 아리아노스와 현대 입문서, 그리고 전설과 역사를 나누는 기준.",
  path: "/sources",
});

const ANCIENT = [
  ["호메로스", "『일리아스』, 『오디세이아』", "서사시입니다. 트로이 전쟁의 연대기가 아니므로 전설 쪽으로 다룹니다. 한 시인의 전기는 확정되지 않습니다."],
  ["헤시오도스", "『신통기』, 『일과 날』", "신들의 계보와 농부의 달력에 가까운 시입니다. 역사 연표로 쓰지 않습니다."],
  ["헤로도토스", "『역사』", "기원전 5세기. 페르시아 전쟁의 기본 이야기입니다. 궁정 대화와 신탁은 그가 모으고 구성한 이야기입니다."],
  ["투키디데스", "펠로폰네소스 전쟁사", "전쟁 당대에 가깝습니다. 연설은 취지에 맞추어 자기 문장으로 썼다고 1권에서 밝힙니다. 411년 무렵에서 책이 끊깁니다."],
  ["크세노폰", "『헬레니카』, 『아나바시스』, 『라케다이몬 인의 국가』, 『회상록』", "전쟁 말과 4세기, 스파르타 체제, 소크라테스에 대한 더 평범한 초상. 스파르타에 우호적인 곳이 있습니다."],
  ["아리스토텔레스", "『아테네 정체』, 『정치학』", "4세기 후반의 제도 정리와 정치 이론입니다. 노예와 여성에 대한 문장은 그의 주장이지 사실의 정의가 아닙니다."],
  ["플라톤", "대화편", "소크라테스를 등장인물로 한 철학 작품입니다. 법정 속기록이나 헌법이 아닙니다."],
  ["아리스토파네스", "『구름』 등 희극", "소크라테스와 정치가를 웃기는 당대 풍자입니다. 우호적인 전기가 아닙니다."],
  ["아이스킬로스", "『페르시아인』", "살라미스에 가까운 시대의 아테네 비극입니다. 페르시아 궁정의 보고서가 아닙니다."],
  ["데모스테네스", "필리포스 반대 연설", "필리포스 2세에 적대적인 아테네 정치가의 글입니다."],
  ["아리아노스", "『알렉산드로스 원정기』", "2세기. 프톨레마이오스와 아리스토불로스의 잃은 기록을 바탕으로 합니다. 측근의 시각입니다."],
  ["플루타르코스", "『영웅전』", "1–2세기. 솔론, 테미스토클레스, 페리클레스, 알렉산드로스 등. 도덕적 일화를 좋아하고, 리쿠르고스에 대해서는 불확실함을 스스로 말합니다."],
  ["디오도로스", "『역사 도서관』", "기원전 1세기의 종합입니다. 4세기 전투와 시칠리아에 자주 기대지만 숫자가 과장될 수 있습니다."],
  ["파우사니아스", "『그리스 안내기』", "2세기. 올림피아와 신전을 돌아본 기행입니다. 오래된 풍습의 세부는 그의 시대 전승입니다."],
  ["쿠르티우스 루푸스", "알렉산드로스 전기", "라틴어 전기. 극적 장면이 많고 연대가 불확실합니다. 아리아노스와 맞춰 봅니다."],
];

const THINGS = [
  ["선형문자 B 점토판", "궁전의 창고 장부. 필로스, 크노소스 등. 신화 책이 아닙니다."],
  ["미케네 사자문, 티린스 성벽", "청동기 궁전 시대의 돌. 호메로스의 왕 이름과 1:1로 연결되지 않습니다."],
  ["레프칸디 무덤", "초기 철기 시대에도 넉넉한 매장이 있었다는 예."],
  ["아테네 아고라", "시장·법정·주랑. 오랜 발굴로 광장의 자리가 확인됩니다."],
  ["파르테논", "기원전 447–432년 무렵. 공사비와 동맹 금고의 관계는 고대에도 논쟁이었습니다."],
  ["도편 추방 조각", "정치가 이름이 적힌 도자기 조각. 제도가 실제로 쓰였다는 물건입니다."],
  ["삼단노선 재현선", "현대의 실험선이지 고대 군함을 인양한 것이 아닙니다."],
];

const MODERN = [
  ["Robin Osborne", "Greece in the Making 1200–479 BC", "청동기 말부터 페르시아 전쟁까지의 입문서."],
  ["폴 카틀리지", "Ancient Greece: A Very Short Introduction 외", "스파르타와 알렉산드로스에 관한 현대 개설. 문장은 옮기지 않았습니다."],
  ["P. J. 로즈", "A History of the Classical Greek World", "고전기 정치사의 입문."],
  ["사이먼 혼블로워", "The Greek World 479–323 BC", "델로스 동맹부터 알렉산드로스까지의 개설."],
  ["사라 B. 포메로이", "Goddesses, Whores, Wives, and Slaves (1975)", "여성사 고전. 이후 연구가 많은 부분을 다듬었습니다."],
  ["앙겔로스 하니오티스", "Age of Conquests", "헬레니즘을 정복과 도시의 시대로 보는 현대 개설."],
  ["A. B. 보즈워스", "Conquest and Empire", "알렉산드로스 원정의 현대 연구서."],
];

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "출처", path: "/sources" },
          ]),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "출처" }]} />
      <PageHead
        kicker="SOURCES"
        title="출처"
        lead="그리스 역사는 승자와 후대 전기가 많은 자리를 채웁니다. 그리스이야기는 가능한 한 고대 기록의 이름과 위치를 밝히고, 그 기록이 언제 누구 편에서 쓰였는지를 같이 적습니다."
      />

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">적는 기준</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
          <li>전설, 역사, 둘이 섞인 글을 배지로 나눕니다. 호메로스와 리쿠르고스는 섞이거나 전설에 가깝습니다.</li>
          <li>고대 인물의 말풍선을 지어내지 않습니다. 유명한 한 줄이 후대의 요약이면 그 사실을 적고 인용으로 만들지 않습니다.</li>
          <li>소크라테스의 말은 플라톤·크세노폰·희극이라는 세 종류의 글입니다. 법정 속기록처럼 인용하지 않습니다.</li>
          <li>현대 연구서의 문장을 번역해 붙이지 않습니다. 책 이름만 입문 안내로 둡니다.</li>
          <li>영화 대사를 역사 속 인물의 말로 적지 않습니다. 불법으로 작품을 보는 방법은 안내하지 않습니다.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">고대 글</h2>
        <ul className="mt-3 space-y-3 text-sm leading-7">
          {ANCIENT.map(([author, work, note]) => (
            <li key={author}>
              <strong className="text-ink">{author}</strong> {work} — <span className="text-muted">{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">물건과 자리</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7">
          {THINGS.map(([name, note]) => (
            <li key={name}>
              <strong className="text-ink">{name}</strong> — <span className="text-muted">{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-xl text-ink">현대 입문서</h2>
        <ul className="mt-3 space-y-3 text-sm leading-7">
          {MODERN.map(([author, work, note]) => (
            <li key={author}>
              <strong className="text-ink">{author}</strong> {work} — <span className="text-muted">{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 text-sm leading-7 text-muted">
        <h2 className="font-serif text-base text-ink">표기</h2>
        <p className="mt-2">
          인명은 한국어에서 널리 쓰는 그리스어 음을 기준으로 했습니다. 알렉산드로스는 영어식 알렉산더보다 알렉산드로스를 본이름으로 두고, 영화 제목 『알렉산더』와 구분합니다. 아테네는 고대 이름 아테나이를 괄호처럼 필요할 때 붙입니다. 이집트의 테베와 그리스의 테바이는 다른 도시입니다.
        </p>
        <p className="mt-2">
          연도는 교과서에서 쓰는 전통 연대를 쓰되, 기원전 776년이나 솔론의 아르콘 해처럼 후대 계산인 경우에는 그 사실을 적습니다. 오류가 있으면 고대 기록과 맞춰 고치면 됩니다.
        </p>
        <p className="mt-2">
          신화의 줄거리는 <a className="text-olive underline decoration-line underline-offset-4 hover:text-aegean" href={MYTH_URL}>{MYTH_NAME}</a>, 로마의 제도와 전쟁은 <a className="text-olive underline decoration-line underline-offset-4 hover:text-aegean" href={ROME_URL}>{ROME_NAME}</a>, 이집트의 긴 역사는 자매 사이트 <a className="text-olive underline decoration-line underline-offset-4 hover:text-aegean" href={EGYPT_URL}>{EGYPT_NAME}</a>에서 이어 읽습니다.
        </p>
      </section>
    </div>
  );
}
