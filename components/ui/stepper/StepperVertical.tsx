import React from 'react';
import { Stepper, StepProps } from './Stepper';

interface StepperVerticalProps {
  steps: StepProps[];
  activeStep: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  onStepClick?: (step: number) => void;
  allowStepClick?: boolean | ((step: number) => boolean);
  variant?: 'default' | 'outline' | 'minimal';
  className?: string;
}

export function StepperVertical({
  steps,
  activeStep,
  onNext,
  onPrevious,
  onComplete,
  onStepClick,
  allowStepClick,
  variant = 'default',
  className,
}: StepperVerticalProps) {
  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      orientation="vertical"
      variant={variant}
      onNext={onNext}
      onPrevious={onPrevious}
      onComplete={onComplete}
      onStepClick={onStepClick}
      allowStepClick={allowStepClick}
      className={className}
    />
  );
}
