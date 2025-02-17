/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { assets, type AssetsType } from "../assets/assets"


function Hero() {
    const [heroImage, setHeroImage] = useState<string>(assets.hero_img_4)

    const heroImagesUrl = (assets: AssetsType) => {
        return Object.entries(assets)
            .filter(([key, value]) => key.startsWith("hero_img") && typeof value === 'string')
            .map(([, value]) => value)
    }
    const images = heroImagesUrl(assets)

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length)
        setHeroImage(images[randomIndex])
    }


    useEffect(() => {

        const imageChangeInterval = setInterval(() => {
            getRandomImage()
            console.log("image changed")
        }, 600000)

        return () => {
            clearInterval(imageChangeInterval)
        }
    }, [])

    return (
        <main className="flex flex-col sm:flex-row border border-gray-400">
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className="uppercase font-medium text-sm md:text-base">Our BestSellers</p>
                    </div>
                    <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed prata-regular">Latest Arrival</h1>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base uppercase">ShoP NOW</p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>

            <div className="w-full sm:w-1/2">
                <img
                    src={heroImage}
                    className="w-full  object-cover max-h-[80vh] "
                    alt="hero image"
                    loading="lazy"
                    style={{
                        objectPosition: 'center center'
                    }}
                />
            </div>
        </main>
    )
}

export default Hero