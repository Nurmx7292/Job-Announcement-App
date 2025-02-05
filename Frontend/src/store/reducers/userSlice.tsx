import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RootState = {
    userReducer: UserState;
    // добавьте сюда другие редьюсеры, если нужно
  };

interface UserState {
    userId: string|null;
    user: { username: string; email: string } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    role: string | null;
}

const initialState: UserState = {
    userId: localStorage.getItem("userId"),
    user: null,
    token: localStorage.getItem("accessToken"),
    loading: false,
    role: localStorage.getItem("role"),
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ username: string; email: string; token: string|null; role: string | null }>) => {
            state.user = { username: action.payload.username, email: action.payload.email };
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.loading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        }
    },
});

export const { setUser, setError } = userSlice.actions;

export const selectRole = (state: RootState) => state.userReducer.role;
export const selectId = (state: RootState) => state.userReducer.userId;
export const selectUser = (state: RootState) => state.userReducer.user;
export const selectToken = (state: RootState) => state.userReducer.token;
export const { setId } = userSlice.actions
export default userSlice.reducer;
