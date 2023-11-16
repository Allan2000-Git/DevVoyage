import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { URL } from '../url'
import { useUserContext } from '../contexts/UserContext'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const {user, setUser} = useUserContext()

    const loginUser = async() =>{
        try {
            if(!email || !password){
                setError(true)
                setErrorMessage("All fields are required")
            }else{
                const response = await axios.post(URL + "/auth/login", {email, password}, {withCredentials: true})
                // console.log(response);
                setUser(response.data)
                setError(false)
                
                navigate("/")
            }

        } catch (error) {
            setError(true)
            setErrorMessage("Something went wrong. Try again")
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-6 md:px-[200px] py-4 shadow-lg">
                <h1 className="title text-lg md:text-xl font-extrabold"><Link to="/">DevVoyage</Link></h1>
                <h3><Link to="/register">Register</Link></h3>
            </div>
            <div className="w-full flex justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                    <h1 className="text-xl font-bold text-left">Login to your account</h1>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-3 border-[1px] border-black outline-0" type="email" placeholder="Enter your email"/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-3 border-[1px] border-black outline-0" type="password" placeholder="Enter your password"/>
                    <button onClick={loginUser} className="w-full px-4 py-3 text-lg font-medium text-white bg-black rounded-lg hover:bg-[#0a0a0a]">Log in</button>
                    {error && <h3 className="text-red-500 text-sm ">{errorMessage}</h3>}
                    <div className="flex justify-center items-center space-x-3">
                    <p>New here?</p>
                    <p className="text-gray-500 hover:text-black underline"><Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Login
