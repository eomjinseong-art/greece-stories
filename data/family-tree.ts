/**
 * 가족관계도 (Family Tree).
 *
 * 신의 가계는 나두신화 /family-tree 에 있습니다. 여기서는 이 사이트가 다루는
 * 역사 가문과, 트로이 전쟁 영웅의 전승 가문만 그립니다.
 *
 * 칸을 더할 때
 * 1. 해당 가문의 seeds에 id, 한국어 이름, 로마자 이름, band, col, y를 넣습니다.
 * 2. col은 가문 전체에서 같은 가로 좌표입니다. 같은 줄의 col 차이는 1 이상으로 둡니다.
 * 3. 부모는 자식보다 위 세대에 두고 parent()로 잇습니다. 부부은 같은 줄에서 이웃하게 둡니다.
 * 4. 이 사이트의 /people/[slug] 가 있으면 slug를 넣습니다.
 * 5. 다른 사이트의 글은 also에 { href, label }로 넣습니다. '다른 사이트에서 더 보기'에 나옵니다.
 */

import type { LinkItem } from "@/data/types";
import { EGYPT_URL, MYTH_URL } from "@/lib/site";

export const TREE_IDS = ["macedon", "successors", "trojan", "athens"] as const;
export type TreeId = (typeof TREE_IDS)[number];
export type LinkKind = "parent" | "spouse" | "variant-parent";

export type TreeSeed = {
  id: string;
  ko: string;
  roman: string;
  greek?: string;
  band: string;
  /** Horizontal slot shared by every generation in this tree. Same-row gap ≥ 1. */
  col: number;
  y: number;
  slug?: string;
  href?: string;
  linkLabel?: string;
  /** Card's third line. Reign years for kings. Omit to show the parents' names. */
  tagline?: string;
  /** Longer date line in the detail panel. */
  years?: string;
  guestTag?: string;
  summary: string;
  note?: string;
  legend?: boolean;
  aliases?: string[];
  /** Extra pages on sister sites. The chart keeps a single primary href. */
  also?: readonly LinkItem[];
};

export type TreeLink = { from: string; to: string; kind: LinkKind };

export type BandMeta = {
  id: string;
  ko: string;
  en: string;
  hint: string;
  color: string;
  soft: string;
};

export type LayoutNode = TreeSeed & {
  x: number;
  y: number;
  w: number;
  h: number;
  sub: string;
  caption: string;
  href?: string;
  keys: string[];
};

export type LayoutEdge = {
  id: string;
  d: string;
  d2?: string;
  kind: LinkKind;
  from: string;
  to: string;
  local: boolean;
  quiet: boolean;
};

export type LayoutBand = BandMeta & {
  top: number;
  height: number;
  nodeIds: string[];
};

export type FamilyTree = {
  id: TreeId;
  ko: string;
  en: string;
  /** Whole chart is epic tradition, not a historical pedigree. */
  legend: boolean;
  blurb: string;
  width: number;
  height: number;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  bands: LayoutBand[];
  byId: Map<string, LayoutNode>;
  links: TreeLink[];
};

const COL = 150;
const NODE_W = 128;
const NODE_H = 96;
const PAD = 32;
const EGYPT_PTOLEMIES = `${EGYPT_URL}/origins#ptolemaic`;

export const LINE_LEGEND = [
  { id: "parent", label: "부모 → 자식", color: "#a6843d", dash: false, double: false },
  { id: "spouse", label: "배우자", color: "#8c2f2b", dash: false, double: true },
  { id: "variant", label: "전승으로 갈리는 관계", color: "#6d4c8a", dash: true, double: false },
] as const;

export const DISPUTES = [
  {
    id: "philip-wives",
    title: "필리포스 2세의 아내",
    main: "이 그림에는 자녀가 칸으로 있는 세 어머니만 있습니다. 올림피아스는 알렉산드로스와 클레오파트라의 어머니, 필린나는 아리다이오스의 어머니, 니케시폴리스는 테살로니케의 어머니입니다.",
    other:
      "아테나이오스가 인용하는 사티로스는 아내를 아우다타, 필라, 니케시폴리스, 올림피아스, 필린나, 메다, 클레오파트라 일곱으로 적습니다. 동시에 여러 아내를 두었는지, 순서가 연표인지는 논쟁입니다. 마지막 클레오파트라는 아탈로스의 조카로, 공주 클레오파트라와 다른 사람입니다.",
  },
  {
    id: "philip-start",
    title: "필리포스 2세의 즉위",
    main: "재위는 보통 기원전 359–336년으로 적습니다. 형 페르디카스 3세가 일리리아와의 전투에서 죽은 뒤입니다.",
    other: "유스티누스는 어린 조카 아민타스 4세의 후견으로 시작했다고 적습니다. 처음부터 왕이었다는 정리도 있습니다. 조카의 칸은 두지 않았습니다.",
  },
  {
    id: "helen-father",
    title: "헬레네의 아버지",
    main: "이 그림의 실선은 인간 부모 틴다레오스와 레다입니다. 클리타임네스트라도 그 부부의 딸로 보통 전합니다.",
    other: "『일리아스』는 헬레네를 제우스의 딸이라고 부릅니다. 신의 가계는 나두신화 가족관계도에 두고, 여기에는 제우스 칸을 넣지 않았습니다.",
  },
  {
    id: "atreus-daughters",
    title: "아가멤논의 딸 이름",
    main: "이피게네이아, 엘렉트라, 오레스테스는 후대 비극이 고정한 가계입니다. 오레스테스가 아가멤논의 아들이라는 것은 『오디세이아』에도 있습니다.",
    other:
      "『일리아스』 9권은 딸의 이름으로 크리소테미스, 라오디케, 이피아나사를 적습니다. 이피게네이아·엘렉트라와 같은 사람인지는 단정하지 않습니다.",
  },
  {
    id: "neoptolemus",
    title: "네오프톨레모스의 어머니",
    main: "아킬레우스의 아들이라는 관계는 『오디세이아』에 있습니다. 아버지에서 아들로 가는 금색 선은 그 전승입니다.",
    other: "어머니 데이다메이아와 스키로스의 혼인은 그 뒤의 서사시와 비극이 전합니다. 그래서 어머니 선만 보라색 점선입니다.",
  },
  {
    id: "alcmaeonid",
    title: "데이노마케의 아버지",
    main: "헤로도토스 6권 131은 메가클레스와 시퀴온의 아가리스테에서 클레이스테네스와 히포크라테스를, 히포크라테스의 딸 아가리스테와 크산티포스에서 페리클레스를 잇습니다.",
    other:
      "플루타르코스는 알키비아데스의 어머니를 메가클레스의 딸 데이노마케라고만 적습니다. 그 메가클레스를 히포크라테스의 아들로 두는 것은 이름을 맞춘 통상 정리입니다.",
  },
] as const;

export const NAME_NOTES = [
  {
    title: "테티스와 테튀스",
    body: "아킬레우스의 어머니 테티스(Thetis)는 바다의 님프입니다. 나두신화 가계도의 테튀스(Tethys)는 오케아노스의 아내인 티탄으로, 다른 신입니다.",
  },
  {
    title: "두 클레오파트라",
    body: "마케도니아의 클레오파트라는 필리포스 2세와 올림피아스의 딸입니다. 이집트의 클레오파트라 7세는 프톨레마이오스 왕조의 마지막 통치자로, 훨씬 뒤의 사람입니다.",
  },
  {
    title: "두 에우리디케",
    body: "아민타스 3세의 아내 에우리디케가 필리포스 2세의 어머니입니다. 필리포스 3세의 아내 아데아 에우리디케는 다른 사람이라 이 그림에 넣지 않았습니다.",
  },
  {
    title: "파리스의 다른 이름",
    body: "파리스는 알렉산드로스라고도 불립니다. 마케도니아의 알렉산드로스 대왕과 같은 사람이 아닙니다.",
  },
  {
    title: "히포크라테스",
    body: "이 가계의 히포크라테스는 클레이스테네스의 동생입니다. 코스 섬의 의학자 히포크라테스가 아닙니다.",
  },
  {
    title: "아르게아스라는 이름",
    body: "마케도니아 왕실은 헤라클레스의 후손을 자처했습니다. 그 신화 쪽 시조는 그리지 않았고, 역사로 잡는 아민타스 3세부터 시작합니다.",
  },
] as const;

