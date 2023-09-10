import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces";

const initialState: AuthState = {
    token: null,
    user: null
};

const getUserData = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const stringifiedToken = JSON.parse(JSON.stringify(token));
    const stringifiedUser = JSON.parse(JSON.stringify(user));

    if (token && user) {
        return { 
            token: stringifiedToken, 
            user: stringifiedUser
        };
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    
    return initialState;
};

const authSlice = createSlice({
    name: "auth",
    initialState: getUserData(),
    reducers: {
        setAuth(state, action) {
            const { user, token } = action.payload;
            const stringifiedUser = JSON.stringify(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", stringifiedUser);
            return { ...state,
                user: stringifiedUser,
                token:  token
            };
        },
        logOut: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return initialState;
        },
    }
});

export const { setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
