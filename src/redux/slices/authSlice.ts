import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: string | null;
    firstname: string | null;
    lastname: string | null;
    role: string | null
};

interface AuthState  {
    token: string | null;
    user: User | null;
};

const initialState: AuthState = {
    token: null,
    user: null
};

export const getUserData = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
        return { token, user };
    };
    
    return initialState;
};

const authSlice = createSlice({
    name: "auth",
    initialState: getUserData(),
    reducers: {
        setAuth(state, action) {
            const { user, token } = action.payload;
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify(user));
            return { ...state, user, token };
        },
        logOut: () => {
            localStorage.removeItem("token"),
            localStorage.removeItem("user");
            return initialState;
        },
    }
});

export const { setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
