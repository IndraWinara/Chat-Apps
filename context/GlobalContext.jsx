import { createContext, useState } from "react"



export const GlobalContext = createContext()

const GlobalProvider = ({children})=>{
const [userReplies,setUserReplies] = useState()




//state input
const stateInput = {
   userReplies, setUserReplies
}


    return (
        <GlobalContext.Provider value={{stateInput}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider