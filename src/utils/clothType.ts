import type { CategoryId, ClothType } from "../types";

const CATEGORY_CLOTH_TYPE: Record<CategoryId, ClothType> = {
  dress: "overall",
  hood: "outer",
  top: "upper",
  jean: "lower",
  shoe: "lower",
  acc: "inner",
};

const TRY_ON_SUPPORTED: Record<CategoryId, boolean> = {
  dress: true,
  hood: true,
  top: true,
  jean: true,
  shoe: false,
  acc: false,
};

export function getClothType(category: CategoryId): ClothType {
  return CATEGORY_CLOTH_TYPE[category];
}

export function categorySupportsTryOn(category: CategoryId): boolean {
  return TRY_ON_SUPPORTED[category];
}

export const CATEGORY_ICON: Record<CategoryId, string> = {
  dress: "dress",
  hood: "hood",
  top: "top",
  jean: "jean",
  shoe: "shoe",
  acc: "acc",
};

export const CATEGORY_BG: Record<CategoryId, string> = {
  dress: "#C8D4A8",
  hood: "#E8C8A8",
  top: "#E8A8C8",
  jean: "#A8C8E8",
  shoe: "#C8A8E8",
  acc: "#E8A8C8",
};
