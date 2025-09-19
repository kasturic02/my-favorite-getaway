import { Card, CardContent } from "@/components/ui/card";
import natureImage from "@/assets/nature-trails.jpg";
import farmImage from "@/assets/organic-farm.jpg";

const AmenitiesSection = () => {
  const amenities = [
    {
      title: "Nature Trails & Bird Watching", 
      description: "Explore miles of scenic hiking trails through lush forests and meadows, perfect for bird watching and wildlife photography.",
      image: natureImage,
      highlights: ["Guided Hikes", "Bird Watching", "Photography Tours", "Wildlife Spotting"]
    },
    {
      title: "Organic Farm & Fresh Dining",
      description: "Experience farm-to-table dining with fresh organic produce from our on-site farm, plus hands-on farm activities.",
      image: farmImage, 
      highlights: ["Farm Tours", "Animal Petting", "Fresh Produce", "Cooking Classes"]
    }
  ];

  const features = [
    { icon: "🚣", title: "Lake Activities", desc: "Boating, kayaking, and fishing on pristine waters" },
    { icon: "🍺", title: "In-House Brewery", desc: "Craft beer made with local ingredients and spring water" },
    { icon: "🏓", title: "Indoor Games", desc: "Bowling alley, ping pong, and cozy game rooms" },
    { icon: "🏸", title: "Outdoor Sports", desc: "Badminton courts and nature-based activities" }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Farm & Nature Amenities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in nature with our comprehensive range of outdoor adventures and farm experiences
          </p>
        </div>

        {/* Featured Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {amenities.map((amenity, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <img 
                  src={amenity.image} 
                  alt={amenity.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-foreground">{amenity.title}</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{amenity.description}</p>
              
              <div className="grid grid-cols-2 gap-3">
                {amenity.highlights.map((highlight, idx) => (
                  <span key={idx} className="text-sm bg-accent/10 text-accent px-3 py-2 rounded-full text-center">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="resort-card text-center p-6 hover:scale-105 transition-all duration-300">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-card-foreground">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;