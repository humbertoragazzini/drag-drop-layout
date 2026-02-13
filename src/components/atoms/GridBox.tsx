

interface Box {
    id: string;
    color: string;
    span: number;
}

interface GridBoxProps {
    box: Box;
    index: number;
    onRemove: (id: string) => void;
    onResize: (id: string, span: number) => void;
    onMove: (id: string, direction: 'left' | 'right') => void;
    isFirst: boolean;
    isLast: boolean;
}

export const GridBox = ({ box, index, onRemove, onResize, onMove, isFirst, isLast }: GridBoxProps) => {
    return (
        <div
            style={{
                backgroundColor: box.color,
                gridColumn: `span ${box.span} / span ${box.span}`
            }}
            className="group relative h-32 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-md transition-all hover:scale-[1.02]"
        >
            <span>{index + 1} ({box.span})</span>

            <div className="absolute bottom-2 left-0 w-full flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity px-2">
                {[2, 3, 4, 6, 8, 12].map((size) => (
                    <button
                        key={size}
                        onClick={(e) => {
                            e.stopPropagation();
                            onResize(box.id, size);
                        }}
                        className={`px-1.5 py-0.5 text-[10px] rounded border ${box.span === size ? 'bg-white text-black border-white' : 'bg-black/40 text-white border-white/30 hover:bg-black/60'}`}
                        title={`Resize to ${size} columns`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            {/* Move Controls */}
            <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onMove(box.id, 'left')}
                    disabled={isFirst}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border border-white/20 ${isFirst ? 'bg-black/10 text-white/30 cursor-not-allowed' : 'bg-black/20 hover:bg-black/40 text-white'}`}
                    title="Move Left"
                >
                    &lt;
                </button>
                <button
                    onClick={() => onMove(box.id, 'right')}
                    disabled={isLast}
                    className={`w-6 h-6 rounded-full flex items-center justify-center border border-white/20 ${isLast ? 'bg-black/10 text-white/30 cursor-not-allowed' : 'bg-black/20 hover:bg-black/40 text-white'}`}
                    title="Move Right"
                >
                    &gt;
                </button>
            </div>

            <button
                onClick={() => onRemove(box.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-black/20 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all border border-white/20"
                title="Remove box"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    );
};
