import type { LinkItem } from "@/data/types";

const MYTH = "https://nadoo-myth.vercel.app";

export const mythIntro = {
  en: "STORY AND CITY",
  title: "신화는 폴리스의 종교이기도 했습니다",
  summary:
    "그리스 도시는 신전, 축제, 신화 이야기를 같이 가지고 있었습니다. 다만 호메로스의 모험이 아테네 민회의 의사록은 아닙니다. 이야기 전문은 나두신화에 맡기고, 여기서는 역사 글과 닿는 길만 잇습니다.",
  points: [
    "같은 신이 도시마다 다른 제사 이름으로 모셔졌습니다. 아테나의 도시가 아테네만은 아니어도, 파르테논의 아테나는 그 도시의 수호신입니다.",
    "트로이 전쟁 이야기는 청동기 궁전이 무너진 뒤 수백 년이 지나 시로 정리되었습니다.",
    "로마가 같은 신에게 붙인 다른 이름은 나두신화의 그리스 vs 로마에서 비교합니다.",
  ] as const,
  more: [
    `신들의 가계와 모험은 [나두신화](${MYTH})에서 읽습니다. 그리스 이름과 로마 이름의 차이는 [그리스 vs 로마](${MYTH}/greece-vs-rome), 그 비교가 역사 속에서 어떻게 갈라졌는지는 [역사 설명](${MYTH}/greece-vs-rome/history)에 있습니다.`,
    "이 사이트의 인물 글은 솔론, 페리클레스, 알렉산드로스 같은 역사 속 사람입니다. 아킬레우스와 오디세우스는 시의 인물로 아래에 링크만 둡니다.",
  ],
};

export type MythCard = {
  slug: string;
  en: string;
  title: string;
  summary: string;
  href: string;
  note: string;
};

export const godLinks: readonly MythCard[] = [
  {
    slug: "athena",
    en: "ATHENA",
    title: "아테나",
    summary: "아테네의 수호신으로 파르테논에 모셔졌습니다. 전략과 기술의 여신이라는 신화와, 도시의 축제 파나테나이아는 겹치되 같은 글은 아닙니다.",
    href: `${MYTH}/gods/athena`,
    note: "로마 이름 미네르바",
  },
  {
    slug: "zeus",
    en: "ZEUS",
    title: "제우스",
    summary: "올림피아 경기의 주신입니다. 도시마다 제우스 제단이 있었고, 맹세의 신이기도 했습니다.",
    href: `${MYTH}/gods/zeus`,
    note: "로마 이름 유피테르",
  },
  {
    slug: "poseidon",
    en: "POSEIDON",
    title: "포세이돈",
    summary: "바다와 말의 신으로, 아테네의 수호 경쟁 신화와 해군 도시의 제사가 닿습니다. 함대의 설계도는 아닙니다.",
    href: `${MYTH}/gods/poseidon`,
    note: "로마 이름 넵투누스",
  },
  {
    slug: "apollo",
    en: "APOLLO",
    title: "아폴론",
    summary: "델포이 신탁과 델로스의 성소가 이 신의 이름에 묶입니다. 신탁은 도시의 정치이기도 했습니다.",
    href: `${MYTH}/gods/apollo`,
    note: "로마에서도 이름이 비슷합니다",
  },
  {
    slug: "artemis",
    en: "ARTEMIS",
    title: "아르테미스",
    summary: "에페소스의 거대한 신전으로 이오니아와 연결됩니다. 사냥의 처녀 신이라는 이야기와 그 도시의 숭배는 결이 다를 수 있습니다.",
    href: `${MYTH}/gods/artemis`,
    note: "로마 이름 디아나",
  },
  {
    slug: "ares",
    en: "ARES",
    title: "아레스",
    summary: "전쟁의 신으로 시에서는 자주 거칠게 나옵니다. 스파르타가 더 가깝게 모신 전쟁 쪽 이름으로는 아테나도 있었습니다. 신 하나가 모든 군대의 설명은 아닙니다.",
    href: `${MYTH}/gods/ares`,
    note: "로마의 마르스가 더 국가적인 전쟁 신입니다",
  },
  {
    slug: "dionysos",
    en: "DIONYSUS",
    title: "디오니소스",
    summary: "포도주와 연극의 신입니다. 아테네의 비극 경연은 이 신의 축제(디오니시아)에 붙어 있었습니다.",
    href: `${MYTH}/gods/dionysos`,
    note: "로마 이름 바쿠스",
  },
  {
    slug: "hera",
    en: "HERA",
    title: "헤라",
    summary: "아르고스의 헤라 신전은 그 도시의 큰 성소였습니다. 신화 속 질투하는 왕비와 도시의 여신을 한 장면으로만 보면 성소가 빠집니다.",
    href: `${MYTH}/gods/hera`,
    note: "로마 이름 유노",
  },
  {
    slug: "demeter",
    en: "DEMETER",
    title: "데메테르",
    summary: "곡식의 여신으로, 엘레우시스 밀의는 아테네 권역의 중요한 제사였습니다. 의례의 비밀은 고대에도 자세히 적히지 않았습니다.",
    href: `${MYTH}/gods/demeter`,
    note: "로마 이름 케레스",
  },
  {
    slug: "hermes",
    en: "HERMES",
    title: "헤르메스",
    summary: "길과 시장, 경계의 신입니다. 아테네 거리에 서 있던 헤르메스 기둥(헤르마이)을 훼손한 사건이 기원전 415년 정치를 흔듭니다.",
    href: `${MYTH}/gods/hermes`,
    note: "로마 이름 메르쿠리우스",
  },
];

