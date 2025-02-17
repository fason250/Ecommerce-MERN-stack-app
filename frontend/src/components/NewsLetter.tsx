import { FormEvent } from "react"


function NewsLetter() {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()


    }

    return (
        <section className="text-center">
            <p className="text-2xl font-medium tex-gray-800">Subscribe now & get <span className="text-red-500">20%</span> off</p>
            <p className="text-gray-400 mt-3">Stay updated with our latest arrivals, exclusive offers, and insider news. Subscribe to our newsletter and be the first to know about all the exciting things happening at <span className="font-semibold text-gray-900 ">LuxuryAura</span>. Join our community and enjoy special discounts right in your inbox!</p>
            <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input
                    type="email"
                    placeholder="Enter your Email"
                    className="w-full sm:flex-1 outline-none"
                    required
                />
                <button className="bg-black text-white text-sm px-10 py-4 uppercase">Subscribe</button>
            </form>
        </section>
    )
}

export default NewsLetter