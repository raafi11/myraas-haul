import { PixelIcon } from "./PixelIcon";
import "./Header.css";

export function Header() {
  return (
    <section className="header">
      <div className="title-box pixel-box">
        <h1>MYRAA&apos;S HAUL</h1>
      </div>
      <div className="subtitle">
        <PixelIcon name="heart" size={8} />
        <PixelIcon name="sparkle" size={8} />
        <span>VIRTUAL WARDROBE v1.0</span>
        <PixelIcon name="sparkle" size={8} />
        <PixelIcon name="heart" size={8} />
      </div>
    </section>
  );
}