type TreeSpec = {
  id: TreeId;
  ko: string;
  en: string;
  legend: boolean;
  blurb: string;
  bands: BandMeta[];
  seeds: TreeSeed[];
  links: TreeLink[];
};

function macedonLinks(): TreeLink[] {
  const links: TreeLink[] = [];
  const parent = (from: string, to: string) => links.push({ from, to, kind: "parent" });
  const parents = (child: string, ...from: string[]) => from.forEach((id) => parent(id, child));
  const spouse = (a: string, b: string) => links.push({ from: a, to: b, kind: "spouse" });

  spouse("eurydice", "amyntas-iii");
  parents("alexander-ii", "amyntas-iii", "eurydice");
  parents("perdiccas-iii", "amyntas-iii", "eurydice");
  parents("philip-ii", "amyntas-iii", "eurydice");

  spouse("philip-ii", "olympias");
  spouse("philip-ii", "philinna");
  spouse("philip-ii", "nicesipolis");
  parents("alexander", "philip-ii", "olympias");
  parents("cleopatra-macedon", "philip-ii", "olympias");
  parents("philip-iii", "philip-ii", "philinna");
  parents("thessalonike", "philip-ii", "nicesipolis");

  spouse("alexander", "roxana");
  parents("alexander-iv", "alexander", "roxana");
  return links;
}

function successorLinks(): TreeLink[] {
  const links: TreeLink[] = [];
  const parents = (child: string, ...from: string[]) => from.forEach((id) => links.push({ from: id, to: child, kind: "parent" }));
  const spouse = (a: string, b: string) => links.push({ from: a, to: b, kind: "spouse" });
  spouse("ptolemy-i", "berenice-i");
  spouse("seleucus-i", "apama");
  spouse("antigonus-i", "stratonice");
  parents("ptolemy-ii", "ptolemy-i", "berenice-i");
  parents("antiochus-i", "seleucus-i", "apama");
  parents("demetrius-i", "antigonus-i", "stratonice");
  return links;
}

function trojanLinks(): TreeLink[] {
  const links: TreeLink[] = [];
  const parent = (from: string, to: string) => links.push({ from, to, kind: "parent" });
  const parents = (child: string, ...from: string[]) => from.forEach((id) => parent(id, child));
  const spouse = (a: string, b: string) => links.push({ from: a, to: b, kind: "spouse" });
  const variantParent = (from: string, to: string) => links.push({ from, to, kind: "variant-parent" });

  spouse("atreus", "aerope");
  spouse("tyndareus", "leda");
  spouse("peleus", "thetis");
  spouse("priam", "hecuba");
  parents("agamemnon", "atreus", "aerope");
  parents("menelaus", "atreus", "aerope");
  parents("clytemnestra", "tyndareus", "leda");
  parents("helen", "tyndareus", "leda");
  spouse("agamemnon", "clytemnestra");
  spouse("menelaus", "helen");
  parents("iphigenia", "agamemnon", "clytemnestra");
  parents("electra", "agamemnon", "clytemnestra");
  parents("orestes", "agamemnon", "clytemnestra");

  parents("achilles", "peleus", "thetis");
  spouse("achilles", "deidamia");
  parent("achilles", "neoptolemus");
  variantParent("deidamia", "neoptolemus");

  spouse("odysseus", "penelope");
  parents("telemachus", "odysseus", "penelope");
  parents("hector", "priam", "hecuba");
  parents("paris", "priam", "hecuba");
  parents("cassandra", "priam", "hecuba");
  return links;
}

function athensLinks(): TreeLink[] {
  const links: TreeLink[] = [];
  const parent = (from: string, to: string) => links.push({ from, to, kind: "parent" });
  const parents = (child: string, ...from: string[]) => from.forEach((id) => parent(id, child));
  const spouse = (a: string, b: string) => links.push({ from: a, to: b, kind: "spouse" });

  parent("alcmaeon", "megacles");
  parent("cleisthenes-sicyon", "agariste-sicyon");
  spouse("megacles", "agariste-sicyon");
  parents("cleisthenes", "megacles", "agariste-sicyon");
  parents("hippocrates", "megacles", "agariste-sicyon");
  parent("hippocrates", "megacles-ii");
  parent("hippocrates", "agariste");
  spouse("agariste", "xanthippus");
  parents("pericles", "agariste", "xanthippus");
  parents("ariphron", "agariste", "xanthippus");
  parent("megacles-ii", "deinomache");
  spouse("deinomache", "cleinias");
  parents("alcibiades", "deinomache", "cleinias");
  return links;
}

const MACEDON_BANDS: BandMeta[] = [
  {
    id: "amyntas",
    ko: "아민타스",
    en: "Amyntas",
    hint: "필리포스 2세의 부모입니다. 왕실이 헤라클레스의 후손이라고 한 신화 쪽 시조는 그리지 않았습니다.",
    color: "#1a5278",
    soft: "#e7eef4",
  },
  {
    id: "philip",
    ko: "필리포스 세대",
    en: "Philip",
    hint: "아민타스의 세 아들과, 이 그림에 자녀가 있는 필리포스의 아내들입니다. 재위 연도가 이어지지 않는 칸은 그 사이에 섭정이 있다는 뜻입니다.",
    color: "#8a5a24",
    soft: "#fbf3e6",
  },
  {
    id: "children",
    ko: "필리포스의 자녀",
    en: "Children",
    hint: "알렉산드로스와 그의 형제자매, 그리고 알렉산드로스의 왕비 록사네입니다.",
    color: "#7a3454",
    soft: "#f8eef2",
  },
  {
    id: "heir",
    ko: "다음 왕",
    en: "Next king",
    hint: "알렉산드로스가 죽은 뒤에 태어난 아들입니다. 필리포스 3세와 함께 이름뿐인 왕이었습니다.",
    color: "#2d6844",
    soft: "#e8f4ee",
  },
];

const SUCCESSOR_BANDS: BandMeta[] = [
  {
    id: "founders",
    ko: "창시자",
    en: "Founders",
    hint: "한 피가 아닙니다. 알렉산드로스의 부하들이 나눈 세 왕조의 시작과, 첫 후계의 어머니입니다.",
    color: "#1a5278",
    soft: "#e7eef4",
  },
  {
    id: "heirs",
    ko: "첫 후계",
    en: "First heirs",
    hint: "각 왕조에서 왕위를 이은 아들입니다. 그 뒤의 긴 계보는 그리지 않았습니다.",
    color: "#2d6844",
    soft: "#e8f4ee",
  },
];

const TROJAN_BANDS: BandMeta[] = [
  {
    id: "elders",
    ko: "윗세대",
    en: "Elders",
    hint: "서사시가 말하는 부모입니다. 청동기 궁전의 행정 문서에 나오는 족보가 아닙니다.",
    color: "#6d4c8a",
    soft: "#f3eef8",
  },
  {
    id: "heroes",
    ko: "전쟁 세대",
    en: "The war",
    hint: "트로이 전쟁 이야기의 왕과 왕비, 영웅입니다. 파리스와 헬레네는 부부로 잇지 않았습니다.",
    color: "#1a5278",
    soft: "#e7eef4",
  },
  {
    id: "next",
    ko: "자녀",
    en: "Children",
    hint: "비극과 『오디세이아』가 잇는 다음 세대입니다. 이피게네이아와 엘렉트라의 이름은 호메로스의 딸 이름과 다릅니다.",
    color: "#8a5a24",
    soft: "#fbf3e6",
  },
];

