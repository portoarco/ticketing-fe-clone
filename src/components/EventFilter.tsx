import { CalendarRange, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverArrow, PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";

const categoryDummy: string[] = [
  "All",
  "Music",
  "Art & Culture",
  "Food & Drink",
  "Tech",
  "Health",
  "Sports",
];

export default function EventFilter({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onQueryChange: onSearchChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mb-15 container ">
      <div className="">
        <h2 className="block  w-fit  font-poppins text-4xl font-semibold text-center">
          Find Your Next Experience
        </h2>
      </div>
      <div className="flex gap-3 items-center justify-center w-full ">
        <div className="relative max-w-xl w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 " />
          <Input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            type="search"
            placeholder="Search cities..."
            className="rounded-4xl bg-white/80 py-7 placeholder:font-poppins  pl-12 focus-visible:!ring-blue-green/80
             placeholder:text-prussian-blue/50  font-poppins placeholder:translate-y-0.5 placeholder:text-[16px] text-[16px]  shadow-md"
          />
        </div>
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-white text-prussian-blue hover:bg-white border-2 border-transparent hover:border-neutral-300 cursor-pointer font-poppins rounded-4xl py-7 min-w-28 shadow-md ">
              <CalendarRange />
              <span className="font-poppins text-[15px] font-semibold">
                Date
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-2 fade-animation">
            <Calendar
              mode="range"
              className="rounded-2xl border bg-white font-poppins shadow-md"
            ></Calendar>
            <PopoverArrow />
          </PopoverContent>
        </Popover> */}
      </div>
      <div>
        <div className=" grid-cols items-center justify-center gap-2 ">
          {categoryDummy.map((item, index) => (
            <Button
              key={index}
              onClick={() => onCategoryChange(item)}
              className={` transition-colors duration-150 text-[16px] font-semibold mx-2 font-poppins rounded-full py-6 px-4 shadow-transparent hover:bg-blue-green/12 hover:text-prussian-blue ${
                activeCategory == item
                  ? "bg-blue-green text-white  hover:bg-blue-green/75 hover:text-white drop-shadow-md drop-shadow-blue-green/25 "
                  : "bg-transparent text-prussian-blue/65"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
