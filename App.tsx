import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import SplashScreen from './components/common/SplashScreen';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
            <Route path="/dashboard/*" element={user ? <DashboardPage /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Show splash for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider>
            <AuthProvider>
                {loading ? <SplashScreen /> : (
                    <HashRouter>
                        <AppRoutes />
                    </HashRouter>
                )}
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
