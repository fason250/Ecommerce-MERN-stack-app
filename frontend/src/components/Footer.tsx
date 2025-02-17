import { Link } from "react-router-dom"
import { assets } from "../assets/assets"



function Footer() {

    const handlePhone = () => {
        window.open('https://wa.me/250792330514', '_blank')
    }
    return (
        <footer>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.logo} alt="logo" className="mb-5 w-40" />
                    <p className="w-full md:w-2/3 text-gray-600">Explore premium collections that elevate your lifestyle. At <strong>LuxuryAura</strong>, we believe in offering exclusive, high-quality products that cater to your unique tastes.
                        Join our community and experience elegance, sophistication, and unmatched luxury.</p>
                </div>
                <div>
                    <p className="uppercase text-xl font-medium mb-5">Company</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <Link to="/">Home</Link>
                        <Link to="/about">About Us</Link>
                        <Link to="">Delivery Information</Link>
                        <Link to="">Privacy & Policy</Link>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">Get in Touch</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li onClick={handlePhone} className="cursor-pointer">+250 792 330 514</li>
                        <Link to="mailto:jeyfason25@gmail.com">jeyfason25@gmail.com</Link>
                    </ul>
                </div>

            </div>
            <div>
                <hr className="text-gray-300" />
                <p className="py-5 text-sm text-center">Copyright {new Date().getFullYear()}&copy; Jey Fason Ltd - All Rights Reserved</p>
            </div>

        </footer>
    )
}

export default Footer