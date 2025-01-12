import { combineReducers, configureStore } from "@reduxjs/toolkit"
import jobReducer from "./reducers/reducers"
import { JobApi } from "../services/JobService"

const rootReducer = combineReducers({
    jobReducer,
    [JobApi.reducerPath]:JobApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(JobApi.middleware)
    })
}