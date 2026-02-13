import { useState, type ReactNode } from 'react';

interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-700 rounded-lg bg-gray-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 hover:bg-gray-750 transition-colors text-white font-medium"
            >
                <span className="flex items-center gap-2">
                    {title}
                </span>
                <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-4 border-t border-gray-700">
                    <div className="flex gap-4 min-w-min">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
