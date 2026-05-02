import { useEffect, useRef, type ReactNode } from "react";

type RevealOnViewProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
};

/** Adds .reveal-visible when scrolled into view (once). */
export function RevealOnView({
  children,
  className = "",
  rootMargin = "0px 0px -8% 0px",
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        el.classList.add("reveal-visible");
        obs.disconnect();
      },
      { threshold: 0.12, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={`reveal-on-view ${className}`.trim()}>
      {children}
    </div>
  );
}
