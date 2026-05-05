import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SurfaceVariant = "card" | "card-elevated" | "inner" | "inset";

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SurfaceVariant;
  children?: ReactNode;
};

const variantClass: Record<SurfaceVariant, string> = {
  card: "surface-card",
  "card-elevated": "surface-card-elevated",
  inner: "surface-inner",
  inset: "surface-inset",
};

/**
 * Themed surface primitive. Always pulls colors from the design tokens, so
 * borders / backgrounds / shadows stay consistent across the app.
 *
 * Variants:
 * - `card` — primary panel
 * - `card-elevated` — slightly raised card (modals, hero panels)
 * - `inner` — nested panel within a card
 * - `inset` — dark inset row (form fields, info strips)
 */
export function Surface({ variant = "card", className, children, ...rest }: SurfaceProps) {
  return (
    <div className={cn(variantClass[variant], className)} {...rest}>
      {children}
    </div>
  );
}
