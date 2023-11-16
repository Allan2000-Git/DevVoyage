import React, { useState } from 'react'
import {BsSearch} from "react-icons/bs"
import {FaBars} from "react-icons/fa"
import {RxCross2} from "react-icons/rx"
import { Link, useLocation } from 'react-router-dom'
import Menu from './Menu'
import { useUserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [prompt, setPrompt] = useState("")

    const {user} = useUserContext()
    const navigate = useNavigate()
    const {pathname} = useLocation();

    const searchPost = (e) =>{
        e.preventDefault()
        navigate(prompt ? "?search="+prompt : "/")
    }

    return (
        <>
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4 h-[80px] shadow-lg">
            <h1 className="title text-lg md:text-xl font-extrabold"><Link to="/">DevVoyage</Link></h1>
            {
                pathname === "/" && <form onSubmit={searchPost}>
                <div className="flex justify-center items-center space-x-0 bg-gray-200 px-4 py-[10px] rounded-full">
                    <button type="submit" className="cursor-pointer"><BsSearch/></button>
                    <input value={prompt} onChange={e => setPrompt(e.target.value)} className="outline-none px-3 bg-inherit placeholder:text-sm" placeholder="Search a post" type="text"/>
                </div>
            </form>
            }
            <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
                {user ? <h3><Link to="/write">Write</Link></h3> : <h3><Link to="/login">Login</Link></h3>}
                {user ? <div onClick={()=>setShowMenu(prev => !prev)}>
                    {showMenu ? <p className="cursor-pointer relative"><RxCross2 size={18} /></p> : <p className="cursor-pointer relative"><FaBars/></p>}
                    {showMenu && <Menu/>}
                </div> : <h3><Link to="/register">Register</Link></h3>}
            </div>
            <div onClick={()=>setShowMenu(prev => !prev)} className="md:hidden">
                {showMenu ? <p className="cursor-pointer relative"><RxCross2 size={18} /></p> : <p className="cursor-pointer relative"><FaBars/></p>}
                {showMenu && <Menu/>}
            </div>
        </div>
        </>
    )
}

export default Navbar
