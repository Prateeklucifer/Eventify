import React from 'react'
import About from '../components/About'
import PageHeader from '../components/PageHeader'

export default function AboutPage() {
    return (
        <>
            <PageHeader label="About us" title="Who are we?" text="A team of people who love planning and organising events." />
            <About/>
        </>
    )
}
