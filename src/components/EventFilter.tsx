import { CalendarRange, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function EventFilter() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mb-15 container ">
      <div className="">
        <h2 className="block  w-fit  font-poppins text-4xl font-semibold">
          Find Your Next Experience
        </h2>
      </div>
      <div className="flex gap-3 items-center justify-center w-full ">
        <div className="relative max-w-xl w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 " />
          <Input
            type="search"
            placeholder="Search cities..."
            className="rounded-4xl bg-white/80 py-7 placeholder:font-poppins  pl-12 focus-visible:!ring-blue-green/80
             placeholder:text-prussian-blue/50  font-poppins placeholder:translate-y-0.5 placeholder:text-[16px] text-[16px]  shadow-md"
          />
        </div>
        <Button className="bg-white text-prussian-blue font-poppins rounded-4xl py-7 min-w-28 shadow-md ">
          <CalendarRange />
          <span className="font-poppins text-[15px] font-semibold">Date</span>
        </Button>
      </div>
      <div>
        <div className="flex items-center justify-center gap-2">
          <Button className="bg-transparent text-prussian-blue/65 text-[16px] font-semibold font-poppins rounded-full py-6 px-4 shadow-transparent hover:bg-blue-green/12 hover:text-prussian-blue">
            All
          </Button>
          <Button className="bg-transparent text-prussian-blue/65 text-[16px] font-semibold font-poppins rounded-full py-6 px-4 shadow-transparent hover:bg-blue-green/12 hover:text-prussian-blue">
            Music
          </Button>
          <Button className="bg-transparent text-prussian-blue/65 text-[16px] font-semibold font-poppins rounded-full py-6 px-4 shadow-transparent hover:bg-blue-green/12 hover:text-prussian-blue">
            Art & Culture
          </Button>
          <Button className="bg-transparent text-prussian-blue/65 text-[16px] font-semibold font-poppins rounded-full py-6 px-4 shadow-transparent hover:bg-blue-green/12 hover:text-prussian-blue">
            Food & Drinks
          </Button>
          <Button className="bg-transparent text-prussian-blue/65 text-[16px] font-semibold font-poppins rounded-full py-6 px-4 shadow-transparent hover:bg-blue-green/12 hover:text-prussian-blue">
            Tech
          </Button>
          <Button className="bg-transparent text-prussian-blue/65 text-[16px] font-semibold font-poppins rounded-full py-6 px-4 shadow-transparent hover:bg-blue-green/12 hover:text-prussian-blue">
            Wellness
          </Button>
          <Button className="bg-transparent text-prussian-blue/65 text-[16px] font-semibold font-poppins rounded-full py-6 px-4 shadow-transparent hover:bg-blue-green/12 hover:text-prussian-blue">
            Sports
          </Button>
        </div>
      </div>
    </div>
  );
}
