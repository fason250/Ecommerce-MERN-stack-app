import { FormEvent, useState } from "react"
import axios from "axios"
import { useApplication } from "../context/adminContext"




const api_url: string = import.meta.env.VITE_API_URL

function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const { storeToken } = useApplication()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const { data } = await axios.post(`${api_url}/api/v1/user/admin`, { email, password })

            if (!data.success) {
                setError('invalid credentials')
                return
            }

            setError('')
            if (data.token && typeof data.token === 'string') {
                storeToken(data.token)
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center min-h-screen justify-center w-full">
            <div className="bg-white shadow-md rounded-md px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4 ">Admin Panel</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 min-w-72">
                        <label className="text-sm font-medium text-gray-700 mb-2">email address</label>
                        <input
                            className="rounded-md w-full px-3 py-2 border border-gray-100 outline-none" type="email"
                            placeholder="your email address" required
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-3 min-w-72">
                        <label className="text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            className="rounded-md w-full px-3 py-2 border border-gray-100 outline-none" type="password" placeholder="your password " required
                            value={password}
                            onChange={event => setPassword(event.target.value)}

                        />
                    </div>
                    <button className="mt-3 w-full py-2 px-4 rounded-md text-white bg-black">Login</button>
                </form>
                <p className="text-center text-red-500">{error}</p>
            </div>
        </div>
    )
}

export default Login