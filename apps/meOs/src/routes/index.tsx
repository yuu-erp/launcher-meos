import StatusbarLauncher from "@/features/statusbar";
import MainLauncher from "@/features/main";
import DockLauncher from "@/features/dock";
import Background from "@/shared/components/background";
import { useLauncherLayout } from "@/store/launcherLayout.store";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/")({
  component: LauncherMeOs,
});

function LauncherMeOs() {
  console.log(useLauncherLayout());
  return (
    <React.Fragment>
      <main className="w-screen h-screen">
        <StatusbarLauncher />
        <MainLauncher />
        <DockLauncher />
      </main>
      <Background />
    </React.Fragment>
  );
}
