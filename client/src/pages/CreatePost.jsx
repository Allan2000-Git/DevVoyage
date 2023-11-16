import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {RxCross2} from "react-icons/rx"
import { useUserContext } from '../contexts/UserContext'
import axios from 'axios'
import { URL } from '../url'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])

    const [title, setTitle] = useState("")
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState("")

    const {user} = useUserContext()
    const navigate = useNavigate()

    const addCategory = () =>{
        setCategories([...categories, category])
        setCategory("")
    }

    const deleteCategory = (id) =>{
        let oldCategories = [...categories]
        oldCategories.splice(id,1)
        setCategories(oldCategories)
    }

    const createPost = async(e) =>{
        e.preventDefault()
        try {
            const postObj = {
                title,
                description,
                username: user.username,
                userId: user?.id,
                categories
            }

            if(file){
                const data = new FormData()
                const fileName = Date.now() + file.name
                data.append("img", fileName)
                data.append("file", file)
                postObj.image = fileName

                const imgUpload = await axios.post(URL + "/upload", data)
                console.log(imgUpload.data);
            }

            const response = await axios.post(URL + "/posts/post/write", postObj, {withCredentials:true})
            navigate("/posts/post/" + response.data._id)
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar/>
            <div className="px-6 md:px-[200px] mt-8">
                <h1 className="font-bold md:text-2xl text-xl">Create a post</h1>
                <form className="w-full flex flex-col space-y-4 md:space-y-8 my-4">
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Enter post title" className="px-4 py-2 outline-none"/>
                    <input onChange={e => setFile(e.target.files[0])} type="file"  className="px-4"/>
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <input value={category} onChange={(e)=>setCategory(e.target.value)} className="px-4 py-2 outline-none" placeholder="Enter post category" type="text"/>
                            <div onClick={addCategory} className="text-white px-4 py-1 cursor-pointer rounded-sm bg-black hover:bg-[#0a0a0a]">Add</div>
                        </div>

                        {/* categories */}
                        <div className="flex mt-4">
                            {
                                categories.map((cat, index) => (
                                    <div key={index} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                                        <p className="capitalize">{cat}</p>
                                        <p onClick={() => deleteCategory(index)} className="cursor-pointer p-1 text-sm"><RxCross2/></p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={15} cols={30} className="px-4 py-2 outline-none bg-gray-200 rounded-md text-justify" placeholder="Write about your post here"/>
                    <button onClick={createPost} className="w-full md:w-[15%] text-white px-4 py-2 md:text-lg text-md rounded-sm bg-black hover:bg-[#0a0a0a]">Create</button>
                </form>

                </div>
            <Footer/>
        </>
    )
}

export default CreatePost