const ATHENS_BANDS: BandMeta[] = [
  {
    id: "origin",
    ko: "6세기",
    en: "Sixth century",
    hint: "알크메온 집안의 이름과, 시퀴온에서 시집온 아가리스테의 아버지입니다.",
    color: "#8a5a24",
    soft: "#fbf3e6",
  },
  {
    id: "match",
    ko: "혼인",
    en: "Marriage",
    hint: "헤로도토스가 적은 메가클레스와 시퀴온의 아가리스테입니다.",
    color: "#7a3454",
    soft: "#f8eef2",
  },
  {
    id: "reform",
    ko: "개혁 세대",
    en: "Reform",
    hint: "아테네의 클레이스테네스와 그의 동생 히포크라테스입니다.",
    color: "#1a5278",
    soft: "#e7eef4",
  },
  {
    id: "parents",
    ko: "다음 세대",
    en: "Next",
    hint: "히포크라테스의 자녀와, 페리클레스의 아버지 크산티포스입니다.",
    color: "#3e5340",
    soft: "#e7f0ea",
  },
  {
    id: "classical",
    ko: "고전기",
    en: "Classical",
    hint: "페리클레스와 그의 형제, 그리고 알키비아데스의 부모입니다.",
    color: "#0f3a56",
    soft: "#e7eef4",
  },
  {
    id: "war",
    ko: "전쟁 세대",
    en: "War generation",
    hint: "펠로폰네소스 전쟁 후반의 알키비아데스입니다.",
    color: "#6d3d52",
    soft: "#f8eef2",
  },
];

