"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function EventsCmp({ limit }) {
  const [events, setEvents] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  const getEvents = async () => {
    let res = await fetch("http://localhost:3000/api/events");
    let data = await res.json();

    // only showing events which are not over yet
    let today = new Date().toISOString().split("T")[0];
    let upcoming = data.data.filter((item) => item.eventDate >= today);

    if (limit) {
      upcoming = upcoming.slice(0, limit);
    }

    setEvents(upcoming);
    setLoaded(true);
  };

  function niceDate(date) {
    return new Date(date + "T00:00").toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="container m-auto px-4">
      {loaded && events.length == 0 ? (
        <div className="flex flex-col items-center justify-center h-[30vh] text-center">
          <div className="font-bold text-lg">No events are open for booking right now</div>
          <Link href={"/contact"} className="text-fuchsia-600 font-bold mt-2 hover:underline">
            Planning your own? Talk to us &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((item) => (
            <Link
              href={`/events/${item.id}`}
              key={item.id}
              className="ticket group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <Image
                  src={`/${item.imageUrl}`}
                  height={300}
                  width={400}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 flex flex-col gap-1 flex-1">
                <div className="font-code text-xs uppercase tracking-wider text-fuchsia-600">
                  {niceDate(item.eventDate)}
                  {item.eventTime && ` · ${item.eventTime}`}
                </div>
                <div className="title font-bold text-xl text-zinc-900 leading-snug">{item.title}</div>
                <div className="text-sm text-zinc-500">{item.venue}</div>
              </div>

              {/* perforated line with half circles cut on both sides */}
              <div className="relative mx-5 border-t-2 border-dashed border-zinc-200">
                <span className="absolute -top-3 -left-8 w-6 h-6 rounded-full bg-mist"></span>
                <span className="absolute -top-3 -right-8 w-6 h-6 rounded-full bg-mist"></span>
              </div>

              <div className="px-5 py-4 flex items-center justify-between font-code text-xs uppercase tracking-wider">
                <span className="text-zinc-400">Admit</span>
                {item.totalSeats - item.bookedSeats > 0 ? (
                  <span className="text-zinc-900 font-semibold">
                    {item.totalSeats - item.bookedSeats} seats left
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">Housefull</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
