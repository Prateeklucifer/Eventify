"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";

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

  function dateGiver(date) {
    let data = date.split("-");
    return data[2] + "/" + data[1] + "/" + data[0];
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="container m-auto px-4 md:px-0 lg:px-28 xl:px-36 2xl:px-48">
      {loaded && events.length == 0 ? (
        <div className="flex items-center justify-center h-[30vh]">
          <div className="">No upcoming events</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((item) => (
            <Link
              href={`/events/${item.id}`}
              key={item.id}
              className="box flex flex-col ring-1 ring-zinc-200 rounded-lg overflow-hidden hover:ring-fuchsia-400"
            >
              <Image
                src={`/${item.imageUrl}`}
                height={300}
                width={400}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="title font-semibold text-lg">{item.title}</div>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <IoCalendarOutline />
                  {dateGiver(item.eventDate)}{item.eventTime && `, ${item.eventTime}`}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <IoLocationOutline />
                  {item.venue}
                </div>
                <div className="mt-auto pt-2 text-sm font-semibold">
                  {item.totalSeats - item.bookedSeats > 0 ? (
                    <span className="text-fuchsia-600">
                      {item.totalSeats - item.bookedSeats} seats left
                    </span>
                  ) : (
                    <span className="text-red-600">Housefull</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
