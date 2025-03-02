/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[class*="app-dark"]'],
    content: ['./index.html', './components/*.{vue,js,ts,jsx,tsx}', './layouts/*.{vue,js,ts,jsx,tsx}', './pages/*.{vue,js,ts,jsx,tsx}'],
    plugins: [require('tailwindcss-primeui')],
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
            }
        }
    }
};
