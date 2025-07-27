import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { EventCardProps } from "@/app/types/types";
import { MapPin } from "lucide-react";

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="p-0 transition-all duration-300 shadow-md hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-green/40 border-0">
      <CardHeader className="relative p-0 -mb-8 ">
        {/* reminder - h-40 */}
        <div className=" rounded-t-lg relative overflow-hidden h-40 bg-amber-600">
          <Image
            src={event.img.src}
            alt={event.img.alt}
            fill
            className="object-cover object-center"
          ></Image>
          {event.promo ? (
            <div
              className={`absolute rounded-br-md w-fit h-fit py-1 px-3 text-white font-bold font-poppins text-[12px] ${event.promo.color} `}
            >
              <p className="uppercase">{event.promo.text}</p>
            </div>
          ) : null}
        </div>

        <div className="absolute bg-ut-orange w-14 text-white text-center p-2 -right-3 -top-3 shadow-xl rounded-lg">
          <span className="block font-bold text-xl font-poppins">
            {event.day}
          </span>
          <span className="block text-[10px] uppercase tracking-wider font-poppins">
            {event.month}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col  flex-grow ">
        <p className="font-poppins text-blue-green font-semibold  text-[12px]">
          {event.category}
        </p>
        <h3 className="font-poppins text-prussian-blue font-bold text-lg mb-1">
          {event.title}
        </h3>
        <div className="flex items-center gap-1 text-prussian-blue/50 mt-auto">
          <MapPin size={13} />
          <p className="font-poppins text-[12px] text-prussian-blue/50">
            {event.location}
          </p>
        </div>
        <hr className="mt-3" />
      </CardContent>
      <CardFooter className="-mt-10 px-4 pt-3 pb-4 flex">
        <div className=""></div>
        <div className="">
          <p
            className={`font-poppins  font-bold  ${
              event.price === 0 ? "text-selective-orange" : "text-blue-green"
            }`}
          >
            {event.price === 0 ? "FREE" : `$${event.price}`}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
