export type Source = { work: string; ref?: string };

export type Kind = "legend" | "history" | "mixed";

export type LinkItem = { href: string; label: string };

export type Guide = {
  en: string;
  title: string;
  summary: string;
  points: readonly [string, string, string];
  more: readonly string[];
};

export type MovieTopic = "origins" | "polis" | "people" | "wars" | "army" | "daily" | "myth";

export type Movie = {
  slug: string;
  titleKo: string;
  titleOriginal: string;
  year: string;
  kind: "영화" | "시리즈";
  why: string;
  fiction: string;
  topics: readonly MovieTopic[];
  links: readonly LinkItem[];
};

export type Person = Guide & {
  slug: string;
  nameKo: string;
  nameEn: string;
  greek: string;
  years: string;
  role: string;
  kind: Kind;
  careful?: string;
  sources: readonly Source[];
  movieSlugs: readonly string[];
  related: readonly LinkItem[];
};

export type Polis = Guide & {
  slug: string;
  nameKo: string;
  nameEn: string;
  greek: string;
  region: string;
  years: string;
  kind: Kind;
  sources: readonly Source[];
  movieSlugs: readonly string[];
  related: readonly LinkItem[];
};

export type War = Guide & {
  slug: string;
  years: string;
  cause: string;
  who: string;
  result: string;
  sources: readonly Source[];
  movieSlugs: readonly string[];
  related: readonly LinkItem[];
};

export type Place = Guide & {
  id: string;
  links?: readonly LinkItem[];
};

export type Region = {
  id: string;
  en: string;
  title: string;
  lead: string;
  places: readonly Place[];
};
