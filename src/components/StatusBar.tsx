import { PixelIcon } from "./PixelIcon";
import "./StatusBar.css";

export function StatusBar() {
  const hpSegments = 10;
  const hpFilled = 6;

  return (
    <header className="status-bar">
      <span className="status-level">LV.12</span>
      <div className="status-hp">
        <span className="hp-label">HP</span>
        <div className="hp-bar">
          {Array.from({ length: hpSegments }).map((_, i) => (
            <div
              key={i}
              className={`hp-segment ${i < hpFilled ? "filled" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="status-stars">
        <PixelIcon name="star" size={10} />
        <span>2460</span>
      </div>
    </header>
  );
}
