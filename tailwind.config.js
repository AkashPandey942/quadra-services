/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#6A1B9A",
                    light: "#9c4dcc",
                },
                secondary: {
                    DEFAULT: "#E91E63",
                    light: "#ff6090",
                },
            },
        },
    },
    plugins: [],
};
