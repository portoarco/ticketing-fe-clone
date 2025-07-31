import EventHeader from "./components/EventHeader";
import EventOrganizerInfo from "./components/EventOrganizerInfo";
import EventKeyInfo from "./components/EventKeyInfo";
import EventDescription from "./components/EventDescription";
import EventReviews from "./components/EventReviews";
import TicketCard from "@/components/TicketCard";
import { apiCall } from "@/helper/apiCall";
import { notFound } from "next/navigation";

interface EventDetailParams {
  params: { id: string };
}

async function getEvent(params: string): Promise<any | null> {
  try {
    const res = await apiCall.get(`/events/${params}`);

    console.log(res.data);

    if (res) {
      return res.data.data;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
}

export default async function EventDetailPage({ params }: EventDetailParams) {
  const eventId = params.id;

  const eventData = await getEvent(eventId);

  if (!eventData) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 pt-24 md:pt-28">
      <EventHeader event={eventData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
        <div className="lg:col-span-2">
          <EventOrganizerInfo event={eventData} />
          <EventKeyInfo event={eventData} />
          <EventDescription />
          {/* <EventReviews /> */}
        </div>

        <div className="lg:col-span-1">
          <TicketCard />
        </div>
      </div>
    </main>
  );
}
