import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import firebaseApp from '../firebase/firebase.config'; // Adjust the path if necessary

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth(firebaseApp);
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [auth]);

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                axios.post('http://localhost:2000/api/users', {
                    email: user.email,
                    googleId: user.uid
                }).then(response => {
                    console.log('User saved successfully:', response.data);
                    navigate('/');
                }).catch(error => {
                  //  console.error('Error saving user:', error);
                  //  toast.error('Error saving user data');
                });
            }).catch((error) => {
                console.error(error.message);
                toast.error('Google login failed');
            });
    };

    const handleGoogleSignup = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const gender = 'Not specified'; // Ensure gender and dob are collected from the user or have default values
                const dob = 'Not specified';
                axios.post('http://localhost:2000/api/users', {
                    email: user.email,
                    googleId: user.uid,
                    firstName: user.displayName.split(' ')[0],
                    lastName: user.displayName.split(' ')[1] || '',
                    gender: gender,
                    dob: dob
                })
                    .then(response => {
                        if (response.status === 201) {
                            toast.success('Sign-up successful! Please log in.');
                            navigate('/login');
                        } else if (response.status === 409) {
                            toast.error('User already exists. Please log in.');
                            navigate('/login');
                        }
                    })
                    .catch(error => {
                        console.error('Error saving user:', error);
                        toast.error('Error signing up with Google. Please try again.');
                    });
            })
            .catch((error) => {
                console.error('Error signing up with Google:', error);
                toast.error('Error signing up with Google. Please try again.');
            });
    };

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            toast.success('Logged out successfully');
            navigate('/');
        }).catch((error) => {
            toast.error('Error logging out');
        });
    };

    const handleProtectedRoute = (path) => {
        if (!user) {
            toast.warn('You need to login to access this page', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            // navigate('/login');
        } else {
            navigate(path);
        }
    };

    const navItems = [
        { path: "/", title: "Start Your Journey" },
        { path: "/my-jobs", title: "My Jobs" },
        { path: "/salary", title: "Salary Estimate" },
        { path: "/post", title: "Post A Job" },
    ];

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <nav className='flex justify-between items-center py-6'>
                <a href="/" className='flex items-center gap-2  text-2xl text-black'>
                    <svg width="80" height="80" viewBox="0 0 390 390" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_df_0_1)">
                            <circle cx="195" cy="195" r="160" fill="#050505" />
                        </g>
                        <circle cx="195" cy="195" r="150" fill="#FFD700" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M195 345V195H45C45 277.843 112.157 345 195 345Z" fill="#008000" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M196.211 44L195 193.995L344.995 195.206C345.664 112.366 279.051 44.669 196.211 44Z" fill="#008000" />
                        <circle cx="195" cy="195" r="100" fill="black" />
                        <path d="M205.318 122.545H244.239V222.261C244.191 231.731 241.8 240.064 237.065 247.261C232.378 254.411 225.891 259.998 217.605 264.023C209.366 268 199.873 269.989 189.125 269.989C179.797 269.989 171.275 268.379 163.557 265.159C155.839 261.892 149.684 256.778 145.091 249.818C140.498 242.811 138.225 233.72 138.273 222.545H177.761C177.903 226.191 178.519 229.269 179.608 231.778C180.744 234.288 182.307 236.182 184.295 237.46C186.331 238.691 188.794 239.307 191.682 239.307C194.617 239.307 197.08 238.668 199.068 237.389C201.104 236.111 202.643 234.217 203.685 231.707C204.726 229.151 205.271 226.002 205.318 222.261V122.545Z" fill="white" />
                        <defs>
                            <filter id="filter0_df_0_1" x="0" y="0" width="390" height="390" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="-7" dy="-3" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                <feGaussianBlur stdDeviation="17.5" result="effect2_foregroundBlur_0_1" />
                            </filter>
                        </defs>
                    </svg>
                    <span>JamJob</span>
                </a>

                {/* Nav For Large Devices */}
                <ul className='hidden md:flex gap-12'>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-primary'>
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={(e) => {
                                    if ((path === '/my-jobs' || path === '/post') && !user) {
                                        e.preventDefault();
                                        handleProtectedRoute(path);
                                    }
                                }}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                {/* User Info and Auth Buttons */}
                <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                    {user ? (
                        <div className="relative group inline-block">
                            <img src={user.photoURL || '/images/default-user-profile.png'} alt="user profile" className="inline w-10 h-10 rounded-full" />
                            <span className="ml-2">{user.displayName ? user.displayName.split(' ')[0] : 'User'}</span>
                            
                            <div className="absolute right-0 hidden bg-white text-black rounded-lg shadow-lg group-hover:block">
                                <button onClick={handleLogout} className=" w-full block px-4 py-2 hover:bg-gray-100">Logout</button>
                                <button className="w-full block px-4 py-2 hover:bg-gray-100">Delete Account</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button onClick={handleGoogleLogin} className='py-2 px-5 border rounded bg-green text-white'>Login With Google</button>
                            {/* 
                            <button onClick={handleGoogleLogin} className='py-2 px-5 border rounded'>Login</button>
                            <button onClick={handleGoogleSignup} className='py-2 px-5 border rounded bg-green text-white'>Sign Up</button>
                            */}
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className='flex items-center md:hidden'>
                    <button onClick={handleMenuToggler}>
                        {user ? (
                            <div className="flex items-center">
                                <img src={user.photoURL || "/images/default-user-profile.png"} alt="user profile" className="inline w-8 h-8 rounded-full" />
                                <span className="ml-2">{user.displayName ? user.displayName.split(' ')[0] : 'User'}</span>
                                <FaCaretDown className='ml-2' />
                            </div>
                        ) : (
                           <><>
                                </>
                                <div className='flex'>
                                    <p>MENU</p>
                                    <FaCaretDown className='w-6 h-6 text-primary' />
                                </div>
                                
                                
                                </>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul className='flex flex-col items-center  gap-4 py-4 negativeMargin  px-4 absolute right-4 bg-black text-black rounded-lg shadow-xl group-hover:block'>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-[#fafafa] '>
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}
                                onClick={(e) => {
                                    if ((path === '/my-jobs' || path === '/post') && !user) {
                                        e.preventDefault();
                                        handleProtectedRoute(path);
                                    }
                                    setIsMenuOpen(false); // Close the menu after clicking a link
                                }}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    <div className='text-base text-primary font-medium space-y-5 mt-4'>
                        {user ? (
                            <div className="relative group inline-block ">
                               
                                    <button onClick={handleLogout} className="block px-4 py-2  text-[#fafafa]  ">Logout</button>
                                    <button className="block px-4 py-2 text-[#fafafa] ">Delete Account</button>
                                
                            </div>
                        ) : (
                            <>
                                <button onClick={handleGoogleLogin} className='hover:text-gold text-[#fafafa]  duration-200'>Login With Google</button>
                             {/*   <button onClick={handleGoogleSignup} className='hover:text-black duration-200'>Sign Up</button>*/}
                            </>
                        )}
                    </div>
                </ul>
            </div>

            <ToastContainer />
        </header>
    );
};

export default Navbar;