const SPECS: TreeSpec[] = [
  {
    id: "macedon",
    ko: "마케도니아 왕가",
    en: "Macedon",
    legend: false,
    blurb: "아민타스 3세부터 알렉산드로스 4세까지. 칸의 연도는 왕으로 센 통상 재위입니다.",
    bands: MACEDON_BANDS,
    links: macedonLinks(),
    seeds: [
      {
        id: "amyntas-iii",
        ko: "아민타스 3세",
        roman: "Amyntas III",
        greek: "Ἀμύντας",
        band: "amyntas",
        col: 4.4,
        y: 80,
        tagline: "기원전 393–370",
        years: "재위 기원전 393–370년. 시작 해는 통상 연대입니다.",
        summary: "필리포스 2세의 아버지입니다. 재위 초에 잠시 나라 밖으로 밀려났다가 돌아왔다는 기록이 있습니다.",
        aliases: ["amyntas", "amyntas iii", "아민타스", "아민타스 3세"],
      },
      {
        id: "eurydice",
        ko: "에우리디케",
        roman: "Eurydice",
        greek: "Εὐρυδίκη",
        band: "amyntas",
        col: 3.4,
        y: 80,
        tagline: "일리리아",
        guestTag: "아민타스의 아내",
        summary: "아민타스 3세의 아내이고, 알렉산드로스 2세·페르디카스 3세·필리포스 2세의 어머니입니다.",
        note: "필리포스 3세의 아내 아데아 에우리디케와는 다른 사람입니다. 아들들의 죽음에 그녀가 개입했다는 후대 기록은 적대적인 소문으로 둡니다.",
        aliases: ["eurydice", "에우리디케"],
      },
      {
        id: "alexander-ii",
        ko: "알렉산드로스 2세",
        roman: "Alexander II",
        greek: "Ἀλέξανδρος",
        band: "philip",
        col: 0.2,
        y: 280,
        tagline: "기원전 370–368",
        years: "재위 기원전 370–368년으로 보통 잡습니다.",
        summary: "아민타스 3세의 맏아들입니다. 짧게 왕위에 있다가 죽었고, 그 뒤 몇 해는 알로로스의 프톨레마이오스가 섭정으로 전합니다.",
        aliases: ["alexander ii", "알렉산드로스 2세"],
      },
      {
        id: "perdiccas-iii",
        ko: "페르디카스 3세",
        roman: "Perdiccas III",
        greek: "Περδίκκας",
        band: "philip",
        col: 1.4,
        y: 280,
        tagline: "기원전 365–359",
        years: "재위 기원전 365–359년.",
        summary: "필리포스 2세의 형입니다. 일리리아와의 전투에서 죽었고, 그 자리가 필리포스에게 넘어갑니다.",
        note: "알렉산드로스 2세의 재위와 그의 재위 사이에는 섭정 몇 해가 있습니다. 칸의 연도가 바로 이어지지 않는 이유입니다.",
        aliases: ["perdiccas", "perdiccas iii", "페르디카스", "페르디카스 3세"],
      },
      {
        id: "philip-ii",
        ko: "필리포스 2세",
        roman: "Philip II",
        greek: "Φίλιππος",
        band: "philip",
        col: 4.4,
        y: 280,
        slug: "philip-ii",
        tagline: "기원전 359–336",
        years: "재위 기원전 359–336년.",
        summary: "마케도니아를 남쪽 폴리스보다 강한 군사 국가로 만든 왕입니다. 기원전 336년 아이가이에서 암살됩니다.",
        note: "어린 조카의 후견으로 시작했다는 기록과, 처음부터 왕이었다는 정리가 같이 있습니다. 아내 일곱 명의 목록 가운데 여기에는 세 어머니만 그렸습니다.",
        aliases: ["philip", "philip ii", "필리포스", "필립", "필리포스 2세"],
      },
      {
        id: "olympias",
        ko: "올림피아스",
        roman: "Olympias",
        greek: "Ὀλυμπιάς",
        band: "philip",
        col: 5.4,
        y: 280,
        tagline: "에페이로스",
        guestTag: "몰리소스 왕가",
        summary: "에페이로스의 올림피아스입니다. 알렉산드로스와 클레오파트라의 어머니이고, 기원전 316년 카산드로스 쪽에서 죽었다고 전합니다.",
        aliases: ["olympias", "올림피아스", "올림피아스"],
      },
      {
        id: "philinna",
        ko: "필린나",
        roman: "Philinna",
        greek: "Φίλιννα",
        band: "philip",
        col: 3.4,
        y: 280,
        tagline: "라리사",
        summary: "테살리아 라리사 출신으로 전하는 필리포스의 아내입니다. 필리포스 3세 아리다이오스의 어머니입니다.",
        note: "신분이 낮았다는 후대 문장은 적대적인 기록에 가깝습니다. 여기서는 출신지와 아들만 적습니다.",
        aliases: ["philinna", "필린나"],
      },
      {
        id: "nicesipolis",
        ko: "니케시폴리스",
        roman: "Nicesipolis",
        greek: "Νικησίπολις",
        band: "philip",
        col: 8.2,
        y: 280,
        tagline: "페라이",
        summary: "테살리아 페라이 출신의 아내로 전합니다. 테살로니케의 어머니입니다.",
        aliases: ["nicesipolis", "nicasipolis", "니케시폴리스"],
      },
      {
        id: "alexander",
        ko: "알렉산드로스",
        roman: "Alexander III",
        greek: "Ἀλέξανδρος",
        band: "children",
        col: 4.8,
        y: 480,
        slug: "alexander",
        tagline: "기원전 336–323",
        years: "재위 기원전 336–323년. 바빌론 천문 일지는 죽음을 323년 6월로 남깁니다.",
        summary: "필리포스 2세와 올림피아스의 아들입니다. 페르시아 원정 끝에 기원전 323년 바빌론에서 열병 중에 죽었다고 기록됩니다.",
        aliases: ["alexander", "alexandros", "alexander the great", "alexander iii", "알렉산드로스", "알렉산더"],
      },
      {
        id: "roxana",
        ko: "록사네",
        roman: "Roxana",
        greek: "Ῥωξάνη",
        band: "children",
        col: 5.8,
        y: 480,
        tagline: "소그디아나",
        summary: "소그디아나의 귀족 옥시아르테스의 딸입니다. 기원전 327년 알렉산드로스와 혼인했고, 그가 죽은 뒤 알렉산드로스 4세를 낳았습니다.",
        note: "수사에서 다른 혼인도 전합니다. 아들이 기록된 왕비는 록사네입니다. 어머니와 아들은 기원전 310년 무렵 함께 죽었다고 전합니다.",
        aliases: ["roxana", "roxane", "록사네", "록사나"],
      },
      {
        id: "cleopatra-macedon",
        ko: "클레오파트라",
        roman: "Cleopatra",
        greek: "Κλεοπάτρα",
        band: "children",
        col: 6.8,
        y: 480,
        tagline: "마케도니아",
        summary: "필리포스 2세와 올림피아스의 딸이고 알렉산드로스의 누이입니다. 이집트의 클레오파트라 7세가 아닙니다.",
        note: "기원전 336년 에페이로스의 알렉산드로스와 혼인합니다. 오빠가 죽은 뒤 여러 후계자가 이 공주와의 혼인을 노렸고, 기원전 308년 무렵 사르디스에서 죽었다고 전합니다.",
        aliases: ["cleopatra", "cleopatra of macedon", "클레오파트라", "클레오파트라 마케도니아"],
      },
      {
        id: "philip-iii",
        ko: "필리포스 3세",
        roman: "Arrhidaeus",
        greek: "Ἀρριδαῖος",
        band: "children",
        col: 3.4,
        y: 480,
        tagline: "기원전 323–317",
        years: "재위 기원전 323–317년. 알렉산드로스 4세와 이름뿐인 공동 왕이었습니다.",
        summary: "필리포스 2세와 필린나의 아들 아리다이오스입니다. 이복형 알렉산드로스가 죽은 뒤 필리포스 3세로 추대되었고, 기원전 317년 올림피아스 쪽에서 죽었다고 전합니다.",
        note: "판단이 어렵다는 후대 기록이 있습니다. 어디가 병이고 어디가 적대적인 묘사인지 단정하지 않습니다. 아내 아데아 에우리디케는 이 그림에 없습니다.",
        aliases: ["arrhidaeus", "philip iii", "philip arrhidaeus", "아리다이오스", "필리포스 3세"],
      },
      {
        id: "thessalonike",
        ko: "테살로니케",
        roman: "Thessalonike",
        greek: "Θεσσαλονίκη",
        band: "children",
        col: 8.2,
        y: 480,
        summary: "필리포스 2세와 니케시폴리스의 딸입니다. 카산드로스의 아내가 되었고, 테살로니키는 이 공주의 이름으로 세워졌다고 전합니다.",
        aliases: ["thessalonike", "thessalonice", "테살로니케", "테살로니키"],
      },
      {
        id: "alexander-iv",
        ko: "알렉산드로스 4세",
        roman: "Alexander IV",
        greek: "Ἀλέξανδρος",
        band: "heir",
        col: 5.3,
        y: 680,
        tagline: "기원전 323–310",
        years: "이름뿐인 재위 기원전 323–310년 무렵. 죽은 해는 310년 또는 309년으로 잡습니다.",
        summary: "알렉산드로스와 록사네의 아들로, 아버지가 죽은 뒤에 태어났습니다. 실권을 갖지 못했고, 카산드로스 쪽에서 어머니와 함께 죽었다고 전합니다.",
        aliases: ["alexander iv", "알렉산드로스 4세"],
      },
    ],
  },
  {
    id: "successors",
    ko: "후계 왕조",
    en: "Successors",
    legend: false,
    blurb: "피가 이어진 한 가문이 아닙니다. 이집트, 셀레우코스, 안티고노스 왕조의 창시자와 첫 아들입니다.",
    bands: SUCCESSOR_BANDS,
    links: successorLinks(),
    seeds: [
      {
        id: "ptolemy-i",
        ko: "프톨레마이오스 1세",
        roman: "Ptolemy I",
        greek: "Πτολεμαῖος",
        band: "founders",
        col: 0,
        y: 80,
        href: EGYPT_PTOLEMIES,
        linkLabel: "이집트이야기",
        tagline: "기원전 305–282",
        years: "이집트 왕 기원전 305–282년. 총독으로는 323년부터입니다.",
        summary: "알렉산드로스의 부하로, 이집트를 맡아 기원전 305년 왕을 칭한 프톨레마이오스 1세 소테르입니다.",
        note: "이집트의 그 다음 역사와 클레오파트라 7세는 이집트이야기에 있습니다. 여기에는 첫 아들까지만 그립니다.",
        also: [{ href: `${EGYPT_URL}/family-tree?tab=ptolemy&focus=ptolemy-i`, label: "이집트이야기 · 프톨레마이오스 가계" }],
        aliases: ["ptolemy", "ptolemy i", "ptolemy soter", "프톨레마이오스", "프톨레마이오스 1세"],
      },
      {
        id: "berenice-i",
        ko: "베레니케 1세",
        roman: "Berenice I",
        greek: "Βερενίκη",
        band: "founders",
        col: 1,
        y: 80,
        tagline: "마케도니아",
        summary: "프톨레마이오스 1세의 아내이고 프톨레마이오스 2세의 어머니입니다. 그 앞의 아내 에우리디케는 이 그림에 없습니다.",
        aliases: ["berenice", "berenice i", "베레니케"],
      },
      {
        id: "seleucus-i",
        ko: "셀레우코스 1세",
        roman: "Seleucus I",
        greek: "Σέλευκος",
        band: "founders",
        col: 3.4,
        y: 80,
        tagline: "기원전 305–281",
        years: "왕 기원전 305–281년. 셀레우코스 기원이라는 해 세기는 312년으로, 왕을 칭한 해와는 다릅니다.",
        summary: "바빌론에서 시작해 시리아와 동쪽을 아우른 셀레우코스 1세 니카토르입니다. 기원전 281년 프톨레마이오스 케라우노스에게 죽었다고 전합니다.",
        aliases: ["seleucus", "seleucus i", "셀레우코스", "셀레우코스 1세"],
      },
      {
        id: "apama",
        ko: "아파마",
        roman: "Apama",
        greek: "Ἀπάμα",
        band: "founders",
        col: 4.4,
        y: 80,
        tagline: "소그디아나",
        summary: "셀레우코스 1세의 아내이고 안티오코스 1세의 어머니입니다. 스피타메네스의 딸로 보통 적습니다.",
        aliases: ["apama", "아파마"],
      },
      {
        id: "antigonus-i",
        ko: "안티고노스 1세",
        roman: "Antigonus I",
        greek: "Ἀντίγονος",
        band: "founders",
        col: 6.8,
        y: 80,
        tagline: "기원전 306–301",
        years: "왕을 칭한 해 기원전 306–301년. 그 전에는 프리기아의 총독이었습니다.",
        summary: "외눈의 안티고노스입니다. 기원전 301년 이프소스 전투에서 죽었고, 마케도니아에 오래 자리 잡은 것은 손자 세대입니다.",
        aliases: ["antigonus", "antigonus i", "antigonos", "안티고노스", "안티고노스 1세"],
      },
      {
        id: "stratonice",
        ko: "스트라토니케",
        roman: "Stratonice",
        greek: "Στρατονίκη",
        band: "founders",
        col: 7.8,
        y: 80,
        tagline: "안티고노스의 아내",
        summary: "안티고노스 1세의 아내이고 데메트리오스 1세의 어머니입니다. 나중에 셀레우코스 집안으로 시집간 스트라토니케와는 다른 사람입니다.",
        aliases: ["stratonice", "stratonic", "스트라토니케"],
      },
      {
        id: "ptolemy-ii",
        ko: "프톨레마이오스 2세",
        roman: "Ptolemy II",
        greek: "Πτολεμαῖος",
        band: "heirs",
        col: 0.5,
        y: 280,
        href: EGYPT_PTOLEMIES,
        linkLabel: "이집트이야기",
        tagline: "기원전 285–246",
        years: "기원전 285년부터 아버지와 함께, 282년부터 혼자 246년까지.",
        summary: "프톨레마이오스 2세 필라델포스입니다. 이집트 왕조를 이은 아들이고, 다른 아들 케라우노스는 이 그림에 없습니다.",
        aliases: ["ptolemy ii", "ptolemy philadelphus", "프톨레마이오스 2세"],
      },
      {
        id: "antiochus-i",
        ko: "안티오코스 1세",
        roman: "Antiochus I",
        greek: "Ἀντίοχος",
        band: "heirs",
        col: 3.9,
        y: 280,
        tagline: "기원전 281–261",
        years: "왕 기원전 281–261년.",
        summary: "셀레우코스 1세와 아파마의 아들 안티오코스 1세 소테르입니다.",
        aliases: ["antiochus", "antiochus i", "안티오코스", "안티오코스 1세"],
      },
      {
        id: "demetrius-i",
        ko: "데메트리오스 1세",
        roman: "Demetrius I",
        greek: "Δημήτριος",
        band: "heirs",
        col: 7.3,
        y: 280,
        tagline: "기원전 294–288",
        years: "마케도니아 왕 기원전 294–288년. 아버지와 함께 왕을 칭한 것은 306년부터입니다.",
        summary: "도시를 에워싸는 자로 불린 데메트리오스입니다. 아들 안티고노스 2세 고나타스가 나중에 마케도니아를 잡습니다. 그 아들은 이 그림에 없습니다.",
        note: "기원전 283년 셀레우코스 쪽 포로로 죽었다고 전합니다.",
        aliases: ["demetrius", "demetrius i", "demetrios", "데메트리오스", "데메트리오스 1세"],
      },
    ],
  },
  {
    id: "trojan",
    ko: "트로이 전쟁 영웅",
    en: "Trojan War",
    legend: true,
    blurb: "서사시와 비극의 가계입니다. 청동기 궁전 기록의 족보가 아니라서 전승으로 표시합니다.",
    bands: TROJAN_BANDS,
    links: trojanLinks(),
    seeds: [
      {
        id: "atreus",
        ko: "아트레우스",
        roman: "Atreus",
        greek: "Ἀτρεύς",
        band: "elders",
        col: 0,
        y: 80,
        tagline: "미케네",
        summary: "아가멤논과 메넬라오스의 아버지로 전합니다. 아버지 펠롭스와 동생 티에스테스는 이 그림에 넣지 않았습니다.",
        aliases: ["atreus", "아트레우스"],
      },
      {
        id: "aerope",
        ko: "아에로페",
        roman: "Aerope",
        greek: "Ἀερόπη",
        band: "elders",
        col: 1,
        y: 80,
        tagline: "어머니",
        summary: "아가멤논과 메넬라오스의 어머니로 보통 전하는 아에로페입니다.",
        aliases: ["aerope", "아에로페"],
      },
      {
        id: "tyndareus",
        ko: "틴다레오스",
        roman: "Tyndareus",
        greek: "Τυνδάρεως",
        band: "elders",
        col: 4.2,
        y: 80,
        tagline: "스파르타",
        summary: "스파르타의 왕으로 전합니다. 이 그림에서는 클리타임네스트라와 헬레네의 인간 아버지입니다.",
        aliases: ["tyndareus", "tyndareos", "틴다레오스", "틴다레우스"],
      },
      {
        id: "leda",
        ko: "레다",
        roman: "Leda",
        greek: "Λήδα",
        band: "elders",
        col: 5.2,
        y: 80,
        tagline: "스파르타",
        summary: "틴다레오스의 아내이고, 클리타임네스트라와 헬레네의 어머니로 전합니다.",
        aliases: ["leda", "레다"],
      },
      {
        id: "peleus",
        ko: "펠레우스",
        roman: "Peleus",
        greek: "Πηλεύς",
        band: "elders",
        col: 6.6,
        y: 80,
        tagline: "프티아",
        summary: "아킬레우스의 인간 아버지입니다. 테티스와의 혼인은 서사시의 유명한 전승입니다.",
        aliases: ["peleus", "펠레우스"],
      },
      {
        id: "thetis",
        ko: "테티스",
        roman: "Thetis",
        greek: "Θέτις",
        band: "elders",
        col: 7.6,
        y: 80,
        tagline: "바다의 님프",
        summary: "아킬레우스의 어머니 테티스입니다. 티탄 테튀스와는 다른 신이고, 신의 가계는 나두신화에 있습니다.",
        aliases: ["thetis", "테티스"],
      },
      {
        id: "priam",
        ko: "프리아모스",
        roman: "Priam",
        greek: "Πρίαμος",
        band: "elders",
        col: 11.8,
        y: 80,
        tagline: "트로이",
        summary: "트로이의 왕으로 전합니다. 자녀가 많다고 하며, 여기서는 헥토르·파리스·카산드라만 그립니다.",
        aliases: ["priam", "priamos", "프리아모스"],
      },
      {
        id: "hecuba",
        ko: "헤카베",
        roman: "Hecuba",
        greek: "Ἑκάβη",
        band: "elders",
        col: 12.8,
        y: 80,
        tagline: "트로이",
        summary: "프리아모스의 아내이고, 헥토르·파리스·카산드라의 어머니로 보통 전합니다.",
        aliases: ["hecuba", "hecube", "헤카베", "헤쿠바"],
      },
      {
        id: "agamemnon",
        ko: "아가멤논",
        roman: "Agamemnon",
        greek: "Ἀγαμέμνων",
        band: "heroes",
        col: 0,
        y: 280,
        summary: "미케네의 왕으로, 그리스 쪽 군대를 이끈 인물로 전합니다. 클리타임네스트라의 남편입니다.",
        also: [{ href: `${MYTH_URL}/gods/agamemnon`, label: "나두신화 · 아가멤논" }],
        aliases: ["agamemnon", "아가멤논"],
      },
      {
        id: "clytemnestra",
        ko: "클리타임네스트라",
        roman: "Clytemnestra",
        greek: "Κλυταιμήστρα",
        band: "heroes",
        col: 1,
        y: 280,
        summary: "틴다레오스와 레다의 딸이고 아가멤논의 아내로 전합니다. 헬레네의 자매입니다.",
        aliases: ["clytemnestra", "clytaemnestra", "클리타임네스트라", "클뤼타임네스트라"],
      },
      {
        id: "menelaus",
        ko: "메넬라오스",
        roman: "Menelaus",
        greek: "Μενέλαος",
        band: "heroes",
        col: 3.2,
        y: 280,
        summary: "아가멤논의 동생이고 스파르타의 왕으로 전합니다. 헬레네의 남편입니다.",
        aliases: ["menelaus", "menelaos", "메넬라오스", "메넬라오"],
      },
      {
        id: "helen",
        ko: "헬레네",
        roman: "Helen",
        greek: "Ἑλένη",
        band: "heroes",
        col: 4.2,
        y: 280,
        summary: "메넬라오스의 아내로 전하는 헬레네입니다. 파리스가 트로이로 데려갔다는 이야기가 전쟁의 구실이 됩니다.",
        note: "『일리아스』는 헬레네를 제우스의 딸이라고도 부릅니다. 이 그림의 배우자 선은 메넬라오스와의 혼인만 잇고, 파리스와는 잇지 않습니다.",
        also: [{ href: `${MYTH_URL}/gods/helene`, label: "나두신화 · 헬레네" }],
        aliases: ["helen", "helene", "helena", "헬레네", "헬렌"],
      },
      {
        id: "achilles",
        ko: "아킬레우스",
        roman: "Achilles",
        greek: "Ἀχιλλεύς",
        band: "heroes",
        col: 6.6,
        y: 280,
        summary: "펠레우스와 테티스의 아들입니다. 『일리아스』는 그의 분노를 전쟁의 한복판에 둡니다.",
        also: [{ href: `${MYTH_URL}/gods/achilleus`, label: "나두신화 · 아킬레우스" }],
        aliases: ["achilles", "akhilleus", "아킬레우스", "아킬레스"],
      },
      {
        id: "deidamia",
        ko: "데이다메이아",
        roman: "Deidamia",
        greek: "Δηιδάμεια",
        band: "heroes",
        col: 7.6,
        y: 280,
        tagline: "스키로스",
        summary: "스키로스의 공주로, 후대 전승에서 네오프톨레모스의 어머니입니다.",
        note: "『오디세이아』는 네오프톨레모스가 아킬레우스의 아들이라고 합니다. 어머니 이름은 그 뒤의 이야기입니다.",
        aliases: ["deidamia", "데이다메이아"],
      },
      {
        id: "odysseus",
        ko: "오디세우스",
        roman: "Odysseus",
        greek: "Ὀδυσσεύς",
        band: "heroes",
        col: 9.2,
        y: 280,
        summary: "이타케의 왕으로 전합니다. 『오디세이아』는 전쟁이 끝난 뒤 그의 귀환을 다룹니다.",
        note: "아버지 라에르테스는 이 그림에 넣지 않았습니다. 로마 이름 울릭세스(Ulysses)는 같은 전승의 다른 이름입니다.",
        aliases: ["odysseus", "ulysses", "오디세우스", "오디세우스", "율리시스"],
      },
      {
        id: "penelope",
        ko: "페넬로페",
        roman: "Penelope",
        greek: "Πηνελόπεια",
        band: "heroes",
        col: 10.2,
        y: 280,
        summary: "오디세우스의 아내이고 텔레마코스의 어머니로 전합니다.",
        aliases: ["penelope", "페넬로페"],
      },
      {
        id: "hector",
        ko: "헥토르",
        roman: "Hector",
        greek: "Ἕκτωρ",
        band: "heroes",
        col: 11.8,
        y: 280,
        summary: "프리아모스와 헤카베의 아들로, 트로이 방어의 중심인 영웅입니다.",
        note: "아내 안드로마케와 아들 아스티아낙스는 이 그림에 넣지 않았습니다.",
        also: [{ href: `${MYTH_URL}/gods/hektor`, label: "나두신화 · 헥토르" }],
        aliases: ["hector", "hektor", "헥토르", "헥토르"],
      },
      {
        id: "paris",
        ko: "파리스",
        roman: "Paris",
        greek: "Πάρις",
        band: "heroes",
        col: 12.8,
        y: 280,
        summary: "프리아모스와 헤카베의 아들입니다. 헬레네를 트로이로 데려간 인물로 전합니다.",
        note: "다른 이름은 알렉산드로스입니다. 마케도니아 왕 알렉산드로스와는 다른 사람입니다.",
        also: [{ href: `${MYTH_URL}/gods/paris`, label: "나두신화 · 파리스" }],
        aliases: ["paris", "파리스", "alexandros of troy"],
      },
      {
        id: "cassandra",
        ko: "카산드라",
        roman: "Cassandra",
        greek: "Κασσάνδρα",
        band: "heroes",
        col: 13.8,
        y: 280,
        summary: "프리아모스와 헤카베의 딸로 전합니다. 『일리아스』에도 이름이 나오고, 예언을 믿어 주지 않는 이야기는 후대 비극에서 분명해집니다.",
        aliases: ["cassandra", "카산드라"],
      },
      {
        id: "iphigenia",
        ko: "이피게네이아",
        roman: "Iphigenia",
        greek: "Ἰφιγένεια",
        band: "next",
        col: 0,
        y: 480,
        summary: "아가멤논과 클리타임네스트라의 딸로 비극이 전합니다. 출항 전에 제물로 바쳐졌다는 이야기와, 신이 데려갔다는 이야기가 같이 있습니다.",
        note: "『일리아스』의 딸 이름 이피아나사와 같은 사람인지는 학설이 갈립니다.",
        aliases: ["iphigenia", "iphigeneia", "이피게네이아", "이피게니아"],
      },
      {
        id: "electra",
        ko: "엘렉트라",
        roman: "Electra",
        greek: "Ἠλέκτρα",
        band: "next",
        col: 1.05,
        y: 480,
        summary: "아가멤논과 클리타임네스트라의 딸로 비극이 전합니다. 오레스테스의 복수에 함께하는 인물입니다.",
        note: "호메로스의 딸 목록에는 이 이름이 없습니다.",
        aliases: ["electra", "elektra", "엘렉트라"],
      },
      {
        id: "orestes",
        ko: "오레스테스",
        roman: "Orestes",
        greek: "Ὀρέστης",
        band: "next",
        col: 2.1,
        y: 480,
        summary: "아가멤논의 아들입니다. 『오디세이아』는 아버지의 원수를 갚았다고 하고, 어머니를 죽였다는 이야기는 후대 비극에서 커집니다.",
        aliases: ["orestes", "오레스테스"],
      },
      {
        id: "neoptolemus",
        ko: "네오프톨레모스",
        roman: "Neoptolemus",
        greek: "Νεοπτόλεμος",
        band: "next",
        col: 7.1,
        y: 480,
        summary: "아킬레우스의 아들입니다. 다른 이름은 피로스이고, 트로이가 함락될 때 함께했다는 후대 전승이 있습니다.",
        aliases: ["neoptolemus", "pyrrhus", "네오프톨레모스", "네옵톨레모스", "피로스"],
      },
      {
        id: "telemachus",
        ko: "텔레마코스",
        roman: "Telemachus",
        greek: "Τηλέμαχος",
        band: "next",
        col: 9.7,
        y: 480,
        summary: "오디세우스와 페넬로페의 아들입니다. 『오디세이아』는 아버지를 찾아 떠나는 그의 이야기로 시작합니다.",
        aliases: ["telemachus", "telemachos", "텔레마코스"],
      },
    ],
  },
  {
    id: "athens",
    ko: "아테네 알크메온 집안",
    en: "Alcmaeonids",
    legend: false,
    blurb: "헤로도토스가 적은 가계입니다. 클레이스테네스, 페리클레스, 알키비아데스로 이 사이트의 인물과 만납니다.",
    bands: ATHENS_BANDS,
    links: athensLinks(),
    seeds: [
      {
        id: "alcmaeon",
        ko: "알크메온",
        roman: "Alcmaeon",
        greek: "Ἀλκμαίων",
        band: "origin",
        col: 1.2,
        y: 80,
        tagline: "집안의 이름",
        summary: "메가클레스의 아버지로 헤로도토스가 적는 알크메온입니다. 집안의 이름이 그에게서 옵니다.",
        note: "크로이소스의 궁정에서 부자가 되었다는 이야기는 연대가 잘 맞지 않는다고 오래 지적되었습니다. 이보다 앞선 킬론 사건의 가계는 이름이 겹쳐 그리지 않았습니다.",
        aliases: ["alcmaeon", "alcmeon", "알크메온", "알크마이온"],
      },
      {
        id: "cleisthenes-sicyon",
        ko: "클레이스테네스",
        roman: "Cleisthenes of Sicyon",
        greek: "Κλεισθένης",
        band: "origin",
        col: 2.8,
        y: 80,
        tagline: "시퀴온의 참주",
        years: "기원전 6세기 초 시퀴온.",
        summary: "시퀴온의 참주입니다. 딸 아가리스테의 신랑을 고르는 잔치가 헤로도토스 6권에 나옵니다. 아테네의 개혁가와 다른 사람입니다.",
        aliases: ["cleisthenes of sicyon", "sicyon", "시퀴온", "시키온"],
      },
      {
        id: "megacles",
        ko: "메가클레스",
        roman: "Megacles",
        greek: "Μεγακλῆς",
        band: "match",
        col: 1.2,
        y: 280,
        summary: "알크메온의 아들로, 시퀴온의 아가리스테와 혼인합니다. 아테네의 클레이스테네스와 히포크라테스의 아버지입니다.",
        aliases: ["megacles", "megakles", "메가클레스"],
      },
      {
        id: "agariste-sicyon",
        ko: "아가리스테",
        roman: "Agariste of Sicyon",
        greek: "Ἀγαρίστη",
        band: "match",
        col: 2.2,
        y: 280,
        tagline: "시퀴온",
        summary: "시퀴온의 클레이스테네스의 딸입니다. 메가클레스의 아내이고, 손녀 아가리스테의 이름 조상입니다.",
        aliases: ["agariste of sicyon", "아가리스테 시퀴온"],
      },
      {
        id: "cleisthenes",
        ko: "클레이스테네스",
        roman: "Cleisthenes",
        greek: "Κλεισθένης",
        band: "reform",
        col: 5.4,
        y: 480,
        slug: "cleisthenes",
        years: "개혁 기원전 508/7년.",
        summary: "아테네의 부족과 평의회를 다시 짠 알크메온 집안의 사람입니다. 메가클레스와 시퀴온의 아가리스테의 아들로 헤로도토스가 적습니다.",
        note: "이 그림에서는 그의 자녀를 잇지 않았습니다. 집안의 다음 이야기는 동생 히포크라테스 쪽입니다.",
        aliases: ["cleisthenes", "클레이스테네스", "클리스테네스"],
      },
      {
        id: "hippocrates",
        ko: "히포크라테스",
        roman: "Hippocrates",
        greek: "Ἱπποκράτης",
        band: "reform",
        col: 1.7,
        y: 480,
        tagline: "클레이스테네스의 동생",
        summary: "아테네 클레이스테네스의 동생입니다. 메가클레스와 아가리스테의 아버지이고, 코스 섬의 의학자 히포크라테스와는 다른 사람입니다.",
        aliases: ["hippocrates", "히포크라테스"],
      },
      {
        id: "megacles-ii",
        ko: "메가클레스",
        roman: "Megacles son of Hippocrates",
        greek: "Μεγακλῆς",
        band: "parents",
        col: 1.2,
        y: 680,
        summary: "히포크라테스의 아들 메가클레스입니다. 도편 추방으로 아테네를 떠난 일이 전하고, 데이노마케의 아버지로 보통 맞춥니다.",
        aliases: ["megacles son of hippocrates"],
      },
      {
        id: "agariste",
        ko: "아가리스테",
        roman: "Agariste",
        greek: "Ἀγαρίστη",
        band: "parents",
        col: 2.4,
        y: 680,
        summary: "히포크라테스의 딸이고 크산티포스의 아내입니다. 페리클레스의 어머니입니다. 이름은 시퀴온의 증조모에게서 왔습니다.",
        aliases: ["agariste", "아가리스테"],
      },
      {
        id: "xanthippus",
        ko: "크산티포스",
        roman: "Xanthippus",
        greek: "Ξάνθιππος",
        band: "parents",
        col: 3.4,
        y: 680,
        tagline: "미칼레 기원전 479년",
        years: "미칼레 해전 기원전 479년의 아테네 지휘관.",
        summary: "아가리스테의 남편이고 페리클레스와 아리프론의 아버지입니다. 헤로도토스는 미칼레에서 그를 아테네 지휘관으로 적습니다.",
        aliases: ["xanthippus", "크산티포스", "크산팁포스"],
      },
      {
        id: "deinomache",
        ko: "데이노마케",
        roman: "Deinomache",
        greek: "Δεινομάχη",
        band: "classical",
        col: 1.2,
        y: 880,
        summary: "알키비아데스의 어머니입니다. 플루타르코스는 메가클레스의 딸이라고 적고, 그 메가클레스는 히포크라테스의 아들로 보통 봅니다.",
        aliases: ["deinomache", "dinomache", "데이노마케"],
      },
      {
        id: "cleinias",
        ko: "클레이니아스",
        roman: "Cleinias",
        greek: "Κλεινίας",
        band: "classical",
        col: 0.2,
        y: 880,
        tagline: "기원전 447년 전사",
        years: "코로네이아 기원전 447년에 죽었다고 플루타르코스가 전합니다.",
        summary: "알키비아데스의 아버지입니다. 알크메온 집안이 아니라 아버지 쪽 가문이고, 죽은 뒤 페리클레스와 아리프론이 아들의 후견인이 됩니다.",
        aliases: ["cleinias", "clinias", "클레이니아스", "클레이니아스"],
      },
      {
        id: "pericles",
        ko: "페리클레스",
        roman: "Pericles",
        greek: "Περικλῆς",
        band: "classical",
        col: 2.9,
        y: 880,
        slug: "pericles",
        years: "기원전 495년 무렵–429년.",
        summary: "크산티포스와 아가리스테의 아들입니다. 어머니 쪽으로 알크메온 집안이고, 고전기 아테네의 정책을 이끈 사람입니다.",
        note: "적자 크산티포스·파랄로스와, 아스파시아 사이에서 난 페리클레스는 이 가계의 줄기가 아니라 칸을 두지 않았습니다.",
        aliases: ["pericles", "perikles", "페리클레스"],
      },
      {
        id: "ariphron",
        ko: "아리프론",
        roman: "Ariphron",
        greek: "Ἀρίφρων",
        band: "classical",
        col: 3.9,
        y: 880,
        summary: "페리클레스의 형제입니다. 플루타르코스는 두 사람이 함께 알키비아데스의 후견인이었다고 적습니다.",
        aliases: ["ariphron", "아리프론"],
      },
      {
        id: "alcibiades",
        ko: "알키비아데스",
        roman: "Alcibiades",
        greek: "Ἀλκιβιάδης",
        band: "war",
        col: 0.7,
        y: 1080,
        slug: "alcibiades",
        years: "기원전 450년 무렵–404년.",
        summary: "클레이니아스와 데이노마케의 아들입니다. 어머니 쪽으로 알크메온 집안과 닿고, 펠로폰네소스 전쟁 후반에 편을 여러 번 바꿉니다.",
        aliases: ["alcibiades", "alkibiades", "알키비아데스"],
      },
    ],
  },
];

