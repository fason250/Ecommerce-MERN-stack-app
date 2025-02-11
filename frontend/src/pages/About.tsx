import { assets } from "../assets/assets"
import NewsLetter from "../components/NewsLetter"
import PageTitle from "../components/PageTitle"

function About() {
  return (
    <section>
      <div className="text-2xl text-center pt-8">
        <PageTitle  text1="about" text2="us"/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img 
        src={assets.about_img} 
        alt="about image" 
        className="w-full md:max-w-md"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className=" mb-4">
            Welcome to <strong>Forever Design</strong> – where timeless style meets modern craftsmanship. At Forever Design, we are dedicated to bringing you carefully curated collections that elevate your lifestyle and celebrate the beauty of design that stands the test of time.
          </p>
  
          <p className="">
            Whether you're looking for elegant home decor, stylish accessories, or unique pieces that reflect your personality, we've got you covered. Our mission is simple: to provide high-quality, stylish products that inspire creativity and make a lasting impact.</p>
          
          <strong className="text-gray-800 ">Our Mission</strong>
          <p>At Forever Design, our mission is to bring timeless, high-quality design to your everyday life. We curate products that inspire creativity, enhance spaces, and stand the test of time. We’re dedicated to offering stylish, sustainable, and functional pieces that make a lasting impact on your home and lifestyle.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <PageTitle text1="Why" text2="choose us"/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Quality Assurance</strong>
          <p className="text-gray-600">At Forever Design, quality is at the heart of everything we do. Each product is carefully sourced and rigorously tested to ensure it meets the highest standards of craftsmanship and durability. From the materials we select to the final finishing touches, we are committed to delivering products that are not only beautiful but built to last. Shop with confidence knowing that we stand behind every piece we offer.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Convenience</strong>
          <p className="text-gray-600">At Forever Design, we believe that shopping should be effortless. With an easy-to-navigate website, fast and reliable shipping, and hassle-free returns, we make your shopping experience as smooth as possible. Whether you're browsing from home or on the go, our goal is to provide you with a convenient, stress-free experience every step of the way.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Exceptional customer service</strong>
          <p className="text-gray-600">At Forever Design, we pride ourselves on delivering outstanding customer service. Our team is dedicated to providing personalized assistance and ensuring your satisfaction every step of the way. Whether you have questions, need support with an order, or simply want advice on products, we’re here to help. We go the extra mile to make sure every customer feels valued and heard.</p>
        </div>
      </div>

      <NewsLetter />

    </section>
  )
}

export default About