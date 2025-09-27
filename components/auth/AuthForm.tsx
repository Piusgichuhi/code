import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('All fields are required.');
            return;
        }
        setError('');
        
        // Mock authentication logic
        let userRole = UserRole.User;
        if (username.toLowerCase() === 'root' && password === 'rootpass') {
            userRole = UserRole.Root;
        }
        
        console.log(`Simulating ${isLogin ? 'login' : 'sign up'} for user:`, username, 'with role:', userRole);
        login(username, userRole);
        navigate('/dashboard');
    };

    return (
        <div className="w-full max-w-md bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
            <div className="flex mb-6 border-b border-gray-500/50">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 text-lg font-semibold transition-colors duration-300 ${isLogin ? 'text-white border-b-2 border-primary-500' : 'text-gray-400'}`}
                >
                    Login
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 text-lg font-semibold transition-colors duration-300 ${!isLogin ? 'text-white border-b-2 border-primary-500' : 'text-gray-400'}`}
                >
                    Sign Up
                </button>
            </div>

            <h2 className="text-3xl font-bold text-center text-white mb-6">
                {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g., 'root' or 'user'"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g., 'rootpass' for root"
                    />
                </div>
                {!isLogin && (
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                )}
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-transform transform hover:scale-105"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
