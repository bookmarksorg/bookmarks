import axios from "axios";
import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("No credentials");
                }

                if (!credentials.username || !credentials.password) {
                    throw new Error("Invalid credentials");
                }

                const { data } = await axios.post("/api/auth/login", {
                    username: credentials.username,
                    password: credentials.password,
                });

                if (data) {
                    return data;
                } else {
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
