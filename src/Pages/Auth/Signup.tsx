
import { useContext, useState } from "react";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import geluxury from "../../assets/geniusLogo.png"

import {useAuth} from '../../Context/AuthContext';
import { SignupFormData } from "../../Types/Types";


const Signup: React.FC = () => {

  const navigate = useNavigate()
  const {signupUser, loading, error} = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({...formData, [e.target.name]: e.target.value})
}


const hanbdleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await signupUser(formData);
    toast.success('Signup successful!');

    // Clear the input fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

   // Delay the navigation by 2 seconds
   setTimeout(() => {
    navigate("/signin");
  }, 2000);
  } catch (error: any) {
    console.error('Signup error:', error);
    toast.error(error.message || 'Signup failed. Please try again.');
  }
};



 


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-full">
          <div className="bg-white p-8 rounded shadow-md w-[70%] md:w-[35%] mx-auto">
            <div className="text-center flex flex-col md:flex-row">
                <img src={geluxury} alt="" width="20%"/>
              <div >
                <h2 className="text-2xl font-semibold">Signup Admin</h2>
                <p className="mb-4">Please enter details</p>
              </div>
            </div>

            <form onSubmit={hanbdleSubmit} className="flex flex-col w-full">
              {/* First Name */}
              <div className="text-right">
                  <p>Registered Admin? | <Link to="/signin">Login here</Link></p>
              </div>
              <div className="relative mt-6">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="peer mt-4 p-2 w-full border border-gray-300 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#EFB65B]"
                  placeholder="First Name"
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-3 text-sm font-bold text-gray-500 transition-all duration-200 ${
                    formData.firstName
                      ? "top-[-0.5rem] text-gray-700"
                      : "top-[2.2rem]"
                  }`}
                >
                  First Name
                </label>
              </div>

              {/* Last Name */}
              <div className="relative mt-6">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="peer mt-4 p-2 w-full border border-gray-300 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#EFB65B]"
                  placeholder="Last Name"
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-3 text-sm font-bold text-gray-500 transition-all duration-200 ${
                    formData.lastName
                      ? "top-[-0.5rem] text-gray-700"
                      : "top-[2.2rem]"
                  }`}
                >
                  Last Name
                </label>
              </div>

              {/* Email */}
              <div className="relative mt-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer mt-4 p-2 w-full border border-gray-300 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#EFB65B]"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 text-sm font-bold text-gray-500 transition-all duration-200 ${
                    formData.email ? "top-[-0.5rem] text-gray-700" : "top-[2.2rem]"
                  }`}
                >
                  Email
                </label>
              </div>

              {/* Password */}
              <div className="relative mt-6">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="peer mt-4 p-2 w-full border border-gray-300 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#EFB65B]"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 text-sm font-bold text-gray-500 transition-all duration-200 ${
                    formData.password
                      ? "top-[-0.5rem] text-gray-700"
                      : "top-[2.2rem]"
                  }`}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-[2.2rem] right-3 text-sm leading-5"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Terms */}
              <div className="mt-6 flex items-center gap-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="mt-1 p-2 border border-solid border-gray-300 rounded-md"
                />
                <span>I agree to the Terms & Conditions</span>
              </div>

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full p-3 bg-black text-white rounded-md hover:bg-[#EFB65B]"
                >
                  {loading ? 'Registering...' : 'Register'} 
                </button>

                {error && <p style={{color: 'red'}}>{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
