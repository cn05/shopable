export function formatRupiah(value) {
  if (value === null || value === undefined) return "";

  const numericValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numericValue)) return "";

  // Intl output may include non-breaking spaces; normalize for UI consistency.
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(numericValue)
    .replace(/\u00a0/g, " ");
}

export function parsePrice(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;

  const digits = String(value).replace(/[^\d]/g, "");
  if (!digits) return null;
  const numericValue = Number(digits);
  return Number.isFinite(numericValue) ? numericValue : null;
}

export function slugify(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function cn(...inputs) {
  const classes = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string") {
      classes.push(input);
      continue;
    }

    if (Array.isArray(input)) {
      classes.push(cn(...input));
      continue;
    }

    if (typeof input === "object") {
      for (const [key, isEnabled] of Object.entries(input)) {
        if (isEnabled) classes.push(key);
      }
    }
  }

  return classes.filter(Boolean).join(" ");
}

