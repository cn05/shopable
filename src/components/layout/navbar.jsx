"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";
import Drawer from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/categories", label: "Kategori" },
  { href: "/testimonials", label: "Testimoni" },
  { href: "/rewards", label: "Vouchers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileSearchInputRef = useRef(null);

  const cartLabel = useMemo(() => {
    if (!itemCount) return "Cart";
    return `Cart (${itemCount})`;
  }, [itemCount]);

  useEffect(() => {
    if (!isMobileSearchOpen) return;
    const timeout = window.setTimeout(() => {
      mobileSearchInputRef.current?.focus?.();
    }, 50);
    return () => window.clearTimeout(timeout);
  }, [isMobileSearchOpen]);

  useEffect(() => {
    function update() {
      setIsScrolled(window.scrollY > 8);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 relative bg-transparent px-4 pt-5 md:pt-7.5",
        isScrolled ? "md:bg-transparent" : "md:bg-white",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-0 bg-white/20 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-200 ease-out motion-reduce:transition-none",
          isScrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="container relative z-10 mx-auto max-w-282.5">
        <nav className="flex items-center justify-between gap-3 rounded-2xl bg-brand p-3 md:gap-5 md:rounded-3xl md:p-5">
          <Link href="/" className="flex shrink-0 items-center gap-1">
            <span className="text-5xl font-bold text-accent">*</span>
            <span className="text-3xl font-bold text-white">Shopable</span>
          </Link>

          <ul className="hidden items-center gap-7.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "transition-all duration-300",
                      isActive
                        ? "font-bold text-accent"
                        : "text-white hover:text-accent hover:font-bold",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <form
            action="/catalog"
            className="hidden min-w-0 flex-1 items-center justify-center md:flex"
            role="search"
          >
            <label className="w-full min-w-0 max-w-xl">
              <span className="sr-only">Search products</span>
              <input
                name="q"
                placeholder="Cari produk..."
                className="w-full rounded-full border border-white/20 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/70 outline-none transition-colors focus:border-accent"
              />
            </label>
          </form>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <Link href="/cart" className="relative" aria-label={cartLabel}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center md:h-12 md:w-12">
                <Image
                  src="/assets/icons/cart.svg"
                  alt="Cart"
                  width={48}
                  height={48}
                />
              </div>
              {itemCount ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-black">
                  {itemCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsMobileSearchOpen((prev) => {
                  const next = !prev;
                  if (prev && !next) mobileSearchInputRef.current?.blur?.();
                  return next;
                });
                setIsMenuOpen(false);
              }}
              className="md:hidden"
              aria-label={
                isMobileSearchOpen ? "Close search" : "Open search"
              }
              aria-controls="mobile-search"
              aria-expanded={isMobileSearchOpen}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform duration-200 ease-out motion-reduce:transition-none",
                  isMobileSearchOpen
                    ? "scale-[0.98]"
                    : "hover:scale-[1.02] active:scale-[0.98]",
                )}
              >
                <Image
                  src="/assets/icons/search-normal.svg"
                  alt=""
                  width={22}
                  height={22}
                />
              </div>
            </button>

            <Link
              href="/signin"
              className="hidden rounded-full bg-white px-5 py-3 text-sm font-semibold text-black md:block"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black md:inline-flex md:px-5 md:py-3"
            >
              Sign Up
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(true);
                setIsMobileSearchOpen(false);
                mobileSearchInputRef.current?.blur?.();
              }}
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-muted md:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>

        <div
          id="mobile-search"
          className={cn(
            "md:hidden overflow-hidden transition-[max-height,opacity,transform,margin-top] duration-200 ease-out motion-reduce:transition-none",
            isMobileSearchOpen
              ? "mt-3 max-h-24 opacity-100 translate-y-0"
              : "mt-0 max-h-0 opacity-0 -translate-y-1",
          )}
          aria-hidden={isMobileSearchOpen ? "false" : "true"}
        >
          <form
            action="/catalog"
            role="search"
            onSubmit={() => setIsMobileSearchOpen(false)}
            className={cn(
              isMobileSearchOpen
                ? "pointer-events-auto"
                : "pointer-events-none",
            )}
          >
            <label className="block">
              <span className="sr-only">Search products</span>
              <input
                ref={mobileSearchInputRef}
                tabIndex={isMobileSearchOpen ? 0 : -1}
                name="q"
                placeholder="Cari produk..."
                className="w-full rounded-full border border-border bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-brand"
              />
            </label>
          </form>
        </div>
      </div>

      <Drawer
        open={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        side="right"
        title="Menu"
        showHeader={false}
        className="!p-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Link
              href="/"
              className="flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-4xl font-bold text-accent">*</span>
              <span className="text-xl font-bold text-black">Shopable</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-black"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="px-5 py-5">
            <p className="text-xs font-semibold text-textMuted">Menu</p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-muted text-black"
                          : "text-black hover:bg-muted",
                      )}
                    >
                      <span>{link.label}</span>
                      <span aria-hidden className="text-textMuted">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto border-t border-border px-5 py-5">
            <div className="grid gap-3">
              <Link
                href="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white hover:bg-brandHover"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full border border-black px-6 py-3 text-center text-sm font-semibold text-black hover:bg-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
