"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VisitorCounter } from "@/components/VisitorCounter";
import { MYTH_NAME, MYTH_URL, NAV, ROME_NAME, ROME_URL, SITE_NAME, SITE_NAME_EN } from "@/lib/site";

function active(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2" aria-label={`${SITE_NAME} 홈`}>
          <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full border border-aegean bg-stone text-aegean">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path d="M5 19.5h14M7 19.5V10.5h10v9M6 10.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M8.5 10.5 12 6.5 15.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-lg leading-tight tracking-wide text-ink">{SITE_NAME}</span>
            <span className="mt-0.5 block text-[10px] leading-none tracking-[0.18em] text-aegean">{SITE_NAME_EN}</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <a href={MYTH_URL} className="hidden text-xs text-muted underline decoration-line underline-offset-4 hover:text-aegean sm:inline" rel="noopener noreferrer">
            {MYTH_NAME}
          </a>
          <a href={ROME_URL} className="hidden text-xs text-muted underline decoration-line underline-offset-4 hover:text-aegean md:inline" rel="noopener noreferrer">
            {ROME_NAME}
          </a>
          <VisitorCounter />
        </div>
      </div>
      <nav aria-label="주요 메뉴" className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
        {NAV.map((item) => {
          const on = active(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={on ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-2 text-sm ${on ? "bg-aegean/10 font-semibold text-aegean" : "text-muted hover:bg-stone hover:text-ink"}`}
            >
              {item.label}
            </Link>
          );
        })}
        <a href={MYTH_URL} className="shrink-0 rounded-full px-3 py-2 text-sm text-muted hover:bg-stone hover:text-ink sm:hidden" rel="noopener noreferrer">
          {MYTH_NAME}
        </a>
      </nav>
      <div className="meander opacity-70" aria-hidden />
    </header>
  );
}
