import type { ReactNode } from "react";

export function Card({
  title,
  subtitle,
  right,
  padded = true,
  className = "",
  children,
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  padded?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-gov border border-line bg-white shadow-[0_1px_2px_rgba(20,32,26,0.06),0_3px_10px_rgba(20,32,26,0.05)] ${className}`}
    >
      {title && (
        <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-line bg-tint-2 px-4 py-2.5">
          <h3 className="text-[1.02rem] font-semibold">{title}</h3>
          {subtitle && <span className="text-[0.78rem] text-ink-3">{subtitle}</span>}
          {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
        </header>
      )}
      <div className={padded ? "p-4" : ""}>{children}</div>
    </section>
  );
}

export function Callout({
  title,
  tone = "info",
  children,
}: {
  title?: string;
  tone?: "info" | "warn" | "bad" | "ok";
  children: ReactNode;
}) {
  const tones = {
    info: "bg-info-bg border-info/25 border-l-info",
    warn: "bg-warn-bg border-warn/25 border-l-warn",
    bad: "bg-bad-bg border-bad/25 border-l-bad",
    ok: "bg-ok-bg border-ok/25 border-l-ok",
  }[tone];
  const titleColor = { info: "text-info", warn: "text-warn", bad: "text-bad", ok: "text-ok" }[tone];

  return (
    <div className={`rounded-gov border border-l-4 px-3.5 py-2.5 text-[0.88rem] ${tones}`}>
      {title && <p className={`font-semibold ${titleColor}`}>{title}</p>}
      <div className="text-ink">{children}</div>
    </div>
  );
}
