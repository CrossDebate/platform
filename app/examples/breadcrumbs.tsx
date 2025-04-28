"use client";

import { useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StepBreadcrumbs } from '@/components/ui/StepBreadcrumbs';

export default function BreadcrumbsExample() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = ["Select Topic", "Find Sources", "Create Arguments", "Review"];
  
  const standardBreadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Debates", href: "/debates" },
    { label: "Create", active: true }
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Standard Breadcrumbs</h2>
        <div className="p-4 border border-gray-200 rounded-md">
          <Breadcrumbs items={standardBreadcrumbs} />
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Step Navigation</h2>
        <div className="p-4 border border-gray-200 rounded-md">
          <StepBreadcrumbs 
            steps={steps}
            currentStep={currentStep} 
            onStepClick={setCurrentStep}
          />
          
          <div className="mt-8 p-4 border border-gray-200 rounded">
            <p className="text-lg font-medium">Step {currentStep + 1}: {steps[currentStep]}</p>
            <p className="text-gray-600 mt-2">This is the content for the current step in the workflow.</p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            
            <button
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
