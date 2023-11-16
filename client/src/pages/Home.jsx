import React, { useEffect, useState } from 'react'
import AllPosts from '../components/AllPosts'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { URL } from '../url'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { useUserContext } from '../contexts/UserContext'

const Home = () => {

    const [posts, setPosts] = useState([])
    const location = useLocation()
    const [zeroPosts, setZeroPosts] = useState(false)
    const [loading, setLoading] = useState(false)

    const {user} = useUserContext()

    const getPosts = async() =>{
        setLoading(true)
        try {
            const posts = await axios.get(URL + "/posts" + location.search)
            setPosts(posts.data)

            if(posts.data.length === 0){
                setZeroPosts(true)
            }else{
                setZeroPosts(false)
            }
        } catch (error) {
            setLoading(true)
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(()=>{
        getPosts()
        window.scrollTo(0, 0)
    },[location.search])

    return (
        <>
            <Navbar/>
            <div className="px-8 md:px-[200px] min-h-screen">
                {
                    loading ? (
                        <div className="min-h-[70vh] flex items-center justify-center text-xl mt-16 w-full">
                            <Loader/>
                        </div>
                    ):(
                        <div>
                            {
                                !zeroPosts ? (
                                    posts.map(post => (
                                        <>
                                            <Link to={user ? `/posts/post/${post._id}` : `/login`}><AllPosts key={post._id} post={post} /></Link>
                                        </>
                                    ))
                                ) : (
                                    <div>
                                        <p className="text-center text-xl mt-16">No posts found related to <span className="font-semibold">{location.search.slice(8)}</span></p>
                                    </div>
                                )
                            }
                        </div>  
                    )
                }
            </div>
            <Footer/>
        </>
    )
}

export default Home
