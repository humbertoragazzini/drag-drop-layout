import type { ReactNode } from 'react';

interface MainGridProps {
    children: ReactNode;
    className?: string;
}

export const MainGrid = ({ children, className = '' }: MainGridProps) => {
    return (
        <main className={`grid grid-cols-12 gap-4 w-full p-4 @container ${className}`}>
            {children}
        </main>
    );
};
