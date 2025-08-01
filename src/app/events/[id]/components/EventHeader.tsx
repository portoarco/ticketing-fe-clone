import Image from "next/image";
import { Star, MapPin } from "lucide-react";

export default function EventHeader({ event }: any) {
  return (
    <>
      <section className="mb-6">
        <p className="font-semibold text-blue-green mb-2">
          {event.category_event.name}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-prussian-blue mb-4">
          {event.name}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-prussian-blue/80">
          <div className="flex items-center gap-2">
            <Star className="text-selective-orange" fill="currentColor" />
            <span className="font-semibold font-poppins">
              4.92 (12 reviews)
            </span>
          </div>
          <div className="flex items-center gap-2 font-poppins">
            <MapPin className="h-5 w-5" />
            <span>{event.location_Event.city}</span>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="relative w-full h-[50vh] max-h-[450px] rounded-2xl shadow-lg overflow-hidden">
          <Image
            src={event.image}
            alt="Main event"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </>
  );
}
