import BookImage from 'Assets/Images/book.jpg';
import Layout from "Layouts/Layout";
import { useEffect } from 'react';
import { BiUser, BiBook, BiCalendar, BiStar } from 'react-icons/bi';
import { useLocation } from "react-router-dom";

export default function BookDescription() {
    const {state} = useLocation();


    return (
        <Layout>
            {state?._id && (
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Left: Book Image */}
                            <div className="md:w-1/3 p-6 flex items-center justify-center bg-gray-900">
                                <img 
                                    src={state.coverImage || BookImage} 
                                    alt={state.title}
                                    className="w-full max-w-sm rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Right: Book Details */}
                            <div className="md:w-2/3 p-8">
                                {/* Title */}
                                <h1 className="text-4xl font-bold text-white mb-4">
                                    {state.title}
                                </h1>

                                {/* Author */}
                                <div className="flex items-center gap-2 text-xl text-purple-400 mb-6">
                                    <BiUser className="text-2xl" />
                                    <span>{state.author?.name || "Unknown Author"}</span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2 text-yellow-400 mb-6">
                                    <BiStar className="text-2xl" />
                                    <span className="text-xl">{state.rating?.toFixed(1) || "0.0"}</span>
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold text-white mb-3">Description</h2>
                                    <p className="text-gray-300 leading-relaxed">
                                        {state.description}
                                    </p>
                                </div>

                                {/* Additional Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Pages */}
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <BiBook className="text-xl text-purple-400" />
                                        <span>{state.pages} Pages</span>
                                    </div>

                                    {/* Publish Date */}
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <BiCalendar className="text-xl text-purple-400" />
                                        <span>Published: {state.publishDate}</span>
                                    </div>
                                </div>

                                {/* Genres */}
                                <div className="mt-8">
                                    <h2 className="text-2xl font-semibold text-white mb-3">Genres</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {state.genres?.map((genre) => (
                                            <span 
                                                key={genre._id}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}