export const storyLinks: readonly MythCard[] = [
  {
    slug: "trojan-war",
    en: "ILIAD",
    title: "트로이 전쟁",
    summary: "일리아스는 전쟁 10년 중 짧은 며칠의 분노를 다룹니다. 목마는 그 시의 본편이 아니라 후속 전승입니다.",
    href: `${MYTH}/stories/trojan-war`,
    note: "역사와의 간격은 시대 글에",
  },
  {
    slug: "trojan-horse",
    en: "HORSE",
    title: "트로이의 목마",
    summary: "오디세이아와 후대 시가 전하는 함락 이야기입니다. 발굴된 성의 화재 층이 이 목마를 증명하지는 않습니다.",
    href: `${MYTH}/stories/trojan-horse`,
    note: "영화가 좋아하는 장면",
  },
  {
    slug: "odyssey",
    en: "ODYSSEY",
    title: "오디세이아",
    summary: "오디세우스가 이타카로 돌아오는 길과, 그 집에서 벌어진 일입니다. 항해술 교본이 아닙니다.",
    href: `${MYTH}/stories/odyssey`,
    note: "각색 영화는 영화 목록에",
  },
  {
    slug: "judgment",
    en: "PARIS",
    title: "파리스의 심판",
    summary: "세 여신 중 누구에게 황금 사과를 주는가의 이야기입니다. 전쟁의 신화적 원인으로 붙습니다.",
    href: `${MYTH}/stories/judgment-of-paris`,
    note: "신들의 이야기",
  },
  {
    slug: "theseus",
    en: "THESEUS",
    title: "테세우스와 미노타우로스",
    summary: "아테네가 스스로에게 들려준 건국 영웅 이야기입니다. 크레타 궁전의 미궁이 이 설화의 설계도와 같지는 않습니다.",
    href: `${MYTH}/stories/theseus-minotaur`,
    note: "아테네의 전설",
  },
  {
    slug: "herakles",
    en: "HERAKLES",
    title: "헤라클레스의 과업",
    summary: "여러 도시의 영웅이 한 이름으로 모인 이야기입니다. 역사 속 장군의 전기가 아닙니다.",
    href: `${MYTH}/stories/herakles-labors`,
    note: "로마 이름 헤르쿨레스",
  },
  {
    slug: "argonauts",
    en: "ARGONAUTS",
    title: "아르고호",
    summary: "이아손과 동료들이 황금 양피를 찾아가는 모험입니다. 흑해 연안 그리스 도시의 상상과 닿아 있다고 설명되기도 합니다.",
    href: `${MYTH}/stories/argonauts`,
    note: "지리와 모험이 섞임",
  },
  {
    slug: "persephone",
    en: "PERSEPHONE",
    title: "페르세포네",
    summary: "계절과 저승을 설명하는 이야기입니다. 엘레우시스 밀의와 자주 연결해 말하지만, 비밀 의례의 대본은 남아 있지 않습니다.",
    href: `${MYTH}/stories/persephone`,
    note: "로마 이름 프로세르피나",
  },
];

export const compareLinks: readonly LinkItem[] = [
  { href: `${MYTH}/greece-vs-rome`, label: "그리스 vs 로마 전체" },
  { href: `${MYTH}/greece-vs-rome/history`, label: "이름이 갈라진 역사" },
  { href: `${MYTH}/greece-vs-rome/athena-minerva`, label: "아테나 · 미네르바" },
  { href: `${MYTH}/greece-vs-rome/zeus-jupiter`, label: "제우스 · 유피테르" },
  { href: `${MYTH}/greece-vs-rome/poseidon-neptune`, label: "포세이돈 · 넵투누스" },
  { href: `${MYTH}/greece-vs-rome/ares-mars`, label: "아레스 · 마르스" },
  { href: `${MYTH}/greece-vs-rome/apollo`, label: "아폴론" },
  { href: `${MYTH}/greece-vs-rome/herakles-hercules`, label: "헤라클레스 · 헤르쿨레스" },
  { href: `${MYTH}/gods/odysseus`, label: "오디세우스" },
  { href: `${MYTH}/gods/theseus`, label: "테세우스" },
  { href: `${MYTH}/stories/aeneid`, label: "아이네이스 — 로마 쪽 서사시" },
];

export const mythLinks: readonly LinkItem[] = [
  { href: "/family-tree?tree=trojan", label: "가족관계도 · 트로이 영웅" },
  { href: `${MYTH}/family-tree`, label: "나두신화 · 신들의 가족관계도" },
  { href: `${MYTH}/greece-vs-rome`, label: "나두신화 · 그리스 vs 로마" },
  { href: `${MYTH}/stories/trojan-war`, label: "나두신화 · 트로이 전쟁" },
  { href: `${MYTH}/stories/odyssey`, label: "나두신화 · 오디세이아" },
  { href: "/origins", label: "그리스의 시대" },
  { href: "/movies", label: "각색 영화" },
  { href: "https://rome-stories.vercel.app/myth-links", label: "로마이야기 · 신 이름" },
];
