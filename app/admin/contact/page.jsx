"use client";

import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function AdminContactPage() {
  const [contact, setContact] = useState([]);
  const [render, setRender] = useState(false);

  const getAllContact = async () => {
    let res = await fetch("http://localhost:3000/api/admin/contact");
    let data = await res.json();
    setContact(data.data);
  };

  const updateStatus = async (id, action) => {
    let string = JSON.stringify({id:id, action: action})
    console.log(string)
    let res = await fetch("http://localhost:3000/api/admin/contact",{
      method: "POST",
      body: string
    });
    if(res.status == 200){
      setRender(!render)
    }
  };

  const deleteItem = async (index) => {
    let newData = [...contact];
    // newData.splice(index, 1)

    let data = await fetch("http://localhost:3000/api/admin/contact", {
      method: "DELETE",
      body: JSON.stringify({ id: newData[index].id }),
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

  function dateGiver(date){

    let data = date.split("-")

    let newdate = data[2].substring(0,2)+"/"+data[1]+"/"+data[0]

    return newdate
  }

  useEffect(() => {
    getAllContact();
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
      <div className="md:px-4">
        <div className="container m-auto my-2 px-4 md:px-0">
          <div className="heading font-display uppercase text-4xl md:text-5xl mt-2 mb-8">
            All Enquiries
          </div>
          <div className="data my-4 text-zinc-800 flex flex-col gap-4">
            {contact.length >= 0 &&
              contact.map((item, index) => (
                <div
                  key={item.id}
                  className={`box flex flex-col bg-white rounded-2xl p-5 md:p-6 shadow-sm border-l-4 ${item.actionTaken ? "border-green-500" : "border-fuchsia-500"}`}
                >
                  <div className="top flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="text-lg font-bold text-zinc-900">
                        {item.firstName} {item.lastName}
                      </div>
                      <div className="font-code text-xs text-zinc-500 mt-1">
                        {dateGiver(item.createdAt)} &middot;{" "}
                        {item.actionTaken ? <span className="text-green-600">Done</span> : <span className="text-fuchsia-600">Pending</span>}
                      </div>
                    </div>
                    <div className="btns flex items-center gap-2">
                      <button
                        title={item.actionTaken ? "Mark as pending" : "Mark as done"}
                        className={`p-1.5 rounded-full ${item.actionTaken ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500 hover:bg-green-100 hover:text-green-700"}`}
                        onClick={() => {
                          updateStatus(item.id, item.actionTaken);
                        }}
                      >
                        <TiTick size={22} />
                      </button>
                      <button
                        title="Delete"
                        className="p-1.5 rounded-full text-zinc-400 hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          deleteItem(index);
                        }}
                      >
                        <MdDelete size={22} />
                      </button>
                    </div>
                  </div>
                  <div className="text-zinc-700">{item.message}</div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm text-zinc-500">
                    <a href={`mailto:${item.email}`} className="hover:text-fuchsia-600">{item.email}</a>
                    {item.phone && <a href={`tel:${item.phone}`} className="hover:text-fuchsia-600">{item.phone}</a>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
