import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfilePosts from '../components/ProfilePosts'
import axios from 'axios'
import { URL } from '../url'
import { useUserContext } from '../contexts/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [updated, setUpdated] = useState(false)
    const [userPosts, setUserPosts] = useState([])

    const {user, setUser} = useUserContext()
    const navigate = useNavigate()

    const getProfile = async() =>{
        try {
            const response = await axios.get(URL + "/users/user/" + user._id)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setPassword(response.data.password)
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async() =>{
        try {
            const userObj = {
                username,
                email,
                password
            }
            const response = await axios.patch(URL + "/users/user/" + user._id, userObj, {withCredentials:true})
            setUpdated(true)
        } catch (error) {
            setUpdated(false)
            console.log(error);
        }
    }

    const deleteUser = async() =>{
        try {
            const response = await axios.delete(URL + "/users/user/" + user._id, {withCredentials:true})
            setUser(null)
            navigate("/register")
        } catch (error) {
            console.log(error);
        }
    }

    const getUserPosts = async() =>{
        try {
            const response = await axios.get(URL + "/posts/user/" + user._id, {withCredentials:true})
            setUserPosts(response.data)
            console.log(userPosts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getProfile()
    },[user?._id])

    useEffect(()=>{
        getUserPosts()
    },[user._id])

    return (
        <>
            <Navbar/>
            <div className="min-h-screen px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
                <div className="flex flex-col md:w-[75%] w-full mt-8 md:mt-0">
                    <h1 className="text-xl font-semibold">Your posts:</h1>
                    {
                        userPosts.map(post => (
                            <Link to={user ? `/posts/post/${post._id}` : `/login`}><ProfilePosts key={post?._id} post={post} /></Link>
                        ))
                    }
                </div>
                <div className="md:sticky md:top-6 flex justify-start md:justify-end items-start md:w-[25%] w-full md:items-end">
                    <div className=" flex flex-col space-y-4">
                        <h1 className="text-xl font-bold mb-4">Profile</h1>
                        <input value={username} onChange={e => setUsername(e.target.value)} className="outline-none px-2 py-2 border-[1px] border-black outline-0" placeholder="New username" type="text"/>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="outline-none px-2 py-2 border-[1px] border-black outline-0" placeholder="New email" type="email"/>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="outline-none px-2 py-2 border-[1px] border-black outline-0" placeholder="New password" type="password"/>
                        <div className="flex items-center gap-[20px]">
                            <button onClick={updateUser} className="text-white text-sm bg-black px-4 py-2 hover:text-black hover:bg-gray-400 mt-[20px]">Update</button>
                            <button onClick={deleteUser} className="text-white text-sm bg-black px-4 py-2 hover:text-black hover:bg-gray-400 mt-[20px]">Delete</button>
                        </div>
                    {updated && <h3 className="text-green-500 text-sm text-center mt-4">User updated successfully!</h3>}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Profile
