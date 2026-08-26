"use client";

import { motion } from "motion/react";

export function ScoreDial({ score }: { score: number }) {
  const circumference = 100.5;
  const stroke = score >= 90 ? "#2e6b4f" : score >= 70 ? "#8a5d0b" : "#993030";

  return (
    <svg viewBox="0 0 42 42" className="size-[108px] shrink-0" role="img" aria-label={`Compliance score ${score} out of 100`}>
      <circle cx="21" cy="21" r="16" fill="none" stroke="#e9f0e4" strokeWidth="5" />
      <motion.circle
        cx="21"
        cy="21"
        r="16"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
        transform="rotate(-90 21 21)"
        initial={{ strokeDasharray: `0 ${circumference}` }}
        animate={{ strokeDasharray: `${(score / 100) * circumference} ${circumference}` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <text x="21" y="22.5" textAnchor="middle" fontSize="11" fontFamily="serif" fontWeight="700" fill="#14201a">
        {score}
      </text>
      <text x="21" y="28" textAnchor="middle" fontSize="4" fill="#65756c">
        of 100
      </text>
    </svg>
  );
}
