import EventHeader from "./components/EventHeader";
import EventOrganizerInfo from "./components/EventOrganizerInfo";
import EventKeyInfo from "./components/EventKeyInfo";
import EventDescription from "./components/EventDescription";
import EventReviews from "./components/EventReviews";
import TicketCard from "@/components/TicketCard";

export default function EventDetailPage() {
  return (
    <main className="container mx-auto px-4 py-8 pt-24 md:pt-28">
      <EventHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
        <div className="lg:col-span-2">
          <EventOrganizerInfo />
          <EventKeyInfo />
          <EventDescription />
          <EventReviews />
        </div>

        <div className="lg:col-span-1">
          <TicketCard />
        </div>
      </div>
    </main>
  );
}
