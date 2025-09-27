import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import CybersecurityTools from './dashboard/CybersecurityTools';
import TrendingNews from './dashboard/TrendingNews';
import Monitoring from './dashboard/Monitoring';
import AwsNews from './dashboard/AwsNews';
import Terminal from './dashboard/Terminal';
import Settings from './dashboard/Settings';
import AdminPanel from './dashboard/AdminPanel';
import AiAssistant from '../components/dashboard/AiAssistant';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const routeTitles: { [key: string]: string } = {
    '/dashboard/tools': 'Cybersecurity Tools',
    '/dashboard/news': 'Trending News',
    '/dashboard/monitoring': 'App Monitoring',
    '/dashboard/aws': 'AWS Insights',
    '/dashboard/terminal': 'Terminal',
    '/dashboard/settings': 'Settings',
    '/dashboard/admin': 'Admin Panel',
};

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { user } = useAuth();
    if (user?.role !== UserRole.Root) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

const DashboardPage: React.FC = () => {
    const location = useLocation();
    const title = routeTitles[location.pathname] || 'Dashboard';
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={title} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-900">
                    <Routes>
                        <Route index element={<Navigate to="tools" replace />} />
                        <Route path="tools" element={<CybersecurityTools />} />
                        <Route path="news" element={<TrendingNews />} />
                        <Route path="monitoring" element={<Monitoring />} />
                        <Route path="aws" element={<AwsNews />} />
                        <Route path="terminal" element={<Terminal />} />
                        <Route path="settings" element={<Settings />} />
                        <Route 
                            path="admin" 
                            element={
                                <ProtectedRoute>
                                    <AdminPanel />
                                </ProtectedRoute>
                            } 
                        />
                         <Route path="*" element={<Navigate to="tools" replace />} />
                    </Routes>
                </main>
            </div>
            <AiAssistant />
        </div>
    );
};

export default DashboardPage;
