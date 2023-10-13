import axios from "axios";
import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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

                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token/`, credentials);

                if (!data) {
                    throw new Error("Invalid credentials");
                }

                const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${data.access}`,
                    },
                });

                if (!user) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    image: data.access,
                    accessToken: data.access,
                    refreshToken: data.refresh,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
