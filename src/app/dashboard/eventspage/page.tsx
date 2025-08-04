import CreateEventPage from "@/app/events/create/components/CreateEventForm";
import Dashboard from "../components/DashboardLayout";

function EventsPage() {
  return (
    <section>
      <Dashboard>
        {/* <p>This is manage events</p> */}

        <CreateEventPage />
      </Dashboard>
    </section>
  );
}
export default EventsPage;
