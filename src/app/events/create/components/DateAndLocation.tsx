"use client";
import TimePicker from "@/components/TimePicker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiCall } from "@/helper/apiCall";
import {
  Calendar1,
  CalendarIcon,
  CalendarRange,
  Dot,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange, isDateRange } from "react-day-picker";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCalendarCheck, FaCircleCheck } from "react-icons/fa6";

interface DateAndLocationProps {
  eventType: string;
  setEventType: (value: string) => void;
  date: Date | DateRange | undefined;
  setDate: (value: Date | DateRange | undefined) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
}

export default function DateAndLocationCard({
  eventType,
  setEventType,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedCity,
  setSelectedCity,
  address,
  setAddress,
}: DateAndLocationProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<any[]>([]);

  async function getCities() {
    try {
      setIsLoading(true);
      const res = await apiCall.get("/events/locations/");
      setCities(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  const isComplete = date && selectedCity && address;

  useEffect(() => {
    if (parseInt(startTime.split(":")[0]) > parseInt(endTime.split(":")[0])) {
      setEndTime(`${parseInt(startTime.split(":")[0]) + 1}:00`);
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (date) {
      if (eventType === "single" && isDateRange(date)) {
        setDate(date.from || undefined);
      } else if (eventType === "multi" && date instanceof Date) {
        setDate({ from: date, to: date });
      }
    }
  }, [eventType]);

  const formatTime = (timeStr: string) => {
    const [hourStr] = timeStr.split(":");
    const hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}${ampm}`;
  };

  return (
    <Card
      onClick={() => !isEditing && setIsEditing(true)}
      aria-disabled={isEditing}
      className="p-0 overflow-hidden border-0 ring-transparent ring-2 transition-all duration-100 hover:ring-blue-green cursor-pointer"
    >
      <CardContent className="p-0">
        <div className="w-full relative py-10">
          <button
            type="button"
            onClick={(e) => {
              if (isEditing) {
                e.stopPropagation();
                setIsEditing(false);
              }
            }}
            className="absolute top-3 right-3 bg-neutral-100 rounded-full p-1 z-10"
          >
            {isComplete && !isEditing ? (
              <FaCircleCheck size={25} className="text-blue-green" />
            ) : (
              <Plus
                size={25}
                className={`text-blue-green transition-all ${
                  isEditing
                    ? "rotate-45 text-prussian-blue/60 hover:text-ut-orange hover:scale-120"
                    : ""
                }`}
              />
            )}
          </button>

          {isEditing ? (
            <div className="w-full grid  grid-cols-1 cursor-default">
              <div className="flex flex-col gap-5  px-10 ">
                <h1 className="font-poppins font-semibold text-2xl text-prussian-blue">
                  Date and Location
                </h1>
                <div className="flex flex-col pt-4 pb-5 px-5 border rounded-sm ">
                  <RadioGroup
                    defaultValue="single"
                    value={eventType}
                    onValueChange={(newType) => {
                      setEventType(newType);

                      if (date) {
                        if (newType === "single" && isDateRange(date)) {
                          setDate(date.from || undefined);
                        } else if (
                          newType === "multi" &&
                          date instanceof Date
                        ) {
                          setDate({ from: date, to: date });
                        }
                      }
                    }}
                    className="data-[state=checked]:text-white "
                  >
                    <h2 className="font-poppins font-semibold text-lg text-prussian-blue/90 mb-1">
                      Type Event
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 font-poppins text-prussian-blue">
                      <label htmlFor="s1" className="cursor-pointer">
                        <div
                          className={`p-5 grid grid-cols-[auto_1fr_auto] gap-5 justify-center items-center rounded-md border  hover:ring-blue-green ring-2 ring-transparent transition-all  ${
                            eventType == "single"
                              ? "border-blue-green"
                              : "border-prussian-blue/80 "
                          }`}
                        >
                          <Calendar1 className="text-prussian-blue/80" />
                          <p className="font-semibold text-prussian-blue/80">
                            Single Event
                          </p>
                          <RadioGroupItem
                            value="single"
                            className="data-[state=checked]:bg-blue-green"
                            id="s1"
                          ></RadioGroupItem>
                        </div>
                      </label>
                      <label htmlFor="m2" className="cursor-pointer">
                        <div
                          className={`p-5 grid grid-cols-[auto_1fr_auto] justify-center items-center gap-5  rounded-md  border hover:ring-blue-green ring-2 ring-transparent transition-all  ${
                            eventType == "multi"
                              ? "border-blue-green"
                              : "border-prussian-blue/80 "
                          } `}
                        >
                          <CalendarRange className="text-prussian-blue/80" />
                          <p className="font-semibold text-prussian-blue/80 ">
                            Recurring event
                          </p>
                          <RadioGroupItem
                            value="multi"
                            className=" data-[state=checked]:bg-blue-green"
                            id="m2"
                          ></RadioGroupItem>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col mt-2 ">
                      <div>
                        <h2 className="font-poppins font-semibold text-lg text-prussian-blue/90  mb-2">
                          Date and time
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-[1fr_0.5fr_0.5fr]  gap-5">
                        <div className="col-span-3 md:col-span-1">
                          <label
                            htmlFor="date"
                            className="px-2 font-poppins text-xs text-prussian-blue"
                          >
                            Date
                          </label>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full  justify-start text-left font-normal rounded-sm border-prussian-blue/80 text-prussian-blue/80 font-poppins placeholder:font-poppins"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {(() => {
                                  if (!date) {
                                    return "Select date and time";
                                  }
                                  if (isDateRange(date)) {
                                    if (date.from && date.to) {
                                      return `${date.from.toLocaleDateString()} - ${date.to.toLocaleDateString()}`;
                                    }
                                    return "Select a date range";
                                  }

                                  return (
                                    <>
                                      {`${(
                                        date as Date
                                      ).toLocaleDateString()} `}
                                    </>
                                  );
                                })()}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto  border-blue-green border-2 "
                              align="start"
                            >
                              {eventType === "single" ? (
                                <Calendar
                                  className="text-prussian-blue font-poppins "
                                  mode="single"
                                  selected={date as Date}
                                  captionLayout="dropdown"
                                  onSelect={(date) => {
                                    if (date) {
                                      setDate(
                                        isDateRange(date)
                                          ? (date.from as Date)
                                          : (date as Date)
                                      );
                                      setOpen(false);
                                    }
                                  }}
                                />
                              ) : (
                                <Calendar
                                  className="text-prussian-blue font-poppins "
                                  mode="range"
                                  selected={date as DateRange}
                                  captionLayout="dropdown"
                                  onSelect={(date) => {
                                    if (date) setDate(date as DateRange);
                                  }}
                                />
                              )}
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div>
                          <label
                            htmlFor="startTime"
                            className="px-2 font-poppins text-xs text-prussian-blue"
                          >
                            Start time
                          </label>
                          <TimePicker
                            value={startTime}
                            onChange={setStartTime}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="endTime"
                            className="px-2 font-poppins text-xs text-prussian-blue"
                          >
                            End time
                          </label>
                          <TimePicker value={endTime} onChange={setEndTime} />
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              {/* <div className=" w-[50%] h-[1px]  bg-neutral-300 m-auto"></div> */}
              <div className="flex flex-col gap-2 pt-5 px-15 ">
                <h2 className="font-poppins font-semibold text-lg text-prussian-blue/90 ">
                  Location
                </h2>
                <div className="grid grid-cols-2 items-center justify-center  gap-2 font-poppins">
                  <div>
                    <label
                      htmlFor="city"
                      className="px-1 font-poppins text-prussian-blue text-xs"
                    >
                      City
                    </label>
                    <Select
                      value={selectedCity}
                      onValueChange={(e) => setSelectedCity(e)}
                    >
                      <SelectTrigger className="w-full rounded-sm font-poppins text-prussian-blue border-prussian-blue/80 focus-visible:!ring-blue-green">
                        <SelectValue
                          placeholder={
                            isLoading ? "Loading..." : "Select a City"
                          }
                          className="font-poppins text-prussian-blue placeholder:font-poppins"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white font-poppins border-2 border-blue-green">
                        <SelectGroup>
                          {!isLoading &&
                            cities.map((city: any, index: number) => (
                              <SelectItem key={index} value={city.city}>
                                {city.city}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="px-1 font-poppins text-prussian-blue text-xs"
                    >
                      Address
                    </label>
                    <Input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="rounded-sm font-poppins text-prussian-blue border-prussian-blue/80 focus-visible:!ring-blue-green  focus-visible:!ring-2"
                    ></Input>
                  </div>
                </div>
                <div className=" w-full h-[1px]  bg-neutral-300 mt-2.5  m-auto"></div>
              </div>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
              <div className="flex flex-col gap-5 pb-5 px-10 md:py-0 ">
                <h1 className="font-poppins font-semibold text-2xl text-prussian-blue">
                  Date & Time
                </h1>
                <div className="flex items-center gap-2 font-poppins">
                  <FaCalendarCheck className="text-blue-green" />
                  <span className="text-xs font-semibold text-blue-green flex items-center">
                    {(() => {
                      if (!date) {
                        return "Select date and time";
                      }

                      if (isDateRange(date)) {
                        if (date.from && date.to) {
                          const fromDate = date.from.toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" }
                          );
                          const toDate = date.to.toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          });
                          const dateRangeString = `${fromDate} - ${toDate}`;

                          return (
                            <>
                              {dateRangeString}
                              <Dot size={20} />
                              {`${formatTime(startTime)} - ${formatTime(
                                endTime
                              )}`}
                            </>
                          );
                        }

                        return "Select a valid date range";
                      }

                      return (
                        <>
                          {`${(date as Date).toLocaleDateString(undefined, {
                            weekday: "long",
                          })}, ${(date as Date).toLocaleDateString(undefined, {
                            month: "long",
                          })} ${(date as Date).getDate()} `}
                          <Dot size={20} />
                          {`${formatTime(startTime)} - ${formatTime(endTime)}`}
                        </>
                      );
                    })()}
                  </span>
                </div>
              </div>
              <div className=" w-[50%] h-[1px] md:w-[1px] md:h-[50%] bg-neutral-300 m-auto"></div>
              <div className="flex flex-col gap-5 pt-5 px-10 md:py-0">
                <h1 className="font-poppins font-semibold text-2xl text-prussian-blue">
                  Location
                </h1>
                <div className="flex items-center gap-2 font-poppins">
                  <FaMapMarkedAlt className="text-blue-green" />
                  <span className="text-xs font-semibold text-blue-green">
                    {selectedCity && address
                      ? `${address}, ${selectedCity}`
                      : "Enter a location"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
