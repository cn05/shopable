import { slugify } from "@/lib/utils";

export const brands = [
  "/assets/logos/microsoft.svg",
  "/assets/logos/apple.svg",
  "/assets/logos/samsung.svg",
  "/assets/logos/huawei.svg",
  "/assets/logos/nokia.svg",
].map((logoPath) => {
  const name = logoPath.split("/").pop()?.replace(".svg", "") ?? "brand";
  return {
    logo: logoPath,
    name,
    slug: slugify(name),
  };
});

