import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-resort.jpg";

const ResortHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 resort-hero opacity-60" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          My Favorite Getaway
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light opacity-90 animate-fade-in">
          Escape to Paradise • Luxury Redefined • Unforgettable Moments
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            className="resort-button-primary px-8 py-4 text-lg font-medium rounded-full"
          >
            Book Your Stay
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="px-8 py-4 text-lg font-medium rounded-full bg-white/20 border-white/40 text-white backdrop-blur-sm hover:bg-white/30"
          >
            Explore Resort
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default ResortHero;