import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const auth = getAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = 'https://jamjob.onrender.com'

    const handleSignup = () => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: `${firstName} ${lastName}`,
                });

                axios.post(`${apiUrl}/api/signup`, {
                    email: user.email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    dob: dob
                }).then(response => {
                    toast.success('Sign-up successful! Please log in.');
                    navigate('/login');
                }).catch(error => {
                    console.error('Error saving user:', error);
                    toast.error('Error signing up. Please try again.');
                });
            })
            .catch((error) => {
                console.error(error.message);
                toast.error('Error signing up. Please try again.');
            });
    };

    const handleGoogleSignup = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                axios.post(`${apiUrl}/api/users`, {
                    email: user.email,
                    googleId: user.uid,
                    firstName: user.displayName.split(' ')[0],
                    lastName: user.displayName.split(' ')[1],
                    gender: gender,
                    dob: dob
                }).then(response => {
                    toast.success('Sign-up successful! Please log in.');
                    navigate('/login');
                }).catch(error => {
                    console.error('Error saving user:', error);
                    toast.error('Error signing up with Google. Please try again.');
                });
            }).catch((error) => {
                console.error('Error signing up with Google:', error);
                toast.error('Error signing up with Google. Please try again.');
            });
    };

    return (
        <div className='h-screen w-full flex flex-col items-center justify-center bg-gray-100 overflow-auto'>
            <a href="/" className='flex items-center gap-2  mt-48 text-2xl text-black mb-8'>
                <svg width="80" height="80" viewBox="0 0 390 390" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_df_0_1)">
                        <circle cx="195" cy="195" r="160" fill="#050505"/>
                    </g>
                    <circle cx="195" cy="195" r="150" fill="#FFD700"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M195 345V195H45C45 277.843 112.157 345 195 345Z" fill="#008000"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M196.211 44L195 193.995L344.995 195.206C345.664 112.366 279.051 44.669 196.211 44Z" fill="#008000"/>
                    <circle cx="195" cy="195" r="100" fill="black"/>
                    <path d="M205.318 122.545H244.239V222.261C244.191 231.731 241.8 240.064 237.065 247.261C232.378 254.411 225.891 259.998 217.605 264.023C209.366 268 199.873 269.989 189.125 269.989C179.797 269.989 171.275 268.379 163.557 265.159C155.839 261.892 149.684 256.778 145.091 249.818C140.498 242.811 138.225 233.72 138.273 222.545H177.761C177.903 226.191 178.519 229.269 179.608 231.778C180.744 234.288 182.307 236.182 184.295 237.46C186.331 238.691 188.794 239.307 191.682 239.307C194.617 239.307 197.08 238.668 199.068 237.389C201.104 236.111 202.643 234.217 203.685 231.707C204.726 229.151 205.271 226.002 205.318 222.261V122.545Z" fill="white"/>
                    <defs>
                        <filter id="filter0_df_0_1" x="0" y="0" width="390" height="390" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-7" dy="-3"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                            <feGaussianBlur stdDeviation="17.5" result="effect2_foregroundBlur_0_1"/>
                        </filter>
                    </defs>
                </svg>
                <span>JamJob</span>
            </a>
            
            <div className='bg-white p-8 rounded shadow-md w-full mb-14 max-w-md'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>

                <div className='flex flex-col gap-4'>
                    <div className='flex gap-4'>
                        <input
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='First Name'
                            className='w-full px-4 py-2 border rounded focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-green'
                        />
                        <input
                            type='text'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Last Name'
                            className='w-full px-4 py-2 border rounded focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-green'
                        />
                    </div>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className='px-4 py-2 border rounded focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-green'
                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                    <input
                        type='date'
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className='px-4 py-2 border rounded focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-green'
                    />
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className='px-4 py-2 border rounded focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-green'
                    />
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        className='w-full px-4 py-2 border rounded focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-green'
                    />
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        className='w-full px-4 py-2 border rounded focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-green'
                    />
                    <button className='bg-green w-full py-2 text-white rounded' onClick={handleSignup}>Sign Up</button>
                </div>

                <div className="flex items-center justify-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button className='flex items-center justify-center bg-green-500 w-full py-2 text-black mb-4 rounded border border-gray-300' onClick={handleGoogleSignup}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                    <span className='ml-2'>Sign Up with Google</span>
                </button>

                <div className='mt-4 text-center'>
                    <span>Already have an account?</span>
                    <a href="/login" className='text-blue-500 ml-2 underline'>Login</a>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default SignUp;
