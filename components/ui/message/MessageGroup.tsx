import React from 'react';
import { cn } from '@/lib/utils';

interface MessageGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export function MessageGroup({ title, children, className, ...props }: MessageGroupProps) {
  return (
    <div 
      className={cn("space-y-2", className)}
      role="region"
      aria-label={title || "Message group"}
      {...props}
    >
      {title && (
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      )}
      {children}
    </div>
  );
}
