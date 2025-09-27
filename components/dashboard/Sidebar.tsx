import React from 'react';
// FIX: Import `useNavigate` from `react-router-dom` to fix the "Cannot find name 'useNavigate'" error.
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

const NavIcon = ({ path, title }: { path: string, title: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <title>{title}</title>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const navItems = [
    { to: "/dashboard/tools", iconPath: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Cyber Tools" },
    { to: "/dashboard/news", iconPath: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 7h2m-2 4h2m4-4h2m-2 4h2m-4-8h2", title: "Trending News" },
    { to: "/dashboard/monitoring", iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Monitoring" },
    { to: "/dashboard/aws", iconPath: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", title: "AWS Insights" },
    { to: "/dashboard/terminal", iconPath: "M8 9l4-4 4 4m0 6l-4 4-4-4", title: "Terminal" },
    { to: "/dashboard/settings", iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", title: "Settings" },
];

const adminNavItems = [
    { to: "/dashboard/admin", iconPath: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.246.977-4.644.977-7.132A7 7 0 0012 4c-3.866 0-7 3.134-7 7 0 2.488.332 4.886.977 7.132", title: "Admin Panel" },
];

const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="w-20 md:w-64 bg-gray-900/70 dark:bg-black/50 backdrop-blur-xl text-gray-200 flex flex-col transition-all duration-300">
            <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-700/50">
                <span className="text-2xl font-bold text-white hidden md:block">AEGIS</span>
                <span className="text-2xl font-bold text-white block md:hidden">A</span>
            </div>
            
            <nav className="flex-grow px-2 md:px-4 py-4 space-y-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                            isActive
                                ? 'bg-primary-600 text-white'
                                : 'hover:bg-gray-700/50 hover:text-white'
                            }`
                        }
                    >
                        <NavIcon path={item.iconPath} title={item.title} />
                        <span className="ml-4 font-medium hidden md:block">{item.title}</span>
                    </NavLink>
                ))}
                {user?.role === UserRole.Root && adminNavItems.map(item => (
                     <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                            isActive
                                ? 'bg-red-600 text-white'
                                : 'hover:bg-gray-700/50 hover:text-white text-red-400'
                            }`
                        }
                    >
                        <NavIcon path={item.iconPath} title={item.title} />
                        <span className="ml-4 font-medium hidden md:block">{item.title}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-700/50">
                <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/150?u=${user?.username}`} alt="User Avatar" />
                    <div className="ml-3 hidden md:block">
                        <p className="font-semibold text-white">{user?.username}</p>
                        <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full mt-4 flex items-center justify-center md:justify-start p-3 rounded-lg text-gray-400 hover:bg-red-800/50 hover:text-white transition-colors duration-200"
                >
                    <NavIcon path="M17 16l4-4m0 0l-4-4m4 4H7" title="Logout" />
                    <span className="ml-4 font-medium hidden md:block">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;