// Importing NextAuth library from "next-auth/next"
import NextAuth from "next-auth/next";

// Importing CredentialsProvider from "next-auth/providers/credentials"
import CredentialsProvider from "next-auth/providers/credentials";

// Configuration options for authentication
const authOptions = {
    // Array of authentication providers
    providers: [
        // Configuring CredentialsProvider for username/password authentication
        CredentialsProvider({
            // Name of the provider (for reference)
            name: 'credentials',
            // Hardcoded credentials (for testing, replace with dynamic checks)
            // credentials: {
            //     // userName: 'nazmul',
            //     // password: 'P@ssw0rd'
            // },
            // Asynchronous function to authorize user based on provided credentials
            async authorize(credentials) {
                // Hardcoded user data (for testing, replace with dynamic data retrieval)

                const { email } = credentials;
                const user = { email };
                // Returning user object if authorization succeeds
                return user;
            }
        })
    ],
    // Configuration for session management
    session: {
        // Strategy for session management (using JWT in this case)
        strategy: 'jwt'
    },
    // Secret key for signing cookies (replace with a securely generated key)
    secret: process.env.NEXT_AUTH_SECRET,
    // Page route for login page
    pages: '/'
};

// Creating a handler for authentication requests using NextAuth with the provided options
const handler = NextAuth(authOptions);

// Exporting the handler for both GET and POST requests
export { handler as GET, handler as POST };
