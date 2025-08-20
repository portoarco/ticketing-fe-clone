"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import type { CartData } from "@/app/transaction/cart/[id]/page";

interface CartCardProps {
  event: CartData | null;
}

// function roundToSpecifiedDigit(num: number, digits: number) {
//   const factor = 10 ** (num.toString().length - digits);
//   return Math.round(num / factor) * factor;
// }

export default function CartCard({ event }: CartCardProps) {
  const [quantity, setQuantity] = useState(1);
  const item = event?.items?.[0];
  const price = item ? item.price : 100000;
  const totalPrice = price * quantity;
  const voucherDiscount = 25;
  const discountedPrice = (totalPrice * voucherDiscount) / 100;
  const discountedTotalPrice = (totalPrice - discountedPrice).toLocaleString(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }
  );
  // const formattedPrice = totalPrice.toLocaleString("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  //   minimumFractionDigits: 0,
  // });
  return (
    <>
      <Card className=" w-full border-0 border-transparent  ">
        <CardHeader className="mb-0 border-b">
          <h1 className="font-display text-5xl font-bold text-prussian-blue">
            Shopping Cart
          </h1>
        </CardHeader>
        <CardContent className="relative pb-2 bg-transparent border-0 border-transparent space-y-5">
          <div className="flex items-center justify-between w-full border-b pb-7">
            <div className="flex items-center gap-3">
              <div className="h-25 w-35 bg-selective-orange rounded-2xl"></div>
              <div>
                <h3 className="font-display text-lg mb-1 font-semibold text-prussian-blue">
                  Adventure Time
                </h3>
                <p className="text-base font-semibold font-poppins text-blue-green">
                  {totalPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
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
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-25 w-35 bg-selective-orange rounded-2xl"></div>
              <div>
                <h3 className="font-display mb-1 text-lg font-bold text-prussian-blue">
                  Journey to the world of Middleworld
                </h3>
                <p className="text-base font-semibold font-poppins text-blue-green">
                  {totalPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </p>
                <p className="text-sm line-through font-poppins text-prussian-blue/50">
                  {(totalPrice * 3 - totalPrice).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
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
          </div>
          <div className="absolute bottom-0 border-b  inset-x-0"></div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex justify-between font-semibold w-full font-poppins text-prussian-blue text-lg  ">
            <span>Total</span>
            <span>{discountedTotalPrice}</span>
          </div>
          <Button
            size="lg"
            className="w-full mt-3 font-poppins bg-ut-orange hover:bg-ut-orange/90 font-bold"
          >
            Checkout
          </Button>
          <p className=" text-xs font-poppins mt-2 text-prussian-blue/70">
            You won't be charged yet
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
