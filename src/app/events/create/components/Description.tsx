"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";

export default function DescriptionCard({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (value: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      onClick={() => setIsEditing(true)}
      aria-disabled={isEditing}
      className="p-0 overflow-hidden border-0 ring-transparent ring-2 transition-all duration-100 hover:ring-blue-green cursor-pointer"
    >
      <CardContent className="p-0 transition-all">
        <div className="w-full flex flex-col gap-5 relative p-10">
          <button
            type="button"
            onClick={(e) => {
              if (isEditing) {
                e.stopPropagation();
                setIsEditing(false);
              }
            }}
            className="absolute top-3 right-3 bg-neutral-100 rounded-full p-1"
          >
            {description && !isEditing ? (
              <FaCircleCheck size={25} className="text-blue-green" />
            ) : (
              <Plus
                size={25}
                className={`text-blue-green transition-all ${
                  isEditing
                    ? "rotate-45 text-prussian-blue/60 hover:text-ut-orange hover:scale-120"
                    : ""
                }`}
              />
            )}
          </button>

          {isEditing ? (
            <>
              <label htmlFor="event-description">
                <h2 className="font-poppins font-semibold text-2xl text-prussian-blue">
                  Description
                </h2>
              </label>

              <Textarea
                id="event-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-sm font-poppins text-prussian-blue border-prussian-blue/80 focus-visible:!ring-blue-green h-48 placeholder:font-poppins"
                placeholder="Write the details about the event here..."
              />
            </>
          ) : (
            <>
              <h1 className="font-poppins font-semibold text-2xl text-prussian-blue">
                Description
              </h1>
              <p className="font-poppins text-prussian-blue/80 text-sm ">
                {description ||
                  ` You can provide the details of your event here - anything that
                  will help people know what to expect here.`}
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
