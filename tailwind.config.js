import animate from "tailwindcss-animate";
import { setupInspiraUI } from "@inspira-ui/plugins";/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[class*="app-dark"]'],
    content: ['./index.html', './components/*.{vue,js,ts,jsx,tsx}', './layouts/*.{vue,js,ts,jsx,tsx}', './pages/*.{vue,js,ts,jsx,tsx}'],
    plugins: [require('tailwindcss-primeui'), animate, setupInspiraUI],
    safelist: [
        'bg-primary-500/20',
        'bg-secondary-500/20',
        'bg-green-500/20',
        'bg-blue-500/20',
        'bg-orange-500/20',
        'dark:bg-primary-400/10',
        'dark:bg-secondary-400/10',
        'dark:bg-green-400/10',
        'dark:bg-blue-400/10',
        'dark:bg-orange-400/10',
        'blur-sm',
        'rounded-full',
        'rounded-lg',
        'clip-triangle',
        'clip-pentagon'
    ],
    prefix: "",
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
        extend: {
            animation: {
                'float': 'float 20s linear infinite',
                'fade-in': 'fadeIn 1s ease-out',
                'slide-up': 'slideUp 1s ease-out'
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                  DEFAULT: "hsl(var(--primary))",
                  foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                  DEFAULT: "hsl(var(--secondary))",
                  foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                  DEFAULT: "hsl(var(--destructive))",
                  foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                  DEFAULT: "hsl(var(--muted))",
                  foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                  DEFAULT: "hsl(var(--accent))",
                  foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                  DEFAULT: "hsl(var(--popover))",
                  foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                  DEFAULT: "hsl(var(--card))",
                  foreground: "hsl(var(--card-foreground))",
                },
              },
              borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
              },
        }
    }
};
