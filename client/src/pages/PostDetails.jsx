import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import Comment from "../components/Comment";
import axios from "axios";
import { IMAGE_FOLDER, URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
    const postId = useParams().id

    const [postDetails, setPostDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")

    const {user} = useUserContext()
    const navigate = useNavigate()

    const getPostDetails = async() =>{
        setLoading(true)
        try {
            const response = await axios.get(URL + `/posts/post/${postId}`);
            setPostDetails(response.data);
            setLoading(false)
        } catch (error) {
            setLoading(true)
            console.log(error);
        }
    }

    const deletePost = async() =>{
        try {
            await axios.delete(URL + "/posts/post/" + postId, {withCredentials:true})
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const getComments = async() =>{
        try {
            const response = await axios.get(URL + `/comments/post/${postId}`);
            setComments(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addComment = async() =>{
        try {
            const commentObj = {
                comment,
                author: user.username,
                postId: postId,
                userId: user._id
            }
            const response = await axios.post(URL + "/comments/comment/write", commentObj, {withCredentials:true})
            console.log(response.data);
            // setComment("")
            navigate("/posts/post/" + postId)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getPostDetails()
        getComments()
        window.scrollTo(0, 0)
    },[postId])

    return (
        <>
        <Navbar />
        {
            loading ? <div className="min-h-[80vh] flex items-center justify-center text-xl mt-16 w-full">
                <Loader/>
            </div> : (
                    <div className="px-8 md:px-[200px] py-8">
                    <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-black md:text-3xl">
                        {postDetails.title}
                    </h1>
                    {
                        user?._id === postDetails?.userId && (
                            <div className="flex items-center justify-center space-x-2">
                                <p className="cursor-pointer" onClick={() => navigate("/update/" + postId)}>
                                <BiEditAlt />
                                </p>
                                <p className="cursor-pointer" onClick={deletePost}>
                                <MdDelete />
                                </p>
                            </div>
                        )
                    }
                    </div>
                    <div className="flex items-center justify-between mt-2 md:mt-4">
                    <p className="font-medium"><span className="text-gray-600 text-sm">Author:</span> @{postDetails.username}</p>
                    <div className="flex space-x-2 text-sm">
                        <p><span className="text-gray-600 text-sm">Updated:</span> {new Date(postDetails.updatedAt).toLocaleDateString()}</p>
                        <p>{new Date(postDetails.updatedAt).toLocaleTimeString()}</p>
                    </div>
                    </div>
                    <img
                    className="w-full mx-auto mt-8 object-cover"
                    src={IMAGE_FOLDER + postDetails.image}
                    alt={postDetails.title}
                    />
                    <p className="mx-auto mt-8 text-justify leading-[33px]">
                    {postDetails.description}
                    </p>
                    <div className="flex items-center mt-8 space-x-4 font-semibold">
                        <p>Categories:</p>
                        <div className="flex justify-center items-center space-x-2">
                            {
                                postDetails.categories?.map((category) =>(
                                    <div key={postDetails._id} className="bg-gray-200 text-sm rounded-md px-4 py-2">{category}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
                        {
                            comments.map((c) => (
                                <Comment key={c._id} comment={c} post={postId} />
                            ))
                        }
                        
                    </div>
                    <div className="w-full flex flex-col mt-4 md:flex-row">
                        <input value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 placeholder:text-sm"/>
                        <button onClick={addComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0 rounded-sm">Add Comment</button>
                    </div>
                </div>
            )
        }
        <Footer />
        </>
    );
};

export default PostDetails;
