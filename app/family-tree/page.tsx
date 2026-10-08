import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FamilyTreeView } from "@/components/FamilyTreeView";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { DISPUTES, NAME_NOTES, TREES, focusHref, relationsOf } from "@/data/family-tree";
import { personBySlug } from "@/data/people";
import { breadcrumbLd, itemListLd, jsonLd, pageMetadata } from "@/lib/seo";
import { EGYPT_NAME, EGYPT_URL, MYTH_NAME, MYTH_URL } from "@/lib/site";

const description =
  "마케도니아 왕가, 알렉산드로스 이후 후계 왕조, 트로이 전쟁 영웅의 전승, 아테네 알크메온 집안을 세대로 그린 가족관계도. 신의 가계는 나두신화로 넘깁니다.";

export const metadata = {
  ...pageMetadata({
    title: "가족관계도",
    description,
    path: "/family-tree",
  }),
  keywords: ["가족관계도", "마케도니아 왕가", "필리포스 2세", "알렉산드로스", "알크메온", "트로이 전쟁", "그리스이야기"],
};

for (const tree of TREES) {
  for (const node of tree.nodes) {
    if (node.slug && !personBySlug(node.slug)) {
      throw new Error(`가족관계도 slug에 해당하는 인물 페이지가 없습니다: ${node.slug}`);
    }
  }
}

const listed = TREES.flatMap((tree) => tree.nodes.filter((node) => node.href?.startsWith("/")));

