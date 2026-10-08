"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  LINE_LEGEND,
  TREES,
  exactNodeId,
  focusHref,
  isTreeId,
  relationsOf,
  searchNodes,
  treeById,
  type FamilyTree,
  type LayoutEdge,
  type LayoutNode,
  type TreeId,
} from "@/data/family-tree";

function edgePaint(edge: LayoutEdge, active: boolean, dimming: boolean) {
  const spouse = edge.kind === "spouse";
  const variant = edge.kind === "variant-parent";
  const color = variant ? "#6d4c8a" : spouse ? "#8c2f2b" : "#a6843d";
  let opacity = spouse ? (edge.local ? 0.92 : 0.16) : variant ? (edge.quiet ? 0.22 : 0.6) : edge.local ? 0.82 : edge.quiet ? 0.18 : 0.4;
  if (dimming) opacity = active ? 1 : 0.05;
  return {
    color,
    opacity,
    width: active ? 2.6 : edge.local ? 1.7 : 1.2,
    dash: variant ? "5 4" : undefined,
  };
}

function relatedSet(tree: FamilyTree, id: string) {
  const rel = relationsOf(tree, id);
  const ids = new Set<string>([id]);
  for (const group of [rel.parents, rel.variantParents, rel.spouses, rel.children, rel.variantChildren, rel.siblings]) {
    for (const person of group) ids.add(person.id);
  }
  return ids;
}

