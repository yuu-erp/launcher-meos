import { useLauncherLayout } from "@/store/launcherLayout.store";

export function useLayoutMain() {
  return useLauncherLayout((state) => state.layoutMain);
}
export function useLayoutDock() {
  return useLauncherLayout((state) => state.layoutDock);
}
