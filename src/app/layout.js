import { Playfair_Display } from "next/font/google";
import connectMongo from "../../db/connectMongo";
import "./globals.css";

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
      <body className={playfair.className}>{children}</body>
    </html>
  );
}
