import React, {createContext, useReducer, useContext} from 'react'
import axios from 'axios';
import {signin, signup} from '../Apiservices/AuthService'
import { SignupFormData, AuthResponse, LoginFormData } from '../Types/Types';


//initial state
interface AuthState {
    user: AuthResponse["user"] | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

type AuthAction = 
| {type: 'AUTH_REQUEST'}
| { type: 'AUTH_SUCCESS'; payload: AuthResponse}
| {type: 'AUTH_FAILURE'; payload: string }
| { type: 'LOGOUT'};


//Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch(action.type){
        case 'AUTH_REQUEST':
            return {...state, loading: true, error: null};
        case 'AUTH_SUCCESS':
            return {...state, loading: false, user: action.payload.user, token: action.payload.token};
        case 'AUTH_FAILURE':
            return {...state, loading: false, error: action.payload};
        case 'LOGOUT':
            return {user: null, token: null, loading: false, error: null};
        default:
            return state;
    }

}


// Context and provider
const AuthContext = createContext<AuthState | any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    loading: false,
    error: null,
  });

  const signupUser = async (formData: SignupFormData) => {
    dispatch({ type: 'AUTH_REQUEST' });
  
    try {
      const data = await signup(formData);
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
      localStorage.setItem('auth', JSON.stringify({ token: data.token }));
      return data; // Return data on success
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
      throw new Error(error.message || 'Signup failed'); // Re-throw the error
    }
  };



  const signinUser = async (formData: LoginFormData) => {
    dispatch({ type: 'AUTH_REQUEST' });

    try {
        const response = await signin(formData); // Use the signin function from AppService
        dispatch({ type: 'AUTH_SUCCESS', payload: response });
        localStorage.setItem('auth', JSON.stringify({ token: response.token }));
        return response; // Return response data on success
    } catch (error: any) {
        dispatch({ type: 'AUTH_FAILURE', payload: error.message });
        throw new Error(error.message || 'Signin failed');
    }
};

  

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ ...state, signupUser, logout, signinUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

