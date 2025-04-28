"use client";

import React, { useState } from 'react';
import { VisualModelSelector, Model } from '@/components/ui/VisualModelSelector';
import { ModelPreview } from '@/components/ui/ModelPreview';
import { Button } from '@/components/ui/button';
import { AlertCircle, Info, CheckIcon, FileUp, HelpCircle } from 'lucide-react';
import { Message, MessageBar } from '@/components/ui/message';
import { Stepper } from '@/components/ui/stepper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Example models data
const sampleModels: Model[] = [
  {
    id: 'model-1',
    name: 'Simplex Debate',
    description: 'A straightforward model for organizing basic debate arguments.',
    category: 'Educational',
    tags: ['beginner', 'structured', 'linear'],
    thumbnailUrl: '/images/models/simplex-thumbnail.jpg',
    previewUrl: '/images/models/simplex-preview.jpg',
    metadata: {
      complexity: 'Low',
      recommended_level: 'Beginner',
      time_required: '15-30 minutes',
    }
  },
  {
    id: 'model-2',
    name: 'Multi-perspective Analysis',
    description: 'Advanced model for analyzing arguments from multiple viewpoints.',
    category: 'Advanced',
    tags: ['multi-perspective', 'analysis', 'critical-thinking'],
    thumbnailUrl: '/images/models/multi-perspective-thumbnail.jpg',
    previewUrl: '/images/models/multi-perspective-preview.jpg',
    metadata: {
      complexity: 'High',
      recommended_level: 'Advanced',
      time_required: '45-60 minutes',
      examples: [
        'Example usage in educational setting',
        'Example usage in policy debate'
      ]
    }
  },
  {
    id: 'model-3',
    name: 'Toulmin Framework',
    description: 'Based on Stephen Toulmin\'s model of argumentation with claims, grounds, and warrants.',
    category: 'Academic',
    tags: ['toulmin', 'formal', 'structured', 'university'],
    thumbnailUrl: '/images/models/toulmin-thumbnail.jpg',
    previewUrl: '/images/models/toulmin-preview.jpg',
  },
  {
    id: 'model-4',
    name: 'Socratic Dialogue',
    description: 'Question-driven debate model based on Socratic method.',
    category: 'Educational',
    tags: ['questioning', 'socratic', 'philosophical'],
    thumbnailUrl: '/images/models/socratic-thumbnail.jpg',
  },
  {
    id: 'model-5',
    name: 'Policy Debate Framework',
    description: 'Structured approach for policy-oriented debates with specific sections.',
    category: 'Professional',
    tags: ['policy', 'formal', 'structured', 'evidence-based'],
    thumbnailUrl: '/images/models/policy-thumbnail.jpg',
    previewUrl: '/images/models/policy-preview.jpg',
  },
  {
    id: 'model-6',
    name: 'Visual Argument Map',
    description: 'Visual approach to mapping out debate arguments and connections.',
    category: 'Visual',
    tags: ['visual', 'mind-map', 'connections', 'graphic'],
    thumbnailUrl: '/images/models/visual-map-thumbnail.jpg',
    previewUrl: '/images/models/visual-map-preview.jpg',
  },
];

// For demo purposes, we'll assume these image paths exist
// In a real application, you'd need to add the actual images to your public folder
// or use placeholder images like https://via.placeholder.com/400x300

