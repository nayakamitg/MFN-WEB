
import axios from 'axios';
import { Eye, EyeClosed, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router';

const Register = ({setShowRegister,setShowLogin,popupRef}) => {
const [showPass, setShowPass] = useState(false);
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});
const [registerData, setRegisterData] = useState({
  name: "",
  password: "",
  cpassword: "",
  mobileNo: "",
  userType:"Admin",
  securityQuestion: "",
  securityAnswer: ""
});


  const handlePassShow = (e) => {
    setShowPass((pre) => !pre);
  };


  const register=async({data})=>{
  try{
    setLoading(true)
    const res=await axios.post("https://goplanup.dishaayein.com/api/User/signup",data)
    toast.success("Sign Up Successfully")
    return true
 }
 catch (error){
  toast.error(error.response.data.message)
  console.log(error)
    return false
 }
 finally{
  setLoading(false)
 }
  }



  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       setShowLogin(false)
  //       setShowRegister(false)
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);


   const validateForm = () => {
    const newErrors = {};
    
    if (!registerData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!registerData.mobileNo) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(registerData.mobileNo)) {
      newErrors.mobileNo = "Invalid mobile number";
    }
    
    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!registerData.cpassword) {
      newErrors.cpassword = "Confirm password is required";
    } else if (registerData.password !== registerData.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }
    
    if (!registerData.securityQuestion) {
      newErrors.securityQuestion = "Security question is required";
    }
    
    if (!registerData.securityAnswer) {
      newErrors.securityAnswer = "Security answer is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async(e) => {
     e.preventDefault();
     if (validateForm()) {
      delete registerData.cpassword
      const adding=await register({data:registerData})
      if(adding){
        window.setTimeout(()=>{
          setShowRegister(false)
        },1000)
      }
      
      console.log("Form is valid", registerData);
    }
   };

   const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
   }



  return (
    <div className="container-fluid formMainContainer">
      <div className="formContainer p-4 rounded-4 position-relative">
        <X className="position-absolute x" role="button" onClick={()=>{setShowRegister(false)}}/>
        <h1 className="w-100 text-center">Sign Up</h1>
        <Form className="text-start" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              placeholder='Enter name' 
              value={registerData.name} 
              name='name' 
              onChange={(e)=>handleChange(e)} 
              type="text"
              className={`${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No</label>
            <input 
              placeholder='Enter mobile number' 
              name='mobileNo' 
              value={registerData.mobileNo}
              onChange={(e)=>handleChange(e)} 
              type="number"
              className={`${errors.mobileNo ? 'error' : ''}`}
            />
            {errors.mobileNo && <span className="error-message">{errors.mobileNo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className={`position-relative border-0 passwordContainer rounded-2 ${errors.password ? 'error' : ''}`}>
              <input 
                name='password' 
                value={registerData.password} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter password'
                type={!showPass ? "password" : "text"}
                className="position-absolute top-0 start-0"
              />
              <Eye
                onClick={(e) => {
                  handlePassShow(e);
                }}
                className={`Eye position-absolute ${!showPass ? "d-none" : ""}`}
              />
              <EyeClosed
                onClick={(e) => {
                  handlePassShow(e);
                }}
                className={`Eye position-absolute ${showPass ? "d-none" : ""}`}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <div className={`position-relative border-0 passwordContainer rounded-2 ${errors.cpassword ? 'error' : ''}`}>
              <input 
                name='cpassword'
                value={registerData.cpassword} 
                onChange={(e)=>handleChange(e)}  
                placeholder='Enter confirm password'
                type={!showPass ? "password" : "text"}
                className="position-absolute top-0 start-0"
              />
              <Eye
                onClick={(e) => {
                  handlePassShow(e);
                }}
                className={`Eye position-absolute ${!showPass ? "d-none" : ""}`}
              />
              <EyeClosed
                onClick={(e) => {
                  handlePassShow(e);
                }}
                className={`Eye position-absolute ${showPass ? "d-none" : ""}`}
              />
            </div>
            {errors.cpassword && <span className="error-message">{errors.cpassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="securityQuestion">Security Question</label>
            <select 
              value={registerData.securityQuestion} 
              name="securityQuestion" 
              onChange={(e)=>handleChange(e)}
              className={`${errors.securityQuestion ? 'error' : ''}`}
            >
              <option value="">Select Question</option>
              <option value="What is your favourite color?">What is your favourite color?</option>
              <option value="What was the name of your first pet?">What was the name of your first pet?</option>
              <option value="Who was your childhood best friend?">Who was your childhood best friend?</option>
              <option value="What is your favorite sport or activity?">What is your favorite sport or activity?</option>
              <option value="What city were you born in?">What city were you born in?</option>
            </select>
            {errors.securityQuestion && <span className="error-message">{errors.securityQuestion}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="securityAnswer">Security Answer</label>
            <input 
              type="text" 
              value={registerData.securityAnswer} 
              name='securityAnswer' 
              onChange={(e)=>handleChange(e)} 
              placeholder='Answer'
              className={`${errors.securityAnswer ? 'error' : ''}`}
            />
            {errors.securityAnswer && <span className="error-message">{errors.securityAnswer}</span>}
          </div>

          <div className="container text-center">
            <Button
              type="submit"
              variant="outline-primary"
              className="w-75 my-3 align-center"
              disabled={loading}
            >
             { loading &&
              <Spinner as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"/>}
              Create
            </Button>
          </div>
        </Form>
        <p className="w-100 text-center">
          I already have Account <span className="text-primary" role="button" onClick={()=>setShowRegister(false)}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register
