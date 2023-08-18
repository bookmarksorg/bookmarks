import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BookMarks, Junte-se a comunidade!",
    description: "Interaja com outros usuários e discuta seus livros favoritos!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br">
            <body className={inter.className}>
                {/* <AuthContext> */}
                <ToasterContext />
                {children}
                {/* </AuthContext> */}
            </body>
        </html>
    );
}
