import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface DroppableProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export function Droppable({ id, children, className = '' }: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    const style = {
        borderColor: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className={className}>
            {children}
        </div>
    );
}
