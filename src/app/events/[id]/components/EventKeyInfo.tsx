import { Calendar, MapPin } from "lucide-react";

export default function EventKeyInfo() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-b">
      <div className="flex items-start gap-4">
        <Calendar className="h-8 w-8 text-blue-green flex-shrink-0" />
        <div>
          <h3 className="font-bold text-prussian-blue">Date & Time</h3>
          <p className="text-prussian-blue/70 text-sm">
            Friday, December 15, 2024 <br /> 8:00 PM - 11:00 PM
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <MapPin className="h-8 w-8 text-blue-green flex-shrink-0" />
        <div>
          <h3 className="font-bold text-prussian-blue">Location</h3>
          <p className="text-prussian-blue/70 text-sm">
            The Underground <br /> 123 Main Street, Downtown
          </p>
          <a
            href="#"
            className="text-sm font-semibold text-blue-green hover:underline mt-1"
          >
            Show map
          </a>
        </div>
      </div>
    </section>
  );
}
