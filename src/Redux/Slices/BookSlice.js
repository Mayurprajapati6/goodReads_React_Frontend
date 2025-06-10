import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
   bookList: []
};

export const getAllBooks = createAsyncThunk("book/getAllBooks", async () => {
    try {
        const response = await axiosInstance.get("/books");
        toast.promise(Promise.resolve(response), {
            loading: 'Loading books data',
            success: 'Successfully loaded all the books',
            error: "Something went wrong"
        });
        return response;
    } catch (error) {
        toast.error("Something went wrong, cannot download books");
        throw error;
    }
});

export const updateBookRating = createAsyncThunk("book/updateRating", async ({ bookId, rating }) => {
    try {
        const response = await axiosInstance.patch(`/books/${bookId}/rate/${rating}`);
        toast.success("Rating updated successfully");
        return response;
    } catch (error) {
        toast.error("Failed to update rating");
        throw error;
    }
});

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        updateBookImage: (state, action) => {
            const { bookId, imageUrl } = action.payload;
            const book = state.bookList.find(book => book._id === bookId);
            if (book) {
                book.coverImage = imageUrl;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBooks.fulfilled, (state, action) => {
                if(action?.payload?.data?.data) {
                    state.bookList = action.payload.data.data;
                } else {
                    state.bookList = [];
                }
            })
            .addCase(updateBookRating.fulfilled, (state, action) => {
                const { bookId, rating } = action.payload.data;
                const book = state.bookList.find(book => book._id === bookId);
                if (book) {
                    book.rating = rating;
                }
            });
    }
});

export const { updateBookImage } = bookSlice.actions;
export default bookSlice.reducer;