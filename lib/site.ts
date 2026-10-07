export const SITE_NAME = "그리스이야기";
export const SITE_NAME_EN = "Greece Stories";
export const SITE_TAGLINE = "어려운 그리스 역사를, 짧은 한국어로";
export const SITE_SUB =
  "미케네에서 헬레니즘까지, 폴리스와 전쟁과 평범한 하루를 전설과 역사를 구분해 적습니다. 어려운 말에는 쉬운 풀이를 붙입니다.";
export const BRAND_LINE = "나두 — 나의 모든 일상을 AI와 함께";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://greece-stories.vercel.app";

export const MYTH_URL = "https://nadoo-myth.vercel.app";
export const MYTH_NAME = "나두신화";

export const ROME_URL = "https://rome-stories.vercel.app";
export const ROME_NAME = "로마이야기";

export const EGYPT_URL = "https://egypt-stories.vercel.app";
export const EGYPT_NAME = "이집트이야기";

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
] as const;

export const COUPANG_URL = "https://link.coupang.com/a/hsdzLh1vB6";

export const NAV = [
  { href: "/origins", label: "탄생·시대" },
  { href: "/map", label: "지도" },
  { href: "/polis", label: "폴리스" },
  { href: "/people", label: "인물" },
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
