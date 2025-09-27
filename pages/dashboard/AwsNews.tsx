import React, { useState, useEffect } from 'react';
import { getTrendingNews } from '../../services/geminiService';
import { NewsArticle } from '../../types';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AwsNews: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [sources, setSources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                setError(null);
                const { articles: fetchedArticles, sources: fetchedSources } = await getTrendingNews('AWS');
                if (fetchedArticles.length === 0) {
                    setError("Failed to fetch AWS news and offers.");
                } else {
                    setArticles(fetchedArticles);
                    setSources(fetchedSources);
                }
            } catch (err) {
                setError("An error occurred while fetching news.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">AWS News, Blogs & Offers</h2>
            
            {loading && <LoadingSpinner text="Fetching latest from AWS..." />}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="space-y-6">
                    {articles.map((article, index) => (
                        <div key={index} className="bg-white/5 dark:bg-black/20 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-primary-400 dark:text-primary-300 mb-2">{article.title}</h3>
                            <p className="text-gray-300 dark:text-gray-400 mb-3">{article.summary}</p>
                            <p className="text-xs text-gray-500">Source: {article.source}</p>
                        </div>
                    ))}
                    {sources.length > 0 && (
                        <div className="mt-8 pt-4 border-t border-gray-700">
                            <h4 className="text-lg font-semibold text-gray-400 mb-2">Sources found by Google Search:</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {sources.map((source, index) => (
                                    <li key={index}>
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">
                                            {source.title || source.uri}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AwsNews;
