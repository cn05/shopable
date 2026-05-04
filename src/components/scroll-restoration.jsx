"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

const STORAGE_KEY = "shopable.scroll.v2";
const MAX_ENTRIES = 50;
const RESTORE_TIMEOUT_MS = 8000;
const RESTORE_TOLERANCE_PX = 2;

function buildKey(pathname, searchParams) {
  const base = pathname || "/";
  const qs = searchParams?.toString?.() ?? "";
  return qs ? `${base}?${qs}` : base;
}

function getMaxScrollableY() {
  if (typeof window === "undefined") return 0;
  const el = document.scrollingElement || document.documentElement;
  const height = el?.scrollHeight ?? 0;
  return Math.max(0, height - window.innerHeight);
}

function safeRead() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function safeWrite(nextMap) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextMap));
  } catch {
    // ignore write errors
  }
}

export default function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlKey = useMemo(
    () => buildKey(pathname, searchParams),
    [pathname, searchParams],
  );

  const isPopNavigationRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ensure the browser doesn't try to restore scroll incorrectly.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    function rememberScroll() {
      const map = safeRead();
      map[urlKey] = window.scrollY ?? 0;
      // Keep storage bounded.
      const keys = Object.keys(map);
      if (keys.length > MAX_ENTRIES) {
        for (const key of keys.slice(0, keys.length - MAX_ENTRIES)) delete map[key];
      }
      safeWrite(map);
    }

    // Save frequently but cheaply.
    rememberScroll();
    window.addEventListener("scroll", rememberScroll, { passive: true });

    function onPopState() {
      isPopNavigationRef.current = true;
    }

    window.addEventListener("popstate", onPopState);

    return () => {
      rememberScroll();
      window.removeEventListener("scroll", rememberScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, [urlKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isPopNavigationRef.current) return;

    isPopNavigationRef.current = false;

    const map = safeRead();
    const target = map[urlKey];
    const targetY =
      typeof target === "number" && Number.isFinite(target) ? target : 0;

    const start = performance.now();

    function tryRestore() {
      const elapsed = performance.now() - start;
      if (elapsed > RESTORE_TIMEOUT_MS) return;

      const maxY = getMaxScrollableY();
      // Wait until the page is tall enough to reach the desired scroll position.
      if (targetY > maxY + RESTORE_TOLERANCE_PX) {
        requestAnimationFrame(tryRestore);
        return;
      }

      window.scrollTo(0, targetY);

      const diff = Math.abs((window.scrollY ?? 0) - targetY);
      if (diff <= RESTORE_TOLERANCE_PX) return;

      requestAnimationFrame(tryRestore);
    }

    requestAnimationFrame(tryRestore);
  }, [urlKey]);

  return null;
}
