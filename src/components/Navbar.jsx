
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/volunteer.png'
import useAuth from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, logOut} = useAuth();

    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/volunteer'>Need Volunteer</NavLink></li>

    </>

   
    return (
        <div className='relative mt-0 md:mt-3 z-40 '>
            <div className='fixed top-0 right-0 left-0 bg-none backdrop-blur-xl shadow-md animate__animated animate__fadeInDownBig'>
                <div className=' font-lato '>
                    <div className="navbar container mx-auto px-4 md:px-12 lg:px-20 xl:px-0  ">
                        <div className="navbar-start">
                            <div className="dropdown -ml-2">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul
                                    id='nav'
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                    {navLinks}
                                </ul>
                            </div>
                            <Link to='/'>
                                <div className='-ml-2 md:-ml-0 flex items-center'>
                                    <img className='w-[25px] h-[25px] md:w-[30px] md:h-[30px]' src={logo} alt="" />
                                    <a className="text-xl md:text-2xl gap-0 font-bold font-inter ">HelpNow</a>
                                </div>
                            </Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul
                                id='nav'
                                className="menu menu-horizontal px-2 gap-3 text-base ">
                                {navLinks}
                            </ul>
                        </div>
                        {/* user verification*/}
                        <div className="navbar-end gap-3 md:gap-6">
                            <div className=''>
                                <ThemeToggle></ThemeToggle>
                            </div>
                            <div>
                            <div>
                                {!user &&
                                    <div className="navbar-end">
                                        <Link to='/login'>
                                            <a className="btn btn-sm md:btn-md text-xs md:text-base  bg-[#797DFC] hover:bg-[#888cfcc0] text-white font-bold font-inter  md:px-6 rounded-3xl border-none">Login</a>
                                        </Link>
                                    </div>
                                }
                            </div>
                            <div >
                                {
                                    user &&
                                    <div className='navbar-end'>
                                        <div className=' dropdown dropdown-end z-50 '>
                                            <div
                                                tabIndex={0}
                                                role='button'
                                                className='btn btn-ghost btn-circle avatar '
                                            >
                                                <div className='w-8 md:w-10  rounded-full ' title={user?.displayName}>
                                                    <img
                                                        referrerPolicy='no-referrer'
                                                        alt='User Profile Photo'
                                                        src={user?.photoURL}
                                                    />
                                                </div>
                                            </div>
                                            <ul
                                                id='nav'
                                                tabIndex={0}
                                                className='menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 font-inter '
                                            >

                                                <li>
                                                    <NavLink to='/add-post'>Add Volunteer Post</NavLink>
                                                </li>
                                                <li className=''>
                                                    <NavLink to='/my-post'> Manage My Post</NavLink>
                                                </li>

                                                <li className='mt-2'>
                                                    <button onClick={logOut} className='bg-[#797DFC] hover:bg-[#888cfcc0] text-white font-semibold  block text-center'>Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                }
                            </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;