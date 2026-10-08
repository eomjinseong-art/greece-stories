import type { Movie, MovieTopic } from "@/data/types";
import { EGYPT_URL, ILIAD_URL, MYTH_URL, PERSIA_URL, PHILOSOPHY_URL } from "@/lib/site";

export const movies: readonly Movie[] = [
  {
    slug: "300",
    titleKo: "300",
    titleOriginal: "300",
    year: "2006",
    kind: "영화",
    why: "테르모필라이의 스파르타 병사를 한 장면으로 기억하게 만든 작품입니다. 프랭크 밀러의 만화를 바탕으로 합니다.",
    fiction:
      "헤로도토스가 적는 테르모필라이에는 스파르타 중장보병 300명만이 아니라 수천 명의 동맹군이 있었습니다. 테스피아이 인은 끝까지 남았고, 테바이 인의 역할은 기록 안에서 논쟁적입니다. 영화는 페르시아 사람을 괴물처럼 그리는데, 헤로도토스는 그들의 용기와 내부 정치도 적습니다. 에피알테스의 모습과 개인적 복수, 왕의 초상은 만화의 창작입니다. 전투 안무는 팔랑크스의 재현이 아닙니다.",
    topics: ["wars", "army", "polis", "people"],
    links: [
      { href: "/wars/persian-wars", label: "페르시아 전쟁" },
      { href: "/people/leonidas", label: "레오니다스" },
      { href: "/polis/sparta", label: "스파르타" },
      { href: "/army", label: "군대" },
      { href: `${PERSIA_URL}/movies#300`, label: "페르시아이야기 · 300" },
    ],
  },
  {
    slug: "300-rise",
    titleKo: "300: 제국의 부활",
    titleOriginal: "300: Rise of an Empire",
    year: "2014",
    kind: "영화",
    why: "살라미스 해전과 아르테미시아라는 이름을 영화로 들어 봤을 때, 그 인상이 어디서 왔는지 확인하는 용도입니다.",
    fiction:
      "아르테미시아는 헤로도토스에 나오는 할리카르나소스의 여성 통치자로, 크세르크세스 쪽 함대에 있었습니다. 영화의 연애와 복수, 해전의 안무는 그 기록을 재연한 것이 아닙니다. 테미스토클레스의 계책도 극의 장치로 바뀌어 있습니다. 전편과 같이 페르시아 궁정은 만화의 상상입니다.",
    topics: ["wars", "army"],
    links: [
      { href: "/wars/persian-wars", label: "페르시아 전쟁" },
      { href: "/people/themistocles", label: "테미스토클레스" },
      { href: "/army#trireme", label: "삼단노선" },
      { href: `${PERSIA_URL}/movies#300-rise`, label: "페르시아이야기 · 300: 제국의 부활" },
    ],
  },
  {
    slug: "troy",
    titleKo: "트로이",
    titleOriginal: "Troy",
    year: "2004",
    kind: "영화",
    why: "일리아스의 인물 이름 — 아킬레우스, 헥토르, 파리스, 헬레네 — 을 넓은 화면으로 만날 때 가장 많이 거론되는 영화입니다.",
    fiction:
      "신들이 빠지고, 10년 전쟁이 몇 주로 줄어듭니다. 파트로클로스와 아킬레우스의 관계는 고대 전승과 다르게 가족으로만 처리됩니다. 영화에서 메넬라오스와 아가멤논이 트로이에서 죽는 결말은 일리아스·후속 전승과 다릅니다. 브리세이스의 줄거리도 창작의 비중이 큽니다. 호메로스의 시도 역사 기록이 아닌데, 이 영화는 그 시를 다시 각색한 극입니다. 청동기 트로이 유적과 영화의 성을 같은 건물로 보면 안 됩니다.",
    topics: ["origins", "myth"],
    links: [
      { href: "/origins", label: "시대" },
      { href: "/people/homer", label: "호메로스" },
      { href: "/myth-links", label: "신화 연결" },
      { href: `${MYTH_URL}/in-media#troy-2004`, label: "나두신화 · 영화 트로이" },
      { href: ILIAD_URL, label: "일리아스이야기" },
    ],
  },
  {
    slug: "alexander",
    titleKo: "알렉산더",
    titleOriginal: "Alexander",
    year: "2004",
    kind: "영화",
    why: "마케도니아에서 인도까지 이어지는 원정의 크기를 한 편의 전기 영화로 보고 싶을 때 고릅니다. 올리버 스톤 감독의 작품입니다.",
    fiction:
      "고대 기록은 아리아노스, 플루타르코스, 디오도로스, 쿠르티우스처럼 서로 다른 결을 가집니다. 영화는 그중에서 가정사와 심리의 한 해석을 고릅니다. 올림피아스, 헤파이스티온, 죽음의 장면은 극입니다. 알렉산드로스의 마지막 말을 영화 대사로 외우면 안 됩니다. 독살인지 병인지도 고대부터 갈립니다. 사실 관계는 이 사이트의 인물·전쟁 글을 기준으로 보세요.",
    topics: ["people", "wars"],
    links: [
      { href: "/people/alexander", label: "알렉산드로스" },
      { href: "/people/philip-ii", label: "필리포스 2세" },
      { href: "/wars/alexander-campaigns", label: "원정" },
      { href: `${PERSIA_URL}/movies#alexander-2004`, label: "페르시아이야기 · 알렉산더" },
      { href: `${EGYPT_URL}/movies#alexander-2004`, label: "이집트이야기 · 알렉산더" },
      { href: `${PHILOSOPHY_URL}/films#films-aristotle`, label: "철학이야기 · 아리스토텔레스와 영화" },
    ],
  },
  {
    slug: "agora",
    titleKo: "아고라",
    titleOriginal: "Agora",
    year: "2009",
    kind: "영화",
    why: "여성 철학자 히파티아와 알렉산드리아의 종교 갈등을 영화로 들어 봤다면, 그 이미지가 고전기 아테네와 어떻게 다른지 구분해 주는 작품입니다.",
    fiction:
      "히파티아는 실존한 철학자로, 서기 415년 알렉산드리아에서 죽임을 당했다고 교회사 작가 소크라테스 스콜라스티코스가 전합니다. 배경은 로마 제국 치하의 이집트이지, 페리클레스의 아테네가 아닙니다. 영화의 연애, 도서관이 한 번에 무너지는 그림, 과학 발견의 드라마는 창작입니다. 알렉산드리아 도서관의 손실은 여러 세기에 걸친 일이라는 설명이 우세합니다. 제목의 아고라는 그리스 광장을 뜻하는 말일 뿐, 아테네 아고라의 기록 영화는 아닙니다.",
    topics: ["daily", "origins"],
    links: [
      { href: "/daily#agora", label: "아고라" },
      { href: "/map#alexandria", label: "알렉산드리아" },
      { href: "/origins#hellenistic", label: "헬레니즘" },
      { href: `${PHILOSOPHY_URL}/people/hypatia`, label: "철학이야기 · 히파티아" },
      { href: `${PHILOSOPHY_URL}/films#films-hypatia`, label: "철학이야기 · 영화 아고라" },
    ],
  },
  {
    slug: "odyssey-2026",
    titleKo: "오디세이",
    titleOriginal: "The Odyssey",
    year: "2026",
    kind: "영화",
    why: "호메로스의 『오디세이아』를 크리스토퍼 놀런이 영화로 만든 작품입니다. 귀환 이야기의 규모를 극장에서 보고 싶을 때 고릅니다.",
    fiction:
      "원작은 기원전 8–7세기 무렵에 정리된 서사시로 보는 작품이지, 항해 일지가 아닙니다. 신과 괴물, 바닷길의 세부는 시의 이야기이고 영화는 그 시를 다시 각색합니다. 트로이 전쟁이 청동기 말의 어느 전투였는지는 고고학의 별개 문제입니다. 대사를 오디세우스의 육성으로 외우지 않는 편이 좋습니다.",
    topics: ["myth", "origins"],
    links: [
      { href: "/people/homer", label: "호메로스" },
      { href: "/myth-links", label: "신화 연결" },
      { href: "/origins", label: "시대" },
      { href: `${MYTH_URL}/in-media#the-odyssey-2026`, label: "나두신화 · 영화 오디세이" },
    ],
  },
  {
    slug: "odyssey-1997",
    titleKo: "오딧세이",
    titleOriginal: "The Odyssey",
    year: "1997",
    kind: "시리즈",
    why: "안드레이 콘찰롭스키의 2부작 텔레비전 영화로, 오디세우스가 트로이에 갔다가 집으로 돌아오는 길을 신화 쪽으로 따라갑니다.",
    fiction:
      "신들이 나오고 모험이 이어지는 각색입니다. 호메로스의 에피소드를 고르고 빼며, 텔레마코스의 시간표를 극의 필요에 맞춥니다. 역사 속 이타카 왕궁의 발굴 보고서가 아닙니다.",
    topics: ["myth", "origins"],
    links: [
      { href: "/people/homer", label: "호메로스" },
      { href: "/myth-links", label: "오디세이아 연결" },
    ],
  },
  {
    slug: "the-return",
    titleKo: "더 리턴",
    titleOriginal: "The Return",
    year: "2024",
    kind: "영화",
    why: "오디세이아의 후반, 즉 이타카에 돌아온 뒤의 이야기만 좁혀 본 작품입니다. 랄프 파인스가 오디세우스를 맡습니다.",
    fiction:
      "호메로스의 귀환과 구혼자 에피소드를 드라마로 다시 쓴 것입니다. 신화의 괴물 여행은 빼고 집의 폭력과 재회를 앞에 둡니다. 역사 영화로 소개되는 일이 있어도, 사료는 서사시입니다. 인물의 심리와 대사는 각본의 것입니다.",
    topics: ["myth"],
    links: [
      { href: "/people/homer", label: "호메로스" },
      { href: "/myth-links", label: "신화 연결" },
    ],
  },
  {
    slug: "troy-fall",
    titleKo: "트로이: 왕국의 몰락",
    titleOriginal: "Troy: Fall of a City",
    year: "2018",
    kind: "시리즈",
    why: "BBC와 넷플릭스의 8부작으로, 파리스와 헬레네에서 시작해 일리아스의 전쟁을 연속극으로 볼 때 거론됩니다.",
    fiction:
      "신들의 심판과 인간의 전쟁이 같이 나옵니다. 인물의 동기와 대사, 현대어가 섞인 느낌은 드라마의 선택입니다. 호메로스의 시를 각색한 것이지 히사를리크 발굴의 재연이 아닙니다. 2004년 영화 『트로이』와 줄거리를 같게 보면 서로 다른 각색이 헷갈립니다.",
    topics: ["myth", "origins"],
    links: [
      { href: "/people/homer", label: "호메로스" },
      { href: "/myth-links", label: "트로이 전쟁 연결" },
    ],
  },
  {
    slug: "o-brother",
    titleKo: "오 형제여 어디에 있는가",
    titleOriginal: "O Brother, Where Art Thou?",
    year: "2000",
    kind: "영화",
    why: "오디세이아의 뼈대를 1930년대 미국 남부로 옮겨 놓은 코언 형제의 영화입니다. 고대 의상 없이 귀환 이야기의 구조를 보고 싶을 때 곁가지로 둡니다.",
    fiction:
      "배경은 대공황기의 미시시피입니다. 키클롭스나 세이렌에 해당하는 장면도 미국 이야기로 바뀝니다. 그리스 역사와 지리의 자료가 아니고, 그렇게 쓰려고 만든 영화도 아닙니다.",
    topics: ["myth"],
    links: [
      { href: "/myth-links", label: "오디세이아 연결" },
      { href: `${MYTH_URL}/in-media#o-brother-2000`, label: "나두신화 · 오 형제여 어디에 있는가" },
    ],
  },
];

const bySlug = new Map(movies.map((movie) => [movie.slug, movie]));

export function moviesByTopic(topic: MovieTopic) {
  return movies.filter((movie) => movie.topics.includes(topic));
}

export function moviesBySlugs(slugs: readonly string[]) {
  return slugs.flatMap((slug) => {
    const movie = bySlug.get(slug);
    return movie ? [movie] : [];
  });
}
