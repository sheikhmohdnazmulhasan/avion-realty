import { Inter } from "next/font/google";
import "../globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import AuthProvider from "../AuthProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

const kaleko = localFont({ src: "../../public/fonts/Kaleko105Light.ttf" });

export const metadata = {
  title: "Avion Realty | Easy way to find a perfect property",
  description: "Avion Realty Properties LLC provides personalized consulting services, guiding you through Dubai's real estate landscape. Our experts offer insights tailored to your goals, ensuring a strategic and successful journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={kaleko.className}>
        <Suspense>
        <AuthProvider> <div className="relative">
          {/* navbar */}
          <Navbar />

          {/* dynamic content */}
          <div className="min-h-screen">{children}</div>

          {/* footer */}
          <Footer />
        </div> </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
