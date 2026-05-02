import { Copy } from "lucide-react";
import { useId } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

async function copyReservationNumber(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Reservation number copied");
  } catch {
    toast.error("Could not copy — tap the field and select the number");
  }
}

type ReservationNumberFieldProps = {
  value: string;
  className?: string;
};

/** Read-only booking ref with tap-to-select and explicit copy button. */
export function ReservationNumberField({ value, className }: ReservationNumberFieldProps) {
  const id = useId();

  return (
    <div
      className={cn(
        "rounded-xl border border-[oklch(1_0_0_/14%)] bg-[linear-gradient(180deg,_oklch(1_0_0_/6%)_0%,_oklch(0.08_0.04_255/0.35)_100%)] p-3",
        className,
      )}
    >
      <label
        htmlFor={id}
        className="mb-2 block font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50"
      >
        Reservation number
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <Input
          id={id}
          readOnly
          value={value}
          spellCheck={false}
          aria-readonly="true"
          inputMode="numeric"
          onFocus={(e) => e.currentTarget.select()}
          onClick={(e) => e.currentTarget.select()}
          className="border-white/15 bg-black/25 font-mono text-sm tabular-nums tracking-wider text-foreground selection:bg-aqua/30"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 shrink-0 border-white/20 bg-white/[0.04] hover:bg-white/[0.08] sm:min-w-[5.25rem]"
          onClick={() => void copyReservationNumber(value)}
        >
          <Copy className="h-4 w-4 opacity-90" aria-hidden />
          Copy
        </Button>
      </div>
    </div>
  );
}
