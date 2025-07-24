import { ChartBarBig, NotepadText, Receipt, Rows3 } from "lucide-react";
import Image from "next/image";

const menu = [
  {
    id: 1,
    name: "Manage Events",
    icon: <Rows3></Rows3>,
  },
  {
    id: 2,
    name: "Analyze Data",
    icon: <ChartBarBig></ChartBarBig>,
  },
  {
    id: 3,
    name: "Manage Articles",
    icon: <NotepadText></NotepadText>,
  },
  {
    id: 4,
    name: "Manage Transactions",
    icon: <Receipt></Receipt>,
  },
];

function Sidebar() {
  return (
    <div
      id="sidebar-comps"
      className="bg-gradient-to-br from-blue-600 to-cyan-500 h-full rounded-xl"
    >
      <div id="container" className="flex flex-col  items-center ">
        <div id="comp-logo" className="flex justify-center mt-10">
          <Image
            src="/logo.svg"
            width={100}
            height={100}
            alt="logo"
            className="w-[70%]"
          ></Image>
        </div>
        <div id="menu" className="mt-15 flex  text-gray-200 text-lg">
          <ul>
            {menu.map((item) => (
              <li
                key={item.id}
                className=" rounded-md p-3 hover:bg-blue-400 hover:shadow-md my-3 cursor-pointer transition duration-300 ease-in-out"
              >
                <div className="flex gap-x-3">
                  {item.icon}
                  {item.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
