import { ArrowDown, ChevronDown } from "lucide-react";

interface DividerProps {
  variant: "arrow" | "circles";
}

function Divider({ variant }: DividerProps) {
  return (
    <div className="container  px-4 my-20 mx-auto" aria-hidden="true">
      <div className="flex items-center">
        <div className=" h-[1px] rounded-full bg-prussian-blue/20 w-full"></div>
        {variant === "arrow" ? (
          <ArrowDown
            className=" translate-y-3 text-prussian-blue mx-5 animate-bounce-slow"
            size={70}
          />
        ) : (
          <div className="flex items-center gap-3 mx-5">
            <div className="w-2 h-2 bg-blue-green/50 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-green rounded-full"></div>
            <div className="w-2 h-2 bg-blue-green/50 rounded-full"></div>
          </div>
        )}

        <div className=" h-[1px] rounded-full bg-prussian-blue/20 w-full"></div>
      </div>
    </div>
  );
}

export default Divider;
