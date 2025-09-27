import React, { useState } from 'react';

const Toggle: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void }> = ({ label, enabled, onChange }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-300">{label}</span>
        <button
            type="button"
            className={`${
                enabled ? 'bg-primary-600' : 'bg-gray-600'
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-800`}
            onClick={() => onChange(!enabled)}
        >
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
        </button>
    </div>
);


const Settings: React.FC = () => {
    const [email, setEmail] = useState('user@example.com');
    const [notifications, setNotifications] = useState({
        threatAlerts: true,
        systemHealth: true,
        newsUpdates: false,
    });
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
        setNotifications(prev => ({...prev, [key]: value}))
    }

    return (
        <div className="p-8 text-white">
            <h2 className="text-3xl font-bold mb-8">Settings</h2>

            <div className="max-w-2xl mx-auto space-y-12">
                {/* Email Settings */}
                <div className="bg-white/5 dark:bg-black/20 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-primary-400">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                         <div>
                            <p className="text-gray-400">Your connected email address:</p>
                            {isEditingEmail ? (
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-700 text-white p-1 rounded"
                                />
                            ) : (
                                <p className="font-medium text-lg">{email}</p>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsEditingEmail(!isEditingEmail)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
                        >
                            {isEditingEmail ? 'Save' : 'Change'}
                        </button>
                    </div>
                </div>

                 {/* Notification Preferences */}
                 <div className="bg-white/5 dark:bg-black/20 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-primary-400">Notification Preferences</h3>
                    <div className="space-y-4">
                        <Toggle 
                            label="Critical Threat Alerts"
                            enabled={notifications.threatAlerts}
                            onChange={(val) => handleNotificationChange('threatAlerts', val)}
                        />
                         <Toggle 
                            label="System Health Updates"
                            enabled={notifications.systemHealth}
                            onChange={(val) => handleNotificationChange('systemHealth', val)}
                        />
                         <Toggle 
                            label="Daily News Digest"
                            enabled={notifications.newsUpdates}
                            onChange={(val) => handleNotificationChange('newsUpdates', val)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
