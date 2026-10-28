import React from 'react'
import BlogsCmp from '../components/Blogs'
import PageHeader from '../components/PageHeader'

export default function BlogsPage() {
  return (
    <>
      <PageHeader label="Blogs" title="Notes from behind the stage" text="Tips, stories and lessons from the events we have planned." />
      <div className="mt-12">
        <BlogsCmp />
      </div>
    </>
  )
}
