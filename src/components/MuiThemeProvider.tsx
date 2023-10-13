"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useTheme } from "next-themes";

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    if (!theme) {
        return null;
    }

    const muiTheme = createTheme({
        palette: {
            mode: theme === "light" ? "light" : theme === "dark" ? "dark" : "dark",
        },
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
