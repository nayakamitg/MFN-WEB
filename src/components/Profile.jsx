import { setLoggedIn } from '@/services/Redux/loginSlice'
import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

const Profile = () => {
  const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const userData=JSON.parse(localStorage.getItem("userData"))
    const handleLogout=()=>{
      setLoading(true);
       
       new Promise((resolve) => {
  setTimeout(() => {
     localStorage.removeItem("userData")
    setLoading(false);
    dispatch(setLoggedIn());
    resolve("done");
  }, 500);
});
       

    }
  return (
    <div className='container-fluid text-center'>
      {
        userData?.name && <h1>{userData?.name}</h1>
    }
   {userData?.mobileNo && <h1>{userData?.mobileNo}</h1>}
   { userData?.userType && <h1>{userData?.userType}</h1>}
   { userData?.token && <h1>{userData?.token}</h1>}
   <Button className='text-white mt-5' onClick={()=>handleLogout()}>{loading && <Spinner as="span"
             animation="border"
             size="sm"
             role="status"
             aria-hidden="true"/>}Log Out</Button>
    </div>
  )
}

export default Profile
