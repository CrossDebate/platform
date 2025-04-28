import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  active?: boolean;
  completed?: boolean;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </span>
            )}
            
            {item.href && !item.active ? (
              <Link 
                href={item.href}
                className={cn(
                  "inline-flex items-center text-sm font-medium",
                  item.completed ? "text-green-700" : "text-gray-700 hover:text-blue-600",
                )}
              >
                {item.completed && (
                  <svg className="w-3 h-3 mr-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
                {item.label}
              </Link>
            ) : (
              <span 
                className={cn(
                  "inline-flex items-center text-sm font-medium",
                  item.active ? "text-blue-600" : "text-gray-500"
                )}
              >
                {item.completed && !item.active && (
                  <svg className="w-3 h-3 mr-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```
