import { assets } from "../assets/assets"
import NewsLetter from "../components/NewsLetter"
import PageTitle from "../components/PageTitle"

function About() {
  return (
    <section>
      <div className="text-2xl text-center pt-8">
        <PageTitle text1="about" text2="us" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about image"
          className="w-full md:max-w-md"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className=" mb-2">
            <strong className="text-gray-800 mb-2 block">Welcome to LuxuryAura – Where Luxury Meets Timeless Craftsmanship</strong>
            <span>At LuxuryAura, we believe in curating extraordinary collections that transform your lifestyle with elegance and sophistication. Every product we offer is a celebration of design, quality, and craftsmanship that lasts.</span>
          </p>

          <p className="">
            Whether you’re upgrading your home decor, adding that perfect accessory, or finding unique pieces that reflect your individuality, LuxuryAura is here to make every moment feel special. Our mission is simple: to provide timeless, high-quality pieces that inspire, enhance, and make a lasting impression.</p>

          <strong className="text-gray-800 mb-2">Our Mission</strong>
          <p>We’re here to bring you luxury that endures. At LuxuryAura, we handpick items that not only elevate your spaces but also spark creativity and inspire you. From sustainable designs to exceptional craftsmanship, we strive to offer pieces that leave a lasting mark on your home and lifestyle.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <PageTitle text1="Why" text2="choose us" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Uncompromising Quality</strong>
          <p className="text-gray-600">At LuxuryAura, we’re dedicated to offering products that stand the test of time. Each piece is meticulously sourced and rigorously tested to meet our high standards of craftsmanship and durability. From premium materials to fine finishing, we ensure that every product is not only stunning but also built to last. Shop with confidence – we stand behind everything we offer.</p>
        </div>
        <div className="border border-x-0 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Seamless Shopping Experience</strong>
          <p className="text-gray-600">We believe in making your shopping journey as effortless as possible. With our user-friendly website, fast shipping, and hassle-free returns, we’re here to provide you with a smooth and enjoyable experience. Whether you’re shopping from the comfort of your home or on the go, we make sure it’s easy to find what you love.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <strong>Exceptional Customer Care</strong>
          <p className="text-gray-600">At LuxuryAura, customer satisfaction is our top priority. Our friendly and knowledgeable team is always here to offer personalized support, whether you have questions, need help with an order, or are looking for product recommendations. We go the extra mile to ensure every customer feels valued and heard.</p>
        </div>
      </div>

      <NewsLetter />

    </section>
  )
}

export default About