import { createSlice } from "@reduxjs/toolkit";

export const getTheme = () => {
    const theme = localStorage.getItem("theme");

    if (theme) {
        return theme;
    }
    
    return null;
};

const themeSlice = createSlice({
    name: "theme",
    initialState: getTheme(),
    reducers: {
        setTheme(state, action) {
            state = action.payload;
            localStorage.setItem("theme", state!);
            return state;
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
