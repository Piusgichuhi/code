import React, { useState, useEffect } from 'react';
import { AttackLog, AttackType } from '../../types';

const attackTypes = [AttackType.DDoS, AttackType.BruteForce, AttackType.SQLEnabled];
const statuses = ['Blocked', 'In Progress', 'Resolved'];

const generateMockLog = (id: number): AttackLog => {
    const randomIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)] as 'Blocked' | 'In Progress' | 'Resolved';
    return {
        id,
        timestamp: new Date().toISOString(),
        ipAddress: randomIp,
        attackType: randomAttack,
        status: randomStatus,
    };
};

const Tag: React.FC<{ type: AttackType | string, status: string }> = ({ type, status }) => {
    const typeColor = {
        [AttackType.DDoS]: 'bg-red-500/20 text-red-300',
        [AttackType.BruteForce]: 'bg-yellow-500/20 text-yellow-300',
        [AttackType.SQLEnabled]: 'bg-purple-500/20 text-purple-300',
    }[type] || 'bg-gray-500/20 text-gray-300';
    
    const statusColor = {
        'Blocked': 'bg-blue-500/20 text-blue-300',
        'In Progress': 'bg-orange-500/20 text-orange-300',
        'Resolved': 'bg-green-500/20 text-green-300',
    }[status] || 'bg-gray-500/20 text-gray-300';

    return (
        <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColor}`}>{type}</span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>{status}</span>
        </div>
    );
};

const Monitoring: React.FC = () => {
    const [logs, setLogs] = useState<AttackLog[]>(() => 
        Array.from({ length: 15 }, (_, i) => generateMockLog(i + 1))
    );
    const [lastId, setLastId] = useState(15);

    useEffect(() => {
        const interval = setInterval(() => {
            const newId = lastId + 1;
            const newLog = generateMockLog(newId);
            setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 49)]);
            setLastId(newId);
        }, 3000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastId]);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Real-time Threat Monitoring</h2>
            <div className="bg-white/5 dark:bg-black/20 rounded-lg shadow-lg overflow-hidden">
                <table className="w-full text-left text-sm text-gray-300 dark:text-gray-400">
                    <thead className="bg-white/10 dark:bg-black/30 text-xs uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">Source IP</th>
                            <th scope="col" className="px-6 py-3">Threat Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={log.id} className={`border-b border-gray-700/50 ${index === 0 ? 'bg-primary-500/10 animate-pulse-once' : 'hover:bg-gray-700/30'}`}>
                                <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                                <td className="px-6 py-4 font-mono">{log.ipAddress}</td>
                                <td className="px-6 py-4"><Tag type={log.attackType} status={log.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <style>{`
                    @keyframes pulse-once {
                        0% { background-color: rgba(59, 130, 246, 0.1); }
                        50% { background-color: rgba(59, 130, 246, 0.2); }
                        100% { background-color: rgba(59, 130, 246, 0.1); }
                    }
                    .animate-pulse-once {
                        animation: pulse-once 1.5s ease-in-out;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Monitoring;
