import Logo from 'Assets/Images/logo-color.png';
import { Link } from "react-router";


function Home() {
    return(
        <div >
            <div className="flex flex-col items-center justify-center gap-20 h-[100vh]">
                {/* Fixed size container with object-fit */}
                <div className="h-48 w-48 ">
                    <img 
                        className="w-full h-full "
                        alt="logo"
                        src={Logo}
                    />
                </div>

                <div className='flex justify-around items-center gap-16'>
                    <div className='w-2/4 text-center font-semibold basis-1/2'>
                        <h1 className='text-white text-4xl tracking-widest leading-normal'>
                            BookShelf <br />
                            <span className='text-lime-400'>
                                Your personal library and social network for bookworms
                            </span>
                        </h1>
                    </div>

                    <div>
                        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded text-xl px-5 py-2 text-center me-2 mb-2">
                            <Link to="/signup">REGISTER</Link>
                        </button>

                        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded text-xl px-5 py-2 text-center me-2 mb-2">
                            <Link to="/login">LOGIN</Link>
                        </button>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default Home;