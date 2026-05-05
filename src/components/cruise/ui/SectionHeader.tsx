import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "aqua" | "sunset" | "gold";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  eyebrowTone?: Tone;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  size?: "sm" | "md" | "lg";
};

const eyebrowToneClass: Record<Tone, string> = {
  aqua: "eyebrow",
  sunset: "eyebrow eyebrow-sunset",
  gold: "eyebrow eyebrow-gold",
};

const titleSizeClass = {
  sm: "text-[clamp(1.5rem,4vw,2rem)]",
  md: "text-[clamp(2rem,5vw,3rem)]",
  lg: "text-[clamp(2.25rem,6vw,3.75rem)]",
} as const;

/**
 * Standard section header with optional accent eyebrow + description.
 * Centralized so spacing and color stay consistent everywhere.
 */
export function SectionHeader({
  eyebrow,
  eyebrowTone = "aqua",
  title,
  description,
  align = "center",
  size = "md",
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? <p className={cn("mb-3", eyebrowToneClass[eyebrowTone])}>{eyebrow}</p> : null}
      <h2 className={cn("font-bold tracking-tight text-fg", titleSizeClass[size])}>{title}</h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-pretty text-[15px] leading-relaxed text-fg-muted",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
