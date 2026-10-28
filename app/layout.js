"use client";

import { Mulish, Anton, Source_Code_Pro } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import Footer from "./components/Footer";

const mulish = Mulish({ subsets: ["latin"] });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], variable: "--font-code" });

export default function RootLayout({ children }) {
  let pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${mulish.className} ${anton.variable} ${sourceCodePro.variable} ${
          pathname.startsWith("/admin") ? "flex flex-col md:flex-row bg-mist min-h-screen" : "bg-white"
        } text-zinc-800 overflow-x-hidden`}
      >
        {pathname.startsWith("/admin") && <SideBar />}
        {!pathname.startsWith("/admin") && !pathname.startsWith("/login")  && <Navbar />}


        {children}

        {!pathname.startsWith("/admin") && !pathname.startsWith("/login") && <Footer />}
      </body>
    </html>
  );
}
