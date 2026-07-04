import type { ReactNode } from "react";

interface PixelIconProps {
  name: string;
  size?: number;
}

export function PixelIcon({ name, size = 32 }: PixelIconProps) {
  const icons: Record<string, ReactNode> = {
    dress: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="6" y="1" width="4" height="2" fill="#5B8FD4" />
        <rect x="5" y="3" width="6" height="2" fill="#5B8FD4" />
        <rect x="4" y="5" width="8" height="2" fill="#5B8FD4" />
        <rect x="3" y="7" width="10" height="2" fill="#5B8FD4" />
        <rect x="3" y="9" width="10" height="2" fill="#4A7AB8" />
        <rect x="4" y="11" width="8" height="2" fill="#4A7AB8" />
        <rect x="5" y="13" width="6" height="2" fill="#4A7AB8" />
      </svg>
    ),
    hood: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="4" y="2" width="8" height="2" fill="#E88840" />
        <rect x="3" y="4" width="10" height="2" fill="#E88840" />
        <rect x="2" y="6" width="12" height="2" fill="#D87830" />
        <rect x="2" y="8" width="12" height="2" fill="#D87830" />
        <rect x="3" y="10" width="10" height="2" fill="#C86820" />
        <rect x="4" y="12" width="8" height="2" fill="#C86820" />
      </svg>
    ),
    top: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="5" y="2" width="6" height="2" fill="#E878A8" />
        <rect x="3" y="4" width="3" height="2" fill="#E878A8" />
        <rect x="10" y="4" width="3" height="2" fill="#E878A8" />
        <rect x="4" y="6" width="8" height="2" fill="#D86898" />
        <rect x="4" y="8" width="8" height="2" fill="#D86898" />
        <rect x="5" y="10" width="6" height="2" fill="#C85888" />
      </svg>
    ),
    jean: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="4" y="1" width="8" height="2" fill="#5B8FD4" />
        <rect x="4" y="3" width="3" height="2" fill="#4A7AB8" />
        <rect x="9" y="3" width="3" height="2" fill="#4A7AB8" />
        <rect x="4" y="5" width="3" height="4" fill="#4A7AB8" />
        <rect x="9" y="5" width="3" height="4" fill="#4A7AB8" />
        <rect x="4" y="9" width="3" height="4" fill="#3A6AA8" />
        <rect x="9" y="9" width="3" height="4" fill="#3A6AA8" />
        <rect x="4" y="13" width="3" height="2" fill="#3A6AA8" />
        <rect x="9" y="13" width="3" height="2" fill="#3A6AA8" />
      </svg>
    ),
    shoe: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="2" y="8" width="8" height="2" fill="#9878C8" />
        <rect x="3" y="10" width="10" height="2" fill="#9878C8" />
        <rect x="4" y="12" width="10" height="2" fill="#7868A8" />
        <rect x="6" y="6" width="4" height="2" fill="#9878C8" />
        <rect x="7" y="4" width="2" height="2" fill="#7868A8" />
      </svg>
    ),
    acc: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="4" y="3" width="8" height="2" fill="#E878A8" />
        <rect x="3" y="5" width="10" height="4" fill="#D86898" />
        <rect x="4" y="9" width="8" height="2" fill="#C85888" />
        <rect x="6" y="11" width="4" height="3" fill="#A84878" />
      </svg>
    ),
    gloves: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="2" y="4" width="4" height="6" fill="#9878C8" />
        <rect x="10" y="4" width="4" height="6" fill="#9878C8" />
        <rect x="1" y="3" width="2" height="2" fill="#7868A8" />
        <rect x="13" y="3" width="2" height="2" fill="#7868A8" />
        <rect x="2" y="10" width="4" height="3" fill="#7868A8" />
        <rect x="10" y="10" width="4" height="3" fill="#7868A8" />
      </svg>
    ),
    heel: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="6" y="2" width="4" height="2" fill="#E878A8" />
        <rect x="5" y="4" width="6" height="2" fill="#E878A8" />
        <rect x="4" y="6" width="8" height="2" fill="#D86898" />
        <rect x="8" y="8" width="2" height="6" fill="#C85888" />
        <rect x="6" y="14" width="4" height="1" fill="#A84878" />
      </svg>
    ),
    shades: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="1" y="6" width="6" height="4" fill="#7868A8" />
        <rect x="9" y="6" width="6" height="4" fill="#7868A8" />
        <rect x="7" y="7" width="2" height="2" fill="#584878" />
        <rect x="0" y="7" width="1" height="2" fill="#584878" />
        <rect x="15" y="7" width="1" height="2" fill="#584878" />
      </svg>
    ),
    camera: (
      <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges">
        <rect x="8" y="6" width="16" height="4" fill="#888878" />
        <rect x="6" y="10" width="20" height="14" fill="#989888" />
        <rect x="8" y="12" width="16" height="10" fill="#787868" />
        <rect x="12" y="14" width="8" height="6" fill="#585848" />
        <rect x="14" y="16" width="4" height="2" fill="#989888" />
        <rect x="22" y="8" width="3" height="3" fill="#686858" />
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges">
        <rect x="5" y="1" width="2" height="2" fill="currentColor" />
        <rect x="4" y="3" width="4" height="2" fill="currentColor" />
        <rect x="1" y="5" width="10" height="2" fill="currentColor" />
        <rect x="3" y="7" width="2" height="2" fill="currentColor" />
        <rect x="7" y="7" width="2" height="2" fill="currentColor" />
        <rect x="2" y="9" width="2" height="2" fill="currentColor" />
        <rect x="8" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
    heart: (
      <svg width={size} height={size} viewBox="0 0 10 10" shapeRendering="crispEdges">
        <rect x="1" y="2" width="2" height="2" fill="currentColor" />
        <rect x="7" y="2" width="2" height="2" fill="currentColor" />
        <rect x="0" y="4" width="10" height="2" fill="currentColor" />
        <rect x="1" y="6" width="8" height="2" fill="currentColor" />
        <rect x="2" y="8" width="6" height="1" fill="currentColor" />
        <rect x="3" y="9" width="4" height="1" fill="currentColor" />
      </svg>
    ),
    sparkle: (
      <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
        <rect x="3" y="0" width="2" height="2" fill="currentColor" />
        <rect x="1" y="2" width="2" height="2" fill="currentColor" />
        <rect x="5" y="2" width="2" height="2" fill="currentColor" />
        <rect x="3" y="4" width="2" height="2" fill="currentColor" />
        <rect x="1" y="6" width="2" height="1" fill="currentColor" />
        <rect x="5" y="6" width="2" height="1" fill="currentColor" />
      </svg>
    ),
    navHome: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="7" y="2" width="2" height="2" fill="currentColor" />
        <rect x="5" y="4" width="6" height="2" fill="currentColor" />
        <rect x="3" y="6" width="10" height="2" fill="currentColor" />
        <rect x="4" y="8" width="2" height="6" fill="currentColor" />
        <rect x="10" y="8" width="2" height="6" fill="currentColor" />
        <rect x="6" y="10" width="4" height="4" fill="currentColor" />
      </svg>
    ),
    navItems: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="2" y="2" width="5" height="5" fill="currentColor" />
        <rect x="9" y="2" width="5" height="5" fill="currentColor" />
        <rect x="2" y="9" width="5" height="5" fill="currentColor" />
        <rect x="9" y="9" width="5" height="5" fill="currentColor" />
      </svg>
    ),
    navFavs: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="4" y="2" width="8" height="2" fill="currentColor" />
        <rect x="3" y="4" width="10" height="2" fill="currentColor" />
        <rect x="2" y="6" width="12" height="4" fill="currentColor" />
        <rect x="4" y="10" width="8" height="2" fill="currentColor" />
        <rect x="6" y="12" width="4" height="2" fill="currentColor" />
      </svg>
    ),
    navMe: (
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
        <rect x="5" y="2" width="6" height="4" fill="currentColor" />
        <rect x="4" y="8" width="8" height="6" fill="currentColor" />
        <rect x="6" y="4" width="1" height="1" fill="#2a2d1f" />
        <rect x="9" y="4" width="1" height="1" fill="#2a2d1f" />
      </svg>
    ),
  };

  return <>{icons[name] ?? null}</>;
}
