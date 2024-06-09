"use client";

import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function BloodsPage() {
  const [blogs, setBlogs] = useState([]);
  const [render, setRender] = useState(false);

  const getAllBlogs = async () => {
    let res = await fetch("http://localhost:3000/api/blogs");
    let data = await res.json();
    setBlogs(data.data);
  };

  const addFeild = async () => {
    let data = await fetch("http://localhost:3000/api/admin/blogs", {
      method: "POST",
    });

    if (data.status == 200) {
      sucessMsg("feild added sucessfully");
      setRender(!render);
    } else {
      errorMsg("can not add feild");
    }
  };

  const removeFeild = async (id) => {
    let data = await fetch("http://localhost:3000/api/admin/blogs", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (data.status == 200) {
      sucessMsg("feild deleted sucessfully");
      setRender(!render);
    } else {
      errorMsg("can not delete feild");
    }
  };

  const updateTitle = (event, id) => {
    let data = [...blogs];

    let donorIndex = data.findIndex((item) => item._id == id);
    if (donorIndex != -1) {
      data[donorIndex].title = event.target.value;
      setBlogs(data);
    }
  };
  const updateDescription = (event, id) => {
    let data = [...blogs];

    let donorIndex = data.findIndex((item) => item._id == id);
    if (donorIndex != -1) {
      data[donorIndex].description = event.target.value;
      setBlogs(data);
    }
  };
  const updateImageUrl = (event, id) => {
    let data = [...blogs];

    let donorIndex = data.findIndex((item) => item._id == id);
    if (donorIndex != -1) {
      data[donorIndex].imageUrl = event.target.value;
      setBlogs(data);
    }
  };
  const updatePara1 = (event, id) => {
    let data = [...blogs];

    let donorIndex = data.findIndex((item) => item._id == id);
    if (donorIndex != -1) {
      data[donorIndex].para1 = event.target.value;
      setBlogs(data);
    }
  };
  const updatePara2 = (event, id) => {
    let data = [...blogs];

    let donorIndex = data.findIndex((item) => item._id == id);
    if (donorIndex != -1) {
      data[donorIndex].para2 = event.target.value;
      setBlogs(data);
    }
  };
  const updatePara3 = (event, id) => {
    let data = [...blogs];

    let donorIndex = data.findIndex((item) => item._id == id);
    if (donorIndex != -1) {
      data[donorIndex].para3 = event.target.value;
      setBlogs(data);
    }
  };

  const updateRecords = async () => {
    let data = await fetch("http://localhost:3000/api/admin/blogs", {
      method: "PUT",
      body: JSON.stringify({ AllRecords: blogs }),
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
    getAllBlogs();
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
          <div className="heading text-3xl font-semibold text-center my-4">
            Blogs
          </div>
          <div className="faqs flex flex-col gap-6">
            {blogs?.map((item, index) => (
              <details
                className="group border-b-[1px] py-4 border-zinc-300 w-full cursor-pointer"
                key={index}
                open
              >
                <summary className="text-zinc-900 flex items-center justify-between gap-2">
                  <div className="left font-semibold text-xl">{item.title}</div>
                  <div className="right flex items-center gap-4">
                    <button className="text-red-600">
                      <MdDelete
                        size={20}
                        onClick={() => {
                          removeFeild(item._id);
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
                    <div className="py-2 flex items-center justify-between">
                      Title{" "}
                    </div>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full"
                      value={item.title}
                      onChange={(e) => {
                        updateTitle(e, item._id);
                      }}
                    />
                  </label>
                  <label htmlFor="description">
                    <div className="block py-2">Description</div>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full"
                      value={item.description}
                      onChange={(e) => {
                        updateDescription(e, item._id);
                      }}
                    />
                  </label>
                  <label htmlFor="imageUrl">
                    <div className="block py-2">Image Url</div>
                    <input
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full"
                      value={item.imageUrl}
                      onChange={(e) => {
                        updateImageUrl(e, item._id);
                      }}
                    />
                  </label>
                  <label htmlFor="para1">
                    <div className="block py-2">Paragraph 1</div>
                    <textarea
                      type="text"
                      name="para1"
                      id="para1"
                      className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full min-h-40"
                      value={item.para1}
                      onChange={(e) => {
                        updatePara1(e, item._id);
                      }}
                    />
                  </label>
                  <label htmlFor="para2">
                    <div className="block py-2">Paragraph 2</div>
                    <textarea
                      type="text"
                      name="para2"
                      id="para2"
                      className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full min-h-40"
                      value={item.para2}
                      onChange={(e) => {
                        updatePara2(e, item._id);
                      }}
                    />
                  </label>
                  <label htmlFor="para3">
                    <div className="block py-2">Paragraph 3</div>
                    <textarea
                      type="text"
                      name="para3"
                      id="para3"
                      className="px-2 rounded-sm outline-none ring-1 ring-zinc-400 w-full min-h-40"
                      value={item.para3}
                      onChange={(e) => {
                        updatePara3(e, item._id);
                      }}
                    />
                  </label>
                </div>
              </details>
            ))}
          </div>
          <div className="buttons my-4 flex flex-col gap-4">
            <button
              className="outline-dashed outline-1 py-1 rounded-sm outline-zinc-400 flex items-center justify-center text-sm"
              onClick={() => {
                addFeild();
              }}
            >
              {" "}
              <span>
                <IoIosAdd size={26} />
              </span>
              Add Column
            </button>
            <button
              className="bg-zinc-800 text-white py-[2px] px-4 rounded-md w-fit self-end"
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
