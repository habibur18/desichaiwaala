import { Button } from "@/components/ui/button";
import { VideoShowcase } from "@/components/VideoShowcase";
import { ChevronRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"] });
export default async function page() {
  // no store and no cache
  //
  const res = await fetch("http://desichaiwaala.ca/api/menu ", { cache: "no-store" });
  const menuItems = await res.json();
  const somosaItems = menuItems.filter((item) => item.menuType === "Samosa");
  const chaiItems = menuItems.filter((item) => item.menuType === "Chai");
  return (
    <div className="bg-dark">
      {/* Split Hero Section */}
      <div className="bg-brand/10">
        <section id="menu" className="grid md:grid-cols-2 h-[80vh] md:h-[60vh] gap-10 container mx-auto py-16 px-4">
          <Link href="#chai-menu" className="relative group overflow-hidden cursor-pointer">
            <Image src="/menu/Masala Chai.webp" alt="Variety of Chai" fill className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 transition-opacity group-hover:opacity-70 rounded-2xl" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
              <div className="text-brand mb-2">AUTHENTIC EXPERIENCE</div>
              <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-4 text-center`}>CHAI MENU</h1>
              <Button variant="outline" className="bg-brand hover:bg-brand/80 text-black px-8 py-6 rounded-full text-lg font-semibold">
                Explore Chai
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
          <Link href="#samosa-menu" className="relative group overflow-hidden cursor-pointer">
            <Image src="/menu/Shahi Samosa.jpg" alt="Fresh Samosas" fill className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 transition-opacity group-hover:opacity-70 rounded-2xl" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
              <div className="text-brand mb-2">CRISPY & DELICIOUS</div>
              <h1 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-4 text-center`}>SAMOSA MENU</h1>
              <Button variant="outline" className="bg-brand hover:bg-brand/80 text-black px-8 py-6 rounded-full text-lg font-semibold">
                Explore Samosas
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        </section>
      </div>

      <VideoShowcase />

      {/* Menu Section */}
      <section id="chai-menu" className="relative py-24 bg-brand/10">
        <div className="absolute inset-0 hidden">
          <Image src="/bg.png" alt="Background" width={1920} height={100} className="object-cover w-full" />
        </div>
        <div className="container mx-auto px-4 relative z-[999]">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>Chai Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {chaiItems.map((item, i) => (
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
      {/* Menu Section of Samosa*/}
      <section id="samosa-menu" className="py-16 bg-dark/90">
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>Samosa Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {somosaItems.map((item, i) => (
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

      {/* Story Section */}
      <section className="py-20 bg-brand/10 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className={`${playfair.className} text-4xl font-bold text-brand`}>The Art of Traditional Brewing</h2>
            <p className="text-lg leading-relaxed">Every cup of chai we serve is a testament to our commitment to authenticity. Our master chai makers carefully select the finest ingredients, from premium Assam tea leaves to aromatic whole spices, ensuring each sip tells a story of tradition and craftsmanship.</p>
            <div className="flex justify-center gap-4">
              <Link href="#" target="_blank" className=" flex items-center px-6 py-3 rounded bg-brand text-black hover:bg-brand/90">
                Come Visit Us
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
