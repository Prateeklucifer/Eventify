"use client";

import { HiBars3 } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";
import { Source_Code_Pro } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export default function SideBar() {
  let pathname = usePathname();
  console.log(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  const links = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Events",
      href: "/admin/events",
    },
    {
      name: "Registrations",
      href: "/admin/registrations",
    },
    {
      name: "Services",
      href: "/admin/services",
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
    },
    {
      name: "About Us",
      href: "/admin/about",
    },
    {
      name: "Enquiries",
      href: "/admin/contact",
    },
    {
      name: "Teams",
      href: "/admin/team",
    },
  ];

  function handleHamburger() {
    setIsOpen(!isOpen);
  }


  async function removeToken() {
    let res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
    });

    if (res.status === 200) {
      setTimeout(() => {
        router.push("/login");
      });
    } else {
      // will throw error
    }
  }

  return (
    <nav className="py-3 md:py-0 px-4 md:px-0 bg-white md:bg-transparent border-b border-zinc-100 md:border-0 sticky top-0 z-50">
      <div className="container m-auto flex items-center justify-start md:justify-between gap-6">
        <div id="mobi" className="flex items-center gap-4 md:hidden">
          <button
            className="forMobi md:hidden"
            onClick={() => {
              handleHamburger();
            }}
          >
            <HiBars3 size={30} />
          </button>
          <Link
            href={"/"}
            className={`${sourceCodePro.className} logo font-semibold text-xl lg:text-2xl text-fuchsia-500 tracking-tight`}
          >
            Eventify
          </Link>
          <div
            onClick={() => {
              handleHamburger();
            }}
            className={`${
              isOpen ? "flex" : "hidden"
            } overlay top-0 left-0 h-screen w-screen bg-black/40 z-[30] fixed`}
          ></div>
          <div
            className={`${
              isOpen ? "flex left-0" : "-left-[100%]"
            } flex-col sidebar fixed top-0 h-screen bg-plum w-64 text-zinc-300 py-4 px-4 z-[40] transition-all duration-300 ease-in-out`}
          >
            <div className="header flex justify-start items-center">
              <button
                onClick={() => {
                  handleHamburger();
                }}
              >
                {" "}
                <HiOutlineX size={30} className="text-white" />{" "}
              </button>
            </div>
            <ul className="flex flex-col space-y-4 font-medium px-2 mt-4">
              {links.map((link, key) => (
                <li
                  key={key}
                  onClick={() => {
                    handleHamburger();
                  }}
                >
                  <Link href={link.href} className={`block ${link.href == pathname && "text-white font-bold"}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
              <button className="text-white py-2 px-4 hover:bg-white/10 block rounded-full text-start ring-1 ring-white/30 font-bold" onClick={()=>{removeToken()}}>Logout</button>
            </ul>
          </div>
        </div>
        <div
          id="desk"
          className="hidden md:flex w-1/4 lg:w-1/5 xl:w-1/6 h-full top-0 left-0 px-4 py-6 fixed flex-col gap-8 bg-plum"
        >
          <Link
            href={"/"}
            className={`${sourceCodePro.className} logo font-semibold text-xl lg:text-2xl text-fuchsia-400 tracking-tight px-3`}
          >
            Eventify
            <span className="block font-code text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Admin panel</span>
          </Link>
          <ul className="flex flex-col gap-1 text-sm flex-1">
            {links.map((link, key) => (
              <li key={key}>
                <Link
                  href={link.href}
                  className={`py-2.5 px-3 block rounded-lg border-l-2 ${
                    link.href == pathname
                      ? "font-bold bg-white/10 text-white border-fuchsia-400"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 text-sm">
            <Link href={"/"} className="py-2 px-3 text-zinc-400 hover:text-white">View website &rarr;</Link>
            <button className="text-white py-2.5 px-4 hover:bg-white/10 block rounded-full text-center ring-1 ring-white/30 font-bold" onClick={()=>{removeToken()}}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
