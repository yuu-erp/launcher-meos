/* MAIN LAYOUT */
export const HEIGHT_STATUSBAR = 24 as const;
export const HEIGHT_PAGINATION = 24 as const;
export const GRID_BREAKPOINTS = [
  { maxWidth: 480, columns: 4 },
  { maxWidth: 768, columns: 6 },
  { maxWidth: 1024, columns: 8 },
  { maxWidth: 1440, columns: 10 },
  { maxWidth: Infinity, columns: 12 },
];
/* DOCK LAYOUT */
export const HEIGHT_DOCK_CONTAINER = 70 as const;
export const HEIGHT_DOCK_MAIN = 65 as const;
export const PEDDING_BOTTOM_DOCK = 5 as const;
