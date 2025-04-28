import React, { useState } from 'react';
import { Stepper } from './Stepper';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Message, MessageBar } from '@/components/ui/message';
import { Button } from '@/components/ui/button';
import { InfoIcon, CheckCircle, Upload, Sparkles } from 'lucide-react';

interface AnalysisStepperProps {
  onComplete?: (data: any) => void;
  className?: string;
}

export function AnalysisStepper({ onComplete, className }: AnalysisStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    analysisType: '',
    dataSource: '',
    options: {
      includeMetrics: false,
      deepAnalysis: false,
      generateVisualizations: false,
      exportResults: false,
    },
    selectedFiles: [],
    advancedOptions: {
      algorithm: 'default',
      threshold: '0.5',
      compareWith: '',
    }
  });
  
  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };
  
  const handlePrevious = () => {
    setActiveStep(prev => prev - 1);
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete(formData);
    }
  };
  
  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const updateOption = (option: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [option]: value
      }
    }));
  };
  
  const updateAdvancedOption = (option: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      advancedOptions: {
        ...prev.advancedOptions,
        [option]: value
      }
    }));
  };

  // Define steps content
  const steps = [
    {
      title: "Basic Info",
      description: "Set up your analysis",
      content: (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Analysis Information</h3>
          <p className="text-gray-500">Provide basic information about the analysis you want to perform.</p>
          
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="analysis-title">Analysis Title</Label>
              <Input
                id="analysis-title"
                placeholder="Enter a title for your analysis"
                value={formData.title}
                onChange={(e) => updateForm('title', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="analysis-description">Description (Optional)</Label>
              <Input
                id="analysis-description"
                placeholder="Briefly describe what you're analyzing"
                value={formData.description}
                onChange={(e) => updateForm('description', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="analysis-type">Analysis Type</Label>
              <Select
                value={formData.analysisType}
                onValueChange={(value) => updateForm('analysisType', value)}
              >
                <SelectTrigger id="analysis-type">
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cognitive-load">Cognitive Load Analysis</SelectItem>
                  <SelectItem value="comprehension">Comprehension Analysis</SelectItem>
                  <SelectItem value="argument-structure">Argument Structure Analysis</SelectItem>
                  <SelectItem value="debate-performance">Debate Performance Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )
    },
    {
      title: "Data Source",
      description: "Select your data",
      content: (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Data Source Selection</h3>
          <p className="text-gray-500">Choose where the data for your analysis will come from.</p>
          
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="data-source">Source Type</Label>
              <Select
                value={formData.dataSource}
                onValueChange={(value) => updateForm('dataSource', value)}
              >
                <SelectTrigger id="data-source">
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upload">Upload Files</SelectItem>
                  <SelectItem value="imported">From Previous Session</SelectItem>
                  <SelectItem value="live">Live Recording</SelectItem>
                  <SelectItem value="api">External API</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.dataSource === 'upload' && (
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="mb-2">Drag and drop files here or click to browse</p>
                <Button variant="secondary" size="sm">Select Files</Button>
                <p className="text-xs text-gray-500 mt-2">Supported formats: .txt, .pdf, .docx, .mp3, .mp4</p>
              </div>
            )}
            
            {formData.dataSource === 'imported' && (
              <div className="space-y-2">
                <Label>Select Previous Session</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="session1">Debate Session - May 15, 2023</SelectItem>
                    <SelectItem value="session2">Workshop Analysis - June 2, 2023</SelectItem>
                    <SelectItem value="session3">Classroom Debate - June 10, 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <MessageBar
            variant="info"
            description="The quality of your analysis results depends on the data you provide."
            size="sm"
            className="mt-4"
          />
        </Card>
      )
    },
    {
      title: "Options",
      description: "Configure analysis",
      optional: true,
      content: (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Analysis Options</h3>
          <p className="text-gray-500">Configure how you want your analysis to be performed.</p>
          
          <div className="space-y-4 pt-2">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-metrics"
                  checked={formData.options.includeMetrics}
                  onCheckedChange={(checked) => updateOption('includeMetrics', checked === true)}
                />
                <Label htmlFor="include-metrics">Include CL-CompL Metrics</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="deep-analysis"
                  checked={formData.options.deepAnalysis}
                  onCheckedChange={(checked) => updateOption('deepAnalysis', checked === true)}
                />
                <Label htmlFor="deep-analysis">Perform Deep Analysis (Takes Longer)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="generate-visualizations"
                  checked={formData.options.generateVisualizations}
                  onCheckedChange={(checked) => updateOption('generateVisualizations', checked === true)}
                />
                <Label htmlFor="generate-visualizations">Generate Visualizations</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="export-results"
                  checked={formData.options.exportResults}
                  onCheckedChange={(checked) => updateOption('exportResults', checked === true)}
                />
                <Label htmlFor="export-results">Export Results After Completion</Label>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Advanced Options</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="analysis-algorithm">Analysis Algorithm</Label>
                  <Select
                    value={formData.advancedOptions.algorithm}
                    onValueChange={(value) => updateAdvancedOption('algorithm', value)}
                  >
                    <SelectTrigger id="analysis-algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="nlp-enhanced">NLP Enhanced</SelectItem>
                      <SelectItem value="ml-based">ML-Based</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analysis-threshold">Confidence Threshold</Label>
                  <Select
                    value={formData.advancedOptions.threshold}
                    onValueChange={(value) => updateAdvancedOption('threshold', value)}
                  >
                    <SelectTrigger id="analysis-threshold">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.1">Very Low (0.1)</SelectItem>
                      <SelectItem value="0.3">Low (0.3)</SelectItem>
                      <SelectItem value="0.5">Medium (0.5)</SelectItem>
                      <SelectItem value="0.7">High (0.7)</SelectItem>
                      <SelectItem value="0.9">Very High (0.9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )
    },
    {
      title: "Review",
      description: "Confirm settings",
      content: (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Review Your Analysis Setup</h3>
          <p className="text-gray-500">Please review your analysis configuration before starting.</p>
          
          <div className="space-y-4 mt-2">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <h4 className="text-sm font-medium">Basic Information</h4>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-sm text-gray-500">Title:</div>
                  <div className="text-sm">{formData.title || "Not specified"}</div>
                  
                  <div className="text-sm text-gray-500">Analysis Type:</div>
                  <div className="text-sm">
                    {formData.analysisType === 'cognitive-load' ? 'Cognitive Load Analysis' :
                     formData.analysisType === 'comprehension' ? 'Comprehension Analysis' :
                     formData.analysisType === 'argument-structure' ? 'Argument Structure Analysis' :
                     formData.analysisType === 'debate-performance' ? 'Debate Performance Analysis' :
                     'Not selected'}
                  </div>
                  
                  <div className="text-sm text-gray-500">Description:</div>
                  <div className="text-sm">{formData.description || "None"}</div>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <h4 className="text-sm font-medium">Data Source</h4>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-sm text-gray-500">Source Type:</div>
                  <div className="text-sm">
                    {formData.dataSource === 'upload' ? 'File Upload' :
                     formData.dataSource === 'imported' ? 'From Previous Session' :
                     formData.dataSource === 'live' ? 'Live Recording' :
                     formData.dataSource === 'api' ? 'External API' :
                     'Not selected'}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <h4 className="text-sm font-medium">Selected Options</h4>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 ${formData.options.includeMetrics ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Include CL-CompL Metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 ${formData.options.deepAnalysis ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Perform Deep Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 ${formData.options.generateVisualizations ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Generate Visualizations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-4 w-4 ${formData.options.exportResults ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className="text-sm">Export Results</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Message
              variant="info"
              icon={<InfoIcon className="h-5 w-5 text-blue-500" />}
              title="Ready to start analysis"
              description="Click 'Finish' to begin analyzing your data based on these settings."
            />
          </div>
        </Card>
      )
    },
  ];

  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onComplete={handleComplete}
      onStepClick={(step) => setActiveStep(step)}
      allowStepClick={(step) => step < activeStep || step === activeStep}
      className={className}
    />
  );
}
