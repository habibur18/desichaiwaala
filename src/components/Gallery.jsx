import { Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"] });

const galleryItems = [
  // { src: "/gallery/Classic Irani Chai.webp", alt: "Classic Irani Chai", title: "Classic Irani Chai" },
  // { src: "/gallery/Saffron Infused Chai.avif", alt: "Saffron Infused Chai", title: "Saffron Infused Chai" },
  // { src: "/gallery/Masala Chai.jpg", alt: "Masala Chai", title: "Masala Chai" },
  // { src: "/gallery/Rose Petal Chai.jpg", alt: "Rose Petal Chai", title: "Rose Petal Chai" },
  { src: "/gallery/Cardamom Special.jpg", alt: "Cardamom Special", title: "Cardamom Special" },
  // { src: "/gallery/Ginger Chai.jpg", alt: "Ginger Chai", title: "Ginger Chai" },
  // { src: "/gallery/Egg-Chicken-Puff.jpg", alt: "Egg-Chicken-Puff", title: "Egg Chicken Puff" },
  { src: "/gallery/kerala-egg-puffs-recipe.jpg", alt: "Kerla Egg Puffs", title: "Kerla Egg Puffs" },
  { src: "/gallery/Shahi Samosa.webp", alt: "Shahi Samosa", title: "Shahi Samosa" },
  // { src: "/gallery/Shahi Samosa1.webp", alt: "Shahi Samosa", title: "Shahi Samosa" },
  // { src: "/gallery/Shahi Samosa2.jpg", alt: "Shahi Samosa", title: "Shahi Samosa" },
  { src: "/gallery/Shahi Samosa3.jpg", alt: "Shahi Samosa", title: "Egg Puff" },
  { src: "/gallery/samosa-2.jpeg", alt: " Chai", title: "Chai & Bisque" },
  { src: "/gallery/samosa-4.jpeg", alt: " Chai", title: "Chai & Bisque" },
  { src: "/gallery/samosa-5.jpeg", alt: " Chai", title: "Chai & Bisque" },
  // { src: "/gallery/samosa-6.jpeg", alt: " Chai", title: "Chai & Bisque" },
  // { src: "/gallery/Shahi samosa.png", alt: " Samosa", title: "Samosa" },
  // { src: "/gallery/samosa.jpg", alt: " Samosa", title: "Samosa" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-16 bg-dark container mx-auto px-4">
     <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
  {galleryItems.map((item, index) => (
    <div key={index} className="break-inside-avoid relative rounded-lg overflow-hidden group">
      <Image
        src={item.src || "/placeholder.svg"}
        width={300}
        height={300}
        alt={item.alt}
        className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
        <h3 className={`${playfair.className} text-white text-xl font-semibold text-center`}>
          {item.title}
        </h3>
      </div>
    </div>
  ))}
</div>

    </section>
  );
}
