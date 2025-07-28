"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

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
    <div className="border rounded-2xl shadow-lg bg-white h-fit">
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-prussian-blue mb-4">
          Select Tickets
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">General Admission</p>
              <p className="text-lg font-bold text-blue-green">
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
              <span className="w-8 text-center font-bold">{quantity}</span>
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
        </div>
      </div>

      <div className="bg-sky-blue/20 p-6 border-y">
        <div className="flex justify-between items-center mb-4">
          <label htmlFor="voucher" className="font-semibold text-sm">
            Voucher Code
          </label>
          <Button
            variant="link"
            className="text-xs font-bold text-blue-green h-auto p-0"
          >
            Apply
          </Button>
        </div>
        <Input
          type="text"
          id="voucher"
          placeholder="Enter code"
          className="h-9"
        />
        <div className="mt-4 flex items-center justify-between">
          <label htmlFor="points" className="font-semibold text-sm">
            Use My Points
          </label>
          <div className="flex items-center">
            <span className="text-sm font-bold text-selective-orange mr-2">
              20.000
            </span>
            <Checkbox id="points" />
          </div>
        </div>
        <p className="text-xs text-prussian-blue/60 mt-1">
          You will save IDR 20.000
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-prussian-blue/80">
            <span>1x General Admission</span>
            <span>{formattedPrice}</span>
          </div>
          <div className="flex justify-between text-prussian-blue/80">
            <span>Points Discount</span>
            <span className="text-green-600">- IDR 20.000</span>
          </div>
          <div className="flex justify-between font-bold text-prussian-blue text-base mt-2 pt-2 border-t">
            <span>Total</span>
            <span>
              {totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
        <Button
          size="lg"
          className="w-full mt-6 bg-ut-orange hover:bg-ut-orange/90 font-bold"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
