import React, { use, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "../assets/login.css";
import { Eye, EyeClosed, X } from "lucide-react";
import { useNavigate } from "react-router";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { checklogin } from "@/services/Redux/loginSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogin(false);
        setShowRegister(false);
      }
    }

    // Prevent background scrolling
    document.body.classList.add("modal-open");
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return showRegister ? (
    <Register
      popupRef={popupRef}
      setShowRegister={setShowRegister}
      setShowLogin={setShowLogin}
    />
  ) : (
    <LoginPage
      popupRef={popupRef}
      setShowLogin={setShowLogin}
      setShowRegister={setShowRegister}
    />
  );
};

export default Login;

export const LoginPage = ({ popupRef, setShowLogin, setShowRegister }) => {
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  const [changePass,setChangepass]=useState({
     "mobileNo": "",
  "securityQuestion": "",
  "securityAnswer": "",
  "newPassword": ""
  })
  const [formData, setFormData] = useState({
    mobileNo: "",
    password: "",
  });
const navigate=useNavigate()
  const handlePassShow = (e) => {
    setShowPass((pre) => !pre);
  };
  const dispatch = useDispatch();
  const { isLoggedIn, loading, error, login } = useSelector(
    (state) => state.login
  );

  const validateForm = () => {
    const newErrors = {};
if(forgetPass){
   if (!changePass.mobileNo) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(changePass.mobileNo)) {
      newErrors.mobileNo = "Invalid mobile number";
    }

    if (!changePass.newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (changePass.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!changePass.securityQuestion) {
      newErrors.securityQuestion = "Security question is required";
    } 
    if (!changePass.securityAnswer) {
      newErrors.securityAnswer = "Security answer is required";
    } 
}
    else{ if (!formData.mobileNo) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Invalid mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
  }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleChangePass=(e)=>{
  const {name,value}=e.target;
  setErrors((pre)=>({
    ...pre,
    [name]:""
}))
  setChangepass((pre)=>({
    ...pre,
    [name]:value
  }))
}
console.log(changePass)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if(forgetPass){
  try {
    setChangeLoading(true)
        const res= await axios.post("https://goplanup.dishaayein.com/api/User/change-password",changePass)

        toast.success("Success",res.data.message)
        console.log("Success",res.data)
        setChangepass({
     "mobileNo": "",
  "securityQuestion": "",
  "securityAnswer": "",
  "newPassword": ""
  })
       setForgetPass(false)
      } catch (err) {
        toast.error(err.response.data.message);
        console.log("Error",err.response.data.message);
      }
      finally{
        setChangeLoading(false)
      }
      }
      else{
      try {
        const result = await dispatch(checklogin({ data: formData })).unwrap();
        if (result === "Login Failed") {
          toast.error("Invalid credentials. Please try again.");
        } else {
          toast.success("Login successful!");
          navigate("/profile");
          setShowLogin(false);
        }
      } catch (err) {
        toast.error(err.message || "Login failed. Please try again.");
      }
    }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "", // clear only this field error
      }));
    }
  };
  useEffect(()=>{
    if(error){
        toast.error(error)
        console.log("error",error)
    }
    if(isLoggedIn){
        toast.success("Successfully LoggedIn")
    }
  },[error,isLoggedIn])

  if(isLoggedIn){
    setShowLogin(false)
  }

console.log(login)
  return (
    <div className="container-fluid formMainContainer ">
      <div
        className="formContainer p-4 rounded-4 position-relative"
        ref={popupRef}
      >
        <X
          className="position-absolute x"
          role="button"
          onClick={() => {
            navigate(-1)
            // setShowLogin(false);
          }}
        />
        <h1 className="w-100 text-center">{forgetPass?"Change Password":"Login"}</h1>
        <Form className="text-start" onSubmit={handleSubmit}>
         { !forgetPass && <div className="form-group">
            <label htmlFor="">Mobile No</label>
            <input
              placeholder="Enter mobile number"
              type="number"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className={errors.mobileNo ? "error" : ""}
            />
            {errors.mobileNo && (
              <p className="error-message">{errors.mobileNo}</p>
            )}
          </div>}
         { forgetPass && <div className="form-group">
            <label htmlFor="">Mobile No</label>
            <input
              placeholder="Enter mobile number"
              type="number"
              name="mobileNo"
              value={changePass.mobileNo}
              onChange={handleChangePass}
              className={errors.mobileNo ? "error" : ""}
            />
            {errors.mobileNo && (
              <p className="error-message">{errors.mobileNo}</p>
            )}
          </div>}
        { !forgetPass && <><div className="form-group">
            <label htmlFor="">Password</label>
            <div className="position-relative border-0 passwordContainer rounded-2">
              <input
                placeholder="Enter password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                type={!showPass ? "password" : "text"}
                className={`position-absolute top-0 start-0 ${
                  errors.password ? "error" : ""
                }`}
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
             {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
          </div>
          <p className="text-end px-2">
            <span role="button" onClick={()=>{setForgetPass(true)}} >Forget password</span>
          </p></>}

{
  forgetPass && <>
  
          <div className="form-group">
            <label htmlFor="securityQuestion">Security Question</label>
            <select 
              value={changePass.securityQuestion} 
              name="securityQuestion" 
              onChange={(e)=>handleChangePass(e)}
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
              value={changePass.securityAnswer} 
              name='securityAnswer' 
              onChange={(e)=>handleChangePass(e)} 
              placeholder='Answer'
              className={`${errors.securityAnswer ? 'error' : ''}`}
            />
            {errors.securityAnswer && <span className="error-message">{errors.securityAnswer}</span>}
          </div>


  </>
}

           { forgetPass && <><div className="form-group">
            <label htmlFor="">New Password</label>
            <div className="position-relative border-0 passwordContainer rounded-2">
              <input
                placeholder="New password"
                value={changePass.newPassword}
                name="newPassword"
                onChange={handleChangePass}
                type={!showPass ? "newPassword" : "text"}
                className={`position-absolute top-0 start-0 ${
                  errors.newPassword ? "error" : ""
                }`}
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
             {errors.newPassword && 
                <p className="error-message">{errors.newPassword}</p>
              }
          </div>
          </>}

          <div className="container text-center">
            <Button
              type="submit"
              variant="outline-primary"
              className="w-75 my-3 align-center"
            >
              {(loading || changeLoading) && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {forgetPass? "Submit":"Login"}
            </Button>
          </div>
        </Form>
        <p className="w-100 text-center">
          I don't have Account{" "}
          <span
            className="text-primary"
            role="button"
            onClick={() => {
              setShowRegister(true);
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
