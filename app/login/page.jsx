"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const getName = (e) => {
    setName(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  async function sendRequest() {
    let res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } else {
      setError("Wrong username or password");
    }
  }

  return (
    <div className="relative flex justify-center items-center h-screen bg-plum px-4">
      <div className="absolute top-0 left-0 h-full w-full">
        <img src="/login.png" alt="" className="w-full h-full object-cover opacity-25" />
      </div>
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 md:p-10">
        <Link href={"/"} className="font-code font-semibold text-xl text-fuchsia-500 tracking-tight">Eventify</Link>
        <div className="font-display uppercase text-4xl md:text-5xl text-zinc-900 mt-6">Welcome back</div>
        <div className="text-zinc-500 mt-2">Log in to manage events, enquiries and website content.</div>

        <form
          className="flex flex-col gap-5 mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            sendRequest();
          }}
        >
          <div className="name">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={name}
              onChange={getName}
            />
          </div>
          <div className="password">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500"
              value={password}
              onChange={getPassword}
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="text-white px-4 py-3 rounded-full bg-fuchsia-500 hover:bg-fuchsia-600 w-full font-bold mt-2"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
