import React from 'react'
import EventsCmp from '../components/Events'
import PageHeader from '../components/PageHeader'

export default function EventsPage() {
  return (
    <>
      <PageHeader label="Events" title="Grab a seat before it's gone" text="Events we are organising this season. Pick one, book your seats, and we will see you there." />
      <div className="bg-mist py-16">
        <EventsCmp />
      </div>
    </>
  )
}
