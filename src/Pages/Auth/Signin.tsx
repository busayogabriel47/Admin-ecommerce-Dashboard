import { Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../Context/AuthContext'
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Password } from '@mui/icons-material';





const Signin = () => {

    const {signinUser, loading, error} = useAuth();
    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { email, password, confirmPassword } = formData;

        // Validate form data
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            await signinUser({ email, password }); // Call signinUser from context
            toast.success("Successfully signed in!");
            setTimeout(() => {
                navigate("/");// Redirect on success
              }, 2000);
        } catch (error: any) {
            toast.error(error.message || "Signin failed! Please try again.");
        }
    };

    

  return (
    <>
        <div className='flex justify-center mt-[2rem] w-full'>
                                                <div className='flex flex-col w-[80%]'>
                                                    
                                                    <div className='w-full md:w-[100%]'>
                                                    <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
                                                        <h2 className="text-2xl font-semibold">Welcome Admin !</h2>

                                                        <p className='mb-4'>Please login here</p>
                                                        
                                                        <form onSubmit={handleSubmit}>

                                                            <div className="mt-4">
                                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Registered email</label>
                                                                <input type="email" 
                                                                id="email" 
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                className="mt-1 p-2 w-full border border-[#EFB65B] rounded-md"/>
                                                            </div>


                                                            <div className="mt-4">
                                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                                                <div className="relative">
                                                                    <input 
                                                                        type="password" 
                                                                        id="password" 
                                                                        name="password" 
                                                                        
                                                                        value={formData.password}
                                                                        onChange={handleChange}
                                                                        className="mt-1 p-2 w-full border border-solid border-[#EFB65B] rounded-md"
                                                                    />
                                                                    <span 
                                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                                                    >      
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4">
                                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                                                <input 
                                                                    type="password"
                                                                    id="confirmPassword" 
                                                                    name="confirmPassword"
                                                                    value={formData.confirmPassword}
                                                                    onChange={handleChange}
                                                                    className="mt-1 p-2 w-full border border-solid border-[#EFB65B] rounded-md"
                                                                />
                                                            </div>


                                                            <div className='flex justify-between'>
                                                                <div className="mt-4 flex items-center gap-[0.6rem]">
                                                                    <span><input type="checkbox" id="password" name="password" className="mt-1 p-2 w-full border border-solid border-[#EFB65B] rounded-md"/></span>
                                                                    <span>Remember Me</span>
                                                                </div>
                                                                <div className="mt-4 flex items-center gap-[1rem]">
                                                                    
                                                                    <span>Forget Password?</span>
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                            <div className="mt-6">
                                                                <button type="submit" className="w-full p-3 bg-[#000] text-white rounded-md hover:bg-[#EFB65B]">{loading ? 'Signing In...' : 'Sign In'}</button>
                                                            </div>

                                                            <div className='text-right'>
                                                                <p>New Admin? <Link to="/signup">Signup</Link></p>
                                                            </div>

                                                            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error if any */}
                                                        </form>
                                                    </div>   
                                                    </div>
                                                    
                                                </div>
                                        </div> 


                          
    </>
  )
}

export default Signin