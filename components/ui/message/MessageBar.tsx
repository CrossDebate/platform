import React from 'react';
import { Message, MessageProps } from './Message';
import { cn } from '@/lib/utils';

interface MessageBarProps extends MessageProps {
  progress?: number;
  sticky?: boolean;
}

export function MessageBar({ 
  progress,
  sticky,
  className,
  ...props
}: MessageBarProps) {
  return (
    <div className="relative">
      <Message 
        size="sm"
        className={cn(
          "shadow-sm", 
          sticky && "sticky top-0 z-50",
          className
        )}
        {...props}
      />
      
      {typeof progress === 'number' && (
        <div className="relative h-1 -mt-1 overflow-hidden">
          <div 
            className={cn(
              "absolute left-0 top-0 h-full transition-all duration-300 ease-out",
              props.variant === "success" ? "bg-green-500" :
              props.variant === "error" ? "bg-red-500" :
              props.variant === "warning" ? "bg-yellow-500" :
              props.variant === "info" ? "bg-blue-500" :
              "bg-gray-500"
            )}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
