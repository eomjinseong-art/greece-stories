export const SITE_NAME = "그리스이야기";
export const SITE_NAME_EN = "Greece Stories";
export const SITE_TAGLINE = "어려운 그리스 역사를, 짧은 한국어로";
export const SITE_SUB =
  "미케네에서 헬레니즘까지, 폴리스와 전쟁과 평범한 하루를 전설과 역사를 구분해 적습니다. 어려운 말에는 쉬운 풀이를 붙입니다.";
export const BRAND_LINE = "나두 — 나의 모든 일상을 AI와 함께";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://greece-stories.vercel.app";

export const MYTH_URL = "https://nadoo-myth.vercel.app";
export const MYTH_NAME = "나두신화";

export const ILIAD_URL = "https://iliad-stories.vercel.app";
export const ILIAD_NAME = "일리아스이야기";

export const ROME_URL = "https://rome-stories.vercel.app";
export const ROME_NAME = "로마이야기";

export const EGYPT_URL = "https://egypt-stories.vercel.app";
export const EGYPT_NAME = "이집트이야기";

export const PERSIA_URL = "https://persia-stories.vercel.app";
export const PERSIA_NAME = "페르시아이야기";

export const CHOSEN_URL = "https://the-chosen-korean.vercel.app";
export const CHOSEN_NAME = "더 초즌 · 성경";

export const PHILOSOPHY_URL = "https://philosophy-stories.vercel.app";
export const PHILOSOPHY_NAME = "철학이야기";
/** Added on philosophy-stories in parallel. May 404 until that page ships. */
export const PHILOSOPHY_HOMER_URL = `${PHILOSOPHY_URL}/people/homer`;

export const KOREA_URL = "https://korea-stories.vercel.app";
export const KOREA_NAME = "대한민국이야기";

export const TIMELINE_URL = "https://nadoo-timeline.vercel.app";
export const TIMELINE_NAME = "나두연표";

export const HUB_URL = "https://tinalinkeom.vercel.app";
export const HUB_NAME = "나두 허브";

/**
 * Parallel pages that may 404 until their PRs merge.
 * A link checker should treat these as allowed, not as failures.
 */
export const LINK_CHECK_ALLOW = [ILIAD_URL, PHILOSOPHY_HOMER_URL] as const;

export const SISTER_LABEL = "나두 역사·신화";

export const SISTERS = [
  {
    href: MYTH_URL,
    name: MYTH_NAME,
    en: "MYTH",
    button: "나두신화에서 신화 읽기",
    note: "신들의 이야기, 트로이 전쟁, 그리스 신과 로마 신의 이름.",
    body: "신들의 이야기, 트로이 전쟁, 그리스 신과 로마 신의 이름 차이. 역사 글이 아니라 신화 사전입니다.",
  },
  {
    href: ILIAD_URL,
    name: ILIAD_NAME,
    en: "ILIAD",
    button: ILIAD_NAME,
    note: "일리아스의 51일, 아킬레우스의 분노.",
    body: "호메로스가 노래한 전쟁 51일을 짧은 한국어로 따라갑니다. 신화의 줄거리는 나두신화, 시의 장면은 이쪽입니다.",
  },
  {
    href: ROME_URL,
    name: ROME_NAME,
    en: "ROME",
    button: ROME_NAME,
    note: "왕정·공화정·제정, 포에니 전쟁, 클레오파트라.",
    body: "왕정·공화정·제정, 포에니 전쟁, 클레오파트라. 그리스 폴리스가 로마의 속주가 된 뒤의 이야기입니다.",
  },
  {
    href: EGYPT_URL,
    name: EGYPT_NAME,
    en: "EGYPT",
    button: EGYPT_NAME,
    note: "파라오와 나일강, 선왕조에서 클레오파트라.",
    body: "같은 집안의 자매 사이트입니다. 이집트의 긴 역사는 이 폴리스 글과 따로, 그 주소에서 이어 읽습니다.",
  },
  {
    href: PERSIA_URL,
    name: PERSIA_NAME,
    en: "PERSIA",
    button: PERSIA_NAME,
    note: "키루스부터 크세르크세스까지, 그리스와 맞선 제국.",
    body: "페르시아 전쟁의 상대편입니다. 마라톤과 테르모필라이를 제국 쪽에서 이어 읽습니다.",
  },
  {
    href: CHOSEN_URL,
    name: CHOSEN_NAME,
    en: "THE CHOSEN",
    button: CHOSEN_NAME,
    note: "성경을 쉬운 한국어로, 더 초즌과 함께.",
    body: "복음서와 출애굽, 페르시아 시대의 성경을 쉬운 말로 읽습니다. 고린도는 이 사이트의 코린토스와 같은 도시입니다.",
  },
  {
    href: PHILOSOPHY_URL,
    name: PHILOSOPHY_NAME,
    en: "PHILOSOPHY",
    button: PHILOSOPHY_NAME,
    note: "소크라테스, 플라톤, 그리고 동아시아의 철학.",
    body: "소크라테스와 플라톤을 철학 글로 이어 읽습니다. 이 사이트의 역사 인물과 겹치는 이름만 짧게 연결합니다.",
  },
  {
    href: KOREA_URL,
    name: KOREA_NAME,
    en: "KOREA",
    button: KOREA_NAME,
    note: "고조선부터 조선까지, 한반도의 왕과 시대.",
    body: "그리스 폴리스와 같은 시대에 한반도에서는 어떤 왕조가 있었는지, 그 역사는 이쪽에서 읽습니다.",
  },
  {
    href: TIMELINE_URL,
    name: TIMELINE_NAME,
    en: "TIMELINE",
    button: TIMELINE_NAME,
    note: "세계사 vs 한반도, 같은 해 무슨 일이?",
    body: "세계사와 한반도를 같은 해에 나란히 놓은 비교 연표. 폴리스의 시대에 한반도에서는 무슨 일이 있었는지 봅니다.",
  },
  {
    href: HUB_URL,
    name: HUB_NAME,
    en: "HUB",
    button: HUB_NAME,
    note: "나두의 역사·신화 사이트를 한곳에.",
    body: "신화, 그리스, 로마, 성경, 한반도를 한 목록에서 고릅니다.",
  },
] as const;

