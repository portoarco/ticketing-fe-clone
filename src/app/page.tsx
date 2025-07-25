import EventListSection from "./components/EventListSection";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="">
      {/* Arco - start */}

      {/* Arco - end */}

      {/* Eky - start */}
      <Navbar />

      <HeroSection />
      <EventListSection />
      <FeaturesSection />
      <CTASection />

      {/* Eky - end */}
    </div>
  );
}
