import { Input } from "@/components/ui/input";
import clsx from "classnames";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

function SearchBar({ className }: SearchBarProps) {
  return (
    <div className={clsx("default-styles", className)}>
      <div className="relative">
        <Input placeholder="Search Bar"></Input>
        <Search className="absolute top-2 right-4 size-5 text-gray-500"></Search>
      </div>
    </div>
  );
}
export default SearchBar;
