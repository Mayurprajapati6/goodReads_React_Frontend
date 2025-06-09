import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { logout } from "Redux/Slices/AuthSlice";
import { RiUser3Fill } from "react-icons/ri";
export default function Navbar() {
  const location = useLocation();


  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function onLogout() {
    dispatch(logout());
  }

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-800 text-white px-4 shadow-lg">
        <div className="w-full max-w-4xl mx-auto flex justify-between  items-center min-h-[80px]">
            {/* Left side - BookShelf */}
            <div className="bookshelf-left flex items-start">
                <Link
                    to="/dashboard"
                    className="text-xl  font-bold hover:bg-gray-700 hover:text-center px-4 py-2 rounded-lg transition-colors ml-4"
                >
                    📚 BookShelf
                </Link>
            </div>

            {/* Right side - Shelf and Options */}
            <div className="flex justify-between items-center gap-4 ">
                { authState.isLoggedIn && <Link
                    to="/shelf"
                        className={`px-4 py-2 rounded-lg transition-colors
                            ${isActive("/shelf")
                            ? "bg-gray-700 text-white"
                            : "hover:bg-gray-700 text-white"
                        }`}
                    >
                        Shelf
                </Link> }
                

                {authState.isLoggedIn && (
                    <span className="flex items-center gap-2 px-2 font-medium">
                        <RiUser3Fill  size={20} />
                        <Link>{authState.username}</Link>
                    </span>
                )}

                <div className="bookshelf-right flex  items-center relative">
                    <details className="dropdown">
                        <summary className="cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            Options
                        </summary>
                        <ul className="dropdown-content bg-gray-800 text-white rounded-lg z-50 absolute left-1/2 -translate-x-1/2 mt-2 shadow-lg min-w-[120px] border border-gray-700">
                            {authState.isLoggedIn && <li>
                                <Link
                                    onClick={onLogout}
                                    to="/signin"
                                    className="block px-4 py-2 hover:bg-gray-600 text-center hover:text-white rounded-lg transition-colors"
                                >
                                    Logout
                                </Link>
                            </li>}
                            {!authState.isLoggedIn && <li><Link to="/signup" className="block px-4 py-2 hover:bg-gray-600 text-center hover:text-white rounded-lg transition-colors">Signup</Link></li>}
                            
                            {!authState.isLoggedIn && <li><Link to="/signin" className="block px-4 py-2 hover:bg-gray-600 text-center hover:text-white rounded-lg transition-colors">Signin</Link></li>}
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    </nav>
  );
}
