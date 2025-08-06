"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { EventCardProps } from "@/app/types/types";
import {
  ArrowRight,
  CircleArrowRightIcon,
  LucideArrowBigRightDash,
  LucideCircleArrowRight,
  MapPin,
} from "lucide-react";
import { useEffect } from "react";

export default function EventCard({
  event,
  onClick,
}: {
  event: any;
  onClick: () => void;
}) {
  useEffect(() => {
    // console.log(event);
  }, []);

  function getLowestPrice(event: any) {
    const ticketPrices = event.ticketType.map((ticket: any) => ticket.price);
    return Math.min(...ticketPrices);
  }

  function roundToSpecifiedDigit(num: number, digits: number) {
    const factor = 10 ** (num.toString().length - digits);
    return Math.round(num / factor) * factor;
  }

  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <Card
      onClick={onClick}
      className={`p-0 transition-all duration-300 shadow-md hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-green/40 border-0 cursor-pointer`}
    >
      <CardHeader className="relative p-0 -mb-8 ">
        {/* reminder - h-40 */}
        <div className=" rounded-t-lg relative overflow-hidden h-40 ">
          <Image
            src={
              event.image == null
                ? "https://res.cloudinary.com/dilrmwt4a/image/upload/v1754385284/vupvf1tewgrmuu4cqvhf.jpg"
                : event.image
            }
            alt={""}
            fill
            className="object-cover object-center"
          ></Image>
          {false ? (
            <div
              className={`absolute rounded-br-md w-fit h-fit py-1 px-3 text-white font-bold font-poppins text-[12px] ${event.promo.color} `}
            >
              {/* <p className="uppercase">{event.promo.text}</p> */}
            </div>
          ) : null}
        </div>

        <div className="absolute bg-ut-orange  text-white text-center py-2 px-4 -right-3 -top-3 shadow-xl rounded-lg origin-right whitespace-nowrap flex gap-3 items-center scale-85">
          <div>
            <span className="block font-bold text-xl font-poppins">
              {`${new Date(event.start_date)
                .getDate()
                .toString()
                .padStart(2, "0")}`}
            </span>
            <span className="block text-[10px] uppercase tracking-wider font-poppins">
              {months[new Date(event.start_date).getMonth()]}
            </span>
          </div>
          {new Date(event.start_date).toLocaleDateString() !=
          new Date(event.end_date).toLocaleDateString() ? (
            <>
              <div>
                <LucideArrowBigRightDash size={18} />
              </div>

              <div>
                <span className="block font-bold text-xl font-poppins">
                  {`${new Date(event.end_date)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`}
                </span>
                <span className="block text-[10px] uppercase tracking-wider font-poppins">
                  {months[new Date(event.end_date).getMonth()]}
                </span>
              </div>
            </>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col  flex-grow ">
        <p className="font-poppins text-blue-green font-semibold  text-[12px]">
          {event.category_event.name}
        </p>
        <h3 className="font-poppins text-prussian-blue font-bold text-lg mb-1">
          {event.name}
        </h3>
        <div className="flex items-center gap-1 text-prussian-blue/50 mt-auto">
          <MapPin size={13} />
          <p className="font-poppins text-[12px] text-prussian-blue/50">
            {event.location_Event.city}
          </p>
        </div>
        <hr className="mt-3" />
      </CardContent>
      <CardFooter className="-mt-10 px-4 pt-3 pb-4 flex">
        <div className=""></div>
        <div className="">
          <p
            className={`font-poppins  font-bold  ${
              getLowestPrice(event) === 0
                ? "text-selective-orange"
                : "text-blue-green"
            }`}
          >
            {getLowestPrice(event) === 0
              ? "FREE"
              : `${getLowestPrice(event).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}`}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
