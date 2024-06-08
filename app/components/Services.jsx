"use client"

import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import AboutSuspense from './suspense/AboutSuspense'

export default function ServicesCmp() {

    const [services, setServices] = useState(undefined)

    const getServices = async () => {
        let res = await fetch('http://localhost:3000/api/services')
        let data = await res.json()
        setServices(data.data)
    }

    useEffect(() => {
        getServices()
    }, [])

    return (
        <div>
            <div className="mt-8 px-4 container m-auto lg:px-44">
                {services ? <div className="space-y-20 my-8">
                    <div className="flex flex-col xl:flex-row md:items-center md:justify-center ">
                        <div className="left lg:pr-8 w-full">
                            <div className="heading text-2xl md:text-3xl font-bold my-6">{services[0].mainTitle}</div>
                            <div className="mt-4">{services[0].para1}</div>
                            <div className="mt-4">{services[0].para2}</div>
                        </div>
                    </div>
                    <div className="mission">
                        <div className="heading text-2xl md:text-3xl font-bold my-6 text-center">Services</div>
                        <div className="sevices space-y-10">
                            <div className="flex flex-col xl:flex-row-reverse xl:items-center">
                                <div className="left xl:w-[60%] lg:pl-8">
                                    <div className="heading text-2xl md:text-3xl font-bold my-6">{services[0].secondaryTitle}</div>
                                    <div className="mt-4">{services[0].para3}</div>
                                    <div className="mt-4">{services[0].para4}</div>
                                </div>
                                <div className="text-center mt-6 xl:w-[40%] xl:rounded-lg overflow-hidden">
                                    <Image src="/w-1.png" width={800} height={800} />
                                </div>
                            </div>
                            <div className="flex flex-col xl:flex-row xl:items-center">
                                <div className="left xl:w-[60%] lg:pr-8">
                                    <div className="heading text-2xl md:text-3xl font-bold my-6">{services[0].thirdTitle}</div>
                                    <div className="mt-4">{services[0].para5}</div>
                                    <div className="mt-4">{services[0].para6}</div>
                                </div>
                                <div className="text-center mt-6 xl:w-[40%] xl:rounded-lg overflow-hidden">
                                    <Image src="/w-1.png" width={800} height={800} />
                                </div>
                            </div>
                            <div className="flex flex-col xl:flex-row-reverse xl:items-center">
                                <div className="left xl:w-[60%] lg:pl-8">
                                    <div className="heading text-2xl md:text-3xl font-bold my-6">{services[0].Title}</div>
                                    <div className="mt-4">{services[0].para7}</div>
                                    <div className="mt-4">{services[0].para8}</div>
                                </div>
                                <div className="text-center mt-6 xl:w-[40%] xl:rounded-lg overflow-hidden">
                                    <Image src="/w-1.png" width={800} height={800} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <AboutSuspense />}

            </div>
        </div>
    )
}
