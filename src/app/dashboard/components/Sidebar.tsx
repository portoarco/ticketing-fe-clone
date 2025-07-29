"use client";
import { Button } from "@/components/ui/button";
import clsx from "classnames";
import {
  ChartBarBig,
  LogOut,
  NotepadText,
  Receipt,
  Rows3,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

const menu = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
    icon: <ChartBarBig></ChartBarBig>,
  },
  {
    id: 2,
    name: "Manage Events",
    url: "/events",
    icon: <Rows3></Rows3>,
  },
  {
    id: 3,
    name: "Transactions",
    url: "/transactions",
    icon: <Receipt></Receipt>,
  },
  {
    id: 4,
    name: "Manage Articles",
    url: "/articles",
    icon: <NotepadText></NotepadText>,
  },
  {
    id: 5,
    name: "Account Settings",
    url: "/settings",
    icon: <Settings></Settings>,
  },
];

function Sidebar({ className }: SidebarProps) {
  const route = useRouter();
  const pathname = usePathname();
  return (
    <div
      id="sidebar-comp"
      className={clsx(
        "lg:bg-blue-600 lg:h-full max-lg:h-[60vh] max-md:w-[90vw] rounded-xl absolute z-10 lg:relative lg:top-0 top-20 lg:w-[90%] xl:w-[100%] ",
        className
      )}
    >
      <div id="container" className="flex flex-col  items-center">
        <div
          id="comp-logo"
          className="max-lg:hidden flex mt-10 justify-center "
        >
          <Image
            src="/logo.svg"
            width={100}
            height={100}
            alt="logo"
            className="w-[80%]"
          ></Image>
        </div>
        <div
          id="menu"
          className=" lg:mt-15 flex  lg:text-gray-200 xl:text-lg max-lg:w-[100vw] max-lg:flex max-lg:justify-center "
        >
          <ul>
            {menu.map((item) => {
              const isActive = pathname === item.url;
              return (
                <li
                  key={item.id}
                  className={clsx(
                    "rounded-md py-3 lg:px-5 my-3 cursor-pointer transition duration-200 ease-in-out",
                    "max-sm:bg-white/50 max-sm:px-[10vw] max-lg:bg-white/50 max-lg:w-[80vw] max-lg:p-3 max-lg:flex lg:justify-center",
                    isActive
                      ? "bg-white text-blue-700 shadow-md font-semibold"
                      : "hover:bg-white/80 hover:text-blue-600 hover:shadow-md"
                  )}
                  onClick={() => route.push(item.url)}
                >
                  <div
                    className="flex gap-x-4  items-center max-sm:text-sm"
                    // onClick={() => route.push(item.url)}
                  >
                    {item.icon}
                    {item.name}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div id="logout" className="absolute bottom-0 lg:bottom-5 flex">
          <Button className="lg:bg-transparent text-lg lg:hover:bg-transparent lg:hover:scale-110 cursor-pointer bg-red-600 hover:bg-red-500">
            <LogOut></LogOut>
            <p onClick={() => route.replace("/")}>Sign Out </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
