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

export interface IParams {
  params: { id: string };
}

export type TicketType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export interface TicketsCardProps {
  isFree: boolean;
  setIsFree: (value: boolean) => void;
  ticketType: TicketType[];
  setTicketType: (value: TicketType[]) => void;
  promotions: Promotion[];
  setPromotions: (value: Promotion[]) => void;
  addPromotion: boolean;
  setAddPromotion: (value: boolean) => void;
}

export type Promotion = {
  id: number;
  code: string;
  discountPercentage: number;
  startDate: Date | undefined;
  expiryDate: Date | undefined;
};
