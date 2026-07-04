import type { TabId } from "../types";
import { PixelIcon } from "./PixelIcon";
import "./BottomNav.css";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "home", label: "HOME", icon: "navHome" },
  { id: "items", label: "ITEMS", icon: "navItems" },
  { id: "favs", label: "FAVS", icon: "navFavs" },
  { id: "me", label: "ME", icon: "navMe" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {activeTab === tab.id && <span className="nav-highlight" />}
          <PixelIcon name={tab.icon} size={18} />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
