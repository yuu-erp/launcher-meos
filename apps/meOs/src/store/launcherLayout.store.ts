import { LauncherOsLayout } from "@/infrastructure";
import { create } from "zustand";

const layoutCore = new LauncherOsLayout();

type LauncherLayoutState = {
  layoutMain: ReturnType<typeof layoutCore.computeLayoutMain>;
  layoutDock: ReturnType<typeof layoutCore.computeLayoutDock>;
};

export const useLauncherLayout = create<LauncherLayoutState>((_set) => ({
  layoutMain: layoutCore.computeLayoutMain(window.innerWidth, window.innerHeight),
  layoutDock: layoutCore.computeLayoutDock(window.innerWidth, window.innerHeight),
}));
