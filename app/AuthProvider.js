'use client'

// Importing the SessionProvider component from the 'next-auth/react' module
import { SessionProvider } from "next-auth/react";

// Defining a new component called AuthProvider which takes a 'children' prop
const AuthProvider = ({ children }) => {

    // Returning JSX that wraps the 'children' with the SessionProvider
    return <SessionProvider>{children}</SessionProvider>;
};

// Exporting the AuthProvider component as the default export
export default AuthProvider;
