import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";

// Initial state from localStorage
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
};

// Signup Thunk
export const signup = createAsyncThunk("auth/signup", async (data) => {
    try {
        const response = await axiosInstance.post("signup", data);
        toast.success("Successfully signed up!");
        return response;
    } catch (error) {
        const msg = error?.response?.data?.message || "Signup failed. Please try again.";
        toast.error(msg);
        throw error;
    }
});

// Signin Thunk
export const signin = createAsyncThunk("auth/signin", async (data) => {
    try {
        const response = await axiosInstance.post("signin", data);
        toast.success("Successfully signed in!");
        return response;
    } catch (error) {
        console.log("❌ Signin error:", error);

        const backendMsg = error?.response?.data?.message;

        if (backendMsg?.toLowerCase().includes("password")) {
            toast.error("Incorrect password, please try again.");
        } else if (backendMsg?.toLowerCase().includes("email")) {
            toast.error("Email not registered.");
        } else {
            toast.error(backendMsg || "Cannot sign in. Please try again.");
        }

        throw error;
    }
});

// Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = '';
            state.username = '';
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.fulfilled, (state, action) => {
            console.log("🔍 SIGNIN FULFILLED PAYLOAD:", action.payload);

            const userData = action?.payload?.data || action?.payload;

            if (userData?.username && userData?.token) {
                state.isLoggedIn = true;
                state.username = userData.username;
                state.token = userData.token;

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", userData.username);
                localStorage.setItem("token", userData.token);
            } else {
                console.warn("⚠️ User data missing in response:", userData);
            }
        });

        builder.addCase(signin.rejected, (state, action) => {
            console.error("❌ SIGNIN REJECTED:", action.error);
            // No toast here — handled in the thunk catch already
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
