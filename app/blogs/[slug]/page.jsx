"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function BloagContent({ params }) {
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [found, setFound] = useState(undefined)

    const getData = async () => {
        let res = await fetch('http://localhost:3000/api/blog', {
            method: "POST",
            body: JSON.stringify({ id: params.slug })
        })

        let data = await res.json()

        setData(data.data)
        setLoading(false)

        if (res.status == 200) {
            setFound(true)
        } else {
            setFound(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        getData()
    }, [])

    // console.log(router.query.slug)

    return (

        <>
            {loading ? <div className="h-[50vh] flex items-center justify-center">Loading</div> :
                found ?
                    <div className="md:px-4 my-12 md:my-16">
                        <div className="container px-4 md:px-0 m-auto max-w-3xl">
                            <Link href={"/blogs"} className="font-code text-xs uppercase tracking-widest text-fuchsia-600 hover:underline">&larr; All blogs</Link>
                            <h1 className="font-display uppercase text-4xl md:text-6xl leading-none mt-4">{data[0].title}</h1>
                            <div className="para text-lg text-zinc-600 mt-5">{data[0].description}</div>
                            <Image src={`/${data[0].imageUrl}`} width={800} height={530} alt={data[0].title} className="rounded-2xl w-full object-cover mt-8" />
                            <div className="content space-y-6 mt-10 text-lg leading-relaxed text-zinc-700">
                                <p>{data[0].para1}</p>
                                <p>{data[0].para2}</p>
                                <p>{data[0].para3}</p>
                            </div>
                        </div>
                    </div> : <div className="h-[50vh] flex items-center justify-center">Blog not found</div>
            }

        </>
    )
}
