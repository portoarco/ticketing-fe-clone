import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bell } from "lucide-react";

import SearchBar from "./SearchBar";
import { apiCall } from "@/helper/apiCall";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";

function DesktopNavbar() {
  const { first_name, last_name, organizer_name, avatar, setUserProfile } =
    useUserStore();

  useEffect(() => {
    const user = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await apiCall.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.result;
        const organizer_data = res.data.result.organizer[0].organizer_name;

        setUserProfile({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          avatar: data.avatar || "",
          organizer_name: organizer_data || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (!first_name && !last_name) {
      user();
    }
  }, []);

  return (
    <nav>
      <div id="container" className="flex justify-between items-center ">
        <div className="flex items-center gap-x-6">
          <p className="lg:text-lg xl:text-2xl font-semibold">
            Organizer Panel
          </p>
          <SearchBar className=" lg:w-[12em] xl:w-[20em]"></SearchBar>
        </div>
        <div className="flex gap-x-5 items-center ">
          <button type="button" className="cursor-pointer">
            <Bell />
          </button>
          <div className="flex gap-x-3 items-center ">
            <Avatar className="size-10">
              <AvatarImage src={avatar}></AvatarImage>
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="xl:text-md lg:text-sm font-semibold">
                {first_name} {last_name}
              </p>
              <p className="xl:text-sm lg:text-sm text-gray-400">
                {organizer_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNavbar;