function norm(value: string) {
  return value.toLowerCase().replace(/[\s·.'’\-()/_]/g, "");
}

function captionFor(id: string, links: TreeLink[], byId: Map<string, TreeSeed>) {
  const names = links
    .filter((link) => link.to === id && link.kind === "parent")
    .map((link) => byId.get(link.from)?.ko)
    .filter((name): name is string => Boolean(name));
  return names.join("·");
}

function placeNodes(seeds: TreeSeed[], links: TreeLink[]) {
  const cols = seeds.map((seed) => seed.col);
  const min = Math.min(...cols);
  const max = Math.max(...cols);
  const contentWidth = (max - min) * COL + NODE_W;
  const width = contentWidth + PAD * 2;
  const seedById = new Map(seeds.map((seed) => [seed.id, seed]));
  const nodes: LayoutNode[] = seeds.map((seed) => {
    const keys = [seed.ko, seed.roman, seed.id, seed.slug, seed.greek, seed.tagline, ...(seed.aliases ?? [])].filter(
      (key): key is string => Boolean(key),
    );
    return {
      ...seed,
      x: PAD + (seed.col - min) * COL,
      w: NODE_W,
      h: NODE_H,
      sub: seed.roman,
      caption: captionFor(seed.id, links, seedById),
      href: seed.href ?? (seed.slug ? `/people/${seed.slug}` : undefined),
      keys,
    };
  });
  const height = Math.max(...nodes.map((node) => node.y + node.h)) + 36;
  return { nodes, width, height };
}

type Box = { id: string; x: number; y: number; w: number; h: number; cx: number; cy: number };

function boxes(nodes: LayoutNode[]): Box[] {
  return nodes.map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    w: node.w,
    h: node.h,
    cx: node.x + node.w / 2,
    cy: node.y + node.h / 2,
  }));
}

