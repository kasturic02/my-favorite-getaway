import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import roomImage from "@/assets/room-ocean-view.jpg";

const RoomShowcase = () => {
  const rooms = [
    {
      title: "Ocean View Suite",
      description: "Wake up to breathtaking ocean views in our spacious suite featuring a private balcony and luxury amenities.",
      price: "$399",
      features: ["Ocean View", "Private Balcony", "King Bed", "Luxury Bath"]
    },
    {
      title: "Beachfront Villa",
      description: "Direct beach access from your private villa with exclusive amenities and personalized service.",
      price: "$799",
      features: ["Beach Access", "Private Pool", "Butler Service", "Outdoor Shower"]
    },
    {
      title: "Garden Paradise Room",
      description: "Surrounded by tropical gardens, enjoy tranquility and nature from your elegant retreat.",
      price: "$299",
      features: ["Garden View", "Tropical Setting", "Queen Bed", "Natural Light"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Luxury Accommodations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each room and suite is thoughtfully designed to provide the perfect blend of comfort and elegance
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <Card key={index} className="resort-card overflow-hidden group hover:scale-105 transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={roomImage} 
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    From {room.price}/night
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
                
                <Button className="resort-button-primary w-full rounded-full font-medium">
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