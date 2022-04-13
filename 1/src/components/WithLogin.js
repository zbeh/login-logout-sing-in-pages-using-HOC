import { useContext } from "react"
import {AuthContext} from './AuthContextProvider'
function WithLogin(Component){
    return function WithLoginComponent(){
        const {user,setUser,setIsLogin} = useContext(AuthContext)
        console.log(user.id);
        console.log(user);
        const handleClick=()=>{
            console.log("hi");
            setIsLogin(false)
            setUser(null)
        }
        return(
            <Component name={user.name} handleLogOut={handleClick}  />
        )
    }
}
export default WithLogin