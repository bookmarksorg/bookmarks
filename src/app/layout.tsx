import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BookMarks, Junte-se a comunidade!",
    description: "Interaja com outros usuários e discuta seus livros favoritos!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br">
            <body id="root" className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {/* <AuthContext> */}
                    <ToasterContext />
                    {children}
                    {/* </AuthContext> */}
                </ThemeProvider>
            </body>
        </html>
    );
}