export default function FamilyTreePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={jsonLd([
          breadcrumbLd([
            { name: "홈", path: "/" },
            { name: "가족관계도", path: "/family-tree" },
          ]),
          itemListLd(
            "그리스이야기 가족관계도",
            "/family-tree",
            listed.map((node) => ({ name: `${node.ko} (${node.roman})`, path: node.href! })),
          ),
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "홈" }, { label: "가족관계도" }]} />
      <PageHead
        kicker="FAMILY TREE"
        title="가족관계도"
        lead="마케도니아 왕가, 알렉산드로스 이후의 세 왕조, 트로이 전쟁 영웅의 전승, 아테네 알크메온 집안을 세대별로 그린 그림입니다. 칸을 누르면 부모·배우자·자녀·형제가 밝아집니다. 재위 연도는 왕으로 센 통상 연대입니다."
      />

      <aside className="mt-6 rounded-lg border border-line bg-card p-4 sm:p-5">
        <p className="text-[11px] tracking-[0.16em] text-aegean">{MYTH_NAME}</p>
        <h2 className="mt-1 font-serif text-xl text-ink">신들의 가족관계도는 나두신화에 있습니다</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
          제우스와 티탄, 올림포스 신의 가계는 이 사이트에 다시 그리지 않습니다. 신화 사전인 {MYTH_NAME}의 가족관계도에서 세대와 다른 전승을 볼 수 있습니다. 아래는 역사 글과 닿는 사람의 가문만 다룹니다.
        </p>
        <a href={`${MYTH_URL}/family-tree`} className="mt-3 inline-block text-sm text-olive underline decoration-line underline-offset-4 hover:text-aegean" rel="noopener noreferrer">
          {MYTH_NAME} 가족관계도 보기
        </a>
      </aside>

      <FamilyTreeView />

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">글로 읽는 가족관계</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
          그림과 같은 관계입니다. 이름을 누르면 그 가문의 칸으로 이동합니다. 이 사이트에 인물 페이지가 있는 이름은 따로 링크했습니다.
        </p>
        {TREES.map((tree) => (
          <section key={tree.id} className="mt-8" aria-labelledby={`read-${tree.id}`}>
            <h3 id={`read-${tree.id}`} className="font-serif text-xl text-ink">
              {tree.ko} <span className="text-sm font-sans tracking-wide text-aegean">{tree.en}</span>
              {tree.legend ? <span className="ml-2 text-sm font-sans text-wine">전승</span> : null}
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted">{tree.blurb}</p>
            {tree.id === "successors" ? (
              <p className="mt-2 text-sm leading-7">
                프톨레마이오스 왕조의 이집트 역사는{" "}
                <a href={`${EGYPT_URL}/origins#ptolemaic`} className="text-olive underline decoration-line underline-offset-4 hover:text-aegean" rel="noopener noreferrer">
                  {EGYPT_NAME}
                </a>
                에서 이어 읽습니다. 클레오파트라 7세는 이 첫 세대의 딸이 아닙니다.
              </p>
            ) : null}
            {tree.bands.map((band) => (
              <section key={band.id} className="mt-6">
                <h4 className="font-serif text-lg" style={{ color: band.color }}>
                  {band.ko} <span className="text-sm font-sans tracking-wide text-aegean">{band.en}</span>
                </h4>
                <p className="mt-1 text-sm leading-6 text-muted">{band.hint}</p>
                <ul className="mt-3 space-y-4">
                  {band.nodeIds.map((id) => {
                    const node = tree.byId.get(id)!;
                    const rel = relationsOf(tree, id);
                    return (
                      <li key={id} className="border-b border-line/80 pb-3 text-sm leading-7">
                        <a href={focusHref(tree.id, node.id)} className="font-serif text-base text-ink hover:text-aegean">
                          {node.ko}
                        </a>
                        <span className="text-muted"> / {node.roman}</span>
                        {node.greek ? (
                          <span lang="grc" className="ml-2 text-aegean">
                            {node.greek}
                          </span>
                        ) : null}
                        {node.years ? <span className="mt-0.5 block text-xs text-aegean">{node.years}</span> : null}
                        {node.href ? (
                          node.href.startsWith("http") ? (
                            <a href={node.href} className="mt-0.5 block text-aegean" rel="noopener noreferrer">
                              {node.linkLabel ?? EGYPT_NAME}
                            </a>
                          ) : (
                            <Link href={node.href} className="ml-2 text-aegean">
                              인물 페이지
                            </Link>
                          )
                        ) : null}
                        <span className="mt-0.5 block text-ink">{node.summary}</span>
                        {node.note ? <span className="mt-0.5 block text-xs leading-5 text-wine">{node.note}</span> : null}
                        <span className="mt-1 block text-xs leading-5 text-muted">
                          <Kin treeId={tree.id} label="부모" people={rel.parents} />
                          <Kin treeId={tree.id} label="전승으로 갈리는 부모" people={rel.variantParents} />
                          <Kin treeId={tree.id} label="배우자" people={rel.spouses} />
                          <Kin treeId={tree.id} label="자녀" people={rel.children} />
                          <Kin treeId={tree.id} label="전승으로 갈리는 자녀" people={rel.variantChildren} />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </section>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink">연대와 다른 전승</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
          금색 선은 이 그림이 택한 대표 관계입니다. 트로이 전쟁의 금색 선도 역사 기록이 아니라 전승입니다. 보라색 점선은 그 안에서도 이야기가 갈리는 관계입니다. 재위 연도는 디오도로스의 서술과 현대의 통상 연대이고, 아민타스 3세의 시작 해는 기원전 393년으로 보통 잡습니다.
        </p>
        <ul className="mt-4 space-y-4">
          {DISPUTES.map((item) => (
            <li key={item.id} className="rounded-md border border-line bg-card p-4 text-sm leading-7">
              <h3 className="font-serif text-lg text-ink">{item.title}</h3>
              <p className="mt-1">
                <span className="text-aegean">이 그림. </span>
                {item.main}
              </p>
              <p className="mt-1">
                <span className="text-wine">같이 둘 말. </span>
                {item.other}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-ink">이름을 읽을 때</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
          {NAME_NOTES.map((note) => (
            <li key={note.title}>
              <span className="text-ink">{note.title}. </span>
              {note.body}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Kin({ treeId, label, people }: { treeId: (typeof TREES)[number]["id"]; label: string; people: { id: string; ko: string }[] }) {
  if (!people.length) return null;
  return (
    <span className="mr-3 inline">
      {label}{" "}
      {people.map((person, index) => (
        <span key={person.id}>
          {index > 0 ? ", " : null}
          <a href={focusHref(treeId, person.id)} className="text-aegean underline decoration-line underline-offset-2 hover:text-ink">
            {person.ko}
          </a>
        </span>
      ))}
    </span>
  );
}
