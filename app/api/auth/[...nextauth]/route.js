// Importing NextAuth library from "next-auth/next"
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs"

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

            // Asynchronous function to authorize user based on provided credentials
            async authorize(credentials) {

                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null

                    } else {

                        const validPassword = await bcrypt.compare(password, user.password);

                        if (!validPassword) {
                            return null
                        }
                    }

                    return user;

                } catch (error) {
                    console.log(error)
                }

                // Returning user object if authorization succeeds

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
