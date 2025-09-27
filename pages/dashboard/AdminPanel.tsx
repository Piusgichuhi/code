import React from 'react';

const users = [
    { id: 1, name: 'root', role: 'Root', lastLogin: '2023-10-27 10:00 AM', status: 'Active' },
    { id: 2, name: 'john.doe', role: 'User', lastLogin: '2023-10-27 09:45 AM', status: 'Active' },
    { id: 3, name: 'jane.smith', role: 'User', lastLogin: '2023-10-26 03:12 PM', status: 'Inactive' },
];

const AdminPanel: React.FC = () => {
    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-red-400">Admin Control Panel</h2>
            <p className="mb-8 text-gray-400">This panel is restricted to root users only. Exercise caution.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Management */}
                <div className="bg-white/5 dark:bg-black/20 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary-400 mb-4">User Management</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="text-xs text-gray-400 uppercase">
                                <tr>
                                    <th className="py-2">User</th>
                                    <th className="py-2">Role</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className="border-t border-gray-700">
                                        <td className="py-3 font-medium text-white">{user.name}</td>
                                        <td className="py-3 text-gray-300">{user.role}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-3 flex space-x-2">
                                            <button className="text-yellow-400 hover:text-yellow-200">Edit</button>
                                            <button className="text-red-500 hover:text-red-300">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* System Controls */}
                <div className="bg-white/5 dark:bg-black/20 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary-400 mb-4">System Controls</h3>
                    <div className="space-y-4">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">Clear System Caches</button>
                        <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition">Re-index AI Models</button>
                        <button className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-lg transition">Initiate Emergency Lockdown</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
