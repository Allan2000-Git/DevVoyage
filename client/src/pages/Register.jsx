import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from "axios"
import { URL } from '../url'
import {useNavigate} from "react-router-dom"

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const registerUser = async() =>{
        try {
            if(!username || !email || !password){
                setError(true)
                setErrorMessage("All fields are required")
            }else{
                const response = await axios.post(URL + "/auth/register", {username, email, password})
                // console.log(response);
                setUsername(response.data.username)
                setEmail(response.data.email)
                setPassword(response.data.password)
                setError(false)

                navigate("/login")
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
                <h3><Link to="/login">Login</Link></h3>
            </div>
            <div className="w-full flex justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                    <h1 className="text-xl font-bold text-left">Create an account</h1>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-3 border-[1px] border-black outline-0" type="text" placeholder="Enter your username"/>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-3 border-[1px] border-black outline-0" type="email" placeholder="Enter your email"/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-3 border-[1px] border-black outline-0" type="password" placeholder="Enter your password"/>
                    <button onClick={registerUser} className="w-full px-4 py-3 text-lg font-medium text-white bg-black rounded-lg hover:bg-[#0a0a0a] hover:text-white">Register</button>
                    {error && <h3 className="text-red-500 text-sm ">{errorMessage}</h3>}
                    <div className="flex justify-center items-center space-x-3">
                    <p>Already have an account?</p>
                    <p className="text-gray-500 hover:text-black underline"><Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Register
