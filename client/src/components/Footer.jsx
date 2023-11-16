import React from 'react'
import {BsLinkedin} from "react-icons/bs"

const Footer = () => {
    return (
        <>
        <div className="w-full bg-black px-8 md:px-[200px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 ">
            <div className="flex flex-col text-white">
                <p className="mb-6 text-[#636363]">RESOURCES</p>
                <p className="mb-4">Featured Blogs</p>
                <p className="mb-4">Most viewed</p>
                <p className="mb-4">Readers Choice</p>
            </div>

            <div className="flex flex-col text-white">
                <p className="mb-6 text-[#636363]">USE CASES</p>
                <p className="mb-4">Forum</p>
                <p className="mb-4">Support</p>
                <p className="mb-4">Recent Posts</p>
            </div>

            <div className="flex flex-col text-white">
                <p className="mb-6 text-[#636363]">COMPANY</p>
                <p className="mb-4">Privacy Policy</p>
                <p className="mb-4">About Us</p>
                <p className="mb-4">Terms & Conditions</p>
                <p className="">Terms of Service</p>
            </div>
        </div>
        <div className="h-[0.5px] bg-gray-400"></div>
        <p className="py-4 text-center text-[#636363] bg-black text-sm">Copyright &copy; {new Date().getFullYear()} <span className="title font-medium">DEVVOYAGE</span>. All rights reserved</p>
        </>
    )
}

export default Footer
