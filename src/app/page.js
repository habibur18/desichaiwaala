import { Gallery } from "@/components/Gallery";
import Header from "@/components/Header";
import { SocialFeed } from "@/components/SocialFeed";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Clock, Coffee, Droplet, Facebook, Flame, Instagram, Leaf, Mail, MapPin, Music, Phone, Twitter, Wifi, Youtube } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-[80vh]">
        {/* Background Video */}
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="/action.MOV" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className={`${playfair.className} text-4xl md:text-6xl font-bold mb-6`}>
              Experience the Magic of
              <br />
              <span className="text-brand">Authentic Irani Chai</span>
            </h1>
            <a href="#menu" className="inline-block bg-brand text-dark px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
              Explore Our Menu
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators Marquee */}
      <div className="bg-brand/10 py-8 overflow-hidden">
        <div className="flex space-x-12 animate-slide-left hover:pause">
          {["Over 1000+ Happy Customers Daily", "Community Favorite Since 2010", "Authentic Recipe", "Hygiene Certified", "Award Winning Chai", "100% Customer Satisfaction"].map((text, i) => (
            <div key={i} className="flex items-center space-x-2 text-brand whitespace-nowrap">
              <Coffee className="h-5 w-5" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Improved Our Story Section */}
      <section id="about" className="py-20 bg-dark relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-8`}>Our Story</h2>
              <p className="text-lg leading-relaxed">Since 1974, Desi Chaiwaala has been brewing more than just chai; we&apos;ve been crafting experiences. Our journey began in a small corner of bustling Mumbai, where our founder&apos;s passion for authentic Irani chai sparked a revolution in every cup.</p>
              <p className="text-lg leading-relaxed">Today, we bring that same dedication to every sip, blending time-honored traditions with modern flair. Our chai isn&apos;t just just a beverage; it&apos;s a celebration of culture, community, and the art of taking a moment to savor life&apos;s simple pleasures.</p>
              <Button className="bg-brand text-dark hover:bg-brand/90 mt-4">
                Learn More About Us
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <video src="/ai-tea-making.mp4" autoPlay loop muted></video>
              <div className="absolute inset-0 bg-black bg-opacity-10 "></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark opacity-50"></div>
      </section>

      {/* What's in Our Chai? Section */}
      <section className="py-20 bg-brand/10">
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>What&apos;s in Our Chai? What&apos;s in Our Chai?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: "Premium Tea Leaves", description: "Hand-picked Assam leaves for robust flavor" },
              { icon: Droplet, title: "Fresh Milk", description: "Creamy, locally-sourced milk for perfect texture" },
              { icon: Flame, title: "Aromatic Spices", description: "A secret blend of cardamom, cinnamon, and more" },
            ].map((item, i) => (
              <Card key={i} className="bg-dark/50 border-brand/20 hover:border-brand transition-all hover:shadow-lg hover:shadow-brand/20">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <item.icon className="h-16 w-16 text-brand mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-brand">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-brand/10">
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>Our Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Classic Irani Chai",
                description: "Our signature blend of black tea, milk, and aromatic spices.",
                price: "$3.50",
                src: "/menu/Classic Irani Chai.webp",
              },
              {
                name: "Saffron Irani Chai",
                description: "Classic Irani chai infused with premium saffron threads.",
                price: "$4.50",
                src: "/menu/Saffron Irani Chai.jpg",
              },
              {
                name: "Cardamom Special",
                description: "A fragrant variation with extra cardamom for spice lovers.",
                price: "$4.00",
                src: "/menu/Cardamom Special.jpg",
              },
              {
                name: "Masala Chai",
                description: "Strong tea with our special blend of Indian spices.",
                price: "$3.75",
                src: "/menu/Masala Chai.webp",
              },
              {
                name: "Rose Irani Chai",
                description: "Delicate rose petals add a floral note to our classic chai.",
                price: "$4.25",
                src: "/menu/Rose Irani Chai.jpeg",
              },
              {
                name: "Adrak Chai",
                description: "Fresh ginger infused chai for extra warmth and flavor.",
                price: "$3.75",
                src: "/menu/Adrak Chai.jpeg",
              },
            ].map((item, i) => (
              <div key={i} className="bg-dark/80 backdrop-blur-sm rounded-lg overflow-hidden group">
                <div className="relative h-56">
                  <Image src={item.src} alt={item.name} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-brand">{item.name}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <p className="text-brand font-bold text-lg">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Gallery */}
      <Gallery />

      {/* Amenities Section */}
      <section className="py-16 bg-dark/90">
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>Complimentary Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Wifi, text: "Free High-Speed WiFi" },
              { icon: Music, text: "Ambient Music" },
              { icon: Coffee, text: "Unlimited Water" },
              { icon: Clock, text: "Extended Hours" },
            ].map((item, i) => (
              <Card key={i} className="bg-dark/50 border-brand/20 hover:border-brand transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <item.icon className="h-8 w-8 text-brand mb-4" />
                  <p className="text-white">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>Find Us Here</h2>
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36650.69945082895!2d51.368545587480035!3d35.71405034633432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0185a35e31c3%3A0xc4905716475e7321!2zQ2Fmw6kgQ2jDomk!5e0!3m2!1sbn!2sbd!4v1740050460275!5m2!1sbn!2sbd" width="100%" height="550" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      {/* Modern Visit Us Section */}
      <section id="contact" className="py-16 bg-dark relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className={`${playfair.className} text-4xl font-bold text-brand`}>Come Visit Us</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-brand" />
                  <p>123 Chai Street, Tea District, NY 10001</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-brand" />
                  <p>Open Daily • 6:00 AM - 11:00 PM</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-brand" />
                  <p>(123) 456-7890</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-brand" />
                  <p>hello@desichaiwaala.com</p>
                </div>
              </div>
              <Button className="bg-brand text-dark hover:bg-brand/90">
                Get Directions
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/offer-chai-to-community.avif" alt="Our Location" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <SocialFeed />

      {/* Social Media Section */}
      <section className="py-16 bg-dark/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12`}>Follow Our Journey</h2>
          <div className="flex justify-center space-x-8">
            {[
              { icon: Facebook, link: "#", label: "Facebook" },
              { icon: Instagram, link: "#", label: "Instagram" },
              { icon: Twitter, link: "#", label: "Twitter" },
              { icon: Youtube, link: "#", label: "YouTube" },
            ].map((social, i) => (
              <a key={i} href={social.link} className="group relative p-4 hover:animate-social-bounce" aria-label={social.label}>
                <div className="absolute inset-0 bg-brand rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
                <social.icon className="h-8 w-8 text-brand transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-dark py-6 border-t border-brand/20">
        <div className="container mx-auto text-center px-4">
          <div className=" relative mx-auto mb-4">
            <Image src="/Desi Chaiwaala Logo Design.svg" alt="Desi Chaiwaala Company Logo" width={300} height={300} className="object-contain mx-auto" />
          </div>
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Desi Chaiwaala Company. All rights reserved.</p>
        </div>
      </footer>
      {/* End of Footer */}
      <div>
        <Image src="/payments.png" width={500} height={100} alt="Payment Options" className="mx-auto pb-10" />
      </div>
    </div>
  );
}
