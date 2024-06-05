import React from 'react'
import BlogsCmp from '../components/Blogs'

export default function BlogsPage() {
  
  return (
    <>
    <div className="h-96 bg-fuchsia-600/80 flex justify-center items-center flex-col mb-6">
        <div className="text-white m-auto text-center space-y-3 px-4">
            <div className="heading text-2xl font-bold sm:text-3xl">Read Blogs of Professionals</div>
            <div className="para md:text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
        </div>
        <div className="container bg-white text-center text-3xl font-bold py-4 md:py-6 rounded-t-xl md:rounded-t-3xl text-zinc-800">All Blogs</div>
    </div>
    <BlogsCmp/>
</>
  )
}
