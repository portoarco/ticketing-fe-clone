import { PlusCircle, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Navbar() {
  return (
    <nav className=" flex justify-center ">
      <div className="flex justify-between items-center mt-4 gap-20 w-[90%] max-w-7xl bg-white/60  h-16 rounded-full  px-5 fixed z-50 backdrop-blur-lg">
        <a
          href="#"
          className="font-display font-bold text-2xl tracking-wider flex-shrink-0"
        >
          <span className="text-prussian-blue ">Logoip</span>
          <span className="text-selective-orange">sum</span>
        </a>

        <div className="relative max-w-md hidden md:block flex-grow">
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

        <div className="">
          <div className="flex gap-3 items-center ">
            <Button className="bg-blue-green font-poppins font-semibold rounded-full w-37">
              <PlusCircle className="h-5 w-5" />
              Create Event
            </Button>
            <Button variant={"ghost"} className="font-poppins rounded-full">
              Sign In
            </Button>
            <Button className="bg-ut-orange font-poppins rounded-full ">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
