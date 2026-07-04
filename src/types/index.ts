export type TabId = "home" | "items" | "favs" | "me";

export type CategoryId = "dress" | "hood" | "top" | "jean" | "shoe" | "acc";

export type ClothType = "upper" | "lower" | "overall" | "inner" | "outer";

export interface InventoryCategory {
  id: CategoryId;
  label: string;
  icon: string;
}

export interface OutfitItem {
  id: string;
  name: string;
  category: CategoryId;
  clothType: ClothType;
  garmentImage: string;
  bg: string;
  icon: string;
  supportsTryOn: boolean;
  createdAt: number;
}

export interface SavedLook {
  id: string;
  outfitName: string;
  resultImageUrl: string;
  createdAt: number;
}

export type TryOnStatus = "idle" | "loading" | "success" | "error";

export interface TryOnState {
  status: TryOnStatus;
  resultImageUrl: string | null;
  error: string | null;
}

export interface RecentItem {
  id: string;
  name: string;
  bg: string;
  icon: string;
}
