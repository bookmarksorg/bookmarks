import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    600: "#ED766f",
                    700: "#CC5656",
                },
                secondary: {
                    600: "#2B3747",
                    700: "#434B57",
                },
            },
            height: {
                "screen-header": "calc(100vh - 4.93rem)",
            },
            plugins: [],
        },
    },
};

export default config;
