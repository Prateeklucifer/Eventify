"use client";

import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function AdminFeatures() {
  const [Teams, setTeams] = useState([]);
  const [render, setRender] = useState(false);

  const getTeams = async () => {
    let res = await fetch("http://localhost:3000/api/team");
    let data = await res.json();
    setTeams(data.data);
  };

  const addMember = async () => {
    let res = await fetch("http://localhost:3000/api/admin/team", {
      method: "POST",
    });

    if (res.status == 200) {
      sucessMsg("member added sucessfully");
      setRender(!render);
    } else {
      errorMsg("can not add member");
    }
  };

  const removeMember = async (id) => {
    let res = await fetch("http://localhost:3000/api/admin/team", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (res.status == 200) {
      sucessMsg("member removed sucessfully");
      setRender(!render);
    } else {
      errorMsg("can not remove member");
    }
  };

  const updateName = (event, index) => {
    let newData = [...Teams];
    newData[index].name = event.target.value;
    setTeams(newData);
  };

  const updateImageURL = (event, index) => {
    let newData = [...Teams];
    newData[index].imageURL = event.target.value;
    setTeams(newData);
  };

  const updateData = async () => {
    let res = await fetch("http://localhost:3000/api/admin/team", {
      method: "PUT",
      body: JSON.stringify({ AllRecords: Teams }),
    });

    if (res.status == 200) {
      sucessMsg("updated sucessfully");
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

  useEffect(() => {
    getTeams();
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
      <div className="w-full">
        <div className="container m-auto px-4 md:px-0 ">
          <div className="heading font-display uppercase text-4xl md:text-5xl mt-2 mb-8">
            All Teams
          </div>
          <div className="faqs flex flex-col gap-6">
            {Teams?.map((item, index) => (
              <div className="faq flex flex-col bg-white rounded-2xl p-5 md:p-6 shadow-sm" key={index}>
                <label htmlFor="name">
                  <div className="pt-4 pb-1.5 text-sm font-semibold text-zinc-600 flex items-center justify-between">
                    Name
                    <button
                      className="text-red-600"
                      onClick={() => {
                        removeMember(item.id);
                      }}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white"
                    value={item.name}
                    onChange={(e) => {
                      updateName(e, index);
                    }}
                  />
                </label>
                <label htmlFor="para1">
                  <div className="block pt-4 pb-1.5 text-sm font-semibold text-zinc-600">Image Url</div>
                  <input
                    name="para1"
                    id="para1"
                    className="px-3 py-2 rounded-lg outline-none ring-1 ring-zinc-300 focus:ring-2 focus:ring-fuchsia-500 w-full bg-white"
                    value={item.imageURL}
                    onChange={(e) => {
                      updateImageURL(e, index);
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
          <div className="buttons my-6 flex flex-col gap-6">
            <button
              className="outline-dashed outline-2 py-3 rounded-2xl outline-zinc-300 hover:outline-fuchsia-400 hover:text-fuchsia-600 font-semibold flex items-center justify-center text-sm"
              onClick={() => {
                addMember();
              }}
            >
              <span>
                <IoIosAdd size={26} />
              </span>
              Add Member
            </button>
            <button
              className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-8 rounded-full w-fit self-end"
              onClick={() => {
                updateData();
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
