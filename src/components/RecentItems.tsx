import type { RecentItem } from "../types";
import { PixelIcon } from "./PixelIcon";
import "./RecentItems.css";

interface RecentItemsProps {
  items: RecentItem[];
  onItemClick?: (item: RecentItem) => void;
}

export function RecentItems({ items, onItemClick }: RecentItemsProps) {
  return (
    <section className="recent">
      <div className="section-label">
        <span className="arrow">▸</span>
        <span>RECENT</span>
      </div>
      <div className="recent-grid">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="recent-card"
            onClick={() => onItemClick?.(item)}
          >
            <div
              className="recent-thumb pixel-box"
              style={{ background: item.bg }}
            >
              <PixelIcon name={item.icon} size={28} />
            </div>
            <span className="recent-name">{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
