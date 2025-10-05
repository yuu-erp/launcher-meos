import React from "react";
import { useLayoutMain } from "@/shared/hooks";

const Statusbar: React.FC = () => {
  const { heightStatusbar } = useLayoutMain();
  return (
    <React.Fragment>
      <header
        style={{
          height: `${heightStatusbar}px`,
        }}
        className="w-full px-1 fixed left-0 right-0 top-0"
      >
        STATUS BAR
      </header>
    </React.Fragment>
  );
};

export default React.memo(Statusbar);
