import ResortHero from "@/components/ResortHero";
import RoomShowcase from "@/components/RoomShowcase";
import AmenitiesSection from "@/components/AmenitiesSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ResortHero />
      <RoomShowcase />
      <AmenitiesSection />
      <ContactSection />
    </div>
  );
};

export default Index;
