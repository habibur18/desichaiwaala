import { Gallery } from "@/components/Gallery";
import Header from "@/components/Header";
import { SamosaVideoSection } from "@/components/samosa-video-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Clock, Coffee, Droplet, Flame, Leaf, Mail, Music, Phone, Wifi } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default async function Home() {
  const res = await fetch("http://desichaiwaala.ca/api/menu", { cache: "no-store" });
  const data = await res.json();
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
            <h1 className={` text-4xl md:text-6xl font-bold mb-6`}>
              Experience the Magic of
              <br />
              <span className="text-brand">Authentic Hyderabadi Irani Chai</span>
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
              <p className="text-lg leading-relaxed">From the streets of Hyderabad to the heart of Toronto, Desi Chaiwaala brings you the authentic taste of Irani chai, crispy samosas, and flaky puffs. Inspired by the charm of Charminar and the warmth of Indian tea culture, we’re here to serve comfort in every sip and crunch in every bite. Whether you stop by after namaz or for a friendly chat, you’ll always find a little piece of home here.</p>
              <Button className="bg-brand text-dark hover:bg-brand/90 mt-4">
                Learn More About Us
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-[500px] max-w-[600px] rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-full">
                <video src={"/samosa.MOV" || "/placeholder.svg"} controls autoPlay muted playsInline className="object-cover w-full h-full" loop />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark opacity-50"></div>
      </section>

      {/* What's in Our Chai? Section */}
      <section className="py-20 bg-brand/10">
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>What&apos;s in Our Chai?</h2>
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
          <Card className="bg-dark/50 border-brand/20 col-span-3 mt-8 hover:border-brand transition-all hover:shadow-lg hover:shadow-brand/20">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Coffee className="h-16 w-16 text-brand mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-brand">Hyderabadi slang</h3>
              <p className="text-gray-300"> Kya Yaro Ajao Chai Pine</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bulk Orders Section */}
      <section id="bulk-orders" className="py-20  relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image/Visual Representation */}
            <div className="relative h-[400px] max-w-[600px] rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="relative w-full h-full">
                <Image src="/Cardamom-Latte-scaled.webp" width={600} height={400} alt="Event with chai" className="object-cover w-full h-full" />
              </div>
            </div>
            {/* Text and description */}
            <div className="space-y-6">
              <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-8`}>Bulk Orders for Events</h2>
              <p className="text-lg leading-relaxed">Planning an event? Let us take care of your chai and snacks! From birthdays to corporate events, we offer bulk orders tailored to your needs, ensuring a delicious experience that everyone will enjoy.</p>
              <p className="text-lg leading-relaxed">Whether it’s a small gathering or a large celebration, our team will help you plan the perfect menu for your special occasion.</p>
              <a href="tel:1234567890" className="inline-block bg-brand text-dark px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
                <span className="flex items-center">
                  Call Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-light via-transparent to-light opacity-50"></div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-brand/10">
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>Our Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {data.map((item, i) => (
              <div key={item._id} className="bg-dark/80 backdrop-blur-sm rounded-lg overflow-hidden group">
                <div className="relative h-56">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-brand">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  <p className="text-brand font-bold text-lg">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Samosa Video Section */}
      <section id="samosa-video" className="py-16 bg-brand/10 hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-8`}>Samosa Making Process</h2>
          <p className="text-lg text-gray-300 mb-8">Watch our team in action as they prepare the crispy and flavorful samosas that pair perfectly with our chai selection.</p>

          {/* Video Container */}
          <div className="relative w-full max-w-xl mx-auto mb-8">
            <video src="/samosa.MOV" autoPlay loop muted playsInline className="w-full h-auto rounded-lg" />
          </div>

          <p className="text-lg text-gray-300">Our samosas are made with fresh ingredients and traditional techniques, ensuring every bite is crispy and delicious.</p>
        </div>
      </section>
      <SamosaVideoSection />

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

      {/* Modern Visit Us Section */}
      <section id="contact" className="py-16 bg-dark relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className={`${playfair.className} text-4xl font-bold text-brand`}> Contact Us</h2>
              <div className="space-y-4">
                {/* <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-brand" />
                  <p>123 Chai Street, Tea District, NY 10001</p>
                </div> */}
                {/* <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-brand" />
                  <p>Open Daily • 6:00 AM - 11:00 PM</p>
                </div> */}
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-brand" />
                  <p>+1 647-621-3213</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-brand" />
                  <p>Desichaiwaala@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/offer-chai-to-community.avif" alt="Our Location" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
