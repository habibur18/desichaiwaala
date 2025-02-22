import { Playfair } from "next/font/google";
import Image from "next/image";

const playfair = Playfair({ subsets: ["latin"] });

const images = ["/gallery/Shahi Samosa.webp", "/gallery/Shahi Samosa1.webp", "/gallery/Shahi Samosa2.jpg", "/gallery/Shahi Samosa3.jpg", "/gallery/Shahi Samosa4.avif", "/gallery/Shahi Samosa5.avif"];

export function SamosaVideoSection() {
  return (
    <section id="samosa-video" className="py-16 bg-brand/10">
      <div className="container mx-auto px-4">
        <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-8 text-center`}>Samosa Making Process</h2>
        <div className="text-center mb-8">
          <p className="text-lg text-gray-300 mb-4">Watch our team in action as they prepare the crispy and flavorful samosas that pair perfectly with our chai selection.</p>
          <p className="text-lg text-gray-300">Our samosas are made with fresh ingredients and traditional techniques, ensuring every bite is crispy and delicious.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((src, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={src || "/placeholder.svg"} alt={`Samosa making process ${index + 1}`} layout="fill" objectFit="cover" className="hover:scale-110 transition-transform duration-300" />
              </div>
            ))}
          </div>

          {/* Video and Description */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-video mb-8">
              <video src="/samosa.MOV" autoPlay loop muted playsInline className="w-full h-full rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
