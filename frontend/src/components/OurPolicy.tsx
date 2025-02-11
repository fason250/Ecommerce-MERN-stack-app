import { assets } from "../assets/assets"


interface PoliciesType {
    id: number;
    image: string;
    title: string;
    subTitle: string;
}

function OurPolicy() {
    const policies:PoliciesType[] = [
        { id: 1, image: assets.exchange_icon, title: "Easy Exchange policy",subTitle:"We offer hassle free exchange policy"},
        { id: 2, image: assets.quality_icon, title: "7 days Return Policy",subTitle:"We Provide 7 Days free returning Policy"},
        { id:3, image: assets.support_img, title: "Best customer support",subTitle:"We Provide 24/7 customer support"}
    ]
  return (
    <section className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center text-xs sm:text-sm md:text-base text-gray-700 my-10">
    {
        policies.map( policy => (
            <div key={policy.id}>
                <img src={policy.image} alt="exchange icon"  className="w-12 m-auto mb-5"/>
                <p className="font-semibold">{policy.title}</p>
                <p className="text-gray-400">{policy.subTitle}</p>
            </div>
        ))
    }
       
    </section>
  )
}

export default OurPolicy