import API from '../api/axios'
import { SignupFormData, AuthResponse, LoginFormData } from '../Types/Types'


export const refreshToken = async() => {
    return  await API.post('/refresh-token', {}, { withCredentials: true });
};

export const signup = async (formData: SignupFormData): Promise<AuthResponse> => {
    try {
        const response = await API.post<AuthResponse>('/auth/signup',formData);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data.msg || "Somerthing went wrong during signup";
        throw new Error(message)
    }
}



// Signin API request
export const signin = async (formData: LoginFormData): Promise<AuthResponse> => {
    try {
        const response = await API.post<AuthResponse>('/auth/signin-admin', formData); // Adjust the URL as needed
        return response.data; // Return response data (including token and user details)
    } catch (error: any) {
        const message = error.response?.data.msg || "Something went wrong during signin";
        throw new Error(message); // Throw a meaningful error message
    }
}

