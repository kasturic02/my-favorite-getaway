import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Image, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: 'Villas', count: 12, color: 'from-blue-500 to-blue-600' },
    { name: 'Common Areas', count: 8, color: 'from-green-500 to-green-600' },
    { name: 'Farms', count: 15, color: 'from-amber-500 to-amber-600' },
    { name: 'Nature Trail', count: 20, color: 'from-emerald-500 to-emerald-600' },
    { name: 'Lake', count: 10, color: 'from-cyan-500 to-cyan-600' },
  ];

  const reviews = [
    {
      name: 'Sarah Mitchell',
      rating: 5,
      review: 'Absolutely breathtaking! The nature trails were serene and the villa was luxurious. The organic farm experience was a highlight for our kids. We felt completely disconnected from the city chaos.',
      date: 'March 2024'
    },
    {
      name: 'Rajesh Kumar',
      rating: 5,
      review: 'The lakeside views from our villa were stunning. Staff was incredibly attentive and the farm-to-table dining experience was exceptional. Perfect getaway for families.',
      date: 'February 2024'
    },
    {
      name: 'Emily Chen',
      rating: 5,
      review: 'A hidden gem! The common areas are beautifully designed and the entire property is immaculate. Loved the morning walks through the nature trail and fresh produce from the farm.',
      date: 'January 2024'
    },
    {
      name: 'Michael Brown',
      rating: 5,
      review: 'Best resort experience ever! The combination of luxury accommodation and natural surroundings is perfect. The lake activities and organic farming tours made our stay memorable.',
      date: 'December 2023'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold">Virtual Tour Gallery</h1>
          <p className="text-muted-foreground mt-2">
            Explore our beautiful resort through photos
          </p>
        </div>
      </header>

      {/* Gallery Categories */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all"
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className={`h-48 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <Image className="h-20 w-20 text-white opacity-80 group-hover:scale-110 transition-transform" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {category.count} photos
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-8 p-6 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">{selectedCategory}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Close
              </Button>
            </div>
            <p className="text-muted-foreground">
              Photo gallery for {selectedCategory} coming soon...
            </p>
          </div>
        )}

        {/* Reviews Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What our Guests have to say</h2>
            <p className="text-muted-foreground">Hear from those who experienced the magic of our resort</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gallery;
