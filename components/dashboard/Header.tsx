import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Theme } from '../../types';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const Header: React.FC<{ title: string }> = ({ title }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-20 bg-gray-100/5 dark:bg-black/10 backdrop-blur-xl flex items-center justify-between px-8 border-b border-gray-200/10 dark:border-gray-800/50">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h1>
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    {theme === Theme.Light ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>
        </header>
    );
};

export default Header;
