import type { MetadataRoute } from "next";
import { people } from "@/data/people";
import { poleis } from "@/data/poleis";
import { wars } from "@/data/wars";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/origins",
    "/map",
    "/polis",
    "/people",
    "/family-tree",
    "/wars",
    "/daily",
    "/army",
    "/myth-links",
    "/movies",
    "/sources",
    ...poleis.map((polis) => `/polis/${polis.slug}`),
    ...people.map((person) => `/people/${person.slug}`),
    ...wars.map((war) => `/wars/${war.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
