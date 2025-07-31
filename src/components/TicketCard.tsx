"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function TicketCard() {
  const [quantity, setQuantity] = useState(1);
  const price = 450000;
  const totalPrice = price * quantity;
  const formattedPrice = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return (
    <>
      <Card className="">
        <CardHeader className="relative">
          <CardTitle className="font-display text-xl font-bold text-prussian-blue mb-4">
            Select Tickets
          </CardTitle>
          <CardDescription className="font-poppins flex justify-between pb-7">
            <div>
              <p className="text-[16px] text-prussian-blue/80 font-semibold">
                General Admission
              </p>
              <p className="text-lg font-semibold font-poppins text-blue-green">
                {formattedPrice}
              </p>
            </div>
            <div className="flex items-center gap-2 border rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-xl"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center font-bold text-prussian-blue">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-xl"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </CardDescription>
          <div className="absolute bottom-0 border-b  inset-x-0"></div>
        </CardHeader>
        <CardContent className="relative pb-7">
          <div className="flex justify-between mb-4">
            <label className=" text-[13px] font-semibold text-prussian-blue font-poppins">
              Voucher Code
            </label>
            <Button
              variant="link"
              className="text-[11px] font-bold text-blue-green h-auto p-0 font-poppins"
            >
              Apply
            </Button>
          </div>
          <Input
            type="text"
            id="voucher"
            placeholder="Enter code"
            className="h-9 placeholder:font-poppins placeholder:text-[12px] text-[12px]"
          />
          <div className=" flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="points"
                className="font-semibold font-poppins text-prussian-blue text-[13px] "
              >
                Use My Points
              </label>
              <Checkbox id="points" />
            </div>
            <p className="text-xs font-bold font-poppins text-selective-orange">
              20.000
            </p>
          </div>
          <p className="text-[11px] font-poppins text-prussian-blue/60 mt-1">
            You will save IDR 20.000
          </p>
          <div className="absolute bottom-0 border-b  inset-x-0"></div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between font-poppins  text-prussian-blue/70">
              <p className="text-xs">1x General Admission</p>
              <p className="text-xs">{formattedPrice}</p>
            </div>
            <div className="flex items-center justify-between font-poppins text-xs text-prussian-blue/70">
              <p>Points Discount</p>
              <p className="text-green-600">- IDR 20.000</p>
            </div>
          </div>

          <div className="flex justify-between font-semibold w-full font-poppins text-prussian-blue text-base mt-2 pt-2 border-t">
            <span>Total</span>
            <span>
              {totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
          <Button
            size="lg"
            className="w-full mt-6 font-poppins bg-ut-orange hover:bg-ut-orange/90 font-bold"
          >
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
