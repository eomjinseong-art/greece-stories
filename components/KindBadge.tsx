import type { Kind } from "@/data/types";

const LABEL: Record<Kind, string> = {
  legend: "전설",
  history: "역사",
  mixed: "전설과 역사가 섞임",
};

const CLASS_NAME: Record<Kind, string> = {
  legend: "border-wine/40 bg-wine/10 text-wine",
  history: "border-olive/40 bg-olive/10 text-olive",
  mixed: "border-aegean/40 bg-aegean/10 text-aegean",
};

export function KindBadge({ kind }: { kind: Kind }) {
  return (
    <span className={`inline-block rounded-sm border px-1.5 py-0.5 text-[10px] font-medium tracking-wide ${CLASS_NAME[kind]}`}>
      {LABEL[kind]}
    </span>
  );
}
