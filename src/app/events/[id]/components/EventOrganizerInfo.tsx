import Image from "next/image";

export default function EventOrganizerInfo({ event }: any) {
  return (
    <section className="pb-6 border-b">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-display text-2xl font-bold text-prussian-blue">
            {`Hosted by `}
            <span className="text-blue-green">
              {`${event.organizer.user.first_name} ${event.organizer.user.last_name}`}{" "}
            </span>
          </h2>
          <p className="text-prussian-blue/70 font-poppins text-sm">
            Organizer{" "}
          </p>
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
