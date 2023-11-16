import axios from 'axios'
import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { URL } from '../url'
import { useUserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const Comment = ({comment, post}) => {

    const {user} = useUserContext()
    const navigate = useNavigate()
    
    const deleteComment = async() =>{
        try {
            await axios.delete(URL + `/comments/comment/${comment._id}`, {withCredentials:true})
            navigate(`/posts/post/${post}`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="px-4 py-4 bg-gray-200 rounded-md my-2">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-600 text-sm">@{comment.author}</h3>
                <div className="flex items-center justify-between space-x-4">
                    <p className="text-gray-500 text-sm">{new Date(comment.updatedAt).toLocaleDateString()}</p>
                    <p className="text-gray-500 text-sm">{new Date(comment.updatedAt).toLocaleTimeString()}</p>
                    {
                        user._id === comment.userId ? (
                            <div className="flex items-center justify-center space-x-2">
                                <p className="cursor-pointer" onClick={deleteComment}>
                                <MdDelete />
                                </p>
                            </div>
                        ) : ""
                    }
                </div>
            </div>
            <p className="mt-4">{comment.comment}</p>
        </div>
        </>
    )
}

export default Comment
