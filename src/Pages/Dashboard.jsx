import BookCard from "Components/BookCard/BookCard";
import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "Redux/Slices/BookSlice";
import { toast } from "react-hot-toast";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const bookState = useSelector((state) => state.book);
    const dispatch = useDispatch();

    async function loadBooks() {
        try {
            setIsLoading(true);
            const response = await dispatch(getAllBooks());
            
            if (response.error) {
                toast.error("Failed to load books");
                return;
            }

            if (!response.payload?.data?.data || response.payload.data.data.length === 0) {
                toast("No books found in the database");
                return;
            }

            // Use the books data directly from the backend
            const books = response.payload.data.data;

            // Update the Redux store with the books
            dispatch({
                type: 'book/getAllBooks/fulfilled',
                payload: {
                    data: {
                        data: books
                    }
                }
            });

        } catch (error) {
            console.error("Error loading books:", error);
            toast.error("Something went wrong while loading books");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadBooks();
    }, [dispatch]);

    return (
        <Layout>
            {isLoading ? (
                <div className="text-white text-center mt-8">Loading books...</div>
            ) : bookState.bookList.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 p-4">
                    {bookState.bookList.map(book => (
                        <BookCard key={book._id} data={book}/>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-8">
                    <p className="text-white text-xl mb-4">No books found in the library</p>
                    <p className="text-gray-400">Try adding some books to get started!</p>
                </div>
            )}
        </Layout>
    );
}