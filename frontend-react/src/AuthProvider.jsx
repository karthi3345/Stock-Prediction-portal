import { createContext } from 'react'
import {useState,useContext} from 'react'

// create context
const AuthContext= createContext()

const AuthProvider = ({children}) => { //chikder child component

    const [isLoggedIn , setIsLoggedIn] = useState(
        !!localStorage.getItem("accessToken")
        
    )
  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>  
    {/* passing to all compondent */}

        {children}
    </AuthContext.Provider>
    
  )
}

export default AuthProvider
export {AuthContext};