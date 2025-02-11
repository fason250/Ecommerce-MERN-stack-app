import { assets } from "../assets/assets"



function Footer() {
  return (
    <footer>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                <img src={assets.logo} alt="logo" className="mb-5 w-32" />
                <p className="w-full md:w-2/3 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum culpa iusto blanditiis aliquid inventore voluptas necessitatibus ratione nam quisquam laborum.</p>
            </div>
            <div>
                <p className="uppercase text-xl font-medium mb-5">Company</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy & Policy</li>
                </ul>
            </div>
            <div>
                <p className="text-xl font-medium mb-5">Get in Touch</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>+250 792 330 514</li>
                    <li>jeyfason25@gmail.com</li>
                </ul>
            </div>
            
        </div>
        <div>
            <hr/>
            <p className="py-5 text-sm text-center">Copyright {new Date().getFullYear()}&copy; Jey Fason Ltd - All Rights Reserved</p>
        </div>

    </footer>
  )
}

export default Footer