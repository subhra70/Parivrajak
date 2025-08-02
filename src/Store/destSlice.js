import { createSlice } from "@reduxjs/toolkit";
import { React } from "react";

const initialState={
    destDetails:[]
};

const destSlice=createSlice({
    name:"dest",
    initialState,
    reducers:{
        loadData:(state,action)=>{
            state.destDetails=action.payload
        },
        addDetails:(state,action)=>{
            state.destDetails.push(action.payload)
        },
        removeDetails:(state,action)=>{
            state.destDetails=state.destDetails.filter(item=>item.id!==action.payload)
        },
        updateDetails:(state,action)=>{
            for (let i=0;i<state.destDetails.length;i++)
            {
                if(state.destDetails[i].id==action.payload.id)
                {
                    state.destDetails[i]=action.payload
                    break
                }
            }
        }
    }
})
export const {loadData,addDetails,removeDetails,updateDetails}=destSlice.actions
export default destSlice.reducer