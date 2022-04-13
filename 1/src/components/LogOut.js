import React, { useContext } from 'react'
import { AuthContext } from './AuthContextProvider'
import WithLogin from './WithLogin'
function LogOut({name,handleLogOut}) {
    const{isLogin}=useContext(AuthContext)
  return (
    <div>
        {isLogin?
        <>
        <h1 className='text-light'>Hello dear {name}</h1>
        <button type='submit' onClick={handleLogOut}>Log Out</button>
        </>:""}
        
        
         
    </div>
  )
}
export default WithLogin(LogOut)
