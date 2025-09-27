import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white animate-pulse">
          AEGIS
        </h1>
        <p className="text-lg text-gray-400 animate-fadeIn">Loading Secure Environment...</p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
