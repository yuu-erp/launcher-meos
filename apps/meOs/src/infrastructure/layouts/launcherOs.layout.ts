import {
  GRID_BREAKPOINTS,
  HEIGHT_DOCK_CONTAINER,
  HEIGHT_DOCK_MAIN,
  HEIGHT_PAGINATION,
  HEIGHT_STATUSBAR,
  PEDDING_BOTTOM_DOCK,
} from "@/constants/layout.constant";
import {
  LauncherOsLayoutCore,
  type ConfigLayoutDock,
  type ConfigLayoutMain,
} from "@meos/launcher-core";

export class LauncherOsLayout extends LauncherOsLayoutCore {
  protected configLayoutMain: ConfigLayoutMain = {
    heightStatusbar: HEIGHT_STATUSBAR,
    heightPagination: HEIGHT_PAGINATION,
    breakPoints: GRID_BREAKPOINTS,
  };
  protected configLayoutDock: ConfigLayoutDock = {
    heightDockContainer: HEIGHT_DOCK_CONTAINER,
    heightDockMain: HEIGHT_DOCK_MAIN,
    paddingBottom: PEDDING_BOTTOM_DOCK,
  };
  constructor() {
    super();
  }
}
