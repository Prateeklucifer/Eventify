"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventContent({ params }) {
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [found, setFound] = useState(undefined)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [seats, setSeats] = useState(1)

    const getData = async () => {
        let res = await fetch('http://localhost:3000/api/event', {
            method: "POST",
            body: JSON.stringify({ id: params.slug })
        })

        let data = await res.json()

        setData(data.data)
        setLoading(false)

        if (res.status == 200) {
            setFound(true)
        } else {
            setFound(false)
        }
    }

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

    const registerNow = async () => {
        let res = await fetch('http://localhost:3000/api/register', {
            method: "POST",
            body: JSON.stringify({ eventId: params.slug, name, email, phone, seats })
        })
        let result = await res.json()

        if (res.status == 200) {
            sucessMsg("registered sucessfully")
            setName("")
            setEmail("")
            setPhone("")
            setSeats(1)
            getData()
        } else if (res.status == 403) {
            errorMsg("please fill all details correctly")
        } else {
            errorMsg(result.message)
        }
    }

    function dateGiver(date) {
        let data = date.split("-")
        return data[2] + "/" + data[1] + "/" + data[0]
    }

    useEffect(() => {
        setLoading(true)
        getData()
    }, [])

    let seatsLeft = found ? data[0].totalSeats - data[0].bookedSeats : 0
    let isOver = found ? data[0].eventDate < new Date().toISOString().split("T")[0] : false

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
            {loading ? <div className="h-[50vh] flex items-center justify-center">Loading</div> :
                found ?
                    <div className="md:px-4 my-12">
                        <div className="container px-4 md:px-0 m-auto flex flex-col lg:flex-row gap-10 lg:px-28 xl:px-36 2xl:px-48">
                            <div className="left lg:w-3/5">
                                <h1 className="font-display uppercase text-4xl md:text-6xl leading-none">{data[0].title}</h1>
                                <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 mt-4 text-zinc-600">
                                    <div className="flex items-center gap-2"><IoCalendarOutline />{dateGiver(data[0].eventDate)}{data[0].eventTime && `, ${data[0].eventTime}`}</div>
                                    <div className="flex items-center gap-2"><IoLocationOutline />{data[0].venue}</div>
                                </div>
                                <Image src={`/${data[0].imageUrl}`} width={800} height={500} className="rounded-2xl mt-8 w-full object-cover" />
                                <div className="para mt-6 whitespace-pre-line">{data[0].description}</div>
                            </div>

                            <div className="right lg:w-2/5">
                                <div className="bg-mist rounded-2xl p-5 md:p-7 flex flex-col gap-4 lg:sticky lg:top-28">
                                    <div className="font-display uppercase text-3xl">Book your seat</div>
                                    <div className="text-sm">
                                        {isOver ? <span className="text-zinc-500">This event is over</span> :
                                            seatsLeft > 0 ? <span className="text-fuchsia-600 font-semibold">{seatsLeft} out of {data[0].totalSeats} seats left</span>
                                                : <span className="text-red-600 font-semibold">Housefull</span>}
                                    </div>

                                    {!isOver && seatsLeft > 0 && <>
                                        <div className="name">
                                            <label htmlFor="name" className="block mb-2 text-sm font-semibold">Name <span className="text-red-600">*</span></label>
                                            <input type="text" id="name" className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500" value={name} onChange={(e) => {
                                                setName(e.target.value)
                                            }} />
                                        </div>
                                        <div className="email">
                                            <label htmlFor="email" className="block mb-2 text-sm font-semibold">Email <span className="text-red-600">*</span></label>
                                            <input type="email" id="email" className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500" value={email} onChange={(e) => {
                                                setEmail(e.target.value)
                                            }} />
                                        </div>
                                        <div className="phone">
                                            <label htmlFor="phone" className="block mb-2 text-sm font-semibold">Phone number <span className="text-red-600">*</span></label>
                                            <input type="number" id="phone" className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500" value={phone} onChange={(e) => {
                                                setPhone(e.target.value)
                                            }} />
                                        </div>
                                        <div className="seats">
                                            <label htmlFor="seats" className="block mb-2 text-sm font-semibold">No. of seats</label>
                                            <input type="number" id="seats" min={1} max={seatsLeft} className="w-full px-3 py-2.5 rounded-lg ring-1 ring-zinc-300 outline-none focus:ring-2 focus:ring-fuchsia-500" value={seats} onChange={(e) => {
                                                setSeats(e.target.value)
                                            }} />
                                        </div>
                                        <button className="text-white px-6 py-3 rounded-full bg-fuchsia-500 hover:bg-fuchsia-600 w-full font-bold" onClick={() => {
                                            registerNow()
                                        }}>Register</button>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div> : <div className="h-[50vh] flex items-center justify-center">Event not found</div>
            }
        </>
    )
}
