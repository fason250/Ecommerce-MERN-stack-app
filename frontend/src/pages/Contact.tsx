import { assets } from "../assets/assets"
import NewsLetter from "../components/NewsLetter"
import PageTitle from "../components/PageTitle"

function Contact() {
  return (
    <>
      <div className="text-center text-2xl pt-10">
        <PageTitle text1="contact" text2="us" />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20">
        <img src={assets.contact_img} alt="contact image" className="w-full md:max-w-md" />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="font-semibold text-xl text-gray-600">visit Our Store</p>
          <p className="text-gray-500">KG 14 Street <br /> Kigali | Gasabo | District</p>
          <p className="text-gray-500">Phone: +250 792 330 514 <br /> Email: contactUs@luxuryAura.com</p>
          <p className="text-gray-600 font-semibold text-xl">Careers at LuxuryAura</p>
          <p className="text-gray-500">Explore Opportunities & Join Our Team</p>
          <button className="border bg-black rounded-sm text-white px-8 py-4 text-sm hover:bg-gray-800">Explore Jobs</button>
        </div>
      </div>
      <NewsLetter />
    </>
  )
}

export default Contact