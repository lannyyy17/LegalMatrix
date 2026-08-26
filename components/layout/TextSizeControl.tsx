"use client";

import { useEffect, useState } from "react";

type Size = "s" | "m" | "l";

const PX: Record<Size, string> = { s: "15.5px", m: "17px", l: "19px" };

/**
 * The A- / A / A+ control that gov.in portals carry. Not decoration:
 * the audience for this application includes officers and citizens
 * who need larger type, and scaling the root font size scales every
 * rem-based Tailwind utility with it.
 */
export function TextSizeControl() {
  const [size, setSize] = useState<Size>("m");

  useEffect(() => {
    document.documentElement.style.fontSize = PX[size];
  }, [size]);

  const label: Record<Size, string> = { s: "A\u2212", m: "A", l: "A+" };

  return (
    <div
      role="group"
      aria-label="Text size"
      className="flex overflow-hidden rounded-gov border border-line-strong"
    >
      {(["s", "m", "l"] as Size[]).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setSize(s)}
          aria-pressed={size === s}
          title={s === "s" ? "Smaller text" : s === "m" ? "Default text size" : "Larger text"}
          className={`border-r border-line px-2 py-0.5 last:border-r-0 ${
            size === s ? "bg-matcha text-white" : "bg-white text-ink-2 hover:bg-tint-2"
          }`}
        >
          {label[s]}
        </button>
      ))}
    </div>
  );
}
