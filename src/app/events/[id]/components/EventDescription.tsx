export default function EventDescription({ event }: any) {
  return (
    <section className="py-8 border-b">
      <h2 className="font-display text-2xl font-bold text-prussian-blue mb-4">
        About this event
      </h2>
      <div className="space-y-4 text-prussian-blue/80 font-poppins leading-relaxed">
        <p>{event.description}</p>
        {/* <p>
          This is more than a concert; it's a gathering of music lovers and a
          celebration of authentic sound. Our venue offers a state-of-the-art
          sound system and an intimate atmosphere, ensuring you get the best
          possible live music experience.
        </p> */}
      </div>
    </section>
  );
}
