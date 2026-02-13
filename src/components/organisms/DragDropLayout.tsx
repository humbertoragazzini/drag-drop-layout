import { useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Draggable } from '../atoms/Draggable';
import { Droppable } from '../atoms/Droppable';

interface DragDropLayoutProps {
    className?: string;
}

export function DragDropLayout({ className = '' }: DragDropLayoutProps) {
    const [items, setItems] = useState([
        { id: 'item-1', title: 'Analytics Dashboard', desc: 'Process user metrics', tags: ['Data', 'Viz'] },
        { id: 'item-2', title: 'User Profile', desc: 'Update avatar & settings', tags: ['User', 'Settings'] },
        { id: 'item-3', title: 'Payment Gateway', desc: 'Integrate Stripe API', tags: ['Payment', 'Backend'] },
        { id: 'item-4', title: 'Notifications', desc: 'Real-time alert system', tags: ['Socket', 'UI'] },
        { id: 'item-5', title: 'CI/CD Pipeline', desc: 'Automate build process', tags: ['DevOps', 'GitHub'] },
        { id: 'item-6', title: 'Authentication', desc: 'OAuth 2.0 implementation', tags: ['Security', 'Auth'] },
        { id: 'item-7', title: 'Database Schema', desc: 'Optimize user queries', tags: ['SQL', 'DB'] },
        { id: 'item-8', title: 'Landing Page', desc: 'Redesign hero section', tags: ['Frontend', 'CSS'] },
        { id: 'item-9', title: 'API Documentation', desc: 'Update Swagger docs', tags: ['Docs', 'API'] },
        { id: 'item-10', title: 'Mobile App', desc: 'Prepare iOS release', tags: ['Mobile', 'iOS'] },
    ].map(item => ({ ...item, parent: null as string | null })));

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        // Use a unique identifier if over exists
        const newParent = over ? String(over.id) : null;

        setItems((prev) =>
            prev.map((item) =>
                item.id === active.id ? { ...item, parent: newParent } : item
            )
        );
    }

    return (
        <div className={`flex flex-col h-full w-full ${className}`}>
            <DndContext onDragEnd={handleDragEnd}>
                {/* Top Bar with draggable items if they are not dropped */}
                <h2 className="text-white font-bold mr-4 min-w-[80px]">Drag Items:</h2>
                <div className="flex flex-wrap w-full bg-gray-800 p-4 flex gap-4 items-center border-b border-gray-700">
                    {items.filter(item => item.parent === null).map((item) => (
                        <Draggable key={item.id} id={item.id} className="bg-blue-600 text-white p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing min-w-[200px] hover:bg-blue-700 transition-colors">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">📦</span>
                                    <h3 className="font-bold text-sm">{item.title}</h3>
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
                    <Droppable id="droppable" className="w-full  min-h-full border-2 border-dashed border-gray-600 rounded-xl flex flex-wrap content-start gap-4 p-4 bg-gray-800/50 transition-colors hover:border-gray-500">
                        {items.filter(item => item.parent === 'droppable').map((item) => (
                            <Draggable key={item.id} id={item.id} className="bg-green-600 text-white p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing w-[200px] hover:bg-green-700 transition-colors h-fit">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">✅</span>
                                        <h3 className="font-bold text-sm">{item.title}</h3>
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
                        {items.filter(item => item.parent === 'droppable').length === 0 && (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                Drop items here
                            </div>
                        )}
                    </Droppable>
                </div>
            </DndContext>
        </div>
    );
}
