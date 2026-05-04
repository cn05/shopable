import { cn } from "@/lib/utils";

export default function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-muted text-black ring-1 ring-border",
    accent: "bg-accent text-black",
    brand: "bg-brand text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
        variants[variant] ?? variants.default,
        className,
      )}
      {...props}
    />
  );
}

