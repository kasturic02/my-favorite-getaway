import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Reservations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedRoomType = location.state?.roomType || "";
  
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    guests: "",
    roomType: preSelectedRoomType
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.contact || !formData.guests || !formData.roomType || !checkIn || !checkOut) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { error } = await supabase
        .from('Reservations')
        .insert({
          'Full Name': formData.name,
          'Email Address': formData.email,
          'Contact Number': parseFloat(formData.contact),
          'Number of Guests': parseFloat(formData.guests),
          'Room Type': formData.roomType,
          'check in date': checkIn.toISOString().split('T')[0],
          'check out date': checkOut.toISOString().split('T')[0]
        });

      if (error) {
        toast.error("Failed to submit reservation. Please try again.");
        console.error('Supabase error:', error);
        return;
      }

      toast.success("Reservation submitted successfully! We'll contact you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        guests: "",
        roomType: ""
      });
      setCheckIn(undefined);
      setCheckOut(undefined);
    } catch (error) {
      toast.error("Failed to submit reservation. Please try again.");
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Reserve Your Stay</h1>
            <p className="text-lg text-muted-foreground">
              Book your perfect farmside lakeside getaway experience
            </p>
          </div>

          {/* Reservation Form */}
          <div className="bg-card rounded-2xl shadow-lg p-8 border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Personal Information</h3>
                
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email address"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Number *</Label>
                  <Input
                    id="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => handleInputChange("contact", e.target.value)}
                    placeholder="Enter your contact number"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Booking Details</h3>
                
                <div>
                  <Label htmlFor="guests">Number of Guests *</Label>
                  <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="roomType">Room Type *</Label>
                  <Select value={formData.roomType} onValueChange={(value) => handleInputChange("roomType", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lakeside-cabin">Lakeside Cabin (2 People) - $250/night</SelectItem>
                      <SelectItem value="luxury-cabin-suite">Luxury Cabin Suite (3 People) - $350/night</SelectItem>
                      <SelectItem value="hillside-villa">Hillside Villa (4 People) - $450/night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Check-in Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : <span>Select check-in date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Check-out Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : <span>Select check-out date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full resort-button-primary py-4 text-lg font-medium rounded-full"
                >
                  Submit Reservation Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;