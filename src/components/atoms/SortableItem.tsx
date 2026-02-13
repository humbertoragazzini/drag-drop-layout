import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';

interface SortableItemProps {
    id: string;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function SortableItem({ id, children, className = '', style = {} }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const combinedStyle = {
        ...style,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={combinedStyle} {...attributes} {...listeners} className={className}>
            {children}
        </div>
    );
}
