"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Plus, X, Calendar as CalendarIcon } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { formatToRupiah } from "@/utils/formatRupiah";

// Define the shape of the props this component will receive from the parent page
interface TicketsCardProps {
  price: number;
  setPrice: (value: number) => void;
  seats: number;
  setSeats: (value: number) => void;
  addPromotion: boolean;
  setAddPromotion: (value: boolean) => void;
  discountPercentage: number;
  setDiscountPercentage: (value: number) => void;
  voucherExpiryDate: Date | undefined;
  setVoucherExpiryDate: (value: Date | undefined) => void;
}

export default function AddTicketsCard({
  price,
  setPrice,
  seats,
  setSeats,
  addPromotion,
  setAddPromotion,
  discountPercentage,
  setDiscountPercentage,
  voucherExpiryDate,
  setVoucherExpiryDate,
}: TicketsCardProps) {
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
            className="absolute top-3 right-3 bg-neutral-100 rounded-full p-1 z-10"
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
                Tickets & Promotions
              </h2>
              {/* Price and Seats Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="event-price"
                    className="text-prussian-blue/80 font-poppins"
                  >
                    Price (Rp.)
                  </Label>
                  <Input
                    id="event-price"
                    type="number"
                    value={isFree ? "" : price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="rounded-sm border-prussian-blue/80 text-prussian-blue/80 font-poppins placeholder:font-poppins focus:!ring-blue-green  focus-visible:!ring-2"
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
                      className="text-sm font-medium text-prussian-blue/80 font-poppins"
                    >
                      This is a free event
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="event-seats"
                    className="text-prussian-blue/80 font-poppins"
                  >
                    Available Seats
                  </Label>
                  <Input
                    id="event-seats"
                    type="number"
                    value={seats || ""}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="rounded-sm border-prussian-blue/80 text-prussian-blue/80 font-poppins placeholder:font-poppins focus:!ring-blue-green  focus-visible:!ring-2"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>
              <hr />
              {/* Promotions Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="add-promo"
                    checked={addPromotion}
                    onCheckedChange={(checked) =>
                      setAddPromotion(Boolean(checked))
                    }
                  />
                  <Label
                    htmlFor="add-promo"
                    className="font-semibold text-prussian-blue/80 font-poppins"
                  >
                    Add a discount
                  </Label>
                </div>
                {addPromotion && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0  ml-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="promo-percentage"
                        className="text-prussian-blue/80 font-poppins"
                      >
                        Discount (%)
                      </Label>
                      <Input
                        id="promo-percentage"
                        type="number"
                        value={discountPercentage || ""}
                        onChange={(e) =>
                          setDiscountPercentage(Number(e.target.value))
                        }
                        placeholder="e.g., 25"
                        className="rounded-sm border-prussian-blue/80 text-prussian-blue/80 font-poppins placeholder:font-poppins focus:!ring-blue-green  focus-visible:!ring-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="promo-expiry"
                        className="text-prussian-blue/80 font-poppins"
                      >
                        Voucher Expiry Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal rounded-sm border-prussian-blue/80 text-prussian-blue/80 font-poppins placeholder:font-poppins focus:!ring-blue-green"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {voucherExpiryDate ? (
                              voucherExpiryDate.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto  border-blue-green border-2 rounded-lg p-0">
                          <Calendar
                            className="text-prussian-blue font-poppins "
                            mode="single"
                            selected={voucherExpiryDate}
                            onSelect={setVoucherExpiryDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="font-poppins font-semibold text-2xl text-prussian-blue">
                Tickets & Promotions
              </h1>
              <p className="font-poppins text-prussian-blue/70 text-sm whitespace-pre-line leading-6">
                {isComplete
                  ? isFree
                    ? `Free event with ${seats} seats available.`
                    : `Price is set to ${formatToRupiah(
                        price
                      )} with ${seats} seats available.`
                  : "Set the price and number of available tickets."}
                {addPromotion &&
                  `\n A ${discountPercentage}% discount voucher is active.`}
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
