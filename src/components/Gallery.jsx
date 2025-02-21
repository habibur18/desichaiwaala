import { Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"] });

const galleryItems = [
  { src: "/gallery/Classic Irani Chai.webp", alt: "Classic Irani Chai", title: "Classic Irani Chai" },
  { src: "/gallery/Saffron Infused Chai.avif", alt: "Saffron Infused Chai", title: "Saffron Infused Chai" },
  { src: "/gallery/Masala Chai.jpg", alt: "Masala Chai", title: "Masala Chai" },
  { src: "/gallery/Rose Petal Chai.jpg", alt: "Rose Petal Chai", title: "Rose Petal Chai" },
  { src: "/gallery/Cardamom Special.jpg", alt: "Cardamom Special", title: "Cardamom Special" },
  { src: "/gallery/Ginger Chai.jpg", alt: "Ginger Chai", title: "Ginger Chai" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12 text-center`}>Our Chai Expertise at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
              <Image src={item.src || "/placeholder.svg"} alt={item.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <h3 className={`${playfair.className} text-white text-xl font-semibold text-center`}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
