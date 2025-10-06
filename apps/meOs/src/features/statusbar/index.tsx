import React from "react";
import { useLayoutMain } from "@/shared/hooks";
import { Button } from "@meos/launcher-components";
import { Search } from "lucide-react";
import { FaApple, FaWifi } from "react-icons/fa";
import { BsToggles } from "react-icons/bs";

const Statusbar: React.FC = () => {
  const { heightStatusbar } = useLayoutMain();
  return (
    <React.Fragment>
      <header
        style={{
          height: `${heightStatusbar}px`,
        }}
        className="w-full px-1 fixed left-0 right-0 top-0 flex-row justify-between bg-black/20 backdrop-blur-2xl"
      >
        <div className="flex-row">
          <Button>
            <FaApple className="size-4.5" />
          </Button>
          <Button className="font-extrabold">
            <span>Chrome</span>
          </Button>
          <Button className="font-semibold">
            <span>File</span>
          </Button>
          <Button className="font-semibold">
            <span>Edit</span>
          </Button>
          <Button className="font-semibold">
            <span>View</span>
          </Button>
          <Button className="font-semibold">
            <span>History</span>
          </Button>
          <Button className="font-semibold">
            <span>Bookmarks</span>
          </Button>
          <Button className="font-semibold">
            <span>Profiles</span>
          </Button>
          <Button className="font-semibold">
            <span>Tap</span>
          </Button>
          <Button className="font-semibold">
            <span>Window</span>
          </Button>
          <Button className="font-semibold">
            <span>Help</span>
          </Button>
        </div>
        <div className="flex-row">
          <Button className="px-2">
            <FaWifi className="size-4.5" />
          </Button>
          <Button className="px-2">
            <Search className="size-4.5" />
          </Button>
          <Button className="px-2">
            <BsToggles className="size-4.5" />
          </Button>
          <Button className="font-semibold">
            <span>Wed Oct 1 10:45 PM</span>
          </Button>
        </div>
      </header>
    </React.Fragment>
  );
};

export default React.memo(Statusbar);
