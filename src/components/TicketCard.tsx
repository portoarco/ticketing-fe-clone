"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { useRouter } from "next/navigation";

function roundToSpecifiedDigit(num: number, digits: number) {
  const factor = 10 ** (num.toString().length - digits);
  return Math.round(num / factor) * factor;
}

export default function TicketCard({ event }: any) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  // const [quantity, setQuantity] = useState(1);
  const [quantity, setQuantity] = useState<number[]>([]);
  const [voucherCode, setVoucherCode] = useState<string[]>([]);
  const [voucherCodeInput, setVoucherCodeInput] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);

  useEffect(() => {
    setTotalPrice(
      event.ticketType.reduce((prev: any, current: any, index: number) => {
        return prev + current.price * quantity[index];
      }, 0)
    );
    // setVoucherCode(event.voucher_event.map((voucher: any) => voucher.code));

    const el = contentRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (isExpanded) {
        setMaxHeight(`${el.scrollHeight}px`);
      }
    };

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    updateHeight();

    return () => {
      observer.disconnect;
    };
  }, [isExpanded, quantity, voucherCodeInput, isVoucherApplied]);

  function checkVoucher(input: string) {
    if (voucherCode.includes(voucherCodeInput)) {
      console.log(
        "Voucher code matches : ",
        voucherCode.find((code: string) => code === voucherCodeInput)
      );
      return true;
    } else {
      return false;
    }
  }

  const voucherDiscount = isVoucherApplied
    ? event.voucher_event.find(
        (voucher: any) => voucher.code == voucherCodeInput
      ).percentage
    : 0;
  const discountedPrice = voucherDiscount
    ? (totalPrice * voucherDiscount) / 100
    : 0;
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

  useEffect(() => {
    setQuantity(event.ticketType.map((item: any) => 0));
  }, []);

  useEffect(() => {
    // console.log("quantity per ticket : ", quantity);
  }, [quantity]);
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
          <CardTitle className="font-display text-xl font-bold text-prussian-blue mb-0 px-6">
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
            ref={contentRef}
            style={{
              maxHeight: isExpanded ? maxHeight : "0px",
              opacity: isExpanded ? 1 : 0,
            }}
            className={`transition-all duration-400 ease-in-out overflow-hidden`}
          >
            <CardContent className="relative ">
              {event.ticketType.map((ticket: any, index: number) => (
                <div key={index}>
                  {" "}
                  <CardDescription
                    key={index}
                    className="font-poppins flex justify-between px-5 py-3 mb-4 border rounded-md"
                  >
                    <div>
                      <p className="text-[16px] text-prussian-blue/80 font-semibold">
                        {ticket.name}
                      </p>
                      <p className="text-base font-semibold font-poppins text-blue-green">
                        {ticket.price.toLocaleString("id-ID", {
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
                        onClick={() =>
                          setQuantity((prev) => {
                            const copy = [...prev];
                            copy[index] -= 1;
                            return copy;
                          })
                        }
                        disabled={quantity[index] < 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-bold text-prussian-blue">
                        {quantity[index]}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-xl"
                        onClick={() =>
                          setQuantity((prev) => {
                            const copy = [...prev];
                            copy[index] += 1;
                            return copy;
                          })
                        }
                      >
                        +
                      </Button>
                    </div>
                  </CardDescription>
                </div>
              ))}

              {/* <div className="absolute bottom-0 border-b  mb-3 inset-x-0"></div> */}
            </CardContent>
            <CardContent className="relative pb-7 ">
              <div className="flex justify-between mb-4">
                <label className=" text-[13px] font-semibold text-prussian-blue font-poppins">
                  Voucher Code
                </label>
                <Button
                  variant="link"
                  className="text-[11px] font-bold text-blue-green h-auto p-0 font-poppins"
                  onClick={() => setIsVoucherApplied(true)}
                >
                  Apply
                </Button>
              </div>
              <Input
                type="text"
                id="voucher"
                placeholder="Enter code"
                value={voucherCodeInput}
                onChange={(e) =>
                  setVoucherCodeInput(e.target.value.toUpperCase())
                }
                className="h-9 placeholder:font-poppins font-mono placeholder:text-[12px] text-[12px] focus-visible:!ring-1 focus-visible:!ring-blue-green"
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
                <div className="flex flex-col gap-2 items-start justify-between font-poppins  text-prussian-blue/70">
                  {event.ticketType.map((ticket: any, index: number) => (
                    <>
                      {quantity[index] == 0 ? null : (
                        <>
                          <div
                            key={index}
                            className="flex justify-between w-full "
                          >
                            <p className="text-xs">{`${quantity[index]}x ${ticket.name}`}</p>
                            <p className="text-xs">
                              {(ticket.price * quantity[index]).toLocaleString(
                                "id-ID",
                                {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                }
                              )}
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  ))}
                </div>
                {/* <div className="flex items-center justify-between font-poppins text-xs text-prussian-blue/70">
                  <p>Voucher Discount</p>
                  <p className="text-green-600">
                    {`- ${discountedPrice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}`}
                  </p>
                </div> */}
                {isVoucherApplied ? (
                  <>
                    <div className="flex items-center justify-between font-poppins text-xs text-prussian-blue/70">
                      <p>Voucher Discount</p>
                      <p className="text-green-600">
                        {`(%${voucherDiscount}) - ${discountedPrice.toLocaleString(
                          "id-ID",
                          {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }
                        )} `}
                      </p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
                : "scale-y-100 -mt-18 bg-blue-green/20  hover:bg-blue-green/20"
            }`}
          >
            {`${isExpanded ? "Checkout" : ""}`}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
