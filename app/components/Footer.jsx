import Link from 'next/link'
import React from 'react'
import { Source_Code_Pro } from "next/font/google";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export default function Footer() {
    const links = [{
        name: "Home",
        href: "/"
    }, {
        name: "Services",
        href: "/services"
    }, {
        name: "Events",
        href: "/events"
    }, {
        name: "Blogs",
        href: "/blogs"
    }, {
        name: "About Us",
        href: "/about"
    }, {
        name: "Contact Us",
        href: "/contact"
    }
    ]
    return (
        <div className="bg-plum text-zinc-400 mt-24">
            <div className="container m-auto px-4">
                <div className="py-14 flex flex-col lg:flex-row gap-10 justify-between border-b border-white/10">
                    <div className="left max-w-md">
                        <div className="font-display uppercase text-white text-4xl md:text-5xl leading-none">Got an event coming up?</div>
                        <Link href={"/contact"} className="inline-block mt-6 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold px-6 py-3 rounded-full">Tell us about it</Link>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-12 gap-y-3 h-fit">
                        {links.map((link, key) => (
                            <li key={key}>
                                <Link href={link.href} className="hover:text-white" >{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
                    <Link href={"/"} className={`${sourceCodePro.className} logo font-semibold text-xl text-fuchsia-400 tracking-tight`}>Eventify</Link>
                    <div className="copy"> &copy; {new Date().getFullYear()} Eventify. All rights reserved.</div>
                </div>
            </div>
        </div>
    )
}
