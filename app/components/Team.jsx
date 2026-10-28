"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function TeamsCmp() {
  const [mentors, setMentors] = useState(undefined);

  const getMentors = async () => {
    let res = await fetch("http://localhost:3000/api/team");
    let data = await res.json();
    setMentors(data.data);
  };

  useEffect(() => {
    getMentors();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {mentors ? (
        mentors.map((item) => (
          <div className="mentor" key={item.id}>
            <div className="overflow-hidden rounded-2xl bg-mist">
              <Image
                src={`/${item.imageURL}`}
                height={450}
                width={300}
                alt={item.name}
                className="w-full aspect-[3/4] object-cover object-top hover:scale-105 transition duration-500"
              />
            </div>
            <div className="name font-bold text-zinc-900 mt-3">{item.name}</div>
          </div>
        ))
      ) : (
        <>
          {[1, 2, 3, 4, 5].map((item) => (
            <div className="animate-pulse" key={item}>
              <div className="w-full aspect-[3/4] rounded-2xl bg-zinc-200"></div>
              <div className="mt-3 h-4 w-2/3 rounded bg-zinc-200"></div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
