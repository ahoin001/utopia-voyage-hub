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
    <div className={cn("surface-inner p-3", className)}>
      <label htmlFor={id} className="eyebrow eyebrow-faint mb-2 block">
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
          className="border-edge bg-surface-inset font-mono text-sm tabular-nums tracking-wider text-fg selection:bg-aqua/30"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 shrink-0 border-edge bg-white/[0.04] hover:bg-white/[0.08] sm:min-w-[5.25rem]"
          onClick={() => void copyReservationNumber(value)}
        >
          <Copy className="h-4 w-4 opacity-90" aria-hidden />
          Copy
        </Button>
      </div>
    </div>
  );
}
