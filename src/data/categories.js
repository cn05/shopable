import { slugify } from "@/lib/utils";

export const categories = [
  {
    icon: "/assets/icons/mobile.svg",
    name: "HP & Aksesoris",
  },
  { icon: "/assets/icons/game.svg", name: "Games" },
  {
    icon: "/assets/icons/airpods.svg",
    name: "Headset",
  },
  {
    icon: "/assets/icons/box.svg",
    name: "Kebutuhan Pokok",
  },
  {
    icon: "/assets/icons/lamp.svg",
    name: "Penerangan",
  },
  {
    icon: "/assets/icons/watch.svg",
    name: "Jam Tangan",
  },
  {
    icon: "/assets/icons/monitor.svg",
    name: "PC & Laptop",
  },
  { icon: "/assets/icons/cup.svg", name: "Hadiah" },
].map((category) => ({
  ...category,
  slug: slugify(category.name),
}));

