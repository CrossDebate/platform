import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';

export interface StepProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
  content: React.ReactNode;
}

interface StepperProps {
  steps: StepProps[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'outline' | 'minimal';
  size?: 'default' | 'sm' | 'lg';
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  onStepClick?: (step: number) => void;
  allowStepClick?: boolean | ((step: number) => boolean);
  className?: string;
  contentClassName?: string;
  navigationClassName?: string;
}

const stepIndicatorVariants = cva(
  "flex items-center justify-center rounded-full transition-all relative",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
        minimal: "border-0",
      },
      size: {
        sm: "w-6 h-6 text-xs",
        default: "w-8 h-8 text-sm",
        lg: "w-10 h-10 text-base",
      },
      state: {
        incomplete: "",
        active: "",
        completed: "",
        disabled: "opacity-60",
      }
    },
    compoundVariants: [
      {
        variant: "default",
        state: "incomplete",
        className: "bg-gray-200 text-gray-600",
      },
      {
        variant: "default",
        state: "active",
        className: "bg-primary text-white",
      },
      {
        variant: "default",
        state: "completed",
        className: "bg-green-600 text-white",
      },
      {
        variant: "outline",
        state: "incomplete",
        className: "border-gray-300 text-gray-600",
      },
      {
        variant: "outline",
        state: "active",
        className: "border-primary text-primary",
      },
      {
        variant: "outline",
        state: "completed",
        className: "border-green-600 text-green-600",
      },
      {
        variant: "minimal",
        state: "incomplete",
        className: "text-gray-400",
      },
      {
        variant: "minimal",
        state: "active",
        className: "text-primary font-medium",
      },
      {
        variant: "minimal",
        state: "completed",
        className: "text-green-600",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "incomplete",
    }
  }
);

const stepConnectorVariants = cva(
  "transition-all",
  {
    variants: {
      orientation: {
        horizontal: "flex-1 h-1",
        vertical: "w-1 flex-1",
      },
      state: {
        incomplete: "bg-gray-200",
        active: "bg-primary",
        completed: "bg-green-600",
      }
    },
    defaultVariants: {
      orientation: "horizontal",
      state: "incomplete",
    }
  }
);

export function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  variant = 'default',
  size = 'default',
  onNext,
  onPrevious,
  onComplete,
  onStepClick,
  allowStepClick = false,
  className,
  contentClassName,
  navigationClassName
}: StepperProps) {
  const isLastStep = activeStep === steps.length - 1;
  
  const canGoToStep = (stepIndex: number) => {
    // If navigation is disabled, no step click is allowed
    if (!onStepClick) return false;
    
    // Determine if step click is allowed based on the prop
    if (typeof allowStepClick === 'function') {
      return allowStepClick(stepIndex);
    }
    
    return allowStepClick;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Steps indicator */}
      <div 
        className={cn(
          "flex",
          orientation === 'horizontal' ? "flex-row items-center" : "flex-col items-start space-y-4"
        )}
        aria-label="Progress steps"
      >
        {steps.map((step, index) => {
          // Determine step state
          const completed = index < activeStep;
          const active = index === activeStep;
          const state = completed ? "completed" : active ? "active" : "incomplete";
          const clickable = canGoToStep(index);
          
          return (
            <React.Fragment key={index}>
              {/* Step indicator with connector */}
              <div className={cn(
                "flex gap-2",
                orientation === 'horizontal' ? "items-center" : "flex-row items-start",
                orientation === 'vertical' && index > 0 && "mt-0"
              )}>
                {orientation === 'vertical' && index > 0 && (
                  <div className="flex flex-col items-center h-6 ml-4">
                    <div className={stepConnectorVariants({
                      orientation: "vertical",
                      state: index <= activeStep ? (index < activeStep ? "completed" : "active") : "incomplete"
                    })} />
                  </div>
                )}
                
                <div 
                  className={cn(
                    "group flex items-center",
                    orientation === 'horizontal' ? "flex-col" : "flex-row gap-4",
                    clickable && "cursor-pointer"
                  )}
                  onClick={() => clickable && onStepClick && onStepClick(index)}
                  aria-current={active ? "step" : undefined}
                  role={clickable ? "button" : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onKeyDown={clickable ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onStepClick && onStepClick(index);
                    }
                  } : undefined}
                >
                  <div 
                    className={stepIndicatorVariants({ 
                      variant, 
                      size, 
                      state: canGoToStep(index) ? state : "disabled" 
                    })}
                  >
                    {completed ? (
                      <CheckIcon className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
                    ) : step.icon || (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  
                  <div 
                    className={cn(
                      orientation === 'horizontal' ? "mt-2 text-center" : "text-left",
                      active && "font-medium",
                      !canGoToStep(index) && !active && "text-gray-400"
                    )}
                  >
                    <div className={cn(active && "text-primary")}>{step.title}</div>
                    {step.description && (
                      <div className={cn(
                        "text-xs",
                        orientation === 'horizontal' ? "hidden md:block" : "",
                        active ? "text-gray-600" : "text-gray-400"
                      )}>
                        {step.description}
                        {step.optional && <span className="ml-1">(Optional)</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Connectors between steps */}
              {index < steps.length - 1 && orientation === 'horizontal' && (
                <div className={stepConnectorVariants({
                  orientation: "horizontal",
                  state: index < activeStep ? "completed" : "incomplete"
                })} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step content */}
      <div className={cn("mt-8", contentClassName)}>
        {steps[activeStep].content}
      </div>

      {/* Navigation buttons */}
      <div className={cn(
        "flex justify-between mt-8",
        navigationClassName
      )}>
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={activeStep === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={isLastStep ? onComplete : onNext}
        >
          {isLastStep ? 'Finish' : 'Next'}
          {!isLastStep && <ChevronRightIcon className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
