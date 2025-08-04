"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function TimePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (time: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`
  );

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full font-poppins bg-white text-prussian-blue  border-prussian-blue/80 shadow-transparent"
          >
            {value}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto  border-blue-green border-2 rounded-lg p-0 overflow-hidden"
          align="start"
        >
          <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
            {hours.map((hour) => (
              <Button
                key={hour}
                variant="ghost"
                className="justify-start w-full"
                onClick={() => {
                  onChange(hour);
                  setIsOpen(false);
                }}
              >
                {hour}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
