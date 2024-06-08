import React from 'react'

export default function Hero() {
    return (
        <div className="flex items-center flex-col md:flex-row">
            <div class="left md:w-1/2 md:flex justify-center items-start flex-col py-14 px-4 lg:px-16 xl:px-24">
                <div class="md:text-4xl text-3xl text-zinc-800 py-2 font-bold md:px-8">
                    Craft Your Dream Event. We Take Care of the Details.
                </div>
                <div class="text-lg md:text-xl md:px-8 pt-3 text-zinc-700 py-2 ">
                    Turn your vision into a reality. We are a full-service event management company dedicated to creating unforgettable experiences. From concept to execution, we handle everything - venue sourcing, vendor coordination, logistics, and more. Let us make your event a success, so you can focus on enjoying the moment.
                </div>
                <div className="flex justify-start items-center gap-4 md:px-8">
                    <button class="flex px-2 py-2 bg-fuchsia-500 text-white rounded-md mt-5 hover:bg-fuchsia-600/70">
                        Contact Us
                    </button>
                    <button class="flex p-2 rounded-md mt-5 hover:bg-zinc-100">
                        Know more<span class=" ml-2 mt-[1px]">&rarr;</span>
                    </button>
                </div>
            </div>
            <div className="right flex justify-center items-center md:w-1/2 ">
                <img src="/image.png" alt="" className="object-cover md:rounded-none h-[30rem] md:w-full md:h-full" />
            </div>
        </div>
    )
}
