import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



export const checklogin = createAsyncThunk(
  "loginThunk",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://goplanup.dishaayein.com/api/User/login", data);
      if (res.data && res.data.data) {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        return res.data;
      } else {
        return rejectWithValue("Invalid response from server");
      }
    } catch (error) {
      localStorage.removeItem("userData");
      if (error.response) {
        // Server responded with error
        return rejectWithValue(error.response.data.message || "Login Failed");
      }
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
)


const loginSlice=createSlice({
    name:"login",
    initialState:{
        loading:false,
        error:null,
        login:null,
        isLoggedIn:false
    },
    reducers:{
        setLoggedIn:(state)=>{
            state.isLoggedIn=false
        },
        checkLoggedIn:(state)=>{
         
            const data=JSON.parse(localStorage.getItem("userData"))
           
            if(data?.mobileNo && data?.token){
                state.isLoggedIn=true
            }
            else{
                 state.isLoggedIn=false
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(checklogin.fulfilled,(state,action)=>{
            state.isLoggedIn=true;
            state.error=null;
            state.login=action.payload;
            state.loading=false;
        })
        .addCase(checklogin.rejected,(state,action)=>{
            state.isLoggedIn=false;
            state.error=action.payload || "An error occurred during login";
            state.login=null;
            state.loading=false;
            localStorage.removeItem("userData"); // Ensure cleanup on rejection
        })
        .addCase(checklogin.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.login=null; // Reset login data while loading
        })
    }
})

export const {setLoggedIn,checkLoggedIn}=loginSlice.actions
export default loginSlice.reducer