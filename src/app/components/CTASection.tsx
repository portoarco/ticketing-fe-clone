"use client";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/helper/apiCall";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const route = useRouter();

  const handlerCreateEvent = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Anda harus login dulu untuk create event");
      route.replace("/login");
      return;
    }

    const confirmation = confirm("Are You Sure?");
    if (!confirmation) return;

    try {
      const res = await apiCall.post(
        "/auth/register-organizer",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Berhasil Terdaftar");
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ isNew: boolean }>;

      const status = err.response?.data.isNew;
      if (status === false) {
        alert("Anda sudah terdaftar sebagai organizer");
        route.replace("/dashboard");
      }

      if (!err) {
        alert("There is something wrong!");
      }
    }
  };

  return (
    <section className=" px-5 ">
      <div className="container transition-all py-15 bg-gradient-to-r from-blue-green via-[#899262] to-ut-orange rounded-3xl mx-auto flex items-center justify-center shadow-md ">
        <div className="flex-col flex gap-5 justify-center items-center mx-5">
          <h2 className="text-4xl font-poppins text-white font-bold text-center">
            Have an Idea for an Event?
          </h2>
          <p className="font-poppins text-prussian-blue max-w-2xl text-center">
            Share your passion with the world. Our platform gives you the tools
            to create, manage, and promote your events effortlessly.
          </p>

          <Button
            className="relative group overflow-hidden rounded-full w-fit py-10 px-8 bg-white duration-400 shadow-md hover:scale-105 hover:bg-white cursor-pointer"
            onClick={handlerCreateEvent}
          >
            <span className="text-blue-green font-bold text-[16px] font-poppins whitespace-pre-line">
              {"Become an Event Organizer"}
            </span>
            <div className="absolute inset-0 bg-blue-green/0 pointer-events-none group-hover:bg-blue-green/15 transition-colors duration-400"></div>
          </Button>
        </div>
      </div>
    </section>
  );
}
