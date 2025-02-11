import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { signin, signup, refreshToken } from '../Apiservices/AuthService';
import { SignupFormData, AuthResponse, LoginFormData } from '../Types/Types';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
    user: AuthResponse["user"] | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

type AuthAction =
    | { type: 'AUTH_REQUEST' }
    | { type: 'AUTH_SUCCESS'; payload: AuthResponse }
    | { type: 'AUTH_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'SET_AUTH'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'AUTH_REQUEST':
            return { ...state, loading: true, error: null };
        case 'AUTH_SUCCESS':
            return { 
                ...state, 
                loading: false, 
                user: action.payload.user, 
                token: action.payload.token, 
                isAuthenticated: true 
            };
        case 'AUTH_FAILURE':
            return { ...state, loading: false, error: action.payload, isAuthenticated: false };
        case 'LOGOUT':
            return { user: null, token: null, loading: false, error: null, isAuthenticated: false };
        case 'SET_AUTH':
            return { ...state, isAuthenticated: action.payload, loading: false };
        default:
            return state;
    }
};

const AuthContext = createContext<AuthState | any>(null);

// Function to validate the token
const validateToken = (token: string): boolean => {
    try {
        const decodedToken: { exp: number } = jwtDecode(token);
        return decodedToken.exp > Date.now() / 1000;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        loading: true,
        error: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        const restoreAuth = async () => {
            const storedAuth = localStorage.getItem('auth');
            if (storedAuth) {
                try {
                    const parsedAuth = JSON.parse(storedAuth);
                    const { token, user } = parsedAuth;

                    if (token && user) {
                        const isValidToken = validateToken(token);
                        if (isValidToken) {
                            dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
                        } else {
                            console.log("Access token expired, attempting refresh...");
                            await attemptTokenRefresh();
                        }
                    } else {
                        dispatch({ type: 'SET_AUTH', payload: false });
                    }
                } catch (error) {
                    console.error("Error restoring auth:", error);
                    dispatch({ type: 'SET_AUTH', payload: false });
                    localStorage.removeItem('auth');
                }
            } else {
                dispatch({ type: 'SET_AUTH', payload: false });
            }
        };

        restoreAuth();
    }, []);

    // Function to refresh the token when expired
    const attemptTokenRefresh = async () => {
        try {
            const { data } = await refreshToken();
            if (data?.token && data?.user) {
                dispatch({ type: 'AUTH_SUCCESS', payload: data });
                localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
            } else {
                logout();
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            logout();
        }
    };

    const signupUser = async (formData: SignupFormData) => {
        dispatch({ type: 'AUTH_REQUEST' });

        try {
            const data = await signup(formData);
            dispatch({ type: 'AUTH_SUCCESS', payload: data });
            localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
            return data;
        } catch (error: any) {
            dispatch({ type: 'AUTH_FAILURE', payload: error.message });
            throw new Error(error.message || 'Signup failed');
        }
    };

    const signinUser = async (formData: LoginFormData) => {
        dispatch({ type: 'AUTH_REQUEST' });

        try {
            const response = await signin(formData);
            dispatch({ type: 'AUTH_SUCCESS', payload: response });
            localStorage.setItem('auth', JSON.stringify({ token: response.token, user: response.user }));
            return response;
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
