import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import cabinImage from "@/assets/cabin-lakeside.jpg";
import villaImage from "@/assets/villa-hillside.jpg";
import luxuryCabinImage from "@/assets/luxury-cabin-suite.jpg";

const RoomShowcase = () => {
  const navigate = useNavigate();
  
  const accommodations = [
    {
      title: "Lakeside Cabin",
      description: "Cozy wooden cabin with stunning lake views, perfect for intimate getaways with rustic charm and modern amenities.",
      price: "$250",
      capacity: "2 People",
      image: cabinImage,
      features: ["Lake View", "Fireplace", "Private Deck", "Kitchenette"],
      roomTypeValue: "lakeside-cabin"
    },
    {
      title: "Family Villa",
      description: "Spacious hillside villa overlooking rolling meadows, ideal for families seeking comfort and nature immersion.",
      price: "$450", 
      capacity: "4 People",
      image: villaImage,
      features: ["Hill View", "Full Kitchen", "Multiple Bedrooms", "Garden Access"],
      roomTypeValue: "hillside-villa"
    },
    {
      title: "Luxury Cabin Suite",
      description: "Premium lakefront accommodation with enhanced amenities, perfect for small groups seeking upscale rustic elegance.",
      price: "$350",
      capacity: "3 People", 
      image: luxuryCabinImage,
      features: ["Panoramic Lake View", "Hot Tub", "Premium Furnishing", "Room Service"],
      roomTypeValue: "luxury-cabin-suite"
    }
  ];

  const handleReserveClick = (roomTypeValue: string) => {
    navigate('/reservations', { state: { roomType: roomTypeValue } });
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Luxury Accommodations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our collection of rustic cabins and hillside villas, each designed for different group sizes and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {accommodations.map((room, index) => (
            <Card key={index} className="resort-card overflow-hidden group hover:scale-105 transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    From {room.price}/night
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {room.capacity}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-card-foreground">{room.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{room.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.features.map((feature, idx) => (
                    <span key={idx} className="text-sm text-accent flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Button 
                  className="resort-button-primary w-full rounded-full font-medium"
                  onClick={() => handleReserveClick(room.roomTypeValue)}
                >
                  Reserve Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomShowcase;