import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "Configs/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    loading: false,
    error: null
}

export const signup = createAsyncThunk("auth/signup", async (data) => { // asyncthunk -> this is going to make an API call TO FETCH A data for us 
    try {
        // Make sure this matches your backend endpoint exactly
        const promise = axiosInstance.post("/signup", data);  // Added "/" before signup
        
        const response = await toast.promise(promise, {
            loading: 'Submitting form',
            success: 'Successfully signed up!!',
            error: 'Signup failed',
        });
        
        // Store user data in localStorage on successful signup
        if (response.data && response.data.token) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username || data.username);
        }
        
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Backend responded with:", error.response.data);
            const message = error.response.data.message || "Signup failed";
            toast.error(message);
        } else {
            console.error(error);
            toast.error("Server connection failed. Please try again later.");
        }
        throw error;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            state.isLoggedIn = false;
            state.username = '';
            state.token = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.username = action.payload.username;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;