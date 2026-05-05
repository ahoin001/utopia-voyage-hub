import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "aqua" | "sunset" | "gold" | "coral" | "neutral";
type Size = "sm" | "md";

type TonePillProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  size?: Size;
  icon?: ReactNode;
  children?: ReactNode;
};

const toneClass: Record<Tone, string> = {
  aqua: "tone-aqua",
  sunset: "tone-sunset",
  gold: "tone-gold",
  coral: "tone-coral",
  neutral: "tone-neutral",
};

const sizeClass: Record<Size, string> = {
  sm: "px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]",
  md: "px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
};

/**
 * Inline tonal chip / badge with predictable contrast across the design system.
 * Uses tokenized accent surfaces (no inline colors).
 */
export function TonePill({
  tone = "neutral",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: TonePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full whitespace-nowrap",
        toneClass[tone],
        sizeClass[size],
        className,
      )}
      {...rest}
    >
      {icon ? <span className="inline-flex shrink-0 items-center">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}
