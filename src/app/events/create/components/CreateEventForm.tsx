"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarCheck,
  CalendarCheck2,
  Dot,
  Plus,
  PlusCircle,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { FaCalendarCheck, FaCircleCheck } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { apiCall } from "@/helper/apiCall";

import { Button } from "@/components/ui/button";

import { DateRange, isDateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import BasicInfoCard from "@/app/events/create/components/BasicInfoCard";
import DateAndLocationCard from "@/app/events/create/components/DateAndLocation";
import DescriptionCard from "@/app/events/create/components/Description";
import AddTicketsCard from "@/app/events/create/components/AddTicketsCard";
import { Promotion, TicketType } from "@/app/types/types";

export default function CreateEventForm() {
  const router = useRouter();

  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [ticketType, setTicketType] = useState<TicketType[]>([
    { id: 1, name: "", price: 0, quantity: 0 },
  ]);

  const [isFree, setIsFree] = useState(false);

  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const [addPromotion, setAddPromotion] = useState(false);

  const [eventType, setEventType] = useState("single");
  const [date, setDate] = useState<Date | DateRange | undefined>(undefined);
  const [startTime, setStarTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isComplete, setIsComplete] = useState(false);

  function handleImageChange(event: any) {
    if (!event.target.files[0]) return;
    const file = event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
  }

  useEffect(() => {
    const isAnySeatEmpty = Boolean(
      ticketType.find((item) => item.quantity < 1)
    );

    const isAnyFieldEmpty_ticketTypes = Boolean(
      ticketType.find(
        (item) => item.quantity < 1 || item.name.length < 1 || item.price < 1
      )
    );

    let isAny_Promotion_Fields_Filled = !Boolean(promotions.length > 0);

    if (promotions.length > 0) {
      const isPromotionsFieldEmpty = Boolean(
        promotions.find(
          (item) =>
            item.code.length < 1 ||
            item.discountPercentage < 1 ||
            item.expiryDate == undefined ||
            item.startDate == undefined
        )
      );
      isAny_Promotion_Fields_Filled = !isPromotionsFieldEmpty;
    }

    const is_AddTicketCards_Filled =
      (!isFree && !isAnyFieldEmpty_ticketTypes) || (isFree && !isAnySeatEmpty);

    if (
      title &&
      description &&
      is_AddTicketCards_Filled &&
      isAny_Promotion_Fields_Filled &&
      eventType &&
      date &&
      startTime &&
      endTime &&
      selectedCity &&
      address &&
      selectedCategory
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
    // console.log(isComplete);
  }, [
    isComplete,
    promotions,
    title,
    description,
    ticketType,
    eventType,
    date,
    startTime,
    endTime,
    selectedCity,
    address,
    selectedCategory,
  ]);

  const { token } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error("You must be logged in to create an event.");

      router.push("/");
      return;
    }

    setIsSubmitting(true);

    let startDateWithTime: Date | undefined;
    let endDateWithTime: Date | undefined;

    if (date) {
      const [startHours, startMinutes] = startTime.split(":").map(Number);
      const [endHours, endMinutes] = endTime.split(":").map(Number);

      if (eventType === "single" && date instanceof Date) {
        startDateWithTime = new Date(date);
        startDateWithTime.setHours(startHours, startMinutes);

        endDateWithTime = new Date(date);
        endDateWithTime.setHours(endHours, endMinutes);
      } else if (
        eventType === "multi" &&
        isDateRange(date) &&
        date.from &&
        date.to
      ) {
        startDateWithTime = new Date(date.from);
        startDateWithTime.setHours(startHours, startMinutes);

        endDateWithTime = new Date(date.to);
        endDateWithTime.setHours(endHours, endMinutes);
      }
    }

    const formData = {
      name: title,
      description: description,
      start_date: startDateWithTime,
      end_date: endDateWithTime,
      event_category_name: selectedCategory,
      city: selectedCity,
      address: address,
    };

    try {
      const data = new FormData();

      if (imageFile) {
        data.append("image", imageFile);
      }
      if (startDateWithTime)
        data.append("start_date", startDateWithTime.toISOString());
      if (endDateWithTime)
        data.append("end_date", endDateWithTime.toISOString());
      data.append("name", title);
      data.append("description", description);
      data.append("event_category_name", selectedCategory);
      data.append("city", selectedCity);
      data.append("address", address);

      data.append("tickets", JSON.stringify(ticketType));
      data.append("promotions", JSON.stringify(promotions));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await apiCall.post("/events", data, config);

      toast.success("Event created successfully!");

      router.push(`/events/${response.data.data.id}`);
    } catch (error: any) {
      console.error("Failed to create event:", error);

      toast.error("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit}
          className="container mx-auto max-w-3xl mt-15 space-y-5 "
        >
          <Card className="p-0 overflow-hidden  ring-2 ring-transparent border-0 border-transparent  transition-all duration-100 hover:ring-blue-green">
            <label htmlFor="imageInput" className="cursor-pointer">
              <CardContent className="p-0">
                <div></div>
                <div className="w-full h-96  flex items-center justify-center relative ">
                  <div className="w-full h-full absolute p-4 flex flex-col items-start justify-end font-poppins gap-0.5 font-light">
                    <p className="text-white text-xs z-40">
                      {imageFile && imageFile.name}
                    </p>
                    <p className="text-white text-xs z-40">
                      {imageFile &&
                        `${(imageFile.size / 1000 / 1000).toFixed(3)} MB`}
                    </p>
                    <p className="text-white text-xs z-40">
                      {imageFile && imageFile.type}
                    </p>
                  </div>
                  <div className="w-full h-full absolute bg-gradient-to-t from-prussian-blue/75  to-50% to-transparent   z-5 pointer-events-none"></div>
                  <Image
                    src={
                      imagePreview
                        ? imagePreview
                        : "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80"
                    }
                    fill
                    alt="Picture placeholder"
                    className={`z-0 object-cover transition-all hover:scale-105 duration-300 ease-in-out  ${
                      imagePreview ? "opacity-100" : "opacity-50  "
                    }`}
                  ></Image>
                  <div
                    className={`absolute top-3 right-3 bg-neutral-100 rounded-full p-1 ${
                      imagePreview ? "border-2" : ""
                    }`}
                  >
                    {imagePreview ? (
                      <>
                        <FaCircleCheck size={25} className="text-blue-green" />
                      </>
                    ) : (
                      <>
                        {" "}
                        <Plus size={25} className="text-blue-green" />
                      </>
                    )}
                  </div>
                  {imagePreview ? null : (
                    <>
                      <div className="p-4 bg-white rounded-lg text-blue-green flex flex-col items-center justify-center gap-4 border-transparent  border-2 z-10 relative">
                        <div
                          className={`bg-neutral-100 rounded-full p-4 transition-all  ${
                            imagePreview ? "" : " hover:scale-110 "
                          }`}
                        >
                          <Upload size={19}></Upload>
                        </div>
                        <span className="font-poppins text-center text-xs font-semibold leading-5">
                          Upload photo
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </label>
          </Card>
          {/* Hidden input */}
          <Input
            type="file"
            id="imageInput"
            className="hidden"
            onChange={handleImageChange}
            accept="image/png, image/jpeg"
          />
          {/* Event Title or Basic Info -- start */}
          <BasicInfoCard
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            title={title}
            setTitle={setTitle}
          />
          {/* Event Title or Basic Info -- end */}

          <DateAndLocationCard
            eventType={eventType}
            setEventType={setEventType}
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStarTime}
            endTime={endTime}
            setEndTime={setEndTime}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            address={address}
            setAddress={setAddress}
          />

          <DescriptionCard
            description={description}
            setDescription={setDescription}
          />

          <AddTicketsCard
            isFree={isFree}
            setIsFree={setIsFree}
            ticketType={ticketType}
            setTicketType={setTicketType}
            promotions={promotions}
            setPromotions={setPromotions}
            addPromotion={addPromotion}
            setAddPromotion={setAddPromotion}
            seats={seats}
            setSeats={setSeats}
            price={price}
            setPrice={setPrice}
          />
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              size="lg"
              disabled={!isComplete}
              className="font-poppins bg-blue-green"
            >
              {isSubmitting ? "Publishing..." : "Publish Event"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
