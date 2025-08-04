"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiCall } from "@/helper/apiCall";
import { Plus, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export default function BasicInfoCard({
  title,
  setTitle,
  selectedCategory,
  setSelectedCategory,
}: {
  title: any;
  setTitle: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  async function getCategories() {
    try {
      setIsLoading(false);
      const res = await apiCall.get("/events/categories/");
      setCategories(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Card
        onClick={() => setIsEditing(true)}
        aria-disabled={isEditing}
        className="p-0 overflow-hidden border-0   ring-transparent  space-y-3 ring-2 transition-all duration-100 hover:ring-blue-green"
      >
        <CardContent className="p-0 transition-all">
          <div className="w-full   flex flex-col  gap-5  relative p-10">
            <button
              type="button"
              onClick={
                !isEditing
                  ? () => null
                  : (e) => {
                      console.log("tesetes");
                      e.stopPropagation();
                      setIsEditing(false);
                    }
              }
              className={`absolute top-3 right-3 bg-neutral-100 rounded-full p-1 `}
            >
              {title && selectedCategory && !isEditing ? (
                <>
                  <FaCircleCheck
                    size={25}
                    className={`text-blue-green transition-all ${
                      isEditing ? "scale-50" : "scale-100"
                    } `}
                  />
                </>
              ) : (
                <>
                  <Plus
                    size={25}
                    className={`text-blue-green transition-all  ${
                      isEditing
                        ? "rotate-45 text-prussian-blue/60 hover:text-ut-orange hover:scale-120 "
                        : ""
                    } `}
                  />
                </>
              )}
            </button>
            {isEditing ? (
              <>
                <label htmlFor="event-title">
                  <h2
                    className={`font-poppins  font-semibold  text-lg  text-prussian-blue/90 ${
                      isEditing ? "" : ""
                    } `}
                  >
                    Event Title
                  </h2>
                </label>
                <div>
                  <Input
                    id="event-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-sm font-poppins text-prussian-blue border-prussian-blue/80 focus-visible:!ring-blue-green focus-visible:!ring-2"
                    placeholder="Type your event title here..."
                  ></Input>
                  <p className="text-xs font-poppins  text-prussian-blue/80 mt-1.5 ml-3">
                    Max 75 characters
                  </p>
                  <label htmlFor=""></label>
                </div>
                <label htmlFor="categories">
                  <h2 className="font-poppins text-lg font-semibold   text-prussian-blue/90 ">
                    Category
                  </h2>
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={(e) => setSelectedCategory(e)}
                >
                  <SelectTrigger className="w-full rounded-sm font-poppins text-prussian-blue border-prussian-blue/80 focus-visible:!ring-blue-green">
                    <SelectValue
                      placeholder={
                        isLoading ? "Loading..." : "Select a Category"
                      }
                      className="font-poppins text-prussian-blue placeholder:font-poppins"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-poppins border-2 border-blue-green">
                    <SelectGroup>
                      {!isLoading &&
                        categories.map((category: any, index: number) => (
                          <SelectItem key={index} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            ) : (
              <>
                <label htmlFor="event-title">
                  <h1 className="font-display font-extrabold text-5xl text-prussian-blue">
                    {title ? title : "Event title"}
                  </h1>
                </label>
                <h2 className="text-blue-green font-poppins font-semibold">
                  {selectedCategory ? selectedCategory : "Event's category"}
                </h2>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
