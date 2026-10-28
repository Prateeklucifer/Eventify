import React from 'react'
import Contact from '../components/Contact'
import PageHeader from '../components/PageHeader'

export default function ContactPage() {
    return (
        <>
            <PageHeader label="Contact us" title="Want to organise an event?" text="Tell us what you are planning and we will help you put it together." />
            <div className="container m-auto px-4 mt-16 grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="font-code text-xs uppercase tracking-widest text-fuchsia-600 mb-2">What to tell us</div>
                        <p className="text-zinc-600">The type of event, a rough date, how many guests you expect and your budget. Even if you only have an idea, that is a good place to start.</p>
                    </div>
                    <div>
                        <div className="font-code text-xs uppercase tracking-widest text-fuchsia-600 mb-2">What happens next</div>
                        <p className="text-zinc-600">Someone from our team will call or email you to talk it through. There is no charge for the first conversation.</p>
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <Contact />
                </div>
            </div>
        </>
    )
}
