export interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
  }


  export interface LoginFormData {
    email: string;
    password: string;
    
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      isAdmin: boolean;
      [key: string]: any; // Allow additional fields if needed
    };
  }
  
  export interface ErrorResponse {
    msg: string;
    errors?: { msg: string }[];
  }
  