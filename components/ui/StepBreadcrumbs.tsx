import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { cn } from '@/lib/utils';

interface StepBreadcrumbsProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  allowNavigation?: boolean;
  className?: string;
}

export function StepBreadcrumbs({ 
  steps, 
  currentStep, 
  onStepClick, 
  allowNavigation = true,
  className 
}: StepBreadcrumbsProps) {
  const items: BreadcrumbItem[] = steps.map((step, index) => ({
    label: `${index + 1}. ${step}`,
    active: index === currentStep,
    completed: index < currentStep,
    href: allowNavigation ? '#' : undefined,
  }));

  const handleItemClick = (index: number) => {
    if (allowNavigation && onStepClick && index <= currentStep) {
      onStepClick(index);
    }
  };
  
  return (
    <div className={cn("w-full py-4", className)}>
      <Breadcrumbs
        items={items.map((item, index) => ({
          ...item,
          href: item.href && index <= currentStep ? item.href : undefined,
          onClick: () => handleItemClick(index),
        }))}
      />
      
      {/* Alternative visual step indicator */}
      <div className="flex items-center w-full mt-4">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className={cn(
                "flex-1 h-1",
                index <= currentStep ? "bg-blue-600" : "bg-gray-200"
              )} />
            )}
            <div 
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium",
                index < currentStep ? "bg-green-500 text-white" : 
                index === currentStep ? "bg-blue-600 text-white" : 
                "bg-gray-200 text-gray-600"
              )}
              onClick={() => allowNavigation && onStepClick && index <= currentStep && onStepClick(index)}
              style={{ cursor: allowNavigation && index <= currentStep ? 'pointer' : 'default' }}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
