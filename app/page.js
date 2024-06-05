import Image from "next/image";
import Hero from "./components/Hero";
import ContactCmp from "./components/Contact";
import ServicesCmp from "./components/Services";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="md:px-4 mt-24">
        <div className="container m-auto px-4 md:px-0">
          <div className="text-2xl text-center font-bold mt-8">Services we provide</div>
        </div>
      </div>

      <ServicesCmp />

      <div className="md:px-4 mt-24">
        <div className="container m-auto px-4 md:px-0">
          <div className="text-2xl text-center font-bold">Contact Us</div>
        </div>
      </div>

      <ContactCmp />
    </>
  );
}
