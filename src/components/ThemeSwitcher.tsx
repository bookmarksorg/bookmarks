"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiSun, BiMoon } from "react-icons/bi";
import { PiMonitor } from "react-icons/pi";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 px-2 border border-gray-200 dark:border-gray-200/30 rounded-full">
            <button
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 bg-transparent ${theme === "light" && "bg-gray-300"}`}
                onClick={() => setTheme("light")}
            >
                <BiSun className="text-gray-500 dark:text-white/80 w-5 h-5" />
            </button>
            <button
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${theme === "system" && "bg-gray-300 dark:bg-gray-700"}`}
                onClick={() => setTheme("system")}
            >
                <PiMonitor className="text-gray-500 dark:text-white/80 w-5 h-5" />
            </button>
            <button
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 bg-transparent ${theme === "dark" && "bg-gray-700"}`}
                onClick={() => setTheme("dark")}
            >
                <BiMoon className="text-gray-500 dark:text-white/80 w-5 h-5" />
            </button>
        </div>
    );
};
