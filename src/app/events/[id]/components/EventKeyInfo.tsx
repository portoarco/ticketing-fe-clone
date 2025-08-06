import { Calendar, MapPin, Ticket, Tickets } from "lucide-react";

export default function EventKeyInfo({ event }: any) {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);

  const availableSeats = event.ticketType.reduce((sum: any, ticket: any) => {
    return sum + ticket.quantity;
  }, 0);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-b">
      <div className="flex items-start gap-4">
        <Calendar className="h-8 w-8 text-blue-green flex-shrink-0" />
        <div>
          <h3 className="font-bold  font-poppins text-prussian-blue">
            Date & Time
          </h3>
          <p className="text-prussian-blue/70 text-[13px] font-poppins">
            {`${
              endDate &&
              new Date(startDate).toLocaleDateString() !=
                new Date(endDate).toLocaleDateString()
                ? ""
                : startDate.toLocaleDateString(undefined, {
                    weekday: "long",
                  }) + ","
            } ${startDate.toLocaleDateString(undefined, {
              month: "long",
            })} ${startDate.getDate()}, ${startDate.getFullYear()} ${
              endDate &&
              new Date(startDate).toLocaleDateString() !=
                new Date(endDate).toLocaleDateString()
                ? `- ${` ${endDate.toLocaleDateString(undefined, {
                    month: "long",
                  })} ${endDate.getDate()}, ${endDate.getFullYear()} `}`
                : ""
            }`}
          </p>
          {/* <p className="text-prussian-blue/70 text-[13px] font-poppins">
            8:00 PM - 11:00 PM
          </p> */}
        </div>
      </div>
      <div className="flex items-start gap-4">
        <MapPin className="h-8 w-8 text-ut-orange/90 flex-shrink-0" />
        <div>
          <h3 className="font-bold font-poppins text-prussian-blue">
            Location
          </h3>
          <p className="text-prussian-blue/70 font-poppins text-[13px]">
            {event.location_Event.city} <br /> {event.location_Event.address}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Ticket className="h-8 w-8 text-selective-orange flex-shrink-0" />
        <div>
          <h3 className="font-bold  font-poppins text-prussian-blue">
            Available Seats
          </h3>

          <p className="text-prussian-blue/70 text-[13px] font-poppins">
            Only {availableSeats} spots left for this event
          </p>
        </div>
      </div>
    </section>
  );
}
