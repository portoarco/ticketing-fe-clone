import EventListSection from "./components/EventListSection";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import Navbar from "@/components/NavBar";
import Divider from "@/components/Divider";

export default function Home() {
  return (
    <div className="">
      {/* Arco - start */}

      {/* Arco - end */}

      {/* Eky - start */}
      <Navbar />

      <HeroSection />
      <Divider variant="arrow" />
      <EventListSection />
      <FeaturesSection />
      <CTASection />
      <Divider variant="circles" />

      {/* Eky - end */}
    </div>
  );
}
