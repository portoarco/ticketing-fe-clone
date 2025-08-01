"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Receipt, ReceiptText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConfimationPage({ event }: any) {
  const router = useRouter();

  const navigateToHome = () => {
    router.replace("/");
  };

  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        <Card className="text-prussian-blue">
          <CardContent className="flex flex-col justify-center items-center gap-5 font-poppins ">
            <p className="border rounded-2xl p-4">/transaction/confirmation</p>
            <CheckCircle className="text-green-500"></CheckCircle>
            <p className="font-semibold">Payment Completed</p>

            <div className="flex items-center gap-1">
              <ReceiptText></ReceiptText>
              <p className="">Order number #20231</p>
            </div>

            <Card className="text-prussian-blue">
              <CardHeader>
                <CardTitle>
                  <p className="">Transaction details</p>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 grid  grid-cols-2 gap-x-10  ">
                <p className="">Date :</p>
                <p className="text-right">08-01-2025</p>
                <p className="">Payment Method : </p>
                <p className="text-right"> Virtual Account</p>
                <p className="">Total </p>
                <p className="text-right">$120</p>
                <p className="">Email : </p>
                <p className="text-right">-</p>
              </CardContent>
            </Card>
            <Button onClick={() => navigateToHome()}>Back to home page</Button>
          </CardContent>
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
