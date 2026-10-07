import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MovieCard } from "@/components/RelatedMovies";
import { PageHead } from "@/components/PageHead";
import { movies } from "@/data/movies";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "관련 영화",
  description: "300, 트로이, 알렉산더, 아고라, 오디세이처럼 그리스를 배경으로 하거나 오디세이아를 빌린 영화와 시리즈. 어디서 이야기를 돕고 어디서 창작인지 짧게 적습니다. 불법 영상은 안내하지 않습니다.",
  path: "/movies",
});

export default function MoviesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "관련 영화", path: "/movies" },
          ]),
          itemListLd(
            "그리스 관련 영화",
            "/movies",
            movies.map((movie) => ({ name: movie.titleKo, path: `/movies#${movie.slug}` })),
          ),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "관련 영화" }]} />
      <PageHead
        kicker="FILMS"
        title="관련 영화"
        lead="그리스를 처음 상상할 때 영화가 먼저인 경우가 많습니다. 제목은 실제로 나온 작품만 적었습니다. 각 카드는 왜 보면 좋은지, 어디가 창작인지 두 문단으로 나눕니다. 스트리밍 링크는 없습니다."
      />
      <ul className="mt-8 space-y-3">
        {movies.map((movie) => (
          <MovieCard key={movie.slug} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
