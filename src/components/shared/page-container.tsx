import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    // Removed default py-8 and px-4/sm:px-6/lg:px-8 to allow full control from the page
    <div className={cn('container mx-auto animate-fadeIn', className)}>
      {children}
    </div>
  );
}
