"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [counts, setCounts] = useState(undefined);
  const [recent, setRecent] = useState([]);

  const getDashboard = async () => {
    let res = await fetch("http://localhost:3000/api/admin/dashboard");
    let data = await res.json();
    setCounts(data.data);
    setRecent(data.recent);
  };

  function dateGiver(date) {
    let data = date.split("-");
    return data[2].substring(0, 2) + "/" + data[1] + "/" + data[0];
  }

  useEffect(() => {
    getDashboard();
  }, []);

  const cards = [
    { name: "Upcoming Events", key: "upcomingEvents", href: "/admin/events" },
    { name: "Total Registrations", key: "totalRegistrations", href: "/admin/registrations" },
    { name: "Pending Enquiries", key: "pendingEnquiries", href: "/admin/contact" },
    { name: "Total Events", key: "totalEvents", href: "/admin/events" },
    { name: "Blogs", key: "totalBlogs", href: "/admin/blogs" },
    { name: "Team Members", key: "teamMembers", href: "/admin/team" },
  ];

  return (
    <div className="md:mx-4">
      <div className="container m-auto px-4 md:px-0">
        <div className="heading text-3xl font-semibold text-center my-4">
          Dashboard
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              href={card.href}
              key={card.key}
              className={`ring-1 ring-zinc-300 rounded-lg p-4 md:p-6 hover:bg-gray-50 ${
                card.key == "pendingEnquiries" && counts?.pendingEnquiries > 0 && "ring-fuchsia-400"
              }`}
            >
              <div className="text-sm text-zinc-500">{card.name}</div>
              <div className="text-3xl font-bold mt-2">
                {counts ? counts[card.key] : "-"}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-xl font-semibold mt-10 mb-4">Recent Registrations</div>
        {recent.length == 0 ? (
          <div className="text-zinc-500 text-sm">No registrations yet</div>
        ) : (
          <div className="flex flex-col">
            {recent.map((item) => (
              <div
                className="flex items-center justify-between border-b border-zinc-200 py-3 text-sm"
                key={item.id}
              >
                <div>
                  <span className="font-semibold">{item.name}</span> booked{" "}
                  {item.seats} {item.seats == 1 ? "seat" : "seats"} for{" "}
                  <span className="font-semibold">{item.eventTitle}</span>
                </div>
                <div className="text-zinc-500">{dateGiver(item.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
