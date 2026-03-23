"use client";

import { useEffect, useRef, useState } from "react";

export function UseInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

export function SectionHeader({
  label,
  title,
  subtitle,
  action,
}: {
  label: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center space-y-3">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#c3003a] bg-[#fb397d]/10 px-4 py-1.5 rounded-full">
        {label}
      </span>
      <h2 className="text-3xl md:text-5xl font-extrabold text-[#2b1d3a]">
        {title}
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      {action && <div className="pt-1">{action}</div>}
      <span className="h-1 w-16 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
    </div>
  );
}

export function AboutSectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#c3003a] bg-[#fb397d]/10 px-4 py-1.5 rounded-full">
      {text}
    </span>
  );
}
