"use client";

import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [render, setRender] = useState(false);

  const getAllEvents = async () => {
    let res = await fetch("http://localhost:3000/api/events");
    let data = await res.json();
    setEvents(data.data);
  };

  const addEvent = async () => {
    let data = await fetch("http://localhost:3000/api/admin/events", {
      method: "POST",
    });

    if (data.status == 200) {
      sucessMsg("event added sucessfully");
      setRender(!render);
    } else {
      errorMsg("can not add event");
    }
  };

  const removeEvent = async (id) => {
    if (!confirm("All registrations of this event will also be deleted. Continue?")) {
      return;
    }

    let data = await fetch("http://localhost:3000/api/admin/events", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (data.status == 200) {
      sucessMsg("event deleted sucessfully");
      setRender(!render);
    } else {
      errorMsg("can not delete event");
    }
  };

  // one function for all inputs, field is the column name
  const updateField = (event, id, field) => {
    let data = [...events];

    let index = data.findIndex((item) => item.id == id);
    if (index != -1) {
      data[index][field] = event.target.value;
      setEvents(data);
    }
  };

  const updateRecords = async () => {
    let data = await fetch("http://localhost:3000/api/admin/events", {
      method: "PUT",
      body: JSON.stringify({ AllRecords: events }),
    });

    if (data.status == 200) {
      sucessMsg("Data updated sucessfully");
    } else {
      errorMsg("can not update data");
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

  useEffect(() => {
    getAllEvents();
  }, [render]);

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
            Events
          </div>
          <div className="faqs flex flex-col gap-6">
            {events?.map((item, index) => (
              <details
                className="group bg-white rounded-2xl p-5 md:p-6 shadow-sm w-full cursor-pointer"
                key={index}
              >
                <summary className="text-zinc-900 flex items-center justify-between gap-2">
                  <div className="left">
                    <div className="font-semibold text-xl">{item.title}</div>
                    <div className="text-sm text-zinc-500">
                      {item.bookedSeats} / {item.totalSeats} seats booked
                    </div>
                  </div>
                  <div className="right flex items-center gap-4">
                    <button className="text-red-600">
                      <MdDelete
                        size={20}
                        onClick={() => {
                          removeEvent(item.id);
                        }}
                      />
                    </button>
                    <div className="group-open:rotate-180 flex gap-2">
                      <HiOutlineChevronDown size={26} />{" "}
                    </div>
                  </div>
                </summary>
                <div className="faq flex flex-col my-2">
                  <label htmlFor="title">
                    <div className="block pt-4 pb-1.5 text-sm font-semibold text-zinc-600">Title</div>
                    <input
                      type="text"
                      id="title"
                      className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white"
                      value={item.title}
                      onChange={(e) => {
                        updateField(e, item.id, "title");
                      }}
                    />
                  </label>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <label htmlFor="eventDate" className="md:w-1/3">
                      <div className="block pt-4 pb-1.5 text-sm font-semibold text-zinc-600">Date</div>
                      <input
                        type="date"
                        id="eventDate"
                        className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white"
                        value={item.eventDate}
                        onChange={(e) => {
                          updateField(e, item.id, "eventDate");
                        }}
                      />
                    </label>
                    <label htmlFor="eventTime" className="md:w-1/3">
                      <div className="block pt-4 pb-1.5 text-sm font-semibold text-zinc-600">Time</div>
                      <input
                        type="text"
                        id="eventTime"
                        className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white"
                        value={item.eventTime}
                        onChange={(e) => {
                          updateField(e, item.id, "eventTime");
                        }}
                      />
                    </label>
                    <label htmlFor="totalSeats" className="md:w-1/3">
                      <div className="block pt-4 pb-1.5 text-sm font-semibold text-zinc-600">Total Seats</div>
                      <input
                        type="number"
                        id="totalSeats"
                        className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white"
                        value={item.totalSeats}
                        onChange={(e) => {
                          updateField(e, item.id, "totalSeats");
                        }}
                      />
                    </label>
                  </div>
                  <label htmlFor="venue">
                    <div className="block pt-4 pb-1.5 text-sm font-semibold text-zinc-600">Venue</div>
                    <input
                      type="text"
                      id="venue"
                      className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white"
                      value={item.venue}
                      onChange={(e) => {
                        updateField(e, item.id, "venue");
                      }}
                    />
                  </label>
                  <label htmlFor="imageUrl">
                    <div className="block pt-4 pb-1.5 text-sm font-semibold text-zinc-600">Image Url</div>
                    <input
                      type="text"
                      id="imageUrl"
                      className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white"
                      value={item.imageUrl}
                      onChange={(e) => {
                        updateField(e, item.id, "imageUrl");
                      }}
                    />
                  </label>
                  <label htmlFor="description">
                    <div className="block pt-4 pb-1.5 text-sm font-semibold text-zinc-600">Description</div>
                    <textarea
                      id="description"
                      className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white min-h-40"
                      value={item.description}
                      onChange={(e) => {
                        updateField(e, item.id, "description");
                      }}
                    />
                  </label>
                </div>
              </details>
            ))}
          </div>
          <div className="buttons my-6 flex flex-col gap-6">
            <button
              className="outline-dashed outline-2 py-3 rounded-2xl outline-zinc-300 hover:outline-fuchsia-400 hover:text-fuchsia-600 font-semibold flex items-center justify-center text-sm"
              onClick={() => {
                addEvent();
              }}
            >
              {" "}
              <span>
                <IoIosAdd size={26} />
              </span>
              Add Event
            </button>
            <button
              className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-8 rounded-full w-fit self-end"
              onClick={() => {
                updateRecords();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
