import React from 'react'
import ServicesCmp from '../components/Services'

export default function ServicesPage() {
    return (
        <>
            <div className="h-96 bg-fuchsia-600/80 flex justify-center items-center flex-col mb-6">
                <div className="heading text-white m-auto text-center space-y-3">
                    <div className="heading text-2xl font-bold sm:text-3xl">Want to organize Event ?</div>
                    <div className="para md:text-lg">See the list of services we offer below.</div>
                </div>
                <div className="container bg-white text-center text-2xl font-bold py-4 md:py-6 rounded-t-xl md:rounded-t-3xl text-zinc-800">Services</div>
            </div>
            <ServicesCmp />
        </>
    )
}
