import { useRef, useState } from "react";
import type { CategoryId } from "../types";
import {
  CATEGORY_BG,
  CATEGORY_ICON,
  categorySupportsTryOn,
  getClothType,
} from "../utils/clothType";
import { compressImage } from "../utils/storage";
import "./OutfitUpload.css";

interface OutfitUploadProps {
  activeCategory: CategoryId;
  onUpload: (payload: {
    name: string;
    category: CategoryId;
    garmentImage: string;
  }) => void;
}

export function OutfitUpload({ activeCategory, onUpload }: OutfitUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);

  const supportsTryOn = categorySupportsTryOn(activeCategory);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const outfitName =
      name.trim() ||
      `${activeCategory.toUpperCase()} ${Date.now().toString().slice(-4)}`;

    setUploading(true);
    try {
      const garmentImage = await compressImage(file, 1024);
      onUpload({ name: outfitName, category: activeCategory, garmentImage });
      setName("");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <section className="outfit-upload">
      <div className="section-label">
        <span className="arrow">▸</span>
        <span>ADD OUTFIT</span>
      </div>

      <div className="upload-row pixel-box">
        <input
          type="text"
          className="upload-name"
          placeholder="OUTFIT NAME"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={24}
        />
        <button
          type="button"
          className="upload-btn"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "..." : "+ PHOTO"}
        </button>
      </div>

      <p className="upload-hint">
        Upload a flat-lay or product photo of the{" "}
        {activeCategory.toUpperCase()} item.
        {!supportsTryOn && " (Preview only — AI try-on does not support this category yet.)"}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </section>
  );
}

export function createOutfitItem(payload: {
  name: string;
  category: CategoryId;
  garmentImage: string;
}): import("../types").OutfitItem {
  const { name, category, garmentImage } = payload;
  return {
    id: crypto.randomUUID(),
    name,
    category,
    clothType: getClothType(category),
    garmentImage,
    bg: CATEGORY_BG[category],
    icon: CATEGORY_ICON[category],
    supportsTryOn: categorySupportsTryOn(category),
    createdAt: Date.now(),
  };
}
