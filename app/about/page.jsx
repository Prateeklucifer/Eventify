import React from 'react'
import About from '../components/About'

export default function AboutPage() {
    return (
        <>
            <div className="h-96 bg-fuchsia-600/80 flex justify-center items-center flex-col mb-6">
                <div className="heading text-white m-auto text-center space-y-3">
                    <div className="heading text-2xl font-bold sm:text-3xl">Who are we ?</div>
                    <div className="para md:text-lg">We are a team of passinate people who loves to manage and organize events.</div>
                </div>
                <div className="container bg-white text-center text-2xl font-bold py-4 md:py-6 rounded-t-xl md:rounded-t-3xl text-zinc-800">About Us</div>
            </div>
            <About/>
        </>
    )
}