function edgePaths(nodes: LayoutNode[], links: TreeLink[]): LayoutEdge[] {
  const box = new Map(boxes(nodes).map((item) => [item.id, item]));
  return links.map((link) => {
    const from = box.get(link.from)!;
    const to = box.get(link.to)!;
    const path = link.kind === "spouse" ? spousePath(from, to) : directedPath(from, to, link.kind);
    const dx = Math.abs(from.cx - to.cx);
    const dy = Math.abs(from.cy - to.cy);
    const local = link.kind === "spouse" ? dx < COL * 1.6 && dy < NODE_H * 1.4 : dx < COL * 1.8 && dy < 240;
    return {
      id: `${link.kind}-${link.from}-${link.to}`,
      d: path.d,
      d2: path.d2,
      kind: link.kind,
      from: link.from,
      to: link.to,
      local,
      quiet: Math.hypot(dx, dy) > 620,
    };
  });
}

function directedPath(from: Box, to: Box, kind: LinkKind): { d: string; d2?: string } {
  const downward = from.cy <= to.cy;
  const x1 = from.cx;
  const y1 = downward ? from.y + from.h : from.y;
  const x2 = to.cx;
  const y2 = downward ? to.y : to.y + to.h;
  const sameRow = Math.abs(from.cy - to.cy) < 24;
  if (sameRow && kind === "variant-parent") {
    const left = Math.min(x1, x2);
    const right = Math.max(x1, x2);
    const y = Math.min(from.y, to.y);
    return { d: `M ${left} ${y} Q ${(left + right) / 2} ${y - 26}, ${right} ${y}` };
  }
  if (Math.abs(x1 - x2) < 6) return { d: `M ${x1} ${y1} V ${y2}` };
  const mid = (y1 + y2) / 2;
  return { d: `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}` };
}

