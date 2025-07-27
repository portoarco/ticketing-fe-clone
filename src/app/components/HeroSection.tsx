"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ISlideData } from "../types/types";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const slidesData: ISlideData[] = [
  {
    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    alt: "A concert crowd with lights and a performer on stage",
    headline: "Feel The Music.",
    subheadline:
      "From sold-out arenas to intimate underground venues, discover \nthe soundtrack to your next great night out.",
  },
  {
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    alt: "A person doing a yoga pose on a rooftop overlooking a city",
    headline: "Find Your Center.",
    subheadline:
      "Disconnect from the noise. Join workshops and wellness\n retreats that align your body and mind.",
  },
  {
    img: "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=2071&auto=format&fit=crop",
    alt: "A brightly lit, modern art gallery with colorful exhibits",
    headline: "Explore Creativity.",
    subheadline:
      "Immerse yourself in a world of culture. Find inspiring art\n exhibitions, gallery openings, and creative workshops.",
  },
  {
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop",
    alt: "A bartender crafting a colorful cocktail in a stylish glass",
    headline: "Savor The Moment.",
    subheadline:
      "Taste something new. From exclusive food festivals to\n pop-up restaurants, a world of flavor awaits.",
  },
];

export default function HeroSection() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section className="flex justify-center relative  px-4 sm:px-8">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
        className="w-full h-fit max-h-[855px] md:max-h-[750px]  bg-ut-orange rounded-b-3xl overflow-hidden transition-all"
      >
        <CarouselContent className=" h-[80vh] md:h-[70vh] ">
          {slidesData.map((data, index) => (
            <CarouselItem className="relative" key={index}>
              <Image
                src={data.img}
                alt={data.alt}
                fill
                className="object-cover"
              ></Image>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 p-8 md:py-13 md:px-20 flex flex-col justify-end items-start text-white">
                <h1 className="font-display text-5xl md:text-6xl font-bold mb-2 md:mb-4 tracking-tight text-shadow-lg lg:text-7xl">
                  {data.headline}
                </h1>
                <p className="font-display mb-5 text-sm whitespace-pre-line md:text-xl">
                  {data.subheadline}
                </p>
                <Button
                  size="lg"
                  className="bg-selective-orange text-prussian-blue hover:bg-selective-orange/90 rounded-4xl px-8 py-7 font-[1000] text-lg font-display "
                >
                  Explore Experiences
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-50 bg-white/70 backdrop-blur-sm border-0 md:top-1/2 left-4 z-10" />
        <CarouselNext className="absolute top-50 bg-white/70 backdrop-blur-sm border-0   md:top-1/2 right-4 z-10" />
      </Carousel>
    </section>
  );
}
