import { useLayoutDock } from "@/shared/hooks";
import React, { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@meos/launcher-components";

const apps = [
  { id: "finder", icon: "/application/Safari.png" },
  { id: "bitmap", icon: "/application/Safari.png" },
  { id: "safari", icon: "/application/Safari.png" },
  { id: "message", icon: "/application/Safari.png" },
];

// 1. Wrapper cho từng item
function DockItem({ id, icon }: { id: string; icon: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex flex-col items-center justify-center cursor-pointer ${
        isDragging ? "scale-110 z-50" : ""
      }`}
    >
      <div className="size-13 rounded-2xl overflow-hidden">
        <img src={icon} alt={id} className="w-full h-full" />
      </div>
      <span
        className={cn("size-1 bg-white rounded-full block mt-1", isDragging ? "hidden" : "block")}
      ></span>
    </div>
  );
}
const DockLauncher = () => {
  const { heightDockMain, heightDockContainer } = useLayoutDock();
  const [items, setItems] = useState(apps.map((a) => a.id));
  const sensors = useSensors(useSensor(PointerSensor));
  return (
    <React.Fragment>
      <div
        className="w-full fixed bottom-0 left-0 right-0 items-center"
        style={{
          height: `${heightDockContainer}px`,
        }}
      >
        <div
          className="bg-[#4A4A4A]/40 backdrop-blur-2xl rounded-2xl px-1 flex-row shadow overflow-visible flex items-center"
          style={{ height: `${heightDockMain}px`, border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
              const { active, over } = event;
              if (over && active.id !== over.id) {
                setItems((prev) => {
                  const oldIndex = prev.indexOf(active.id as string);
                  const newIndex = prev.indexOf(over.id as string);
                  return arrayMove(prev, oldIndex, newIndex);
                });
              }
            }}
          >
            <SortableContext items={items} strategy={horizontalListSortingStrategy}>
              {items.map((id) => {
                const app = apps.find((a) => a.id === id)!;
                return <DockItem key={app.id} id={app.id} icon={app.icon} />;
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(DockLauncher);
