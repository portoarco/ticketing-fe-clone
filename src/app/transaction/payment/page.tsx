"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentGateway({ event }: any) {
  const [time, setTime] = useState("");
  const router = useRouter();

  const expireTime = new Date(Date.now() + 2 * 60 * 60 * 1000);

  const calculateTime = () => {
    const difference = expireTime.getTime() - new Date().getTime();
    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      const time = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return "Expired";
  };
  const navigateToConfirmation = () => {
    router.replace("/transaction/confirmation");
  };
  useEffect(() => {
    setTime(calculateTime());

    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        <Card className="">
          <CardContent className="flex flex-col justify-center items-center gap-5 font-poppins">
            <p className="border rounded-2xl p-4 text-prussian-blue ">
              /transaction/payment
            </p>
            <div className="border flex flex-col items-center gap-2 p-4 rounded-2xl text-yellow-700 bg-selective-orange/10">
              <p className="font-semibold">Time to upload payment proof</p>
              <p className="tracking-wider">{time}</p>
            </div>
            <p className="font-semibold text-prussian-blue">
              Status : Waiting for Payment
            </p>
            <Button
              className="cursor-pointer"
              onClick={() => navigateToConfirmation()}
            >
              Submit Payment Proof
            </Button>
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
