import { createAsyncThunk } from "@reduxjs/toolkit";
import { IJob } from "../../models/Job";
import axios from "axios";

export const fetchJobsQuery = createAsyncThunk(
    "job/get-all",
    async (_,thunkAPI)=>{
        try{
            const response = await axios.get<IJob>("http://localhost:3000/api/job/get-all")
            return response.data
        }catch{
            return thunkAPI.rejectWithValue("Could not load the jobs list")
        }
    }
)