export function FamilyTreeView() {
  const [treeId, setTreeId] = useState<TreeId>("macedon");
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [openSuggest, setOpenSuggest] = useState(false);
  const tree = treeById(treeId);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const listId = useId();
  const exact = exactNodeId(query);
  const suggestions = exact || !query.trim() ? [] : searchNodes(query).slice(0, 8);
  const selectedNode = selected ? tree.byId.get(selected) : undefined;
  const related = useMemo(() => (selectedNode ? relatedSet(tree, selectedNode.id) : null), [tree, selectedNode]);
  const relations = selectedNode ? relationsOf(tree, selectedNode.id) : null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focus = params.get("focus");
    const found = focus ? exactNodeId(focus) : null;
    const requested = params.get("tree");
    if (found) {
      setTreeId(found.treeId);
      setSelected(found.id);
      return;
    }
    if (isTreeId(requested)) setTreeId(requested);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`ft-${selected}`)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
      inline: "center",
    });
  }, [selected]);

  function choose(nextTree: TreeId, id: string, label?: string) {
    setTreeId(nextTree);
    setSelected(id);
    setOpenSuggest(false);
    if (label) setQuery(label);
    window.history.replaceState(null, "", focusHref(nextTree, id));
  }

  function showTree(id: TreeId) {
    setTreeId(id);
    setSelected(null);
    setQuery("");
    setOpenSuggest(false);
    window.history.replaceState(null, "", `/family-tree?tree=${id}`);
  }

  function closePanel() {
    setSelected(null);
    window.history.replaceState(null, "", `/family-tree?tree=${treeId}`);
  }

  function onQuery(value: string) {
    setQuery(value);
    setOpenSuggest(true);
    const hit = exactNodeId(value);
    if (hit) choose(hit.treeId, hit.id);
  }

  return (
    <div>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="가문">
        {TREES.map((item) => {
          const on = item.id === tree.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tree-tab-${item.id}`}
              aria-selected={on}
              aria-controls="family-tree-panel"
              className={`shrink-0 rounded-full border px-3 py-1.5 text-sm ${on ? "border-aegean bg-aegean/10 font-semibold text-aegean" : "border-line bg-card text-ink hover:border-aegean"}`}
              onClick={() => showTree(item.id)}
            >
              {item.ko}
              <span className="ml-1.5 text-[10px] tracking-wide text-muted">{item.en}</span>
              {item.legend ? <span className="ml-1.5 text-[10px] text-wine">전승</span> : null}
            </button>
          );
        })}
      </div>

      <div id="family-tree-panel" role="tabpanel" aria-labelledby={`tree-tab-${tree.id}`}>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{tree.blurb}</p>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <form
            className="relative w-full max-w-md"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              const hit = exactNodeId(query) ?? (suggestions[0] ? { treeId: suggestions[0].treeId, id: suggestions[0].node.id } : null);
              if (hit) choose(hit.treeId, hit.id, treeById(hit.treeId).byId.get(hit.id)?.ko);
            }}
          >
            <label htmlFor="tree-find" className="text-xs text-muted">
              이름 찾기 · Find
            </label>
            <input
              id="tree-find"
              type="search"
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              onFocus={() => setOpenSuggest(true)}
              placeholder="필리포스, Alexander, 페리클레스"
              aria-label="가족관계도에서 이름 찾기"
              aria-autocomplete="list"
              aria-controls={suggestions.length > 0 ? listId : undefined}
              className="mt-1 w-full rounded-full border border-line bg-card px-4 py-2 text-sm outline-none focus:border-aegean"
            />
            {openSuggest && suggestions.length > 0 ? (
              <ul id={listId} role="listbox" className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-md border border-line bg-card py-1 shadow-lg">
                {suggestions.map((hit) => (
                  <li key={`${hit.treeId}-${hit.node.id}`} role="option" aria-selected={selected === hit.node.id}>
                    <button
                      type="button"
                      className="flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-aegean/10"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => choose(hit.treeId, hit.node.id, hit.node.ko)}
                    >
                      <span className="font-serif text-ink">{hit.node.ko}</span>
                      <span className="truncate text-xs text-muted">
                        {hit.node.tagline || hit.node.caption || hit.node.roman}
                        <span className="ml-1 text-aegean">{hit.treeKo}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </form>
          <div className="flex flex-wrap gap-2" aria-label="세대로 이동">
            {tree.bands.map((band) => (
              <button
                key={band.id}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-xs text-ink hover:border-aegean"
                onClick={() => {
                  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  document.getElementById(`band-${tree.id}-${band.id}`)?.scrollIntoView({
                    behavior: reduce ? "auto" : "smooth",
                    block: "nearest",
                    inline: "start",
                  });
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: band.color }} aria-hidden />
                {band.ko}
                <span className="text-[10px] tracking-wide text-aegean">{band.en}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
          {tree.bands.map((band) => (
            <li key={band.id} className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: band.color }} aria-hidden />
              {band.ko}
              <span className="text-aegean">{band.en}</span>
            </li>
          ))}
          {LINE_LEGEND.map((item) => (
            <li key={item.id} className="inline-flex items-center gap-1.5">
              <svg width="28" height="8" aria-hidden>
                {item.double ? (
                  <>
                    <line x1="0" y1="2" x2="28" y2="2" stroke={item.color} strokeWidth="1.4" />
                    <line x1="0" y1="6" x2="28" y2="6" stroke={item.color} strokeWidth="1.4" />
                  </>
                ) : (
                  <line x1="0" y1="4" x2="28" y2="4" stroke={item.color} strokeWidth="2" strokeDasharray={item.dash ? "4 3" : undefined} />
                )}
              </svg>
              {item.label}
            </li>
          ))}
          <li className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm border border-dashed border-[#6d4c8a]" aria-hidden />
            점선 칸은 전승
          </li>
        </ul>

        <div
          ref={scroller}
          className="mt-3 cursor-grab overflow-x-auto overflow-y-hidden rounded-lg border border-line active:cursor-grabbing"
          aria-label={`${tree.ko} 가족관계도`}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            const target = event.target as HTMLElement;
            if (target.closest("button, a, input")) return;
            const el = scroller.current;
            if (!el) return;
            drag.current = { x: event.clientX, left: el.scrollLeft };
            el.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!drag.current || !scroller.current) return;
            scroller.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <div className="relative" style={{ width: tree.width, height: tree.height }}>
            {tree.bands.map((band) => (
              <div
                key={band.id}
                id={`band-${tree.id}-${band.id}`}
                className="absolute left-0"
                style={{ top: band.top, height: band.height, width: tree.width, background: band.soft }}
              >
                <div className="sticky left-2 top-2 z-20 w-max rounded-full border border-white/80 bg-white/90 px-3 py-1 shadow-sm">
                  <span className="font-serif text-sm" style={{ color: band.color }}>
                    {band.ko}
                  </span>
                  <span className="ml-2 text-[10px] tracking-[0.14em] text-aegean">{band.en}</span>
                </div>
              </div>
            ))}
            <svg className="absolute inset-0 z-[1]" width={tree.width} height={tree.height} aria-hidden>
              {tree.edges.map((edge) => {
                const active = related ? related.has(edge.from) && related.has(edge.to) : false;
                const paint = edgePaint(edge, active, Boolean(related));
                const halo = related && !active ? 0 : 0.95;
                return (
                  <g key={edge.id} fill="none" strokeLinecap="round">
                    <path d={edge.d} stroke="#faf7f0" strokeWidth={paint.width + 2.4} strokeOpacity={halo} />
                    {edge.d2 ? <path d={edge.d2} stroke="#faf7f0" strokeWidth={paint.width + 2.4} strokeOpacity={halo} /> : null}
                    <path d={edge.d} stroke={paint.color} strokeWidth={paint.width} strokeOpacity={paint.opacity} strokeDasharray={paint.dash} />
                    {edge.d2 ? (
                      <path d={edge.d2} stroke={paint.color} strokeWidth={paint.width} strokeOpacity={paint.opacity} strokeDasharray={paint.dash} />
                    ) : null}
                  </g>
                );
              })}
            </svg>
            {tree.nodes.map((node) => (
              <TreeCard
                key={node.id}
                node={node}
                color={tree.bands.find((band) => band.id === node.band)?.color ?? "#1a5278"}
                legendTree={tree.legend}
                pressed={selected === node.id}
                dimmed={Boolean(related && !related.has(node.id))}
                linked={Boolean(related && related.has(node.id) && selected !== node.id)}
                onSelect={() => choose(tree.id, node.id)}
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">옆으로 밀거나 드래그하면 가계도 전체가 보입니다. 칸을 누르면 부모, 배우자, 자녀, 형제가 밝아집니다.</p>
      </div>

      {selectedNode && relations ? (
        <section
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-40 max-h-[46vh] overflow-auto rounded-lg border border-line bg-card p-4 shadow-lg sm:inset-x-auto sm:right-4 sm:w-[24rem]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.16em] text-aegean">
                {tree.ko}
                {tree.legend ? " · 전승" : ""} · {tree.bands.find((band) => band.id === selectedNode.band)?.ko}
              </p>
              <h2 className="font-serif text-2xl text-ink">{selectedNode.ko}</h2>
              <p className="text-sm text-muted">
                {selectedNode.greek ? <span lang="grc">{selectedNode.greek} · </span> : null}
                {selectedNode.roman}
                {selectedNode.guestTag ? <span> · {selectedNode.guestTag}</span> : null}
              </p>
              {selectedNode.years ? <p className="mt-1 text-xs text-aegean">{selectedNode.years}</p> : null}
            </div>
            <button
              type="button"
              className="rounded border border-line px-2 py-1 text-xs text-muted hover:text-ink"
              onClick={closePanel}
            >
              닫기
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-ink">{selectedNode.summary}</p>
          {selectedNode.note ? <p className="mt-2 text-xs leading-5 text-wine">{selectedNode.note}</p> : null}
          <div className="mt-3 space-y-2 text-sm">
            <PeopleRow label="부모" people={relations.parents} empty={relations.parents.length || relations.variantParents.length ? undefined : "이 그림에는 없음"} onPick={(id) => choose(tree.id, id)} />
            <PeopleRow label="전승으로 갈리는 부모" people={relations.variantParents} onPick={(id) => choose(tree.id, id)} />
            <PeopleRow label="배우자" people={relations.spouses} onPick={(id) => choose(tree.id, id)} />
            <PeopleRow label="자녀" people={relations.children} onPick={(id) => choose(tree.id, id)} />
            <PeopleRow label="전승으로 갈리는 자녀" people={relations.variantChildren} onPick={(id) => choose(tree.id, id)} />
            <PeopleRow label="형제·자매" people={relations.siblings} onPick={(id) => choose(tree.id, id)} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedNode.href ? <PersonLink href={selectedNode.href} label={selectedNode.linkLabel ?? "인물 페이지"} /> : null}
            <button
              type="button"
              className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-aegean"
              onClick={closePanel}
            >
              전체 가계도
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PersonLink({ href, label }: { href: string; label: string }) {
  const className = "rounded-full bg-aegean px-3 py-1.5 text-sm text-white hover:bg-aegean-deep";
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function PeopleRow({
  label,
  people,
  empty,
  onPick,
}: {
  label: string;
  people: { id: string; ko: string; roman: string }[];
  empty?: string;
  onPick: (id: string) => void;
}) {
  if (!people.length && !empty) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-1.5">
      <span className="text-xs text-muted">{label}</span>
      {people.length ? (
        people.map((person) => (
          <button key={person.id} type="button" className="rounded-full border border-line bg-bg px-2 py-0.5 text-xs hover:border-aegean" onClick={() => onPick(person.id)}>
            {person.ko}
            <span className="text-muted"> {person.roman}</span>
          </button>
        ))
      ) : (
        <span className="text-xs text-muted">{empty}</span>
      )}
    </div>
  );
}

function TreeCard({
  node,
  color,
  legendTree,
  pressed,
  dimmed,
  linked,
  onSelect,
}: {
  node: LayoutNode;
  color: string;
  legendTree: boolean;
  pressed: boolean;
  dimmed: boolean;
  linked: boolean;
  onSelect: () => void;
}) {
  const dashed = legendTree || node.legend;
  const line = node.tagline || node.caption || " ";
  const external = node.href?.startsWith("http");
  return (
    <div id={`ft-${node.id}`} className="absolute z-10" style={{ left: node.x, top: node.y, width: node.w, height: node.h, opacity: dimmed ? 0.28 : 1, scrollMargin: "11rem" }}>
      <button
        type="button"
        aria-pressed={pressed}
        onClick={onSelect}
        title={`${node.ko} / ${node.roman}${node.tagline ? `. ${node.tagline}` : node.caption ? `. 부모 ${node.caption}` : ""}`}
        className={`flex h-full w-full flex-col items-center justify-center rounded-md border bg-white px-1 text-center ${node.href ? "pr-6" : ""}`}
        style={{
          borderColor: dashed ? "#6d4c8a" : color,
          borderStyle: dashed ? "dashed" : "solid",
          boxShadow: pressed ? "0 0 0 3px #1a5278" : linked ? `0 0 0 2px ${color}` : undefined,
        }}
      >
        <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white" style={{ background: color }}>
          {node.ko.slice(0, 1)}
        </span>
        <span className="mt-0.5 max-w-full truncate font-serif text-[12px] leading-4 text-ink">{node.ko}</span>
        <span className="max-w-full truncate text-[10px] leading-3 text-muted">{node.sub}</span>
        <span className={`max-w-full truncate text-[10px] leading-3 ${node.tagline ? "text-aegean" : "text-muted"}`}>{line}</span>
      </button>
      {node.href ? (
        external ? (
          <a
            href={node.href}
            className="absolute bottom-1 right-1 z-10 rounded bg-white/90 px-1 text-[10px] leading-4 text-aegean underline"
            aria-label={`${node.ko} ${node.linkLabel ?? "이집트이야기"}`}
            rel="noopener noreferrer"
          >
            이집트
          </a>
        ) : (
          <Link href={node.href} className="absolute bottom-1 right-1 z-10 rounded bg-white/90 px-1 text-[10px] leading-4 text-aegean underline" aria-label={`${node.ko} 인물 페이지`}>
            페이지
          </Link>
        )
      ) : null}
    </div>
  );
}
