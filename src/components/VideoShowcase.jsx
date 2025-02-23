"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { useState } from "react";

const playfair = Playfair_Display({ subsets: ["latin"] });

export function VideoShowcase() {
  const [isChaiPlaying, setIsChaiPlaying] = useState(false);
  const [isSamosaPlaying, setIsSamosaPlaying] = useState(false);
  const [isChaiMuted, setIsChaiMuted] = useState(true);
  const [isSamosaMuted, setIsSamosaMuted] = useState(true);

  const toggleChaiPlay = () => {
    const video = document.getElementById("chai-video");
    if (video.paused) {
      video.play();
      setIsChaiPlaying(true);
    } else {
      video.pause();
      setIsChaiPlaying(false);
    }
  };

  const toggleSamosaPlay = () => {
    const video = document.getElementById("samosa-video");
    if (video.paused) {
      video.play();
      setIsSamosaPlaying(true);
    } else {
      video.pause();
      setIsSamosaPlaying(false);
    }
  };

  const toggleChaiMute = () => {
    const video = document.getElementById("chai-video");
    video.muted = !video.muted;
    setIsChaiMuted(!isChaiMuted);
  };

  const toggleSamosaMute = () => {
    const video = document.getElementById("samosa-video");
    video.muted = !video.muted;
    setIsSamosaMuted(!isSamosaMuted);
  };

  return (
    <section className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-center mb-4 text-brand`}>Our Craft in Motion</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Watch our skilled artisans prepare your favorite chai and samosas using traditional techniques passed down through generations.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Chai Video */}
          <div className="relative group">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black/20">
              <video id="chai-video" className="w-full h-full object-cover" loop playsInline poster="/menu/Cardamom Special.jpg" autoPlay muted>
                <source src="/action.MOV" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20 text-white" onClick={toggleChaiPlay}>
                  {isChaiPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20 text-white" onClick={toggleChaiMute}>
                  {isChaiMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className={`${playfair.className} text-2xl font-bold text-brand mb-2`}>The Art of Chai Making</h3>
              <p className="text-gray-400">Witness the meticulous process of brewing our signature Irani chai, where every step is crafted to perfection.</p>
            </div>
          </div>

          {/* Samosa Video */}
          <div className="relative group">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black/20">
              <video id="samosa-video" className="w-full h-full object-cover" loop playsInline poster="/menu/Shahi Paneer Samosa.webp" autoPlay muted>
                <source src="/samosa.MOV" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20 text-white" onClick={toggleSamosaPlay}>
                  {isSamosaPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20 text-white" onClick={toggleSamosaMute}>
                  {isSamosaMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className={`${playfair.className} text-2xl font-bold text-brand mb-2`}>Samosa Craftsmanship</h3>
              <p className="text-gray-400">Watch our expert chefs hand-fold each samosa with precision, ensuring the perfect crispy texture and flavorful filling.</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-6 rounded-lg bg-white/5">
              <h4 className="text-brand font-semibold mb-2">Traditional Methods</h4>
              <p className="text-gray-400 text-sm">Age-old techniques preserved for authentic taste</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5">
              <h4 className="text-brand font-semibold mb-2">Fresh Ingredients</h4>
              <p className="text-gray-400 text-sm">Locally sourced, premium quality ingredients</p>
            </div>
            <div className="p-6 rounded-lg bg-white/5">
              <h4 className="text-brand font-semibold mb-2">Made with Love</h4>
              <p className="text-gray-400 text-sm">Crafted with passion and attention to detail</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
