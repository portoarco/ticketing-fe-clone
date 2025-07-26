import EventCard from "@/components/EventCard";
import FilterSection from "./FilterSection";
import { EventCardProps } from "../types/types";

type Event = EventCardProps["event"];

export const eventData: Event[] = [
  {
    img: {
      src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80",
      alt: "A vibrant concert with a large crowd and stage lights",
    },
    day: "15",
    month: "Dec",
    category: "Music",
    title: "Indie Rock Night",
    location: "The Underground",
    price: 0,
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&q=80",
      alt: "A bartender carefully pouring a colorful cocktail",
    },
    day: "14",
    month: "Dec",
    category: "Food & Drink",
    title: "Cocktail Crafting",
    location: "Alchemist's Bar",
    price: 45,
    promo: { text: "20% OFF", color: "bg-ut-orange" },
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1558008258-3256797b43f3?w=400&q=80",
      alt: "A modern art gallery with abstract paintings on the wall",
    },
    day: "10",
    month: "Dec",
    category: "Art & Culture",
    title: "Metropolis Exhibit",
    location: "Modern Art Gallery",
    price: 0,
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
      alt: "A person doing a yoga pose on a rooftop at sunrise",
    },
    day: "16",
    month: "Dec",
    category: "Wellness",
    title: "Rooftop Yoga",
    location: "The Sky Terrace",
    price: 15,
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=80",
      alt: "A large conference hall with a speaker on stage",
    },
    day: "20",
    month: "Jan",
    category: "Tech",
    title: "AI & Design Conf",
    location: "Convention Center",
    price: 250,
    promo: { text: "Early Bird", color: "bg-ut-orange" },
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      alt: "A group of runners at the starting line of a marathon",
    },
    day: "23",
    month: "Dec",
    category: "Sports",
    title: "Community 5K Run",
    location: "Lakeside Park",
    price: 0,
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80",
      alt: "Professionals networking and talking at a business mixer event",
    },
    day: "20",
    month: "Dec",
    category: "Business",
    title: "Creative Mixer",
    location: "The Loft Co-work",
    price: 20,
  },
  {
    img: {
      src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
      alt: "A jazz band performing on a dimly lit stage",
    },
    day: "28",
    month: "Dec",
    category: "Music",
    title: "Jazz Fusion Night",
    location: "The Blue Note",
    price: 25,
    promo: { text: "Voucher", color: "bg-selective-orange" },
  },
];

export default function EventListSection() {
  return (
    <section className="mt-10 px-4 container mx-auto ">
      <FilterSection></FilterSection>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12 w-full">
        {eventData.map((item, index) => (
          <EventCard event={item} key={index} />
        ))}
      </div>
    </section>
  );
}
