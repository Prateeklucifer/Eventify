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
        <div className="bg-zinc-50 mt-16">
            <div className="container m-auto">
                <div className="px-4 flex flex-col items-center gap-8 lg:flex-row py-6 justify-between">
                    <div className="left flex flex-col items-center justify-center lg:flex-row gap-8">
                        <div className="heading">
                            <Link href={"/"} className={`${sourceCodePro.className} logo font-semibold text-xl lg:text-2xl text-fuchsia-500 tracking-tight`}>Eventify</Link>

                        </div>
                        <div className="copy"> &copy; 2024 eventify </div>
                    </div>
                    <ul className="text-sm lg:text-base flex flex-wrap  items-center justify-center gap-4">
                        {links.map((link, key) => (
                            <li key={key}>
                                <Link href={link.href} className="text-zinc-600 hover:text-zinc-900" >{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}