function spousePath(a: Box, b: Box): { d: string; d2?: string } {
  const left = a.cx <= b.cx ? a : b;
  const right = a.cx <= b.cx ? b : a;
  const x1 = left.x + left.w;
  const x2 = right.x;
  const gap = x2 - x1;
  if (Math.abs(a.cy - b.cy) < 24 && gap < COL * 0.75) {
    const y = (left.cy + right.cy) / 2;
    return { d: `M ${x1} ${y - 2.5} H ${x2}`, d2: `M ${x1} ${y + 2.5} H ${x2}` };
  }
  if (Math.abs(a.cy - b.cy) < 24) {
    const y = left.y;
    const mid = (left.cx + right.cx) / 2;
    const lift = Math.min(36, 16 + Math.abs(right.cx - left.cx) * 0.04);
    return { d: `M ${left.cx} ${y} Q ${mid} ${y - lift}, ${right.cx} ${y}` };
  }
  const upper = a.cy <= b.cy ? a : b;
  const lower = a.cy <= b.cy ? b : a;
  const mid = (upper.y + upper.h + lower.y) / 2;
  const bow = upper.cx <= lower.cx ? 36 : -36;
  return { d: `M ${upper.cx} ${upper.y + upper.h} C ${upper.cx + bow} ${mid}, ${lower.cx + bow} ${mid}, ${lower.cx} ${lower.y}` };
}

