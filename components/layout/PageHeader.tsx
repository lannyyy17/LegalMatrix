import type { ReactNode } from "react";

export function PageHeader({
  crumb,
  title,
  intro,
  actions,
}: {
  crumb: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 border-b border-line pb-3.5">
      <p className="text-[0.78rem] text-ink-3">{crumb}</p>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <h1 className="text-[1.5rem] font-semibold">{title}</h1>
          {intro && <p className="mt-1 max-w-[70ch] text-[0.9rem] text-ink-2">{intro}</p>}
        </div>
        {actions && <div className="no-print ml-auto flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "rounded-gov border px-3.5 py-1.5 text-[0.88rem] font-semibold transition-colors disabled:opacity-60";
  const styles =
    variant === "primary"
      ? "border-matcha bg-matcha text-white hover:bg-matcha-hover"
      : "border-line-strong bg-white text-matcha hover:bg-tint-2";
  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
