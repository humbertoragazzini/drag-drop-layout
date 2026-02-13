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

import { Accordion } from '../atoms/Accordion';

interface DragDropLayoutProps {
    className?: string;
}

export function DragDropLayout({ className = '' }: DragDropLayoutProps) {
    const [items, setItems] = useState([
        // Sales Items
        { id: 'sales-1', title: 'Revenue Chart', desc: 'Monthly revenue trend', tags: ['Sales', 'Chart'], span: 12, category: 'Sales' },
        { id: 'sales-2', title: 'Top Products', desc: 'Best selling items list', tags: ['Sales', 'List'], span: 8, category: 'Sales' },
        { id: 'sales-3', title: 'Sales Map', desc: 'Geographic distribution', tags: ['Sales', 'Map'], span: 6, category: 'Sales' },
        { id: 'sales-4', title: 'Conversion Rate', desc: 'Visitor to customer ratio', tags: ['Sales', 'KPI'], span: 3, category: 'Sales' },

        // Metrics Items
        { id: 'metrics-1', title: 'Active Users', desc: 'Real-time user count', tags: ['Metrics', 'User'], span: 12, category: 'Metrics' },
        { id: 'metrics-2', title: 'Bounce Rate', desc: 'Page abandonment rate', tags: ['Metrics', 'Analytics'], span: 8, category: 'Metrics' },
        { id: 'metrics-3', title: 'Session Duration', desc: 'Average time on site', tags: ['Metrics', 'Time'], span: 6, category: 'Metrics' },
        { id: 'metrics-4', title: 'Server Load', desc: 'CPU and Memory usage', tags: ['Metrics', 'DevOps'], span: 3, category: 'Metrics' },

        // Earnings Items
        { id: 'earnings-1', title: 'Net Profit', desc: 'Total profit after tax', tags: ['Earnings', 'Finance'], span: 12, category: 'Earnings' },
        { id: 'earnings-2', title: 'Expenses', desc: 'Operational costs breakdown', tags: ['Earnings', 'Cost'], span: 8, category: 'Earnings' },
        { id: 'earnings-3', title: 'Forecast', desc: 'Next quarter prediction', tags: ['Earnings', 'AI'], span: 6, category: 'Earnings' },
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
                {/* Accordion Sidebar/Top Bar Area */}
                <div className="bg-gray-900 p-4 border-b border-gray-700 space-y-2">
                    <h2 className="text-white font-bold mb-2">Widget Library</h2>

                    {(['Sales', 'Metrics', 'Earnings'] as const).map(category => (
                        <Accordion key={category} title={category} defaultOpen={category === 'Sales'}>
                            {items.filter(item => item.parent === null && item.category === category).map((item) => (
                                <Draggable key={item.id} id={item.id} className="bg-blue-600 text-white p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-blue-700 transition-colors bg-opacity-80 min-w-[200px]">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">
                                                {category === 'Sales' ? '💰' : category === 'Metrics' ? '📊' : '�'}
                                            </span>
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
                            {items.filter(item => item.parent === null && item.category === category).length === 0 && (
                                <div className="text-gray-500 text-sm italic p-2">All items added</div>
                            )}
                        </Accordion>
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
