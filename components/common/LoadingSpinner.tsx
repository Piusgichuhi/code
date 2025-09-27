import React from 'react';

const LoadingSpinner: React.FC<{ text?: string }> = ({ text = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-300">{text}</p>
        </div>
    );
};

export default LoadingSpinner;
