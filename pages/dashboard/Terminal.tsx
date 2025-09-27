import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getCybersecurityTools } from '../../services/geminiService';
import { CyberTool } from '../../types';

interface OutputLine {
  type: 'input' | 'output' | 'error';
  content: string | JSX.Element;
}

const Terminal: React.FC = () => {
    const { user } = useAuth();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<OutputLine[]>([
        { type: 'output', content: 'Aegis Terminal [Version 1.0.0]' },
        { type: 'output', content: '(c) Aegis Corporation. All rights reserved.' },
        { type: 'output', content: "Type 'help' for a list of commands." },
    ]);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const endOfOutputRef = useRef<HTMLDivElement>(null);

    const prompt = (
        <span className="flex items-center">
            <span className="text-green-400">{user?.username}@aegis</span>
            <span className="text-gray-400">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-gray-400">$</span>
        </span>
    );

    useEffect(() => {
        endOfOutputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    const processCommand = async (command: string) => {
        const newOutput: OutputLine[] = [...output, { type: 'input', content: <div className="flex items-center gap-2">{prompt}<span>{command}</span></div> }];
        setOutput(newOutput);
        setIsProcessing(true);

        const [cmd, ...args] = command.trim().split(' ');
        let cmdOutput: OutputLine[] = [];

        switch (cmd.toLowerCase()) {
            case 'help':
                cmdOutput = [
                    { type: 'output', content: 'Available commands:' },
                    { type: 'output', content: '  help       - Show this help message' },
                    { type: 'output', content: '  clear      - Clear the terminal screen' },
                    { type: 'output', content: '  date       - Display the current date and time' },
                    { type: 'output', content: '  whoami     - Display the current user' },
                    { type: 'output', content: '  ls-tools   - List cybersecurity tools using AI' },
                    { type: 'output', content: '  echo [text] - Print text to the terminal' },
                ];
                break;
            case 'clear':
                setOutput([]);
                setIsProcessing(false);
                return;
            case 'date':
                cmdOutput = [{ type: 'output', content: new Date().toString() }];
                break;
            case 'whoami':
                cmdOutput = [{ type: 'output', content: user?.username || 'guest' }];
                break;
            case 'echo':
                cmdOutput = [{ type: 'output', content: args.join(' ') }];
                break;
            case 'ls-tools':
                setOutput(prev => [...prev, { type: 'output', content: 'Fetching tools with Aegis AI...' }]);
                try {
                    const tools: CyberTool[] = await getCybersecurityTools();
                    if(tools.length > 0) {
                        const toolLines = tools.map(t => ({type: 'output', content: `- ${t.name} (${t.category})`})) as OutputLine[];
                        cmdOutput = [{ type: 'output', content: 'Top Cybersecurity Tools:' }, ...toolLines];
                    } else {
                        cmdOutput = [{ type: 'error', content: 'AI service failed to return tools.' }];
                    }
                } catch (e) {
                    cmdOutput = [{ type: 'error', content: 'Error fetching tools from AI service.' }];
                }
                break;
            case '':
                 break;
            default:
                cmdOutput = [{ type: 'error', content: `command not found: ${command}` }];
        }

        setTimeout(() => { // Simulate processing time
            setOutput(prev => [...prev, ...cmdOutput]);
            setIsProcessing(false);
            if(inputRef.current) inputRef.current.focus();
        }, 200);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isProcessing) {
            const command = input.trim();
            if (command) {
                setHistory(prev => [command, ...prev]);
                setHistoryIndex(-1);
            }
            processCommand(command);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            } else if (historyIndex === 0) {
                 setHistoryIndex(-1);
                 setInput('');
            }
        }
    };

    return (
        <div 
            className="p-4 h-full bg-gray-900 text-white font-mono text-sm overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
        >
            {output.map((line, index) => (
                <div key={index} className={line.type === 'error' ? 'text-red-400' : 'text-gray-300'}>
                    {line.content}
                </div>
            ))}
            {!isProcessing && (
                <div className="flex items-center gap-2">
                    {prompt}
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="flex-grow bg-transparent outline-none"
                        autoFocus
                    />
                </div>
            )}
             <div ref={endOfOutputRef} />
        </div>
    );
};

export default Terminal;
