import Link from "next/link";
import Hero from "./components/Hero";
import ContactCmp from "./components/Contact";
import TeamsCmp from "./components/Team";
import EventsCmp from "./components/Events";

export default function Home() {
  const kinds = [
    { name: "Weddings", price: "1,50,000", image: "/s_featured1.png" },
    { name: "Concerts", price: "3,00,000", image: "/s_featured2.png" },
    { name: "Birthday parties", price: "50,000", image: "/s_featured3.png" },
  ];

  return (
    <>
      <Hero />

      <section className="container m-auto px-4 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-code text-xs uppercase tracking-widest text-fuchsia-600 mb-3">What we organise</div>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-none">Big days, small details</h2>
          </div>
          <Link href={"/services"} className="font-bold hover:text-fuchsia-600">All services &rarr;</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {kinds.map((item) => (
            <Link href={"/services"} key={item.name} className="group relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[3/4]">
              <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="font-display uppercase text-3xl">{item.name}</div>
                <div className="font-code text-sm text-amber-300 mt-1">starts at &#8377;{item.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-mist py-20 md:py-28">
        <div className="container m-auto px-4 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-code text-xs uppercase tracking-widest text-fuchsia-600 mb-3">Open for booking</div>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-none">Upcoming events</h2>
          </div>
          <Link href={"/events"} className="font-bold hover:text-fuchsia-600">See all events &rarr;</Link>
        </div>
        <EventsCmp limit={3} />
      </section>

      <section className="container m-auto px-4 py-20 md:py-28">
        <div className="font-code text-xs uppercase tracking-widest text-fuchsia-600 mb-3">Our team</div>
        <h2 className="font-display uppercase text-4xl md:text-6xl leading-none mb-10">The people you will be working with</h2>
        <TeamsCmp />
      </section>

      <section className="container m-auto px-4 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <div className="font-code text-xs uppercase tracking-widest text-fuchsia-600 mb-3">Contact us</div>
          <h2 className="font-display uppercase text-4xl md:text-6xl leading-none">Tell us what you're planning</h2>
          <p className="text-zinc-600 mt-5 max-w-md">
            Share a few details about your event and someone from our team will get back to you.
          </p>
        </div>
        <div className="lg:col-span-3">
          <ContactCmp />
        </div>
      </section>
    </>
  );
}
