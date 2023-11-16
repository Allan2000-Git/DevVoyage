import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { URL } from "../url"

const UserContext = createContext({})

export const UserContextProvider = ({children}) =>{

    const [user, setUser] = useState(null)

    useEffect(()=>{
        getUser()
    },[])

    const getUser = async() =>{
        try {
            const response = await axios.get(URL + "/auth/refetch", {withCredentials: true})
            // console.log(response.data);
            setUser(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () =>{
    return useContext(UserContext)
}