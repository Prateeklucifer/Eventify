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
        <div className="heading font-display uppercase text-4xl md:text-5xl mt-2 mb-8">
          Dashboard
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              href={card.href}
              key={card.key}
              className={`rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition ${
                card.key == "pendingEnquiries" && counts?.pendingEnquiries > 0
                  ? "bg-fuchsia-500 text-white"
                  : "bg-white"
              }`}
            >
              <div className="font-code text-xs uppercase tracking-wider opacity-70">{card.name}</div>
              <div className="font-display text-5xl mt-3">
                {counts ? counts[card.key] : "-"}
              </div>
            </Link>
          ))}
        </div>

        <div className="font-display uppercase text-2xl mt-12 mb-4">Recent registrations</div>
        {recent.length == 0 ? (
          <div className="text-zinc-500 text-sm">No registrations yet</div>
        ) : (
          <div className="flex flex-col bg-white rounded-2xl shadow-sm px-5">
            {recent.map((item) => (
              <div
                className="flex items-center justify-between gap-4 border-b border-zinc-100 last:border-0 py-4 text-sm"
                key={item.id}
              >
                <div>
                  <span className="font-semibold">{item.name}</span> booked{" "}
                  {item.seats} {item.seats == 1 ? "seat" : "seats"} for{" "}
                  <span className="font-semibold">{item.eventTitle}</span>
                </div>
                <div className="font-code text-xs text-zinc-500 whitespace-nowrap">{dateGiver(item.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
