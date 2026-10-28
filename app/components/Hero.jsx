"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Hero() {
    const [nextEvent, setNextEvent] = useState(undefined)

    // showing the nearest upcoming event as a ticket on the hero image
    const getNextEvent = async () => {
        let res = await fetch("http://localhost:3000/api/events")
        let data = await res.json()
        let today = new Date().toISOString().split("T")[0]
        let upcoming = data.data.filter((item) => item.eventDate >= today)
        setNextEvent(upcoming[0])
    }

    function niceDate(date) {
        return new Date(date + "T00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
    }

    useEffect(() => {
        getNextEvent()
    }, [])

    return (
        <div className="relative min-h-[85vh] flex items-end overflow-hidden bg-plum">
            <img src="/hero.png" alt="Concert stage with pink and blue lights" className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-plum via-plum/60 to-transparent"></div>

            <div className="relative container m-auto px-4 pb-14 md:pb-20 pt-40 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                <div className="left max-w-3xl">
                    <div className="font-code text-xs md:text-sm text-amber-300 tracking-widest uppercase mb-4">Weddings / Concerts / College fests / Parties</div>
                    <h1 className="font-display uppercase text-white text-5xl sm:text-6xl lg:text-8xl leading-[0.95]">
                        You enjoy the day.<br /><span className="text-fuchsia-400">We run the show.</span>
                    </h1>
                    <p className="text-zinc-300 md:text-lg mt-6 max-w-xl">
                        From the venue and vendors to the lights, sound and guest list, our team handles the planning so you can be a guest at your own event.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-8">
                        <Link href={"/contact"} className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold px-6 py-3 rounded-full">Plan your event</Link>
                        <Link href={"/events"} className="text-white font-bold px-6 py-3 rounded-full ring-1 ring-white/40 hover:bg-white/10">See upcoming events</Link>
                    </div>
                </div>

                {nextEvent &&
                    <Link href={`/events/${nextEvent.id}`} className="ticket hidden md:flex w-80 shrink-0 bg-white rounded-xl rotate-2 hover:rotate-0 transition-transform duration-300 shadow-2xl">
                        <div className="p-5 flex-1">
                            <div className="font-code text-[11px] uppercase tracking-widest text-fuchsia-600">Next up</div>
                            <div className="font-bold text-lg text-zinc-900 mt-1 leading-snug">{nextEvent.title}</div>
                            <div className="text-sm text-zinc-500 mt-2">{nextEvent.venue}</div>
                            <div className="font-code text-sm text-zinc-800 mt-1">{niceDate(nextEvent.eventDate)}{nextEvent.eventTime && `, ${nextEvent.eventTime}`}</div>
                        </div>
                        <div className="relative border-l-2 border-dashed border-zinc-200 w-20 flex flex-col items-center justify-center">
                            <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-plum"></span>
                            <span className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-plum"></span>
                            <div className="font-display text-3xl text-zinc-900">{nextEvent.totalSeats - nextEvent.bookedSeats}</div>
                            <div className="font-code text-[10px] uppercase text-zinc-500">seats left</div>
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}
