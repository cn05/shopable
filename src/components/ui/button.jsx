import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-brand text-white hover:bg-brandHover focus-visible:outline-brand disabled:bg-brand/70",
  secondary:
    "bg-white text-black ring-1 ring-border hover:bg-muted focus-visible:outline-brand",
  ghost: "bg-transparent text-black hover:bg-muted focus-visible:outline-brand",
};

const SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const Button = forwardRef(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        className,
      )}
      {...props}
    />
  );
});

export default Button;

