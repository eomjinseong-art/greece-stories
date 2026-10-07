import { SISTER_LABEL, SISTERS } from "@/lib/site";

export function SisterBar() {
  return (
    <nav aria-label={SISTER_LABEL} className="border-t border-line/80 bg-stone/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-1.5 text-xs">
        <span className="mr-1 font-serif tracking-wide text-aegean">{SISTER_LABEL}</span>
        {SISTERS.map((site, index) => (
          <span key={site.href} className="inline-flex items-center gap-2">
            {index > 0 ? (
              <span aria-hidden className="text-muted/50">
                ·
              </span>
            ) : null}
            <a href={site.href} className="text-ink hover:text-aegean" rel="noopener noreferrer">
              {site.name}
            </a>
          </span>
        ))}
      </div>
    </nav>
  );
}

export function SisterList() {
  return (
    <nav aria-label={SISTER_LABEL} className="mt-4">
      <p className="font-serif text-xs tracking-wide text-aegean">{SISTER_LABEL}</p>
      <ul className="mt-1 space-y-1 text-xs leading-6">
        {SISTERS.map((site) => (
          <li key={site.href}>
            <a href={site.href} className="text-ink underline decoration-line underline-offset-4 hover:text-aegean" rel="noopener noreferrer">
              {site.name}
            </a>
            <span className="text-muted"> — {site.note}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
