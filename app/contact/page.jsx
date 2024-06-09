import React from 'react'
import Contact from '../components/Contact'

export default function ContactPage() {
    return (
        <>
            <div className="h-96 bg-fuchsia-600/80 flex justify-center items-center flex-col mb-6">
                <div className="heading text-white m-auto text-center space-y-3">
                    <div className="heading text-2xl font-bold sm:text-3xl">Want to organize Event ?</div>
                    <div className="para md:text-lg">Connect with us and we will help you to organize an event.</div>
                </div>
                <div className="container bg-white text-center text-2xl font-bold py-4 md:py-6 rounded-t-xl md:rounded-t-3xl text-zinc-800">Contact Us</div>
            </div>
            <Contact/>
        </>
    )
}
