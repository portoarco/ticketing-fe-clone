export interface EventCardProps {
  event: {
    img: { src: string; alt: string };
    day: string;
    month: string;
    title: string;
    location: string;
    price: number;
    category: string;
    promo?: { text: string; color: "bg-ut-orange" | "bg-selective-orange" };
  };
}

export interface ISlideData {
  img: string;
  alt: string;
  headline: string;
  subheadline: string;
}
