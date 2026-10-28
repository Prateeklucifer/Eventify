import React from "react";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
  return (
    <div className="md:ml-[25%] lg:ml-[20%] xl:ml-[16.66%] py-6 md:py-10 md:px-6 w-full max-w-6xl">
      {" "}
      {children}
    </div>
  );
}
