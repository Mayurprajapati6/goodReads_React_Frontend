import BookImage from 'Assets/Images/book.jpg';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function BookCard({ data }) {
  const navigate = useNavigate();

  return (
    <div className="mt-6 mb-6 bg-gray-800 shadow-xl rounded-lg overflow-hidden w-full max-w-3xl mx-auto md:h-64 p-4"> {/* Reduced height and padding */}
      <div className="flex flex-col md:flex-row gap-4 h-full"> {/* Reduced gap */}

        {/* Left: Image */}
        <div className="md:w-1/4 h-auto md:h-full flex items-center justify-center rounded-md overflow-hidden"> {/* Reduced width */}
          <img
            src={data?.coverImage || BookImage}
            alt={data?.title || "Book cover"}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right: Title at Top, Everything Else at Bottom */}
        <div className="md:w-3/4 flex flex-col h-full justify-between"> {/* Adjusted width */}

          {/* Title at Top */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-2"> {/* Reduced font size */}
              {data?.title || "Book Title"}
            </h2>
          </div>

          {/* Bottom: Content wrapper */}
          <div className="flex flex-row gap-3 items-start"> {/* Changed to items-start and reduced gap */}
            {/* Left side: Author + Description */}
            <div className="flex-1 flex flex-col gap-2"> {/* Reduced gap */}
              {/* Author */}
              <div className="flex items-center gap-2 text-white text-base"> {/* Reduced font size */}
                <BiUser className="text-purple-400" />
                <span>{data?.author?.name || "Unknown Author"}</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm line-clamp-2"> {/* Added line-clamp and reduced font size */}
                {data?.description || "No description available for this book."}
              </p>
            </div>

            {/* Right side: Button */}
            <div className="flex-shrink-0 self-end"> {/* Added self-end */}
              <button
                onClick={() => navigate("/book/description", { state: { ...data } })}
                className="text-white bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-semibold rounded-lg text-xs px-4 py-2 text-center transition-all duration-300 ease-in-out" /* Reduced padding and font size */
              >
                More Details
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
