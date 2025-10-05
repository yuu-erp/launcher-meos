import { create } from "zustand";

export type AppItem = {
  id: string;
  name: string;
  icon: string;
  area: "main" | "dock";
};

interface LauncherStore {
  apps: AppItem[];
  moveApp: (id: string, area: "main" | "dock") => void;
}

export const useLauncherApps = create<LauncherStore>((set) => ({
  apps: [
    { id: "1", name: "Mail", icon: "📧", area: "main" },
    { id: "2", name: "Music", icon: "🎵", area: "main" },
    { id: "3", name: "Browser", icon: "🌐", area: "dock" },
  ],
  moveApp: (id, area) =>
    set((state) => ({
      apps: state.apps.map((a) => (a.id === id ? { ...a, area } : a)),
    })),
}));
