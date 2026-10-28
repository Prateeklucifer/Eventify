"use client"

import { useState } from "react"
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function ContactCmp() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

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
    }

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
    }

    const submitRequest = async () => {
        let data = await fetch(`http://localhost:3000/api/contact`, {
            method: "POST",
            body: JSON.stringify({ firstName, lastName, email, phone, message })
        })
        let res = await data.json()
        
        if (data.status == 200) {
            sucessMsg("Enquiry sent, we will contact you soon")
          } else {
            errorMsg("something went wrong")
          }

    }
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
                <div className="right flex flex-col gap-5">
                    <div className="name flex flex-col gap-4 md:flex-row">
                        <div className="firstname md:w-1/2">
                            <label htmlFor="last" className="block mb-2 text-sm font-semibold">First Name <span className="text-red-600">*</span></label>
                            <input type="text" name="" id="last" className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500" value={firstName} onChange={(e) => {
                                setFirstName(e.target.value)
                            }} />
                        </div>
                        <div className="lastname md:w-1/2">
                            <label htmlFor="name" className="block mb-2 text-sm font-semibold">Last Name <span className="text-red-600">*</span></label>
                            <input type="text" name="" id="name" className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500" value={lastName} onChange={(e) => {
                                setLastName(e.target.value)
                            }} />
                        </div>
                    </div>

                    <div className="email">
                        <label htmlFor="email" className="block mb-2 text-sm font-semibold">Email <span className="text-red-600">*</span></label>
                        <input type="email" name="" id="email" className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>
                    <div className="phone">
                        <label htmlFor="phone" className="block mb-2 text-sm font-semibold">Phone number</label>
                        <input type="number" name="" id="phone" className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500" value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                    </div>
                    <div className="messege">
                        <label htmlFor="msg" className="block mb-2 text-sm font-semibold">Message <span className="text-red-600">*</span></label>
                        <textarea name="" id="msg" className="w-full h-52 px-2 py-1 outline-fuchsia-400 outline-1 ring-1 rounded-sm ring-zinc-400" value={message} onChange={(e) => {
                            setMessage(e.target.value)
                        }}></textarea>
                    </div>

                    <button className="text-white px-6 py-3 rounded-full bg-fuchsia-500 hover:bg-fuchsia-600 w-full sm:w-fit font-bold" onClick={() => {
                        submitRequest()
                    }}>Send enquiry</button>

                </div>
            </div>
        </>
    )
}