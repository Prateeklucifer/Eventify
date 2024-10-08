"use client";

import { Mulish } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import Footer from "./components/Footer";

const mulish = Mulish({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  let pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${mulish.className} ${
          pathname.startsWith("/admin") ? "flex flex-col md:flex-row" : ""
        } text-zinc-800`}
      >
        {pathname.startsWith("/admin") && <SideBar />}
        {!pathname.startsWith("/admin") && !pathname.startsWith("/login")  && <Navbar />}


        {children}

        {!pathname.startsWith("/admin") && <Footer />}
      </body>
    </html>
  );
}
