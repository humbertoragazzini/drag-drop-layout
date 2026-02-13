import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Draggable } from '../atoms/Draggable';
import { Droppable } from '../atoms/Droppable';

interface DragDropLayoutProps {
    className?: string;
}

export function DragDropLayout({ className = '' }: DragDropLayoutProps) {
    const [parent, setParent] = useState<string | null>(null);
    const draggableMarkup = (
        <Draggable id="draggable" className="bg-blue-500 text-white p-4 rounded shadow-md cursor-grab active:cursor-grabbing">
            Drag me
        </Draggable>
    );

    function handleDragEnd(event: DragEndEvent) {
        const { over } = event;

        // If dropped over the droppable container, update parent
        setParent(over ? over.id : null);
    }

    return (
        <div className={`flex flex-col h-full w-full ${className}`}>
            <DndContext onDragEnd={handleDragEnd}>
                {/* Top Bar with draggable items if they are not dropped */}
                <div className="bg-gray-800 p-4 flex gap-4 items-center min-h-[80px] border-b border-gray-700">
                    <h2 className="text-white font-bold mr-4">Drag Items:</h2>
                    {parent === null ? draggableMarkup : null}
                </div>

                {/* Main Content with Droppable Area */}
                <div className="flex-1 p-8 bg-gray-900 flex items-center justify-center">
                    <Droppable id="droppable" className="w-96 h-96 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center bg-gray-800/50">
                        {parent === 'droppable' ? draggableMarkup : <span className="text-gray-500">Drop here</span>}
                    </Droppable>
                </div>
            </DndContext>
        </div>
    );
}
