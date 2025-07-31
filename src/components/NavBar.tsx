"use client";
import { Menu, PlusCircle, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import { apiCall } from "@/helper/apiCall";
import { AxiosError } from "axios";

export default function Navbar() {
  const route = useRouter();

  const handlerCreateEvent = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Anda harus login dulu untuk create event");
      route.replace("/login");
      return;
    }

    const confirmation = confirm("Are You Sure?");
    if (!confirmation) return;

    try {
      const res = await apiCall.post(
        "/auth/register-organizer",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Berhasil Terdaftar");
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ isNew: boolean }>;

      const status = err.response?.data.isNew;
      if (status === false) {
        alert("Anda sudah terdaftar sebagai organizer");
        route.replace("/dashboard");
      }

      if (!err) {
        alert("There is something wrong!");
      }
    }
  };

  return (
    <nav className=" flex justify-center ">
      <div className="flex justify-between items-center mt-4 gap-10 w-[84%] max-w-7xl bg-white/60  h-16 rounded-full  drop-shadow-md  drop-shadow-black/7 px-5 fixed z-50 backdrop-blur-lg">
        <a
          href="#"
          className="font-display font-bold text-2xl tracking-wider flex-shrink-0"
        >
          <span className="text-prussian-blue ">Logoip</span>
          <span className="text-selective-orange">sum</span>
        </a>

        <div className="relative max-w-md hidden sm:block flex-grow transition-all">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 " />
          <Input
            type="search"
            placeholder="Search for events..."
            className="
                pl-12 
                h-10 
                pr-4 
                rounded-full 
                bg-white/50 
                border-transparent 
                focus-visible:ring-2 
                focus-visible:!ring-blue-green/80 
                focus-visible:ring-offset-0  
                text-prussian-blue 
                placeholder:text-prussian-blue/50
                font-poppins
                placeholder:font-poppins
                placeholder:text-[16px]
                text-[16px]
                placeholder:font-[400]
                shadow-md shadow-black/5"
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger>
              <div className=" max-w-md block sm:hidden  transition-all bg-white/10 backdrop-blur-lg rounded-full p-2 group shadow-md shadow-black/5 hover:bg-neutral-500">
                <Search className="text-muted-foreground h-5 w-5 group-hover:text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="rounded-4xl bg-white/60 w-fit shadow-md shadow-black/5 backdrop-blur-lg flex gap-2 flex-col sm:hidden mx-5 border-0 ">
              <div className="relative max-w-md block sm:hidden flex-grow transition-all">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 " />
                <Input
                  type="search"
                  placeholder="Search for events..."
                  className="
                pl-12 
                h-10 
                pr-4 
                rounded-full 
                bg-white/50 
                border-transparent 
                focus-visible:ring-2 
                focus-visible:!ring-blue-green/80 
                focus-visible:ring-offset-0  
                text-prussian-blue 
                placeholder:text-prussian-blue/50
                font-poppins
                placeholder:font-poppins
                placeholder:text-[16px]
                text-[16px]
                placeholder:font-[400]"
                />
              </div>
              <PopoverArrow className="" />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="bg-blue-green font-poppins text-white  font-semibold rounded-full flex-grow min-w-17 py-[10px] max-w-30 group relative flex justify-center items-center lg:hidden hover:bg-blue-green overflow-hidden cursor-pointer">
              <Menu className="h-4 w-4 " />
              {/* <span className="">Menu</span> */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors  mix-blend-overlay "></div>
            </PopoverTrigger>
            <PopoverContent className="rounded-4xl bg-white/60 w-fit backdrop-blur-lg flex gap-2 flex-col shadow-md shadow-black/5 lg:hidden mx-5 border-0">
              <Button
                className="bg-blue-green font-poppins font-semibold rounded-full w-37 group relative hover:bg-blue-green overflow-hidden cursor-pointer"
                onClick={handlerCreateEvent}
              >
                <PlusCircle className="h-5 w-5 z-10" />
                <span className="z-10">Create Event</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors z-0 mix-blend-overlay "></div>
              </Button>
              <Button
                variant={"ghost"}
                className="font-poppins rounded-full cursor-pointer"
                onClick={() => route.push("/login")}
              >
                Sign In
              </Button>
              <Button
                className="bg-ut-orange font-poppins rounded-full  group relative hover:bg-ut-orange overflow-hidden cursor-pointer"
                onClick={() => route.push("/register")}
              >
                <span className="z-10">Sign Up</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors z-0 mix-blend-overlay "></div>
              </Button>

              <PopoverArrow />
            </PopoverContent>
          </Popover>
        </div>

        <div className="hidden lg:block transition-all  ">
          <div className="flex gap-3 items-center ">
            <Button
              className="bg-blue-green font-poppins font-semibold rounded-full w-37 group relative hover:bg-blue-green overflow-hidden cursor-pointer"
              onClick={handlerCreateEvent}
            >
              <PlusCircle className="h-5 w-5 z-10" />
              <span className="z-10">Create Event</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors z-0 mix-blend-overlay "></div>
            </Button>
            <Button
              variant={"ghost"}
              className="font-poppins rounded-full cursor-pointer"
              onClick={() => route.push("/login")}
            >
              Sign In
            </Button>
            <Button
              className="bg-ut-orange font-poppins rounded-full  group relative hover:bg-ut-orange overflow-hidden cursor-pointer"
              onClick={() => route.push("/register")}
            >
              <span className="z-10">Sign Up</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/17 duration-200 transition-colors z-0 mix-blend-overlay "></div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
