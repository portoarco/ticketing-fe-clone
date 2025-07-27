import { Button } from "@/components/ui/button";

export default function CTASection() {
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

          <Button className="relative group overflow-hidden rounded-full w-fit py-10 px-8 bg-white duration-400 shadow-md hover:scale-105 hover:bg-white cursor-pointer">
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
