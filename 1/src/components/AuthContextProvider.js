import { useState ,createContext } from "react"
export const AuthContext = createContext({})
const AuthContextProvider=({children})=>{
   const [user,setUser] = useState(null)
   const [isLogin,setIsLogin] = useState(false)
   return(
    <AuthContext.Provider value={{user,setUser,isLogin,setIsLogin}}>
        {children}
    </AuthContext.Provider>
   )
}
export default AuthContextProvider
