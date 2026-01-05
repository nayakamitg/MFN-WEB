import Login from '@/components/Login';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn } from './Redux/loginSlice';

const Authenticate = ({children}) => {
  const [showLogin, setShowLogin] = useState(true);
  const dispatch=useDispatch();
     const { isLoggedIn, loading, error, login } = useSelector(
    (state) => state.login
  );
useEffect(()=>{
    dispatch(checkLoggedIn())
},[dispatch])


  if(isLoggedIn){
    return children
  }

  return (
    <Login setShowLogin={setShowLogin}/>
  )
}

export default Authenticate
