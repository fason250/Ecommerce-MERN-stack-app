import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import NewsLetter from "../components/NewsLetter"
import OurPolicy from "../components/OurPolicy"

function Home() {

  return (
    <section className=" w-full min-h-screen">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetter />
    </section>
  )
}

export default Home