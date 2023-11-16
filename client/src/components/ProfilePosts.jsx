import React from 'react'
import { IMAGE_FOLDER } from '../url'

const ProfilePosts = ({post}) => {
    return (
        <>
            <div className="w-full flex justify-between my-[60px] space-x-[40px]">
                {/* left - image */}
                <div className="w-[35%] h-[200px] flex items-center justify-center">
                    <img className="h-full w-full object-cover" src={IMAGE_FOLDER + post.image} alt="" />
                </div>
                {/* right - content */}
                <div className="w-[65%] flex flex-col justify-between">
                    <div>
                        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-[24px] leading-9 text-justify">{post.title}</h1>
                        <div className="flex mb-2 text-sm text-gray-500 items-center justify-between md:mb-4">
                            <p className="font-medium">@{post.username}</p>
                            <div className="flex space-x-2 text-sm">
                                <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
                                <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm md:text-[16px] text-justify leading-8">{post.description.slice(0,200) + " ...Read more"}</p>
                </div>
            </div>
        </>
    )
}

export default ProfilePosts
