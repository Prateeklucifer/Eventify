import React from 'react'
import Image from 'next/image'

export default function About() {
    return (
        <div>
            <div className="mt-8 px-4 container m-auto lg:px-44">
                <div className="heading font-bold text-xl">CREATIVE WORKS</div>
                <div className="mt-4">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                </div>
                <div className="images grid md:grid-cols-2 mt-6">
                    <div className="images w-full"><Image src="/w-1.png" width={500} height={500} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-200" /></div>
                    <div className="images w-full"><Image src="/w-2.png" width={500} height={500} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-200" /></div>
                    <div className="images w-full"><Image src="/w-3.png" width={500} height={500} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-200" /></div>
                    <div className="images w-full"><Image src="/w-4.png" width={500} height={500} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-200" /></div>
                </div>
            </div>
        </div>
    )
}