import type { CategoryId, InventoryCategory, RecentItem } from "../types";

export const INVENTORY_CATEGORIES: InventoryCategory[] = [
  { id: "dress", label: "DRESS", icon: "dress" },
  { id: "hood", label: "HOOD", icon: "hood" },
  { id: "top", label: "TOP", icon: "top" },
  { id: "jean", label: "JEAN", icon: "jean" },
  { id: "shoe", label: "SHOE", icon: "shoe" },
  { id: "acc", label: "ACC.", icon: "acc" },
];

export const RECENT_ITEMS: RecentItem[] = [
  { id: "1", name: "Floral Midi", bg: "#C8D4A8", icon: "dress" },
  { id: "2", name: "Knit Gloves", bg: "#A8C8D4", icon: "gloves" },
  { id: "3", name: "Black Heel", bg: "#E8C8A8", icon: "heel" },
  { id: "4", name: "Oval Shades", bg: "#A8B8A8", icon: "shades" },
];

export const CATEGORY_ITEMS: Record<CategoryId, RecentItem[]> = {
  dress: [
    { id: "d1", name: "Floral Midi", bg: "#C8D4A8", icon: "dress" },
    { id: "d2", name: "Sun Dress", bg: "#E8D4A8", icon: "dress" },
  ],
  hood: [
    { id: "h1", name: "Orange Hood", bg: "#E8C8A8", icon: "hood" },
    { id: "h2", name: "Zip Hoodie", bg: "#D4C8A8", icon: "hood" },
  ],
  top: [
    { id: "t1", name: "Pink Tee", bg: "#E8A8C8", icon: "top" },
    { id: "t2", name: "Crop Top", bg: "#D4A8C8", icon: "top" },
  ],
  jean: [
    { id: "j1", name: "Blue Jean", bg: "#A8C8E8", icon: "jean" },
    { id: "j2", name: "Wide Leg", bg: "#A8B8D4", icon: "jean" },
  ],
  shoe: [
    { id: "s1", name: "Black Heel", bg: "#E8C8A8", icon: "heel" },
    { id: "s2", name: "Purple Sneak", bg: "#C8A8E8", icon: "shoe" },
  ],
  acc: [
    { id: "a1", name: "Oval Shades", bg: "#A8B8A8", icon: "shades" },
    { id: "a2", name: "Pink Bag", bg: "#E8A8C8", icon: "acc" },
  ],
};
