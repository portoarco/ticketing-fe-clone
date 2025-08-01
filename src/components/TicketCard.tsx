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
import { TbShoppingCartPlus } from "react-icons/tb";
import { FaCirclePlus } from "react-icons/fa6";
import { PlusCircle } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { useRouter } from "next/navigation";

function roundToSpecifiedDigit(num: number, digits: number) {
  const factor = 10 ** (num.toString().length - digits);
  return Math.round(num / factor) * factor;
}

export default function TicketCard({ event }: any) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const price = event.price;
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
  const formattedPrice = totalPrice.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  function navigateToPayment() {
    router.push("/transaction/payment");
  }

  return (
    <>
      <Card
        className={`border-transparent transition-all overflow-hidden duration-300  origin-top ${
          isExpanded
            ? "bg-white shadow-transparent "
            : "bg-transparent shadow-transparent"
        }`}
      >
        <CardHeader className="relative">
          <CardTitle className="font-display text-xl font-bold text-prussian-blue mb-0">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-full h-fit font-poppins bg-blue-green hover:bg-blue-green/90 rounded-b-none cursor-pointer ${
                isExpanded ? "" : "bg-blue-green text-lg hover:bg-blue-green/90"
              }`}
            >
              Get Tickets
            </Button>
          </CardTitle>
        </CardHeader>
        {true && (
          <div
            className={`transition-all duration-300 ease-in-out ${
              isExpanded ? "opacity-100  mb-0" : "opacity-0 -mb-[400px]"
            }`}
          >
            <CardContent className="relative">
              <CardDescription className="font-poppins flex justify-between pb-7">
                <div>
                  <p className="text-[16px] text-prussian-blue/80 font-semibold">
                    General Admission
                  </p>
                  <p className="text-base font-semibold font-poppins text-blue-green">
                    {totalPrice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
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
              <div className="absolute bottom-0 border-b  mb-3 inset-x-0"></div>
            </CardContent>
            <CardContent className="relative pb-7 ">
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
              <div className="absolute bottom-0  border-b mb-3 inset-x-0"></div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between font-poppins  text-prussian-blue/70">
                  <p className="text-xs">{`${quantity}x General Admission`}</p>
                  <p className="text-xs">
                    {totalPrice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-between font-poppins text-xs text-prussian-blue/70">
                  <p>Voucher Discount</p>
                  <p className="text-green-600">
                    {`- ${discountedPrice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}`}
                  </p>
                </div>
              </div>

              <div className="flex justify-between font-semibold w-full font-poppins text-prussian-blue text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span>{discountedTotalPrice}</span>
              </div>
            </CardFooter>
          </div>
        )}
        <CardFooter className="">
          <Button
            size="lg"
            onClick={() => navigateToPayment()}
            disabled={!isExpanded}
            className={`w-full font-poppins cursor-pointer rounded-t-none  font-bold origin-top ${
              isExpanded
                ? "scale-y-100 mt-0 bg-ut-orange  hover:bg-ut-orange/90 "
                : "scale-y-50 mt-9 bg-blue-green/20  hover:bg-blue-green/20"
            }`}
          >
            {`${isExpanded ? "Checkout" : ""}`}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
