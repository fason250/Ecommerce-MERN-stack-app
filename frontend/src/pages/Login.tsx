import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const[currentState, setCurrentState] = useState<string>("Sign Up")
  const navigate = useNavigate()


  const handleSubmit = async(event:FormEvent) =>{
    event.preventDefault()
    navigate("/")

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
        </div>
        {currentState.toLowerCase() === "sign in" ? null : <input type="text" className="w-full px-3 py-2 rounded border border-gray-800" placeholder="Name" required/>}
        <input type="email" className="w-full px-3 py-2 rounded border border-gray-800" placeholder="Email" required/>
        <input type="password" className="w-full px-3 py-2 rounded border border-gray-800" placeholder="Password" required/>
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          {currentState.toLowerCase() === "sign in" ? <p className="cursor-pointer underline text-sky-600">Forgot your password?</p> : ''}
          {
            currentState.toLowerCase() === "sign in" ?(
              <p onClick={()=> setCurrentState("Sign Up")} className="cursor-pointer">Create account</p>
            ): (
              <p onClick={()=> setCurrentState("Sign In")} className="cursor-pointer">Already have an account?</p>
            )
          }
        </div>
        <button className="py-2 px-8 bg-black text-white font-light mt-4 rounded-sm active:opacity-50 transition-opacity cursor-pointer">{currentState}</button>
    </form>
  )
}

export default Login