import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import glogo from "../../../src/assets/geniusLogo2.png";

const Signin = () => {
    const { signinUser, loading, error } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            await signinUser({ email, password });
            toast.success("Successfully signed in!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error: any) {
            toast.error(error.message || "Signin failed! Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center w-full bg-black min-h-screen">
            <div className="flex flex-col md:flex-row w-[90%] max-w-5xl h-full">
                {/* Left Section - Logo */}
                <div className="w-full md:w-[50%] flex justify-center items-center min-h-screen">
                    <div className="border-r-2 border-[#EFB65B] flex justify-center items-center w-full h-auto py-10">
                        <img src={glogo} alt="Logo" className="w-[60%] md:w-[50%]" />
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="w-full md:w-[50%] flex justify-center items-center min-h-screen">
                    <div className="p-8 rounded shadow-md max-w-md w-full mx-auto text-center">
                        <h2 className="text-2xl font-semibold text-white">Welcome</h2>
                        <p className="mb-4 text-white">PLEASE LOGIN TO ADMIN DASHBOARD</p>

                        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
                            <div className="mt-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-[#EFB65B] rounded-md bg-transparent text-white placeholder-gray-400"
                                    placeholder="REGISTERED EMAIL"
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-[#EFB65B] rounded-md bg-transparent text-white placeholder-gray-400"
                                    placeholder="PASSWORD"
                                    required
                                />
                            </div>

                            {/* Signin Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full p-3 bg-[#EFB65B] text-black font-semibold rounded-md hover:bg-[#d49b48] transition"
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>

                            {/* Signup & Forgot Password Links */}
                            <div className="flex justify-between text-white mt-4 text-sm">
                                <p>
                                    New Admin? <Link to="/signup" className="underline">Signup</Link>
                                </p>
                                <p>
                                    <Link to="/forgot-password" className="underline">Forgot Password?</Link>
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
