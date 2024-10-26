import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });

            console.log(response.data); // Log the full response to see its structure

            // Check if the token exists
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            // Extract role and log it
            const role = response.data.role;
            console.log('User role:', role); // Log the role for debugging

            // Role checking
            if (role === 'student') {
                navigate('/student-dashboard');
            } else if (role === 'teacher') {
                navigate('/teacher-dashboard');
            } else if (role === 'hod') {
                navigate('/hod-dashboard');
            } else if (role === 'admin') {
                navigate('/admin');
            }else {
                console.error('Unknown role:', role);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 p-8">
            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden">
                {/* Slogan and Branding Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -100 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className="hidden md:flex flex-1 bg-yellow-500 text-gray-800 p-10 flex-col justify-center items-start"
                >
                    <h2 className="text-4xl font-bold mb-6"> <strong>Welcome to Paperless Office</strong></h2>
                    <p className="text-xl">
                        "Say goodbye to manual processes and hello to efficiency and productivity."
                    </p>
                </motion.div>

                {/* Login Section */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className="flex-1 p-10"
                >
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
                        Login
                    </h1>

                    {/* Email Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 p-4">
                            <FaUser className="w-6 h-6 text-gray-600 mr-3" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-gray-100 text-lg outline-none"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-8">
                        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 p-4">
                            <FaLock className="w-6 h-6 text-gray-600 mr-3" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-gray-100 text-lg outline-none"
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            className="bg-gray-800 hover:bg-gray-900 text-yellow-500 font-bold text-xl py-4 px-12 rounded-full transition duration-300 ease-in-out shadow-lg"
                        >
                            Login
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;