"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "classnames";
import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface MobileNavbarProps {
  className?: string;
}

function MobileNavbar({ className }: MobileNavbarProps) {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      {/* Sidebar Backdrop */}
      {sideBarOpen && (
        <div
          className="fixed bg-gray-300/95 inset-0 z-5"
          onClick={() => setSideBarOpen(false)}
        ></div>
      )}
      {/* Sidebar */}

      <div
        className={`fixed w-full h-full  z-10  transform transition-transform duration-200 ease-in-out ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className={clsx("default-styles", className)}>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-5">
            <button onClick={() => setSideBarOpen(!sideBarOpen)}>
              {!sideBarOpen ? (
                <Menu />
              ) : (
                <X className="fixed right-5 z-20 text-white hover:font-bold size-7 border border-white" />
              )}
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
    </>
  );
}

export default MobileNavbar;
