import { Chat } from '@google/genai';
import React, { useState, useEffect, useRef } from 'react';
import { createChat } from '../../services/geminiService';

const AiAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !chatRef.current) {
            chatRef.current = createChat();
            setMessages([{ role: 'model', text: 'Hello! How can I help you today?' }]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user' as const, text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (!chatRef.current) return;
            const result = await chatRef.current.sendMessageStream({ message: input });
            let modelResponse = '';
            
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of result) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Gemini AI error:', error);
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 bg-primary-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 z-40"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
            {isOpen && (
                <div className="fixed bottom-28 right-8 w-96 h-[32rem] bg-gray-800/80 backdrop-blur-xl rounded-lg shadow-2xl flex flex-col z-50">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="font-semibold text-white">Aegis AI Assistant</h3>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto">
                        <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                         {isLoading && messages[messages.length-1].role === 'user' && (
                            <div className="flex justify-start">
                                <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
                                    <span className="animate-pulse">...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="flex-grow bg-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md disabled:bg-gray-600">Send</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AiAssistant;
