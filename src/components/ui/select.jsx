import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Select = forwardRef(function Select({ className, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-black",
        "outline-none transition-colors focus:border-brand",
        "disabled:cursor-not-allowed disabled:bg-muted disabled:text-textMuted",
        className,
      )}
      {...props}
    />
  );
});

export default Select;

