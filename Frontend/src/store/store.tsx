import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobReducer from "./reducers/reducers";
import userReducer from "./reducers/userSlice"; // Добавляем редьюсер пользователя
import { JobApi } from "../services/JobService";
import { UserApi } from "../services/UserApi"; // Добавляем API регистрации
import { applicationApi } from "../services/ApplicationApi";

const rootReducer = combineReducers({
    jobReducer,
    userReducer, // Редьюсер для пользователя
    [JobApi.reducerPath]: JobApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(JobApi.middleware, UserApi.middleware, applicationApi.middleware), // Подключаем middleware для API
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>["dispatch"];
