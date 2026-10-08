import { OTHER_FAMILY_TREES, OTHER_FILMS, SISTER_LABEL, SISTERS } from "@/lib/site";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

export function SisterBar() {
  return (
    <div className="border-t border-line/80 bg-stone/70">
      <nav aria-label={SISTER_LABEL} className="mx-auto flex w-full min-w-0 max-w-6xl gap-x-2 overflow-x-auto px-4 py-1.5 text-xs">
        <span className="mr-1 shrink-0 font-serif tracking-wide text-aegean">{SISTER_LABEL}</span>
        {SISTERS.map((site, index) => (
          <span key={site.href} className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap">
            {index > 0 ? (
              <span aria-hidden className="text-muted/50">
                ·
              </span>
            ) : null}
            <a href={site.href} className="text-ink hover:text-aegean" {...external}>
              {site.name}
            </a>
          </span>
        ))}
      </nav>
    </div>
  );
}

export function SisterList() {
  return (
    <nav aria-label={SISTER_LABEL} className="mt-4">
      <p className="font-serif text-xs tracking-wide text-aegean">{SISTER_LABEL}</p>
      <ul className="mt-1 space-y-1 text-xs leading-6">
        {SISTERS.map((site) => (
          <li key={site.href}>
            <a href={site.href} className="text-ink underline decoration-line underline-offset-4 hover:text-aegean" {...external}>
              {site.name}
            </a>
            <span className="text-muted"> — {site.note}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function CrossRow({
  label,
  en,
  links,
}: {
  label: string;
  en: string;
  links: readonly { href: string; name: string; en: string }[];
}) {
  return (
    <nav aria-label={label} className="mt-4 max-w-full">
      <p className="font-serif text-xs tracking-wide text-aegean">
        {label} <span className="font-sans font-normal tracking-normal text-muted">/ {en}</span>
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {links.map((site) => (
          <li key={site.href} className="max-w-full">
            <a
              href={site.href}
              {...external}
              className="inline-block max-w-full rounded-full border border-line bg-bg px-3 py-1 text-xs text-ink hover:border-aegean hover:text-aegean"
            >
              {site.name} <span className="text-muted">({site.en})</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function OtherFamilyTrees() {
  return <CrossRow label="다른 가족관계도" en="Other family trees" links={OTHER_FAMILY_TREES} />;
}

export function OtherFilms() {
  return <CrossRow label="다른 사이트의 영화" en="Films on sister sites" links={OTHER_FILMS} />;
}
