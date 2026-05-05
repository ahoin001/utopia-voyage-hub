import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatProps = {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
  tone?: "default" | "aqua" | "sunset" | "gold";
  className?: string;
};

const valueSizeClass = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl sm:text-5xl",
} as const;

const valueToneClass = {
  default: "text-fg",
  aqua: "text-aqua",
  sunset: "text-sunset",
  gold: "text-gold",
} as const;

/**
 * Predictable label + value pair for headline numbers and stats.
 */
export function Stat({
  label,
  value,
  description,
  align = "left",
  size = "lg",
  tone = "default",
  className,
}: StatProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <p className="eyebrow eyebrow-faint">{label}</p>
      <p
        className={cn(
          "mt-2 font-bold tracking-tighter tabular-nums",
          valueSizeClass[size],
          valueToneClass[tone],
        )}
      >
        {value}
      </p>
      {description ? (
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-fg-subtle">{description}</p>
      ) : null}
    </div>
  );
}
