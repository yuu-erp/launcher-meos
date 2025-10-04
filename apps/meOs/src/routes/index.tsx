import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Button, Card, Code } from "@meos/launcher-components";

export const Route = createFileRoute("/")({
  component: LauncherMeOs,
});

function LauncherMeOs() {
  return (
    <React.Fragment>
      <Code>Code</Code>
      <Button className="text-red-400">
        Button
      </Button>
      <Card title="Card title" href="https://">
        Card
      </Card>
      <main className="text-amber-400">LAUNCHER MEOS | METANODE CO.</main>
    </React.Fragment>
  );
}
