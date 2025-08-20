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
import {
  Plus,
  X,
  Calendar as CalendarIcon,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { formatToRupiah } from "@/utils/formatRupiah";
import { Promotion, TicketType, TicketsCardProps } from "@/app/types/types";

export default function AddTicketsCard({
  ticketType,
  setTicketType,
  isFree,
  setIsFree,
  promotions,
  setPromotions,
  addPromotion,
  setAddPromotion,
}: TicketsCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const totalSeats = ticketType.reduce(
    (sum, ticket) => sum + (ticket.quantity || 0),
    0
  );

  const isComplete = isFree
    ? totalSeats > 0
    : ticketType.length > 0 &&
      ticketType.every((t) => t.name && t.price >= 0 && t.quantity > 0);

  const addPromotionFunction = () => {
    setPromotions([
      ...promotions,
      {
        id: Date.now(),
        code: "",
        discountPercentage: 25,
        startDate: undefined,
        expiryDate: undefined,
      },
    ]);
  };

  const removePromotionFunction = (index: number) => {
    setPromotions(promotions.filter((_, i) => i !== index));
  };

  const handlePromotionChange = (
    index: number,
    field: keyof Omit<Promotion, "id">,
    value: string | number | Date | undefined
  ) => {
    const newPromotions = [...promotions];
    newPromotions[index] = { ...newPromotions[index], [field]: value };
    setPromotions(newPromotions);
  };

  const addTicketType = () => {
    setTicketType([
      ...ticketType,
      { id: Date.now(), name: "", price: 0, quantity: 0 },
    ]);
  };

  const removeTicketType = (index: number) => {
    const newTicketTypes = [...ticketType];
    newTicketTypes.splice(index, 1);
    setTicketType(newTicketTypes);
  };

  const handleTicketChange = (
    index: number,
    field: keyof TicketType,
    value: string | number
  ) => {
    const newTicketTypes = [...ticketType];
    newTicketTypes[index] = { ...newTicketTypes[index], [field]: value };
    setTicketType(newTicketTypes);
  };

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
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox
                  id="is-free"
                  checked={isFree}
                  onCheckedChange={(checked) => setIsFree(Boolean(checked))}
                />
                <Label
                  htmlFor="is-free"
                  className="text-sm font-medium text-prussian-blue/80 font-poppins"
                >
                  This is a free event
                </Label>
              </div>
              {isFree ? (
                <div className="space-y-2">
                  <Label
                    htmlFor="event-seats"
                    className="font-poppins text-lg font-semibold text-prussian-blue/90"
                  >
                    Total Available Spots
                  </Label>
                  <Input
                    id="event-seats"
                    type="number"
                    value={ticketType[0]?.quantity || ""}
                    onChange={(e) =>
                      handleTicketChange(0, "quantity", Number(e.target.value))
                    }
                    className="rounded-sm border-prussian-blue/80 text-prussian-blue font-poppins placeholder:font-poppins focus-visible:!ring-blue-green"
                    placeholder="e.g., 100"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <Label className="font-poppins text-lg font-semibold text-prussian-blue/90">
                    Ticket Types
                  </Label>
                  {ticketType.map((ticket, index) => (
                    <div
                      key={ticket.id}
                      className="grid  grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_auto_auto_auto] gap-y-2 md:gap-y-0 gap-x-2 items-end p-3 border border-prussian-blue/20 rounded-lg"
                    >
                      <div className="space-y-1 col-span-3 md:col-span-1 ">
                        <Label
                          htmlFor={`ticket-name-${ticket.id}`}
                          className="text-xs font-poppins text-prussian-blue"
                        >
                          Ticket Name
                        </Label>
                        <Input
                          id={`ticket-name-${ticket.id}`}
                          placeholder="e.g., General Admission"
                          value={ticket.name}
                          onChange={(e) =>
                            handleTicketChange(index, "name", e.target.value)
                          }
                          className="rounded-sm h-9 border-prussian-blue/80 text-prussian-blue font-poppins placeholder:font-poppins focus-visible:!ring-blue-green"
                        />
                      </div>
                      <div className="space-y-1 ">
                        <Label
                          htmlFor={`ticket-price-${ticket.id}`}
                          className="text-xs font-poppins text-prussian-blue"
                        >
                          Price (IDR)
                        </Label>
                        <Input
                          id={`ticket-price-${ticket.id}`}
                          type="number"
                          placeholder="50000"
                          value={ticket.price || ""}
                          onChange={(e) =>
                            handleTicketChange(
                              index,
                              "price",
                              Number(e.target.value)
                            )
                          }
                          className="rounded-sm h-9 w-full md:w-28 border-prussian-blue/80 text-prussian-blue font-poppins placeholder:font-poppins focus-visible:!ring-blue-green"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor={`ticket-quantity-${ticket.id}`}
                          className="text-xs font-poppins text-prussian-blue"
                        >
                          Quantity
                        </Label>
                        <Input
                          id={`ticket-quantity-${ticket.id}`}
                          type="number"
                          placeholder="100"
                          value={ticket.quantity || ""}
                          onChange={(e) =>
                            handleTicketChange(
                              index,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          className="rounded-sm h-9 w-full md:w-24 border-prussian-blue/80 text-prussian-blue font-poppins placeholder:font-poppins focus-visible:!ring-blue-green"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTicketType(index)}
                        className="h-9 w-9"
                        disabled={ticketType.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500/70 hover:text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTicketType}
                    className="w-full border-prussian-blue/80 text-prussian-blue font-poppins font-semibold focus-visible:!ring-blue-green"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add another ticket type
                  </Button>
                </div>
              )}
              <hr className="my-2" />

              <div
                className={`space-y-4 ${
                  isFree ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <Label className="font-poppins text-lg font-semibold text-prussian-blue/90">
                  Promotions
                </Label>

                {promotions.map((promo, index) => (
                  <div
                    key={promo.id}
                    className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_auto_auto_auto_auto] gap-x-2 gap-y-3 items-end p-3 border border-prussian-blue/20 rounded-lg"
                  >
                    <div className="space-y-1 col-span-3 md:col-span-1">
                      <Label
                        htmlFor={`promo-code-${promo.id}`}
                        className="text-xs font-poppins text-prussian-blue"
                      >
                        Voucher Code
                      </Label>
                      <Input
                        id={`promo-code-${promo.id}`}
                        placeholder="e.g., EARLYBIRD20"
                        value={promo.code}
                        onChange={(e) =>
                          handlePromotionChange(
                            index,
                            "code",
                            e.target.value.toUpperCase()
                          )
                        }
                        className="rounded-sm h-9 border-prussian-blue/80 text-prussian-blue font-poppins placeholder:font-poppins focus-visible:!ring-blue-green"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`promo-percentage-${promo.id}`}
                        className="text-xs font-poppins text-prussian-blue"
                      >
                        Discount (%)
                      </Label>
                      <Input
                        id={`promo-percentage-${promo.id}`}
                        type="number"
                        placeholder="25"
                        value={promo.discountPercentage || ""}
                        onChange={(e) =>
                          handlePromotionChange(
                            index,
                            "discountPercentage",
                            Number(e.target.value)
                          )
                        }
                        className="rounded-sm h-9 w-full md:w-28 border-prussian-blue/80 text-prussian-blue font-poppins placeholder:font-poppins focus-visible:!ring-blue-green"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`promo-start-${promo.id}`}
                        className="text-xs font-poppins text-prussian-blue"
                      >
                        Start Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal rounded-sm h-9 border-prussian-blue/80 text-prussian-blue font-poppins focus-visible:!ring-blue-green"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {promo.startDate ? (
                              promo.startDate.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto border-2 border-blue-green">
                          <Calendar
                            className="text-prussian-blue font-poppins"
                            mode="single"
                            selected={promo.startDate}
                            onSelect={(date) =>
                              handlePromotionChange(index, "startDate", date)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor={`promo-expiry-${promo.id}`}
                        className="text-xs font-poppins text-prussian-blue"
                      >
                        Expiry Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal rounded-sm h-9 border-prussian-blue/80 text-prussian-blue font-poppins focus-visible:!ring-blue-green"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {promo.expiryDate ? (
                              promo.expiryDate.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto border-2 border-blue-green">
                          <Calendar
                            className="text-prussian-blue font-poppins"
                            mode="single"
                            selected={promo.expiryDate}
                            onSelect={(date) =>
                              handlePromotionChange(index, "expiryDate", date)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePromotionFunction(index)}
                      className="h-9 w-9"
                      disabled={promotions.length == 0}
                    >
                      <Trash2 className="h-4 w-4 text-red-500/70 hover:text-red-500" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addPromotionFunction}
                  className="w-full border-prussian-blue/80 text-prussian-blue font-poppins font-semibold focus-visible:!ring-blue-green"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Promotion
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-poppins font-semibold text-2xl text-prussian-blue">
                Tickets & Promotions
              </h1>
              <div className="font-poppins text-prussian-blue/70 text-sm whitespace-pre-line leading-6">
                {isComplete ? (
                  isFree ? (
                    `This is a free event with ${totalSeats} spots available.`
                  ) : (
                    <ul className="list-disc pl-5 space-y-1">
                      {ticketType.map((ticket) => (
                        <li key={ticket.id}>
                          {ticket.name}: {formatToRupiah(ticket.price)} (
                          {ticket.quantity} available)
                        </li>
                      ))}
                    </ul>
                  )
                ) : (
                  "Set the price and types of tickets for your event."
                )}
                {promotions.length > 0 && !isFree && isComplete && (
                  <div className="mt-4 pt-4 border-t border-prussian-blue/10">
                    <h3 className="font-semibold text-prussian-blue text-sm mb-2">
                      Active Promotions:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-prussian-blue/80">
                      {promotions.map((promo) => (
                        <li key={promo.id}>
                          Code:{" "}
                          <span className="font-mono font-bold text-prussian-blue">
                            {promo.code || "N/A"}
                          </span>{" "}
                          ({promo.discountPercentage || 0}%)
                          {promo.expiryDate &&
                            promo.startDate &&
                            ` - Starts ${promo.startDate.toLocaleDateString()} - Expires ${promo.expiryDate.toLocaleDateString()}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
