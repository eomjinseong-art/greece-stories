import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs tracking-[0.2em] text-aegean">404</p>
      <h1 className="mt-2 font-serif text-3xl text-ink">이 길은 아고라로 통하지 않습니다</h1>
      <p className="mt-3 text-sm leading-7 text-muted">주소가 없거나 옮겨졌습니다. 광장으로 돌아가 다른 폴리스를 고르세요.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/" className="text-aegean underline">
          홈
        </Link>
        <Link href="/polis" className="text-aegean underline">
          폴리스
        </Link>
        <Link href="/people" className="text-aegean underline">
          인물
        </Link>
        <Link href="/wars" className="text-aegean underline">
          전쟁
        </Link>
      </div>
    </div>
  );
}
