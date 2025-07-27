import { Library, Share2, Ticket } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className=" my-40 px-5 ">
      <div className="w-full  rounded-3xl container mx-auto">
        <div className="">
          <div className="flex flex-col items-center mb-[40px] gap-3 ">
            <h2 className="font-poppins font-[700] text-3xl text-prussian-blue">
              More Than a Ticket
            </h2>
            <p className="font-poppins text-prussian-blue/65 text-center">
              We build Webipsum to be the best place to discover and share
              experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 text-center justify-center items-center ">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-blue-green/20 rounded-xl flex items-center justify-center">
                <Library className="  text-blue-green" />
              </div>
              <h3 className="w-fit font-poppins font-[700] text-xl text-prussian-blue">
                All Events, One Place
              </h3>
              <p className="font-poppins text-prussian-blue/65">
                The most comprehensive collection of events in your area. Stop
                searching and start experiencing
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-selective-orange/20 rounded-xl flex items-center justify-center">
                <Ticket className=" -rotate-45 text-selective-orange" />
              </div>
              <h3 className="w-fit font-poppins font-[700]  text-xl text-prussian-blue">
                Seamless & Secure
              </h3>
              <p className="font-poppins text-prussian-blue/65">
                Get your digital tickets instantly. Secure payments and easy
                entry, every time.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-ut-orange/20 rounded-xl flex items-center justify-center">
                <Share2 className="  text-ut-orange" />
              </div>
              <h3 className="w-fit m font-poppins font-[700] text-xl text-prussian-blue">
                Connect & Share
              </h3>
              <p className="font-poppins text-prussian-blue/65">
                See who's going, invite friends, and share your favorite moments
                with the community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