function validate(treeName: string, nodes: LayoutNode[], links: TreeLink[], bands: BandMeta[]) {
  const ids = new Set<string>();
  const bandIds = new Set(bands.map((band) => band.id));
  for (const node of nodes) {
    if (ids.has(node.id)) throw new Error(`${treeName} id 중복: ${node.id}`);
    if (!bandIds.has(node.band)) throw new Error(`${treeName} 세대 없음: ${node.id} · ${node.band}`);
    ids.add(node.id);
  }
  for (const link of links) {
    if (!ids.has(link.from) || !ids.has(link.to)) {
      throw new Error(`${treeName} 선 오류: ${link.kind} ${link.from} → ${link.to}`);
    }
  }
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (overlapX > 2 && overlapY > 2) throw new Error(`${treeName} 칸이 겹칩니다: ${a.id} · ${b.id}`);
    }
  }
}

function buildBands(bands: BandMeta[], nodes: LayoutNode[]): LayoutBand[] {
  return bands.map((meta) => {
    const group = nodes.filter((node) => node.band === meta.id).sort((a, b) => a.y - b.y || a.x - b.x);
    if (!group.length) throw new Error(`빈 세대: ${meta.id}`);
    const top = Math.min(...group.map((node) => node.y)) - 52;
    const bottom = Math.max(...group.map((node) => node.y + node.h)) + 18;
    return { ...meta, top, height: bottom - top, nodeIds: group.map((node) => node.id) };
  });
}

function defineTree(spec: TreeSpec): FamilyTree {
  const placed = placeNodes(spec.seeds, spec.links);
  validate(spec.ko, placed.nodes, spec.links, spec.bands);
  const bands = buildBands(spec.bands, placed.nodes);
  for (let i = 1; i < bands.length; i += 1) {
    const gap = bands[i].top - (bands[i - 1].top + bands[i - 1].height);
    if (gap < 12) throw new Error(`${spec.ko} 세대 간격이 좁습니다: ${bands[i - 1].id} → ${bands[i].id}`);
  }
  return {
    id: spec.id,
    ko: spec.ko,
    en: spec.en,
    legend: spec.legend,
    blurb: spec.blurb,
    width: placed.width,
    height: placed.height,
    nodes: placed.nodes,
    edges: edgePaths(placed.nodes, spec.links),
    bands,
    byId: new Map(placed.nodes.map((node) => [node.id, node])),
    links: spec.links,
  };
}

export const TREES: FamilyTree[] = SPECS.map(defineTree);

const seen = new Set<string>();
for (const tree of TREES) {
  for (const node of tree.nodes) {
    if (seen.has(node.id)) throw new Error(`가족관계도 id가 가문 사이에 겹칩니다: ${node.id}`);
    seen.add(node.id);
  }
}

export function isTreeId(value: string | null): value is TreeId {
  return !!value && (TREE_IDS as readonly string[]).includes(value);
}

export function treeById(id: TreeId) {
  const tree = TREES.find((item) => item.id === id);
  if (!tree) throw new Error(id);
  return tree;
}

export type RelationPerson = { id: string; ko: string; roman: string; href?: string };

function personRef(tree: FamilyTree, id: string): RelationPerson {
  const node = tree.byId.get(id);
  if (!node) throw new Error(id);
  return { id: node.id, ko: node.ko, roman: node.roman, href: node.href };
}

export function relationsOf(tree: FamilyTree, id: string) {
  const byX = (a: RelationPerson, b: RelationPerson) => (tree.byId.get(a.id)?.x ?? 0) - (tree.byId.get(b.id)?.x ?? 0);
  const parents = tree.links
    .filter((link) => link.to === id && link.kind === "parent")
    .map((link) => personRef(tree, link.from))
    .sort(byX);
  const variantParents = tree.links
    .filter((link) => link.to === id && link.kind === "variant-parent")
    .map((link) => personRef(tree, link.from))
    .sort(byX);
  const children = tree.links
    .filter((link) => link.from === id && link.kind === "parent")
    .map((link) => personRef(tree, link.to))
    .sort(byX);
  const variantChildren = tree.links
    .filter((link) => link.from === id && link.kind === "variant-parent")
    .map((link) => personRef(tree, link.to))
    .sort(byX);
  const spouses = tree.links
    .filter((link) => link.kind === "spouse" && (link.from === id || link.to === id))
    .map((link) => personRef(tree, link.from === id ? link.to : link.from))
    .sort(byX);
  const parentIds = new Set(parents.map((person) => person.id));
  const siblingIds = new Set<string>();
  for (const link of tree.links) {
    if (link.kind !== "parent" || !parentIds.has(link.from) || link.to === id) continue;
    siblingIds.add(link.to);
  }
  const siblings = [...siblingIds].map((siblingId) => personRef(tree, siblingId)).sort(byX);
  return { parents, variantParents, children, variantChildren, spouses, siblings };
}

export type SearchHit = { treeId: TreeId; treeKo: string; node: LayoutNode; exact: boolean; prefix: boolean };

export function searchNodes(query: string): SearchHit[] {
  const q = norm(query);
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const tree of TREES) {
    for (const node of tree.nodes) {
      const keys = node.keys.map(norm);
      const exact = keys.some((key) => key === q);
      const prefix = keys.some((key) => key.startsWith(q));
      const hit = exact || prefix || keys.some((key) => key.includes(q));
      if (hit) hits.push({ treeId: tree.id, treeKo: tree.ko, node, exact, prefix });
    }
  }
  return hits.sort(
    (a, b) => Number(b.exact) - Number(a.exact) || Number(b.prefix) - Number(a.prefix) || a.node.ko.localeCompare(b.node.ko, "ko"),
  );
}

export function exactNodeId(query: string): { treeId: TreeId; id: string } | null {
  const q = norm(query);
  if (!q) return null;
  const hits: { treeId: TreeId; id: string }[] = [];
  for (const tree of TREES) {
    for (const node of tree.nodes) {
      if (node.keys.some((key) => norm(key) === q)) hits.push({ treeId: tree.id, id: node.id });
    }
  }
  return hits.length === 1 ? hits[0] : null;
}

export function focusHref(treeId: TreeId, id: string) {
  return `/family-tree?tree=${treeId}&focus=${id}`;
}
