import { DOCK_DAPP } from "@/constants/application.constant";
import { useLayoutDock } from "@/shared/hooks";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@meos/launcher-components";
import React, { useState } from "react";
// 1. Wrapper cho từng item
function DockItem({
  id,
  icon,
  name,
  isOpen,
}: {
  id: string;
  icon: string;
  name: string;
  isOpen?: boolean;
}) {
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
      className={`flex flex-col items-center justify-center ${isDragging ? "z-50" : ""}`}
    >
      <div className="size-13 rounded-2xl overflow-hidden">
        <img src={icon} alt={id} className="w-full h-full" />
      </div>
      <span
        className={cn(
          "size-1 bg-white rounded-full block mt-1",
          isOpen ? "opacity-100" : "opacity-0",
          isDragging ? "opacity-0" : "",
        )}
      ></span>
    </div>
  );
}
const DockLauncher = () => {
  const { heightDockMain, heightDockContainer } = useLayoutDock();
  const [items, setItems] = useState(DOCK_DAPP.map((a) => a.id));
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
  );
  return (
    <React.Fragment>
      <div
        className="w-full fixed bottom-0 left-0 right-0 items-center"
        style={{
          height: `${heightDockContainer}px`,
        }}
      >
        <div
          className="bg-[#4A4A4A]/40 backdrop-blur-2xl rounded-2xl px-1 flex-row shadow overflow-visible"
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
                const app = DOCK_DAPP.find((a) => a.id === id)!;
                if (app.name === "Trash") return;
                return <DockItem key={app.id} id={app.id} icon={app.logo} name={app.name} />;
              })}
            </SortableContext>
            <div className="px-3 h-full justify-center">
              <span className="w-[1px] h-[80%] bg-white/50"></span>
            </div>
            <DockItem
              id={DOCK_DAPP[DOCK_DAPP.length - 1].id}
              icon={DOCK_DAPP[DOCK_DAPP.length - 1].logo}
              name={DOCK_DAPP[DOCK_DAPP.length - 1].name}
              isOpen
            />
            <DockItem
              id={DOCK_DAPP[DOCK_DAPP.length - 1].id}
              icon={DOCK_DAPP[DOCK_DAPP.length - 1].logo}
              name={DOCK_DAPP[DOCK_DAPP.length - 1].name}
            />
          </DndContext>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(DockLauncher);
