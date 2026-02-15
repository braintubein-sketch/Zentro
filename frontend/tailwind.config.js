/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                'z': {
                    'bg': '#0f0f0f',
                    'bg-raised': '#212121',
                    'surface': '#272727',
                    'surface-hover': '#3f3f3f',
                    'elevated': '#282828',
                    'border': '#3f3f3f',
                    'text': '#f1f1f1',
                    'text-secondary': '#aaaaaa',
                    'text-muted': '#717171',
                    'chip': '#272727',
                    'chip-active': '#f1f1f1',
                    'chip-text': '#f1f1f1',
                    'chip-text-active': '#0f0f0f',
                },
                'brand': {
                    DEFAULT: '#ff0000',
                    light: '#ff4e45',
                    dark: '#cc0000',
                    50: '#fff5f5',
                    100: '#ffe3e3',
                    200: '#ffc9c9',
                    300: '#ffa8a8',
                    400: '#ff6b6b',
                    500: '#ff0000',
                    600: '#cc0000',
                    700: '#a30000',
                    800: '#7a0000',
                    900: '#520000',
                },
                'accent': {
                    blue: '#3ea6ff',
                    green: '#2ba640',
                    gold: '#f59e0b',
                    orange: '#f97316',
                    rose: '#ff0000',
                },
            },
            fontFamily: {
                sans: ['Roboto', 'Arial', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-up': 'slideUp 0.2s ease-out',
                'slide-down': 'slideDown 0.2s ease-out',
                'slide-in-right': 'slideInRight 0.25s ease-out',
                'fade-in': 'fadeIn 0.15s ease-out',
                'scale-in': 'scaleIn 0.15s ease-out',
                'scale-up': 'scaleUp 0.2s ease-out',
                'shimmer': 'shimmer 1.5s linear infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(8px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-8px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(16px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                scaleUp: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            boxShadow: {
                'glow': 'none',
                'glow-lg': 'none',
                'premium': '0 4px 32px rgba(0, 0, 0, 0.4)',
                'card': '0 1px 4px rgba(0, 0, 0, 0.2)',
                'elevated': '0 4px 16px rgba(0, 0, 0, 0.3)',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
                '3xl': '24px',
            },
        },
    },
    plugins: [],
}
