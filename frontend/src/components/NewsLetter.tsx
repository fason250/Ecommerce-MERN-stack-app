import { FormEvent } from "react"


function NewsLetter() {

    const handleSubmit = ( event :FormEvent<HTMLFormElement>)=>{
        event.preventDefault()


    }

  return(
    <section className="text-center">
        <p className="text-2xl font-medium tex-gray-800">Subscribe now & get <span className="text-red-500">20%</span> off</p>
        <p className="text-gray-400 mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae eum quam omnis?</p>
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