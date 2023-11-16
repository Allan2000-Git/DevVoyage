import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import axios from 'axios'
import { URL } from '../url'

const Menu = () => {
    const {user, setUser} = useUserContext()
    const navigate = useNavigate()

    const userLogout = async() =>{
        try {
            const response = await axios.get(URL + "/auth/logout",{withCredentials:true})
            setUser(null)
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <div className="bg-black w-[150px] z-10 flex flex-col items-start absolute top-14 right-6 md:right-48 rounded-md p-4 space-y-4">
            {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/login">Login</Link></h3> }
            {!user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/register">Register</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to="/write">Write</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={`/profile/${user._id}`}>Profile</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer"><Link to={`/blogs/${user._id}`}>My Posts</Link></h3>}
            {user && <h3 onClick={userLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">Logout</h3>}
        </div>
        </>
    )
}

export default Menu
