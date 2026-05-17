import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login=createAsyncThunk(
    "auth/login",
    async({email, password},{rejectWithValue})=>{
        try{
            const response=await axios.post("http://localhost:3001/api/user/login",{
                email,
                password
            }) 
            const {user,message}=response.data;
            return {user,message}; 
        }
        catch(error){
            return rejectWithValue(error.response.data.message);
        }
    }
)
const authSlice=createSlice({
    name:"auth",
    initialState:{
        userId:null,
        userName:null,
        role:null,
        error:null,
        isLoading:false
    },
    reducers:{
        logout:(state)=>{
            state.userId=null;
            state.userName=null;
            state.role=null;
            state.error=null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.isLoading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.userId=action.payload.user._id
            state.userName=action.payload.user.userName
            state.role=action.payload.user.role
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
        })
    }
})
export default authSlice.reducer;
export const {logout}=authSlice.actions;
