export function StatTile({
  label,
  value,
  detail,
  tone = "matcha",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "matcha" | "warn" | "bad" | "info";
}) {
  const edge = {
    matcha: "border-l-matcha",
    warn: "border-l-warn",
    bad: "border-l-bad",
    info: "border-l-info",
  }[tone];

  return (
    <div
      className={`rounded-gov border border-line border-l-4 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(20,32,26,0.06)] ${edge}`}
    >
      <p className="text-[0.76rem] font-semibold uppercase tracking-wider text-ink-3">{label}</p>
      <p className="font-serif text-[1.85rem] font-bold leading-tight">{value}</p>
      <p className="text-[0.78rem] text-ink-2">{detail}</p>
    </div>
  );
}

export function MeterBar({ value, tone }: { value: number; tone?: "warn" | "bad" }) {
  const fill = tone === "bad" ? "bg-bad" : tone === "warn" ? "bg-warn" : "bg-matcha";
  return (
    <div className="h-[9px] overflow-hidden rounded-sm bg-tint">
      <div className={`h-full ${fill}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
