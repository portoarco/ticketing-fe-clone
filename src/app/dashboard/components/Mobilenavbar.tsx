import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "classnames";
import { Bell, Menu } from "lucide-react";

interface MobileNavbarProps {
  className?: string;
}

function MobileNavbar({ className }: MobileNavbarProps) {
  return (
    <div className={clsx("default-styles", className)}>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-5">
          <button>
            <Menu></Menu>
          </button>
          <p className="text-lg font-semibold">Dashboard</p>
        </div>
        <div className="flex gap-x-4">
          <button>
            <Bell></Bell>
          </button>
          <button>
            <Avatar className="size-9">
              <AvatarImage src="/defaultavatar.png"></AvatarImage>
              <AvatarFallback>ID</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
