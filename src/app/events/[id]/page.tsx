import EventHeader from "./components/EventHeader";
import EventKeyInfo from "./components/EventKeyInfo";
import EventDescription from "./components/EventDescription";
import EventReviews from "./components/EventReviews";
import EventOrganizerInfo from "./components/EventOrganizerInfo";

export default function EventDetailPage() {
  return (
    <main className="container mx-auto px-4 py-8 pt-24 md:pt-28">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8">
        <div className="lg:col-span-2">
          <EventHeader />
          <EventOrganizerInfo />
          <EventKeyInfo />
          <EventDescription />
          <EventReviews />
        </div>

        {/* Right Column: Ticket Card will go here */}
        <div className="lg:col-span-1">
          <div className="border rounded-2xl shadow-lg bg-white h-96 flex items-center justify-center">
            <p className="text-prussian_blue/50"></p>
          </div>
        </div>
      </div>
    </main>
  );
}