export default function VisualModelSelectorExample() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showStepper, setShowStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [modelConfig, setModelConfig] = useState({
    title: '',
    description: '',
    participants: '',
    duration: '',
    additionalNotes: ''
  });
  
  const handleSelectModel = (model: Model) => {
    setSelectedModel(model);
    // Show success message briefly
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  
  const handleStartConfiguration = () => {
    setShowStepper(true);
  };
  
  const handleConfigComplete = () => {
    alert(`Model "${selectedModel?.name}" configured successfully with settings:\n\n${JSON.stringify(modelConfig, null, 2)}`);
    setShowStepper(false);
  };
  
  // Configuration steps for the selected model
  const configSteps = [
    {
      title: "Basic Info",
      description: "Set basic info",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide basic information for your {selectedModel?.name} setup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="config-title">Title</Label>
              <Input 
                id="config-title" 
                placeholder="Enter a title" 
                value={modelConfig.title}
                onChange={e => setModelConfig({...modelConfig, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="config-description">Description</Label>
              <Textarea 
                id="config-description" 
                placeholder="Enter a description" 
                value={modelConfig.description}
                onChange={e => setModelConfig({...modelConfig, description: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: "Participants",
      description: "Add participants",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
            <CardDescription>Define who will participate in this debate using the {selectedModel?.name} model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="participants">Participants</Label>
              <Textarea 
                id="participants" 
                placeholder="Enter participant names or roles (one per line)" 
                value={modelConfig.participants}
                onChange={e => setModelConfig({...modelConfig, participants: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: "Settings",
      description: "Additional settings",
      optional: true,
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
            <CardDescription>Configure additional settings for your debate (optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Expected Duration</Label>
              <Input 
                id="duration" 
                placeholder="e.g. 45 minutes" 
                value={modelConfig.duration}
                onChange={e => setModelConfig({...modelConfig, duration: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Any additional information or special requirements" 
                value={modelConfig.additionalNotes}
                onChange={e => setModelConfig({...modelConfig, additionalNotes: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: "Review",
      description: "Finalize setup",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Review Configuration</CardTitle>
            <CardDescription>Review and finalize your {selectedModel?.name} model setup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md space-y-3">
              <div>
                <h4 className="text-sm font-medium">Selected Model</h4>
                <p className="text-sm mt-1">{selectedModel?.name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="text-sm font-medium">Title:</div>
                <div className="text-sm">{modelConfig.title || 'Not specified'}</div>
                
                <div className="text-sm font-medium">Description:</div>
                <div className="text-sm">{modelConfig.description || 'Not specified'}</div>
                
                <div className="text-sm font-medium">Participants:</div>
                <div className="text-sm">{modelConfig.participants || 'Not specified'}</div>
                
                <div className="text-sm font-medium">Duration:</div>
                <div className="text-sm">{modelConfig.duration || 'Not specified'}</div>
              </div>
              
              {modelConfig.additionalNotes && (
                <div>
                  <h4 className="text-sm font-medium">Additional Notes:</h4>
                  <p className="text-sm mt-1">{modelConfig.additionalNotes}</p>
                </div>
              )}
            </div>
            
            <Message
              variant="info"
              icon={<HelpCircle className="h-5 w-5 text-blue-500" />}
              title="Ready to finalize"
              description="Click 'Finish' to complete the setup of your debate model."
            />
          </CardContent>
        </Card>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Model Selection</h1>
      <p className="text-gray-600 mb-4">
        Choose a debate model that fits your needs. Browse, filter, and preview available models.
      </p>
      
      {/* Add message bar for guidance */}
      <MessageBar
        variant="info"
        description="Select a model from the list on the left to see its details on the right panel."
        className="mb-6"
        dismissible
      />
      
      {/* Conditional success message when model is selected */}
      {showSuccessMessage && (
        <Message
          variant="success"
          title={`${selectedModel?.name} selected`}
          description="You can now view the details and use this model."
          dismissible
          onDismiss={() => setShowSuccessMessage(false)}
          className="mb-6 animate-fade-in"
        />
      )}

      {showStepper ? (
        <div className="mb-6">
          <Button variant="outline" onClick={() => setShowStepper(false)} className="mb-4">
            ← Back to Model Selection
          </Button>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-6">Configure {selectedModel?.name}</h2>
            
            <Stepper
              steps={configSteps}
              activeStep={activeStep}
              onNext={() => setActiveStep(prev => Math.min(prev + 1, configSteps.length - 1))}
              onPrevious={() => setActiveStep(prev => Math.max(prev - 1, 0))}
              onComplete={handleConfigComplete}
              onStepClick={setActiveStep}
              allowStepClick={step => step <= activeStep}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Available Models</h2>
            <VisualModelSelector
              models={sampleModels}
              selectedModelId={selectedModel?.id}
              onSelectModel={handleSelectModel}
              categories={['Educational', 'Advanced', 'Academic', 'Professional', 'Visual']}
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Selected Model</h2>
            {selectedModel ? (
              <>
                <ModelPreview model={selectedModel} />
                <Button className="w-full" onClick={handleStartConfiguration}>
                  <FileUp className="h-4 w-4 mr-2" />
                  Configure Model
                </Button>
              </>
            ) : (
              <Message
                variant="neutral"
                icon={<Info className="h-5 w-5 text-blue-500" />}
                title="No model selected"
                description="Please select a model from the list to see its details."
                actions={[
                  {
                    label: "View Documentation",
                    onClick: () => alert("Opening documentation"),
                    variant: "link"
                  }
                ]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
