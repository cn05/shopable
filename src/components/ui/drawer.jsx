"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Drawer({
  open,
  onOpenChange,
  title,
  description,
  side = "bottom",
  showHeader = true,
  children,
  className,
}) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === "Escape") onOpenChange(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === "string" ? title : "Dialog"}
      aria-hidden={open ? "false" : "true"}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-200 ease-out motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={() => onOpenChange(false)}
        aria-label="Close"
        tabIndex={open ? 0 : -1}
      />

      <div
        className={cn(
          "bg-white ring-1 ring-border transition-transform duration-200 ease-out motion-reduce:transition-none",
          side === "right"
            ? cn(
                "absolute bottom-0 right-0 top-0 w-[85vw] max-w-sm overflow-auto rounded-l-3xl p-5",
                open ? "translate-x-0" : "translate-x-full",
              )
            : cn(
                "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-auto rounded-t-3xl p-5",
                open ? "translate-y-0" : "translate-y-full",
              ),
          className,
        )}
      >
        {showHeader && title ? (
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-bold text-black">{title}</p>
              {description ? (
                <p className="mt-1 text-xs text-textMuted">{description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full bg-muted px-4 py-2 text-xs font-semibold text-black"
            >
              Tutup
            </button>
          </div>
        ) : null}

        <div className={cn(showHeader && title ? "mt-4" : "mt-0")}>
          {children}
        </div>
      </div>
    </div>
  );
}
