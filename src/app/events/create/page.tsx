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
import { FaCalendarCheck } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { apiCall } from "@/helper/apiCall";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { da, is } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import BasicInfoCard from "./components/BasicInfoCard";
import DateAndLocation from "./components/DateAndLocation";
import DescriptionCard from "./components/Description";
import AddTicketsCard from "./components/AddTicketsCard";
import { DateRange, isDateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState(0);
  const [eventType, setEventType] = useState("single");
  const [date, setDate] = useState<Date | DateRange | undefined>(undefined);
  const [startTime, setStarTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // console.log(title);
    if (
      title &&
      description &&
      seats &&
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
    title,
    description,
    price,
    seats,
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
      // Optional: redirect to login
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
      price: price,
      //   availableSeats: seats,
      start_date: startDateWithTime,
      end_date: endDateWithTime,
      event_category_name: selectedCategory, // Send the name
      city: selectedCity,
      address: address,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Don't forget to include the auth token!
      // Your apiCall helper should handle this automatically.
      const response = await apiCall.post("/events", formData, config);

      toast.success("Event created successfully!");

      router.push(`/events/${response.data.data.id}`);
    } catch (error: any) {
      console.error("Failed to create event:", error);
      // In a real app, you'd show a user-friendly error toast here
      toast.error("Failed to create event");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit}
          className="container mx-auto max-w-3xl mt-28 space-y-5 "
        >
          <Card className="p-0 overflow-hidden  ring-2 ring-transparent border-0 border-transparent  transition-all duration-100 hover:ring-blue-green">
            <CardContent className="p-0">
              <div></div>
              <div className="w-full h-96  flex items-center justify-center relative">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80"
                  }
                  fill
                  alt="Picture placeholder"
                  className="z-0 object-cover opacity-50"
                ></Image>
                <div className="absolute top-3 right-3 bg-neutral-100 rounded-full p-1 ">
                  <Plus size={25} className="text-blue-green" />
                </div>
                <div className="p-4 bg-white rounded-lg text-blue-green flex flex-col items-center justify-center gap-4 border-transparent  border-2 z-10 relative">
                  <div className="bg-neutral-100 rounded-full p-4">
                    <Upload size={19}></Upload>
                  </div>
                  <span className="font-poppins text-center text-xs font-semibold leading-5">
                    Upload photo
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Title or Basic Info -- start */}
          <BasicInfoCard
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            title={title}
            setTitle={setTitle}
          />
          {/* Event Title or Basic Info -- end */}

          <DateAndLocation
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
            price={price}
            seats={seats}
            setPrice={setPrice}
            setSeats={setSeats}
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
