import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Plan Your Escape
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to experience paradise? Get in touch with our resort specialists to plan your perfect getaway
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="resort-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-card-foreground">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">First Name</label>
                    <Input placeholder="Your first name" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-card-foreground">Last Name</label>
                    <Input placeholder="Your last name" className="rounded-xl" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">Email</label>
                  <Input type="email" placeholder="your.email@example.com" className="rounded-xl" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">Phone</label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" className="rounded-xl" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">Message</label>
                  <Textarea 
                    placeholder="Tell us about your dream vacation..." 
                    className="rounded-xl min-h-32"
                  />
                </div>
                
                <Button className="resort-button-primary w-full rounded-full text-lg py-3">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Resort Address</h4>
                    <p className="text-muted-foreground">123 Paradise Beach Drive<br />Tropical Island, TI 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) GETAWAY<br />+1 (555) 438-2929</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground">reservations@myfavoritegetaway.com<br />info@myfavoritegetaway.com</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="resort-card bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-3 text-card-foreground">Special Offers</h4>
                <p className="text-muted-foreground mb-4">
                  Book now and enjoy exclusive discounts on extended stays and premium amenities.
                </p>
                <Button className="resort-button-accent rounded-full">
                  View Offers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;