import React from 'react'

export default function PageHeader({ label, title, text }) {
    return (
        <div className="bg-plum text-white">
            <div className="container m-auto px-4 pt-20 pb-14 md:pt-28 md:pb-20">
                <div className="font-code text-xs md:text-sm text-amber-300 tracking-widest uppercase mb-4">{label}</div>
                <h1 className="font-display uppercase text-5xl md:text-7xl leading-[0.95] max-w-3xl">{title}</h1>
                {text && <p className="text-zinc-300 md:text-lg mt-5 max-w-xl">{text}</p>}
            </div>
        </div>
    )
}
