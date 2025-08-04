"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";

export default function TicketsCard({
  price,
  setPrice,
  seats,
  setSeats,
}: {
  price: number;
  setPrice: (value: number) => void;
  seats: number;
  setSeats: (value: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const isFree = price === 0;
  const isComplete = (isFree || price > 0) && seats > 0;

  return (
    <Card
      onClick={() => !isEditing && setIsEditing(true)}
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
            {isComplete && !isEditing ? (
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
              <h2 className="font-poppins font-semibold text-2xl text-prussian-blue">
                Tickets & Pricing
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="event-price"
                    className="text-prussian-blue/80 font-poppins px-1"
                  >
                    Price (IDR)
                  </Label>
                  <Input
                    id="event-price"
                    type="number"
                    value={isFree ? "" : price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="rounded-sm"
                    placeholder="Enter 0 for a free event"
                    disabled={isFree}
                  />
                  <div className="flex items-center space-x-2 pt-1">
                    <Checkbox
                      id="is-free"
                      checked={isFree}
                      onCheckedChange={(checked) => setPrice(checked ? 0 : 1)}
                    />
                    <Label
                      htmlFor="is-free"
                      className="text-sm font-medium font-poppins text-prussian-blue/80"
                    >
                      This is a free event
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="event-seats"
                    className="text-prussian-blue/80 font-poppins px-1"
                  >
                    Available Seats
                  </Label>
                  <Input
                    id="event-seats"
                    type="number"
                    value={seats || ""}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="rounded-sm"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-poppins font-semibold text-2xl text-prussian-blue">
                Add tickets
              </h1>
              <p className="font-poppins text-prussian-blue/70 text-sm">
                {isComplete
                  ? isFree
                    ? `This is a free event with ${seats} seats available.`
                    : `Price is set to IDR ${price.toLocaleString(
                        "id-ID"
                      )} with ${seats} seats available.`
                  : "Set the price and number of available tickets for your event."}
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
