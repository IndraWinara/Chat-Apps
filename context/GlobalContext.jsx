import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react"



export const GlobalContext = createContext()

const GlobalProvider = ({children})=>{
const [userReplies,setUserReplies] = useState()
const [isLoggedIn, setIsLoggedIn] = useState(false);

//token
const token = Cookies.get('token')

useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);


//state input
const stateInput = {
   userReplies, setUserReplies,
   isLoggedIn
}


    return (
        <GlobalContext.Provider value={{stateInput}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider