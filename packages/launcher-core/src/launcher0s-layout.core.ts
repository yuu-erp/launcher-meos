export type BreakPoint = { maxWidth: number; columns: number };
export type ConfigLayoutMain = {
  heightStatusbar: number;
  heightPagination: number;
  breakPoints: BreakPoint[];
};
export type ConfigLayoutDock = {
  heightDockContainer: number;
  heightDockMain: number;
  paddingBottom: number;
};
export type Layout = ConfigLayoutMain & {
  currentWidth: number;
  currentHeight: number;
  columns: number;
  rows: number;
};
export abstract class LauncherOsLayoutCore {
  protected abstract configLayoutMain: ConfigLayoutMain;
  protected abstract configLayoutDock: ConfigLayoutDock;
  protected constructor() {}
  /** Tính kích thước icon của DOCK */
  private getIconSizeDock(): number {
    const { heightDockMain, paddingBottom } = this.configLayoutDock;
    return heightDockMain - paddingBottom;
  }
  /** Lấy số cột phù hợp theo độ rộng màn hình */
  private getColumns(screenWidth: number): BreakPoint {
    const sorted = [...this.configLayoutMain.breakPoints].sort((a, b) => a.maxWidth - b.maxWidth);
    for (const bp of sorted) {
      if (screenWidth <= bp.maxWidth) return bp;
    }
    return sorted[sorted.length - 1];
  }
  /** Tính tổng chiều cao có thể dùng cho grid (trừ dock + statusbar) */
  private getUsableHeight(screenHeight: number): number {
    const { heightStatusbar, heightPagination } = this.configLayoutMain;
    const { heightDockContainer } = this.configLayoutDock;
    return Math.max(screenHeight - heightStatusbar - heightPagination - heightDockContainer, 0);
  }
  /** Tính số hàng dựa vào chiều cao item */
  private getRows(screenHeight: number, cellHeight: number): number {
    const usable = this.getUsableHeight(screenHeight);
    return Math.floor(usable / cellHeight);
  }
  /** Tổng hợp layout main */
  public computeLayoutMain(screenWidth: number, screenHeight: number) {
    const { maxWidth, columns } = this.getColumns(screenWidth);
    const itemWidth = Math.floor(maxWidth / columns);
    const itemHeight = Math.floor((itemWidth * 4) / 3); // cao hơn ngang

    return {
      ...this.configLayoutMain,
      columns,
      maxWidth,
      itemWidth,
      itemHeight,
    };
  }

  /** Tổng hợp layout dock */
  public computeLayoutDock(screenWidth: number, screenHeight: number) {
    const iconSize = this.getIconSizeDock();
    return {
      ...this.configLayoutDock,
      iconSize,
    };
  }
}
