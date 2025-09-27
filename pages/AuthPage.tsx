import React from 'react';
import AuthForm from '../components/auth/AuthForm';

const AuthPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white font-sans relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-cover bg-center z-0 opacity-10 blur-sm" style={{ backgroundImage: "url('https://picsum.photos/seed/dashboard/1920/1080')" }}></div>
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            
            {/* Content */}
            <div className="relative z-20 flex flex-col items-center">
                 <h1 className="text-6xl font-bold text-white mb-4">AEGIS</h1>
                <p className="text-xl text-gray-300 mb-10">Your AI-Powered Security & Ops Hub</p>
                <AuthForm />
                <p className="text-xs text-gray-500 mt-8">Hint: Use username 'root' and password 'rootpass' for admin access.</p>
            </div>
        </div>
    );
};

export default AuthPage;
