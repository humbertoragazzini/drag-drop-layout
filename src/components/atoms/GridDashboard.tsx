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
                        className="h-32 rounded-lg flex items-center justify-center text-white font-bold shadow-md transition-all hover:scale-[1.02]"
                    >
                        {index + 1} ({box.span})
                    </div>
                ))}
            </div>
        </div>
    );
};
