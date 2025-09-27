import React, { useState, useEffect } from 'react';
import { getCybersecurityTools } from '../../services/geminiService';
import { CyberTool } from '../../types';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ToolCard: React.FC<{ tool: CyberTool }> = ({ tool }) => (
    <div className="bg-white/5 dark:bg-black/20 p-6 rounded-lg shadow-lg hover:shadow-primary-500/20 border border-transparent hover:border-primary-500/50 transition-all duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-semibold text-primary-400 dark:text-primary-300 mb-2">{tool.name}</h3>
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-4">{tool.category}</p>
        <p className="text-gray-300 dark:text-gray-400">{tool.description}</p>
    </div>
);

const CybersecurityTools: React.FC = () => {
    const [tools, setTools] = useState<CyberTool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                setLoading(true);
                const fetchedTools = await getCybersecurityTools();
                if (fetchedTools.length === 0) {
                    setError("Failed to fetch tools. The AI service may be unavailable or returned no data.");
                } else {
                    setTools(fetchedTools);
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTools();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-full"><LoadingSpinner text="Aegis AI is compiling cybersecurity tools..." /></div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-full"><p className="text-red-500">{error}</p></div>;
    }

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Cybersecurity Tools Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                ))}
            </div>
        </div>
    );
};

export default CybersecurityTools;
