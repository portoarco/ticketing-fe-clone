import { Calendar, MapPin } from "lucide-react";

export default function EventKeyInfo({ event }: any) {
  const startDate = new Date(event.start_date);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-b">
      <div className="flex items-start gap-4">
        <Calendar className="h-8 w-8 text-blue-green flex-shrink-0" />
        <div>
          <h3 className="font-bold  font-poppins text-prussian-blue">
            Date & Time
          </h3>
          <p className="text-prussian-blue/70 text-[13px] font-poppins">
            {`${startDate.toLocaleDateString(undefined, {
              weekday: "long",
            })}, ${startDate.toLocaleDateString(undefined, {
              month: "long",
            })} ${startDate.getDate()}, ${startDate.getFullYear()}`}
            <br /> 8:00 PM - 11:00 PM {startDate.getHours()}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <MapPin className="h-8 w-8 text-blue-green flex-shrink-0" />
        <div>
          <h3 className="font-bold font-poppins text-prussian-blue">
            Location
          </h3>
          <p className="text-prussian-blue/70 font-poppins text-[13px]">
            {event.location_Event.city} <br /> {event.location_Event.address}
          </p>
          <a
            href="#"
            className="text-sm font-semibold font-poppins text-blue-green hover:underline mt-1"
          >
            Show map
          </a>
        </div>
      </div>
    </section>
  );
}
