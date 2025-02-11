import { assets } from "../assets/assets"
import NewsLetter from "../components/NewsLetter"
import PageTitle from "../components/PageTitle"

function Contact() {
  return (
    <>
      <div className="text-center text-2xl pt-10">
        <PageTitle text1="contact" text2="us"/>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
        <img src={assets.contact_img} alt="contact image" className="w-full md:max-w-md" /> 
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">142st KN Gs <br /> Kigali ,Gasabo District</p>
          <p className="text-gray-500">Tel: +250 798 483 994 <br /> Email: contactUs@foreverCollection.com</p>
          <p className="text-gray-600 font-semibold text-xl">Careers at Forever Collection</p>
          <p className="text-gray-500">Learn More About Jobs</p>
          <button className="border bg-black rounded-sm text-white px-8 py-4 text-sm hover:bg-gray-800">Explore Jobs</button>
        </div>
      </div>
      <NewsLetter />
    </>
  )
}

export default Contact