import { cn } from "@/lib/utils";

export default function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white ring-1 ring-border",
        "transition-shadow hover:ring-2 hover:ring-accent",
        className,
      )}
      {...props}
    />
  );
}

