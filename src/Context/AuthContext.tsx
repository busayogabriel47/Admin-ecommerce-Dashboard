// AuthContext.tsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { signin, signup } from '../Apiservices/AuthService';
import { SignupFormData, AuthResponse, LoginFormData } from '../Types/Types';

interface AuthState {
    user: AuthResponse["user"] | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean; // Add isAuthenticated flag
}

type AuthAction =
    | { type: 'AUTH_REQUEST' }
    | { type: 'AUTH_SUCCESS'; payload: AuthResponse }
    | { type: 'AUTH_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'SET_AUTH'; payload: boolean }; // Action to set isAuthenticated

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'AUTH_REQUEST':
            return { ...state, loading: true, error: null };
        case 'AUTH_SUCCESS':
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token, isAuthenticated: true };
        case 'AUTH_FAILURE':
            return { ...state, loading: false, error: action.payload, isAuthenticated: false };
        case 'LOGOUT':
            return { user: null, token: null, loading: false, error: null, isAuthenticated: false };
        case 'SET_AUTH': // Set isAuthenticated directly
            return { ...state, isAuthenticated: action.payload, loading: false };
        default:
            return state;
    }
};

const AuthContext = createContext<AuthState | any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        loading: true, // Initial loading state
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
                        // *** KEY CHANGE: Validate the token here ***
                        const isValidToken = await validateToken(token); // Implement validateToken function (see below)
                        if (isValidToken) {
                            dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
                        } else {
                            localStorage.removeItem('auth'); // Clear invalid token
                            dispatch({ type: 'SET_AUTH', payload: false });
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
            dispatch({type: 'AUTH_REQUEST'})
        };

        restoreAuth();
    }, []);

    // ... (signupUser, signinUser, logout functions - no changes needed)

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