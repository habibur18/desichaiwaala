import { SocialFeed } from "@/components/SocialFeed";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import connectMongo from "../../../db/connectMongo";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata = {
  title: "Desi Chaiwaala Company - Authentic Irani Chai Experience",
  description: "Experience the magic of authentic Irani Chai at Desi Chaiwaala Company. Enjoy our signature blends, friendly atmosphere, and modern amenities in the heart of the city.",
  keywords: "Irani chai, tea house, authentic chai, Indian tea, chai cafe, best chai, traditional tea, Desi Chaiwaala",
  openGraph: {
    title: "Desi Chaiwaala Company - Authentic Irani Chai Experience",
    description: "Experience the magic of authentic Irani Chai at Desi Chaiwaala Company.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-QI3zVfj3KUpSWMnRFJcH8R8hfaX0A9.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desi Chaiwaala Company - Authentic Irani Chai Experience",
    description: "Experience the magic of authentic Irani Chai at Desi Chaiwaala Company.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-QI3zVfj3KUpSWMnRFJcH8R8hfaX0A9.jpeg"],
  },
};

export default async function RootLayout({ children }) {
  await connectMongo();
  return (
    <html lang="en">
      <body className={playfair.className}>
        {children}

        <div className="bg-dark">
          <SocialFeed />

          {/* Social Media Section */}
          <section className="py-16 bg-dark/90">
            <div className="container mx-auto px-4 text-center">
              <h2 className={`${playfair.className} text-brand text-4xl font-bold mb-12`}>Follow Our Journey</h2>
              <div className="flex justify-center space-x-8">
                {[
                  { icon: Facebook, link: "#", label: "Facebook" },
                  { icon: Instagram, link: "#", label: "Instagram" },
                  // { icon: Twitter, link: "#", label: "Twitter" },
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
         {/* Footer */}
        <footer className="bg-dark py-6 border-t border-brand/20">
          <div className="container mx-auto text-center px-4">
            <div className="relative mx-auto mb-4">
              <Image
                src="/Circle Desi Chaiwaala Logo Design.jpeg"
                alt="Desi Chaiwaala Company Logo"
                width={300}
                height={300}
                className="object-contain mx-auto"
              />
            </div>
            <p className="text-gray-400 text-xl">&copy; 2025 Desi Chaiwaala Company. All rights reserved.</p>
                      {/* End of Footer */}
          {/* <div>
            <Image src="/payments.png" width={500} height={100} alt="Payment Options" className="mx-auto pb-10" />
          </div> */}
            <p className="text-gray-500 text-lg mt-2">
              Website made by <a href="https://paipixel.com/" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">PaiPixel</a>
            </p>
          </div>
        </footer>


        </div>
      </body>
    </html>
  );
}
