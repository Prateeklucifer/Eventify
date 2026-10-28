import React from 'react'
import EventsCmp from '../components/Events'

export default function EventsPage() {
  return (
    <>
    <div className="h-96 bg-fuchsia-600/80 flex justify-center items-center flex-col mb-6">
        <div className="text-white m-auto text-center space-y-3 px-4">
            <div className="heading text-2xl font-bold sm:text-3xl">Upcoming Events</div>
            <div className="para md:text-lg">Find an event you like and book your seat.</div>
        </div>
        <div className="container bg-white text-center text-3xl font-bold py-4 md:py-6 rounded-t-xl md:rounded-t-3xl text-zinc-800">All Events</div>
    </div>
    <EventsCmp/>
</>
  )
}
