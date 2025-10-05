import React from "react";
import { DndContext, PointerSensor, useSensor, useSensors, useDraggable } from "@dnd-kit/core";
import { ALL_DAPP } from "@/constants/application.constant";
import { useLayoutDock, useLayoutMain } from "@/shared/hooks";

const AppIcon = ({ app, itemWidth }: any) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: app.id,
  });

  const x = transform?.x ?? 0;
  const y = transform?.y ?? 0;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`fixed flex flex-col items-center justify-center select-none transition-all duration-200 ${
        isDragging ? "scale-105 brightness-110" : ""
      }`}
      style={{
        width: `${itemWidth}px`,
        height: `${itemWidth}px`,
        left: `${app.position.x * itemWidth + x}px`,
        top: `${app.position.y * itemWidth + y + 24}px`,
        transition: transform ? "none" : "all 0.25s ease",
      }}
    >
      <div className="w-[60px] aspect-square">
        <img src={app.logo} alt="" className="w-full h-full object-fill pointer-events-none" />
      </div>
      <div className="w-full line-clamp-1 break-all text-center">
        <span>{app.name}</span>
      </div>
    </div>
  );
};

const SnapMarker = ({ x, y, itemWidth }: { x: number; y: number; itemWidth: number }) => (
  <div
    className="fixed border-2 border-blue-400/70 rounded-2xl pointer-events-none transition-all duration-150"
    style={{
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
      left: `${x * itemWidth}px`,
      top: `${y * itemWidth + 24}px`,
      border: "2px solid blue",
      borderRadius: "24px",
    }}
  />
);

const MainLauncher = () => {
  const { heightStatusbar, maxWidth, itemWidth } = useLayoutMain();
  const { heightDockContainer } = useLayoutDock();

  const [apps, setApps] = React.useState(() => ALL_DAPP[0]);
  const [snapPreview, setSnapPreview] = React.useState<{ x: number; y: number } | null>(null);
  const [origin, setOrigin] = React.useState<{ id: string; x: number; y: number } | null>(null);

  // ✅ thêm sensor có delay 500ms
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 500,
        tolerance: 5,
      },
    }),
  );

  const handleDragStart = (event: any) => {
    const app = apps.find((a) => a.id === event.active.id);
    if (app) setOrigin({ id: app.id, x: app.position.x, y: app.position.y });
  };

  const handleDragMove = (event: any) => {
    const { active, delta } = event;
    const app = apps.find((a) => a.id === active.id);
    if (!app) return;

    const x = Math.round((app.position.x * itemWidth + delta.x) / itemWidth);
    const y = Math.round((app.position.y * itemWidth + delta.y) / itemWidth);
    setSnapPreview({ x, y });
  };

  const handleDragEnd = (event: any) => {
    const { delta, active } = event;
    const movedApp = apps.find((a) => a.id === active.id);
    if (!movedApp || !origin) return;

    const newX = Math.round((movedApp.position.x * itemWidth + delta.x) / itemWidth);
    const newY = Math.round((movedApp.position.y * itemWidth + delta.y) / itemWidth);

    const maxCols = Math.floor(maxWidth / itemWidth);
    const maxRows = 10;
    const isValid = newX >= 0 && newX < maxCols && newY >= 0 && newY < maxRows;

    const isOccupied = apps.some(
      (a) => a.id !== active.id && a.position.x === newX && a.position.y === newY,
    );

    const finalPos =
      isValid && !isOccupied
        ? { x: newX, y: newY, width: 1, height: 1 }
        : { x: origin.x, y: origin.y, width: 1, height: 1 };

    setApps((prev) => prev.map((a) => (a.id === active.id ? { ...a, position: finalPos } : a)));

    setSnapPreview(null);
    setOrigin(null);
  };

  return (
    <DndContext
      sensors={sensors} // ✅ truyền sensor custom vào
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <div
        className="w-full h-full"
        style={{
          paddingBottom: `${heightDockContainer}px`,
          paddingTop: `${heightStatusbar}px`,
        }}
      >
        <div className="relative w-full h-full mx-auto" style={{ maxWidth }}>
          {snapPreview && <SnapMarker x={snapPreview.x} y={snapPreview.y} itemWidth={itemWidth} />}
          {apps.map((app) => (
            <AppIcon key={app.id} app={app} itemWidth={itemWidth} />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default React.memo(MainLauncher);
