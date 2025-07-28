import Image from "next/image";

export default function EventOrganizerInfo() {
  return (
    <section className="pb-6 border-b">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-display text-2xl font-bold text-prussian-blue">
            Hosted by The Underground
          </h2>
          <p className="text-prussian-blue/70">Venue </p>
        </div>
        <Image
          src="https://i.pravatar.cc/60?img=1"
          alt="Host avatar"
          width={56}
          height={56}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
