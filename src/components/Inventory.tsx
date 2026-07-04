import type { CategoryId } from "../types";
import { INVENTORY_CATEGORIES } from "../data/inventory";
import { PixelIcon } from "./PixelIcon";
import "./Inventory.css";

interface InventoryProps {
  activeCategory: CategoryId;
  onCategoryChange: (id: CategoryId) => void;
}

export function Inventory({ activeCategory, onCategoryChange }: InventoryProps) {
  return (
    <section className="inventory">
      <div className="section-label">
        <span className="arrow">▸</span>
        <span>INVENTORY</span>
      </div>
      <div className="inventory-tabs">
        {INVENTORY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`inv-tab ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            <PixelIcon name={cat.icon} size={24} />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
