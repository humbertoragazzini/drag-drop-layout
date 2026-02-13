import { type ReactNode, useState } from 'react';

interface MainGridProps {
    children: ReactNode;
    className?: string;
}

export const MainGrid = ({ children, className = '' }: MainGridProps) => {
    const [width, setWidth] = useState('100%');
    const [height, setHeight] = useState('100%');

    return (
        <div className="flex flex-col gap-4 w-full h-full p-4">
            <div className="flex gap-4 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-400 font-medium">Width</label>
                    <input
                        type="text"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="bg-gray-900 border border-gray-600 rounded px-3 py-1 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="e.g., 100%, 500px"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-400 font-medium">Height</label>
                    <input
                        type="text"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="bg-gray-900 border border-gray-600 rounded px-3 py-1 text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="e.g., 100%, 500px"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto bg-gray-900/50 rounded-xl p-4 border border-gray-800 flex items-center justify-center">
                <main
                    style={{ width, height, transition: 'all 0.3s ease' }}
                    className={`grid grid-cols-12 gap-4 p-4 @container bg-black border border-gray-700 rounded-lg shadow-xl mx-auto overflow-hidden ${className}`}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};
