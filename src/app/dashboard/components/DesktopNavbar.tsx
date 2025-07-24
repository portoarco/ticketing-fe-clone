import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bell } from "lucide-react";

import SearchBar from "./SearchBar";

function DesktopNavbar() {
  return (
    <nav>
      <div id="container" className="flex justify-between items-center p-3">
        <div className="flex items-center gap-x-8">
          <p className="text-2xl font-semibold">Dashboard</p>
          <SearchBar className="w-[20em]"></SearchBar>
        </div>
        <div className="flex gap-x-5 items-center">
          <Bell></Bell>
          <div className="flex gap-x-3 items-center">
            <Avatar className="size-10">
              <AvatarImage></AvatarImage>
              <AvatarFallback>ID</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-md font-semibold">Arco Anggoro</p>
              <p className="text-sm text-gray-400">Event Organizer</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNavbar;
