import { useState } from 'react';
import {
    DndContext,
    type DragEndEvent,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    closestCenter
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
    sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { Draggable } from '../atoms/Draggable';
import { Droppable } from '../atoms/Droppable';
import { SortableItem } from '../atoms/SortableItem';

interface DragDropLayoutProps {
    className?: string;
}

export function DragDropLayout({ className = '' }: DragDropLayoutProps) {
    const [items, setItems] = useState([
        { id: 'item-1', title: 'Analytics Dashboard', desc: 'Process user metrics', tags: ['Data', 'Viz'], span: 4 },
        { id: 'item-2', title: 'User Profile', desc: 'Update avatar & settings', tags: ['User', 'Settings'], span: 2 },
        { id: 'item-3', title: 'Payment Gateway', desc: 'Integrate Stripe API', tags: ['Payment', 'Backend'], span: 3 },
        { id: 'item-4', title: 'Notifications', desc: 'Real-time alert system', tags: ['Socket', 'UI'], span: 3 },
        { id: 'item-5', title: 'CI/CD Pipeline', desc: 'Automate build process', tags: ['DevOps', 'GitHub'], span: 5 },
        { id: 'item-6', title: 'Authentication', desc: 'OAuth 2.0 implementation', tags: ['Security', 'Auth'], span: 3 },
        { id: 'item-7', title: 'Database Schema', desc: 'Optimize user queries', tags: ['SQL', 'DB'], span: 4 },
        { id: 'item-8', title: 'Landing Page', desc: 'Redesign hero section', tags: ['Frontend', 'CSS'], span: 6 },
        { id: 'item-9', title: 'API Documentation', desc: 'Update Swagger docs', tags: ['Docs', 'API'], span: 6 },
        { id: 'item-10', title: 'Mobile App', desc: 'Prepare iOS release', tags: ['Mobile', 'iOS'], span: 12 },
    ].map(item => ({ ...item, parent: null as string | null })));

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        // Find items
        const activeItem = items.find(i => i.id === activeId);
        const overItem = items.find(i => i.id === overId);

        // Scenarios:
        // 1. Drag from Top Bar (parent=null) -> Drop Area (parent='droppable' or item in 'droppable')
        if (activeItem?.parent === null && (overId === 'droppable' || overItem?.parent === 'droppable')) {
            setItems(prev => prev.map(item =>
                item.id === activeId ? { ...item, parent: 'droppable' } : item
            ));
            return;
        }

        // 2. Reordering within Drop Area
        if (activeItem?.parent === 'droppable' && overItem?.parent === 'droppable' && activeId !== overId) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === activeId);
                const newIndex = items.findIndex((item) => item.id === overId);
                return arrayMove(items, oldIndex, newIndex);
            });
            return;
        }
    }

    const handleRemove = (id: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, parent: null } : item))
        );
    };

    const droppedItems = items.filter(item => item.parent === 'droppable');

    return (
        <div className={`flex flex-col h-full w-full ${className}`}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                {/* Top Bar with draggable items if they are not dropped */}
                <h2 className="text-white font-bold mr-4 min-w-[80px]">Drag Items:</h2>
                <div className="flex flex-wrap w-full bg-gray-800 p-4 flex gap-4 items-center border-b border-gray-700">
                    {items.filter(item => item.parent === null).map((item) => (
                        <Draggable key={item.id} id={item.id} className="bg-blue-600 text-white p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-blue-700 transition-colors">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">📦</span>
                                    <h3 className="font-bold text-sm">{item.title}</h3>
                                    <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded ml-auto">Col-{item.span}</span>
                                </div>
                                <p className="text-xs opacity-90 truncate">{item.desc}</p>
                                <div className="mt-1 flex gap-1 flex-wrap">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </Draggable>
                    ))}
                </div>

                {/* Main Content with Droppable Area */}
                <div className="flex-1 p-8 bg-gray-900 flex items-start justify-center overflow-auto">
                    <Droppable id="droppable" className="w-full min-h-full border-2 border-dashed border-gray-600 rounded-xl grid grid-cols-12 content-start gap-4 p-4 bg-gray-800/50 transition-colors hover:border-gray-500">
                        <SortableContext
                            items={droppedItems.map(i => i.id)}
                            strategy={rectSortingStrategy}
                        >
                            {droppedItems.map((item) => (
                                <SortableItem key={item.id} id={item.id} style={{ gridColumn: `span ${item.span} / span ${item.span}` }}>
                                    <div className="group relative bg-green-600 text-white p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-green-700 transition-colors h-full">
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            onPointerDown={(e) => e.stopPropagation()}
                                            className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md z-10 hover:scale-110"
                                            title="Remove item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                        <div className="flex flex-col gap-1 h-full">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">✅</span>
                                                <h3 className="font-bold text-sm">{item.title}</h3>
                                                <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded ml-auto">Col-{item.span}</span>
                                            </div>
                                            <p className="text-xs opacity-90 truncate">{item.desc}</p>
                                            <div className="mt-auto flex gap-1 flex-wrap pt-2">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SortableItem>
                            ))}
                        </SortableContext >
                        {
                            droppedItems.length === 0 && (
                                <div className="col-span-12 w-full h-full flex items-center justify-center text-gray-500">
                                    Drop items here
                                </div>
                            )
                        }
                    </Droppable >
                </div >
            </DndContext >
        </div >
    );
}
