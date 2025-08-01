"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";

export default function CheckoutPage({ event }: any) {
  const [quantity, setQuantity] = useState(1);
  const price = event ? event.price : 100000;
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
  return (
    <>
      <div className="flex justify-center items-center h-[100vh] container mx-auto max-w-4xl">
        <Card className="   border-0 border-transparent  w-full ">
          <CardHeader className="mb-0 border-b">
            <h1 className="font-display text-5xl font-bold text-prussian-blue">
              Checkout
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
              Pay
            </Button>
            {/* <p className=" text-xs font-poppins mt-2 text-prussian-blue/70">
              You won't be charged yet
            </p> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

// {
//   return (
//     <>
//       <div className="flex items-center justify-center h-[100vh]">
//         <Card className="">
//           <CardContent>
//             <p>/transaction/checkout</p>
//           </CardContent>
//         </Card>

//       </div>
//     </>
//   );
// }
