import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "Redux/Slices/AuthSlice";

export default function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.auth);

    const [signupDetails, setSignupDetails] = useState({
        email: '',
        password: '',
        username: ''
    });

    function handleFormChange(e) {
        const {name, value} = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    }

    function resetForm() {
        setSignupDetails({
            email: '',
            password: '',
            username: ''
        });
    }
    
    async function onFormSubmit(e) {
        e.preventDefault();

        // Form validation
        if (!signupDetails.email || !signupDetails.password || !signupDetails.username) {
            toast.error("All fields are required");
            return;
        }
        
        const response = await dispatch(signup(signupDetails));
        if(response?.payload?.data) {
            navigate("/signin");
        } 
        resetForm();
    }

    useEffect(() => {
        if(state.isLoggedIn) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <Layout>
        <div className="h-[100vh] mt-5 flex flex-col items-center justify-center">
            <div>
                <h1 className="text-white text-5xl">Create a new account</h1>
            </div>
            
            <div className="mt-4">
                <p className="text-white">
                    Already have an account ?
                    <Link to="/signin">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5  mx-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Sign In
                        </button>
                    </Link>
                </p>
            </div>

            <div className="w-full">
                <form onSubmit={onFormSubmit} className="flex flex-col justify-center items-center w-3/4 mx-auto" autoComplete="off">
                    <div className="my-5 w-1/3 text-black">
                        <input 
                            autoComplete="off"
                            type="text"
                            placeholder="username..."
                            className="px-8 py-3 bg-white placeholder-black w-full"  
                            name="username"
                            value={signupDetails.username}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="my-5 w-1/3 text-black">
                        <input 
                            autoComplete="off"
                            type="email"
                            placeholder="email..."
                            className="px-8 py-3 bg-white placeholder-black w-full" 
                            name="email"
                            value={signupDetails.email}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className="my-5 w-1/3 text-black">
                        <input 
                            autoComplete="off"
                            type="password"
                            placeholder="password..."
                            className="px-8 py-3 bg-white placeholder-black w-full" 
                            name="password"
                            value={signupDetails.password}
                            onChange={handleFormChange}
                            required
                        />
                    </div>


                    <div className="my-5 w-1/3">
                            <button className="focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full" type="submit">
                                Submit
                            </button>
                        </div>
                </form>
            </div>
        </div>
        </Layout>
    );
}