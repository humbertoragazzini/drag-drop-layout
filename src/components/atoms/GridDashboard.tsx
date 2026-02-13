import { useState } from 'react';

interface GridDashboardProps {
    className?: string;
}

interface Box {
    id: string;
    color: string;
    span: number;
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const GridDashboard = ({ className = '' }: GridDashboardProps) => {
    const [boxes, setBoxes] = useState<Box[]>([]);

    const addNewBox = (span: number) => {
        const newBox: Box = {
            id: crypto.randomUUID(),
            color: getRandomColor(),
            span,
        };
        setBoxes([...boxes, newBox]);
    };

    const removeBox = (id: string) => {
        setBoxes(boxes.filter(box => box.id !== id));
    };

    return (
        <div className={`flex flex-col gap-4 w-full h-full ${className}`}>
            <div className="flex flex-wrap justify-end gap-2 relative z-10">
                {[2, 3, 4, 6, 8, 12].map((size) => (
                    <button
                        key={size}
                        onClick={() => addNewBox(size)}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md font-medium transition-colors shadow-sm border border-gray-600"
                    >
                        Add {size} col
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-4 w-full h-full auto-rows-max content-start">
                {boxes.map((box, index) => (
                    <div
                        key={box.id}
                        style={{
                            backgroundColor: box.color,
                            gridColumn: `span ${box.span} / span ${box.span}`
                        }}
                        className="group relative h-32 rounded-lg flex items-center justify-center text-white font-bold shadow-md transition-all hover:scale-[1.02]"
                    >
                        <span>{index + 1} ({box.span})</span>

                        <button
                            onClick={() => removeBox(box.id)}
                            className="absolute top-2 right-2 w-6 h-6 bg-black/20 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all border border-white/20"
                            title="Remove box"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