export const OTHER_FAMILY_TREES = [
  { href: `${MYTH_URL}/family-tree`, name: MYTH_NAME, en: "Myth" },
  { href: `${ROME_URL}/family-tree`, name: ROME_NAME, en: "Rome" },
  { href: `${EGYPT_URL}/family-tree`, name: EGYPT_NAME, en: "Egypt" },
  { href: `${PERSIA_URL}/family-tree`, name: PERSIA_NAME, en: "Persia" },
  { href: `${CHOSEN_URL}/family-tree`, name: CHOSEN_NAME, en: "The Chosen" },
  { href: `${KOREA_URL}/family-tree`, name: KOREA_NAME, en: "Korea" },
] as const;

export const OTHER_FILMS = [
  { href: `${MYTH_URL}/in-media`, name: MYTH_NAME, en: "Myth" },
  { href: `${ROME_URL}/movies`, name: ROME_NAME, en: "Rome" },
  { href: `${EGYPT_URL}/movies`, name: EGYPT_NAME, en: "Egypt" },
  { href: `${PERSIA_URL}/movies`, name: PERSIA_NAME, en: "Persia" },
  { href: `${CHOSEN_URL}/together`, name: CHOSEN_NAME, en: "The Chosen" },
  { href: `${PHILOSOPHY_URL}/films`, name: PHILOSOPHY_NAME, en: "Philosophy" },
  { href: `${KOREA_URL}/films`, name: KOREA_NAME, en: "Korea" },
] as const;

export const COUPANG_URL = "https://link.coupang.com/a/hsdzLh1vB6";

export const NAV = [
  { href: "/origins", label: "탄생·시대" },
  { href: "/map", label: "지도" },
  { href: "/polis", label: "폴리스" },
  { href: "/people", label: "인물" },
  { href: "/family-tree", label: "가족관계도" },
  { href: "/wars", label: "전쟁" },
  { href: "/daily", label: "일상" },
  { href: "/army", label: "군대" },
  { href: "/myth-links", label: "신과 전설" },
  { href: "/movies", label: "영화" },
  { href: "/sources", label: "출처" },
] as const;

export const HOME_SECTIONS = [
  {
    href: "/origins",
    en: "Origins",
    title: "시대",
    desc: "미케네, 초기 철기, 고졸기, 고전기, 헬레니즘. 호메로스의 트로이와 청동기 궁전을 먼저 나눕니다.",
  },
  {
    href: "/map",
    en: "Places",
    title: "지도",
    desc: "아테네와 스파르타만이 그리스가 아닙니다. 코린토스, 델포이, 이오니아, 마케도니아, 시라쿠사까지.",
  },
  {
    href: "/polis",
    en: "Poleis",
    title: "폴리스",
    desc: "도시국가의 말뜻을 잡고, 아테네·스파르타와 더불어 길을 잡는 도시 몇 곳을 짧게 봅니다.",
  },
  {
    href: "/people",
    en: "People",
    title: "인물",
    desc: "솔론, 페리클레스, 레오니다스, 알렉산드로스. 소크라테스와 플라톤은 글의 성격을 구분해 적습니다.",
  },
  {
    href: "/family-tree",
    en: "Family Tree",
    title: "가족관계도",
    desc: "마케도니아 왕가, 후계 왕조, 트로이 영웅의 전승, 아테네 알크메온 집안. 신의 가계는 나두신화로 넘깁니다.",
  },
  {
    href: "/wars",
    en: "Wars",
    title: "전쟁",
    desc: "페르시아 전쟁, 펠로폰네소스 전쟁, 알렉산드로스의 원정. 왜 싸웠는지와 끝나서 바뀐 것만.",
  },
  {
    href: "/daily",
    en: "Daily Life",
    title: "일상",
    desc: "아고라, 심포지온, 시민 여성, 노예와 헤일로타이, 올림픽. 영화의 연회가 아니라 기록에 가까운 쪽.",
  },
  {
    href: "/army",
    en: "Army",
    title: "군대",
    desc: "중장보병, 팔랑크스, 삼단노선. 스파르타의 훈련과 아테네의 노 젓는 시민은 다른 이야기입니다.",
  },
  {
    href: "/myth-links",
    en: "Gods",
    title: "신과 전설 연결",
    desc: "신과 트로이 이야기의 본문은 나두신화로 넘깁니다. 여기서는 역사 글과 닿는 길만 이어 둡니다.",
  },
  {
    href: "/movies",
    en: "Films",
    title: "관련 영화",
    desc: "300, 트로이, 알렉산더, 아고라, 오디세이아 각색. 어디가 창작인지도 함께. 불법 영상 링크는 없습니다.",
  },
  {
    href: "/sources",
    en: "Sources",
    title: "출처",
    desc: "헤로도토스, 투키디데스, 크세노폰, 아리아노스와 현대 입문서. 없는 말은 만들지 않는 기준.",
  },
] as const;
