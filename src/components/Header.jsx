"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-dark/60 sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center py-2 px-4 ">
        <div className=" relative">
          <Link href="/">
            <Image src="/Circle Desi Chaiwaala Logo Design.jpeg" alt="Desi Chaiwaala Company Logo" width={160} height={160} className="object-contain" priority />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden bg-brand text-black">
                <Menu className="w-12 h-12 " />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white dark:bg-dark/95 backdrop-blur-sm w-64 sm:w-80">
              <SheetTitle className="text-2xl font-bold mb-4">
                <Link href="/">
                  <Image src="/Circle Desi Chaiwaala Logo Design.jpeg" alt="Desi Chaiwaala Company Logo" width={200} height={200} className="object-contain" />
                  <span className="text-brand">Desi Chaiwaala</span>
                </Link>
              </SheetTitle>
              <nav className="flex flex-col gap-4">
                <a href="#about" className="text-xl hover:text-brand transition-colors text-white" onClick={handleLinkClick}>
                  About
                </a>
                <a href="#gallery" className="text-xl hover:text-brand transition-colors text-white" onClick={handleLinkClick}>
                  Gallery
                </a>
                <Link href="/menu" className="text-xl hover:text-brand transition-colors text-white" onClick={handleLinkClick}>
                  Menu
                </Link>
                <a href="#contact" className="text-xl hover:text-brand transition-colors text-white" onClick={handleLinkClick}>
                  Contact
                </a>

                <a href="tel:1234567890" className="text-xl flex items-center gap-3 hover:text-brand transition-colors text-white" onClick={handleLinkClick}>
                  <span className="text-brand">
                    {" "}
                    <PhoneCall />
                  </span>
                  1234-567-890
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden lg:block">
          <ul className="flex space-x-8 text-xl">
            <li>
              <a href="#about" className="hover:text-brand transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-brand transition-colors">
                Gallery
              </a>
            </li>
            <li>
              <Link href="/menu" className="hover:text-brand transition-colors">
                Menu
              </Link>
            </li>
            <li>
              <a href="#contact" className="hover:text-brand transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
