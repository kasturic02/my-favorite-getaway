import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Image } from 'lucide-react';
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
      </main>
    </div>
  );
};

export default Gallery;
