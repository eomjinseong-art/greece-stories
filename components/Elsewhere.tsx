import type { LinkItem } from "@/data/types";

export function Elsewhere({ links }: { links?: readonly LinkItem[] | null }) {
  if (!links?.length) return null;
  return (
    <aside className="mt-2 rounded-md border border-line bg-stone/60 px-3 py-2" aria-label="다른 사이트에서 더 보기">
      <p className="text-[11px] tracking-wide text-muted">다른 사이트에서 더 보기</p>
      <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-olive underline decoration-line underline-offset-4 hover:text-aegean">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
