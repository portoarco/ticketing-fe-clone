import Navbar from "@/components/NavBar";
import EventDetailPage from "../events/[id]/page";

export default function TempEventDetail() {
  return (
    <div>
      <Navbar />
      <EventDetailPage />
    </div>
  );
}
