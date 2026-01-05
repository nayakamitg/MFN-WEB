import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getFoundPersons = createAsyncThunk(
  "getFoundPersons",
  async ({ page, size, data }, { rejectWithValue }) => {
    try {
      // Build params dynamically
      const params = new URLSearchParams();

      if (data?.name) params.append("Name", data.name);
      if (data?.state) params.append("State", data.state);
      if (data?.city) params.append("District", data.city);
      if (data?.gender) params.append("Sex", data.gender);
      if (data?.dateFrom) params.append("FoundDateFrom", data.dateFrom);
      if (data?.dateTo) params.append("FoundDateTo", data.dateTo);
      if (data?.AgeFrom) params.append("AgeFrom", data.AgeFrom);
      if (data?.AgeTo) params.append("AgeTo", data.AgeTo);
   

// https://goplanup.dishaayein.com/api/MissingPersons?DateFromStart=03%2F07%2F2025&DateFromEnd=08%2F09%2F2025
      params.append("PageNumber", page);
      params.append("PageSize", size);

      const res = await axios.get(
        `https://goplanup.dishaayein.com/api/FoundPersons?${params.toString()}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)
export const getMissingPersons = createAsyncThunk(
  "getMissingPersons",
  async ({ page, size, data }, { rejectWithValue }) => {

    // https://goplanup.dishaayein.com/api/MissingPersons?State=uttar%20pradesh&District=agra&Name=kajal&Sex=male&DateFromStart=12%2F3%2F2025&DateFromEnd=12%2F3%2F2025&PageNumber=2&PageSize=20

    try {
      // Build params dynamically
      const params = new URLSearchParams();

      if (data?.name) params.append("Name", data.name);
      if (data?.state) params.append("State", data.state);
      if (data?.city) params.append("District", data.city);
      if (data?.gender) params.append("Sex", data.gender);
      if (data?.dateFrom) params.append("DateFromStart", data.dateFrom);
      if (data?.dateTo) params.append("DateFromEnd", data.dateTo);
         if (data?.DateFromStart) params.append("DateFromStart", data.DateFromStart);
      if (data?.DateFromEnd) params.append("DateFromEnd", data.DateFromEnd);

      params.append("PageNumber", page);
      params.append("PageSize", size);

      const res = await axios.get(
        `https://goplanup.dishaayein.com/api/MissingPersons?${params.toString()}`
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const getUnidentifiedBodies = createAsyncThunk(
  "getUnidentifiedBodies",
  async ({ page, size, data }, { rejectWithValue }) => {
    try {
      // Build params dynamically
      const params = new URLSearchParams();

      if (data?.state) params.append("State", data.state);
      if (data?.city) params.append("District", data.city);
      if (data?.gender) params.append("Sex", data.gender);
      if (data?.dateFrom) params.append("FoundDateTimeFrom", data.dateFrom);
      if (data?.dateTo) params.append("FoundDateTimeTo", data.dateTo);
      if (data?.AgeFrom) params.append("AgeFrom", data.AgeFrom);
      if (data?.AgeTo) params.append("AgeTo", data.AgeTo);
// https://goplanup.dishaayein.com/api/UnIdentifiedDeadBodies?State=uttar%20pradesh&District=fatehpur&Sex=male&AgeFrom=10&AgeTo=60&Page=7&PageSize=20
      params.append("Page", page);
      params.append("PageSize", size);

      const res = await axios.get(
        `https://goplanup.dishaayein.com/api/UnIdentifiedDeadBodies?${params.toString()}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)

export const getMissingPersonsById=createAsyncThunk("getUnidentifiedBodiesById",async({id},{rejectWithValue})=>{
    try{
      
        const res=await axios.get(`https://goplanup.dishaayein.com/api/UnIdentifiedDeadBodies/${id}`);
        return res.data;
    }catch(err){
        return rejectWithValue(err.message);
    }

})


    const missingSlice = createSlice({
    name: "missing",
    initialState: {
        detailedPerson:{},
        missingPersons: {data:[]},
        foundPersons: {data:[]},
        unidentifiedBodies: {data:[]},
        missingloading: false,
        missingerror: null,
        foundloading: false,
        founderror: null,
        unidentifiedloading: false,
        unidentifiederror: null,
        personDetailLoading:true,
        personDetailError:null,
    },
    reducers: {
        setDataZero:(state,action)=>{
           if(action.payload==="mising"){
            state.missingPersons={data:[]}
           }
           else if(action.payload==="found"){
            state.foundPersons={data:[]}
           }
           else if(action.payload==="bodies"){
            state.unidentifiedBodies={data:[]}
           }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMissingPersons.pending,(state)=>{
            state.missingloading=true;
            state.missingerror=null;
        })
        .addCase(getMissingPersons.fulfilled,(state,action)=>{
            state.missingloading=false;
            state.missingPersons.data=[...state.missingPersons.data,...action.payload.data];
        })
        .addCase(getMissingPersons.rejected,(state,action)=>{
            state.missingloading=false;
            state.missingerror=action.payload;
        })
        builder
        .addCase(getFoundPersons.pending,(state)=>{
            state.foundloading=true;
            state.founderror=null;
        })
        .addCase(getFoundPersons.fulfilled,(state,action)=>{
            state.foundloading=false;
            state.foundPersons.data=[...state.foundPersons.data,...action.payload.data];
        })
        .addCase(getFoundPersons.rejected,(state,action)=>{
            state.foundloading=false;
            state.founderror=action.payload;
        })
        builder
        .addCase(getUnidentifiedBodies.pending,(state)=>{
            state.unidentifiedloading=true;
            state.unidentifiederror=null;
        })
        .addCase(getUnidentifiedBodies.fulfilled,(state,action)=>{
            state.unidentifiedloading=false;
            state.unidentifiedBodies.data=[...state.unidentifiedBodies.data,...action.payload.data];
        })
        .addCase(getUnidentifiedBodies.rejected,(state,action)=>{
            state.unidentifiedloading=false;
            state.unidentifiederror=action.payload;
        })
        builder
        .addCase(getMissingPersonsById.pending,(state)=>{
            state.personDetailLoading=true;
            state.personDetailError=null;
        })
        .addCase(getMissingPersonsById.fulfilled,(state,action)=>{
            state.personDetailLoading=false;
            state.detailedPerson=action.payload;
        })
        .addCase(getMissingPersonsById.rejected,(state,action)=>{
            state.personDetailLoading=false;
            state.personDetailError=action.payload;
        })
    }
}) 

export default missingSlice.reducer;

export const {setDataZero}=missingSlice.actions;