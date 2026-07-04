import type { OutfitItem } from "../types";
import { PixelIcon } from "./PixelIcon";
import "./OutfitGrid.css";

interface OutfitGridProps {
  outfits: OutfitItem[];
  selectedId: string | null;
  onSelect: (outfit: OutfitItem) => void;
  emptyMessage?: string;
}

export function OutfitGrid({
  outfits,
  selectedId,
  onSelect,
  emptyMessage = "No outfits yet — upload one above!",
}: OutfitGridProps) {
  if (outfits.length === 0) {
    return <p className="outfit-empty">{emptyMessage}</p>;
  }

  return (
    <div className="outfit-grid">
      {outfits.map((outfit) => (
        <button
          key={outfit.id}
          type="button"
          className={`outfit-card ${selectedId === outfit.id ? "selected" : ""}`}
          onClick={() => onSelect(outfit)}
        >
          <div className="outfit-thumb pixel-box">
            <img src={outfit.garmentImage} alt={outfit.name} />
            {!outfit.supportsTryOn && <span className="outfit-badge">PREVIEW</span>}
          </div>
          <span className="outfit-name">{outfit.name}</span>
          <PixelIcon name={outfit.icon} size={12} />
        </button>
      ))}
    </div>
  );
}
