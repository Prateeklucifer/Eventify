import React from 'react'
import ServicesCmp from '../components/Services'
import PageHeader from '../components/PageHeader'

export default function ServicesPage() {
    return (
        <>
            <PageHeader label="Services" title="Everything your event needs" text="Pick the parts you need help with, or hand the whole thing over to us." />
            <ServicesCmp />
        </>
    )
}
