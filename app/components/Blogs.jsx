"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogsCmp() {
  const [blogs, setBlogs] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  const getBlogs = async () => {
    let res = await fetch("http://localhost:3000/api/blogs");
    let data = await res.json();
    setBlogs(data.data);
    setLoaded(true);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="container m-auto px-4">
      {loaded && blogs.length == 0 ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="">No blogs posted yet</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {blogs?.map((item) => (
            <Link href={`/blogs/${item.id}`} key={item.id} className="group flex flex-col">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={`/${item.imageUrl}`}
                  height={400}
                  width={600}
                  alt={item.title}
                  className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="title font-bold text-xl text-zinc-900 leading-snug mt-4 group-hover:text-fuchsia-600">
                {item.title}
              </div>
              <div className="para text-zinc-600 mt-2">{item.description}</div>
              <div className="font-code text-xs uppercase tracking-wider text-fuchsia-600 mt-3">Read more &rarr;</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
