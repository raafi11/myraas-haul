import type { RecentItem } from "../types";
import { PixelIcon } from "./PixelIcon";
import "./SubPage.css";

interface SubPageProps {
  title: string;
  items: RecentItem[];
  emptyMessage: string;
}

export function SubPage({ title, items, emptyMessage }: SubPageProps) {
  return (
    <section className="sub-page">
      <div className="sub-title pixel-box">
        <h2>{title}</h2>
      </div>
      {items.length === 0 ? (
        <p className="sub-empty">{emptyMessage}</p>
      ) : (
        <div className="sub-grid">
          {items.map((item) => (
            <div key={item.id} className="sub-card">
              <div
                className="sub-thumb pixel-box"
                style={{ background: item.bg }}
              >
                <PixelIcon name={item.icon} size={32} />
              </div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
