import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJob } from "../../models/Job";
import { fetchJobsQuery} from "./ActionCreators";

type JobState = {
    jobs: IJob[]|undefined;
    loading: boolean;
    error: string
}

const initialState: JobState = {
    jobs: [],
    loading: false,
    error:""
}

const JobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchJobsQuery.fulfilled.type,(state, action:PayloadAction<IJob[]>)=>{
            state.loading = false 
            state.error = ""
            state.jobs = action.payload
        }).addCase(fetchJobsQuery.pending.type,(state)=>{
            state.loading = true
        }).addCase(fetchJobsQuery.rejected.type,(state, action:PayloadAction<string>)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export default JobSlice.reducer