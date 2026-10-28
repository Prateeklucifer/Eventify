"use client";

import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [render, setRender] = useState(false);

  const getAllRegistrations = async () => {
    let res = await fetch("http://localhost:3000/api/admin/registrations");
    let data = await res.json();
    setRegistrations(data.data);
  };

  const deleteItem = async (id) => {
    let data = await fetch("http://localhost:3000/api/admin/registrations", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (data.status == 200) {
      setRender(!render);
      sucessMsg("Item deleted sucessfully");
    } else {
      errorMsg("something went wrong");
    }
  };

  const sucessMsg = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const errorMsg = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  function dateGiver(date) {
    let data = date.split("-");
    return data[2].substring(0, 2) + "/" + data[1] + "/" + data[0];
  }

  useEffect(() => {
    getAllRegistrations();
  }, [render]);

  // list of event names for the dropdown
  let eventNames = [];
  registrations?.forEach((item) => {
    if (!eventNames.find((e) => e.id == item.eventId)) {
      eventNames.push({ id: item.eventId, title: item.eventTitle });
    }
  });

  let filtered = registrations?.filter(
    (item) => selectedEvent == "all" || item.eventId == selectedEvent
  );

  let totalSeats = 0;
  filtered?.forEach((item) => {
    totalSeats = totalSeats + item.seats;
  });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div className="md:mx-4">
        <div className="container m-auto px-4 md:px-0">
          <div className="heading font-display uppercase text-4xl md:text-5xl mt-2 mb-8">
            Registrations
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <select
              className="px-3 py-2 rounded-full outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 bg-white w-full sm:w-72"
              value={selectedEvent}
              onChange={(e) => {
                setSelectedEvent(e.target.value);
              }}
            >
              <option value="all">All Events</option>
              {eventNames.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <div className="text-sm text-zinc-600">
              {filtered?.length} registrations,{" "}
              <span className="font-bold">{totalSeats} seats</span>
            </div>
          </div>

          {filtered?.length == 0 ? (
            <div className="flex items-center justify-center h-[40vh]">
              No registrations yet
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-2xl shadow-sm px-5">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500 font-code text-xs uppercase tracking-wider">
                    <th className="py-4 pr-4">Name</th>
                    <th className="py-2 pr-4">Event</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Phone</th>
                    <th className="py-2 pr-4">Seats</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered?.map((item) => (
                    <tr className="border-b border-zinc-100 last:border-0 hover:bg-mist" key={item.id}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap">{item.name}</td>
                      <td className="py-3 pr-4 min-w-40">{item.eventTitle}</td>
                      <td className="py-3 pr-4">{item.email}</td>
                      <td className="py-3 pr-4">{item.phone}</td>
                      <td className="py-3 pr-4">{item.seats}</td>
                      <td className="py-3 pr-4 font-code text-xs whitespace-nowrap">{dateGiver(item.createdAt)}</td>
                      <td className="py-3">
                        <button
                          className="text-red-600"
                          onClick={() => {
                            deleteItem(item.id);
                          }}
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
