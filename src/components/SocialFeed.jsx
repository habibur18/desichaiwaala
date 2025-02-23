"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const playfair = Playfair_Display({ subsets: ["latin"] });

const socialPosts = [
  {
    id: 1,
    image: "/socialfeed/Tea shelf display.webp",
    alt: "Tea shelf display",
    type: "image",
  },
  {
    id: 2,
    image: "/socialfeed/Branded cold Tea.jpg",
    alt: "Branded cold Tea",
    type: "image",
  },
  {
    id: 3,
    image: "/socialfeed/Chai in car mirror view.jpg",
    alt: "Chai in car mirror view",
    type: "image",
  },
  {
    id: 4,
    image: "/socialfeed/Social media post.jpg",
    alt: "Social media post",
    type: "image",
  },
  // {
  //   id: 5,
  //   image: "/Desi Chaiwaala Logo Design.svg",
  //   alt: "Brand logo",
  //   type: "image",
  // },
  {
    id: 7,
    image: "/socialfeed/videos/Tea shelf display.mp4",
    alt: "Tea shelf display",
    type: "video",
    href: "https://www.facebook.com/reel/1885607485579391",
  },
  {
    id: 8,
    image: "/samosa.MOV",
    alt: "Samosa ",
    type: "video",
    // href: "https://www.facebook.com/reel/1885607485579391",
  },
];

export function SocialFeed() {
  return (
    <section className="py-16 dark:bg-dark/90">
      <div className="container mx-auto px-4 mb-12">
        <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-center mb-4`}>
          <span className="text-white">FOLLOW US</span> <span className="text-brand">@DESICHAIWAALA</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">Join our community and share your chai moments</p>
      </div>

      <Marquee gradient={false} speed={40} pauseOnHover={true} className="overflow-hidden py-4">
        <div className="flex gap-4">
          {socialPosts.map((post) => (
            <div key={post.id} className="relative w-[300px] h-[300px] md:w-[350px] md:h-[400px] rounded-xl overflow-hidden group">
              {post.type === "image" ? (
                <Image src={post.image || "/placeholder.svg"} alt={post.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="relative w-full h-full">
                  <video src={post.image || "/placeholder.svg"} controls autoPlay muted playsInline className="object-cover w-full h-full" loop />
                </div>
              )}
              {post.href && (
                <Link href={post.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="text-white w-8 h-8" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </Marquee>

      <div className="container mx-auto px-4 mt-12 text-center">
        <Button className="bg-brand hover:bg-brand/80 text-black px-8 py-6 rounded-full text-lg font-semibold" asChild>
          <a href="https://instagram.com/desichaiwaala" target="_blank" rel="noopener noreferrer">
            FOLLOW US
          </a>
        </Button>
      </div>
    </section>
  );
}
