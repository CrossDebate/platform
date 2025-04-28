"use client";

import { useState } from 'react';
import { Stepper, StepperVertical, AnalysisStepper } from '@/components/ui/stepper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Message } from '@/components/ui/message';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { InfoIcon, SettingsIcon, DatabaseIcon, CheckIcon, ScrollTextIcon } from 'lucide-react';

export default function StepperExample() {
  const [basicActiveStep, setBasicActiveStep] = useState(0);
  const [verticalActiveStep, setVerticalActiveStep] = useState(0);
  const [variantExample, setVariantExample] = useState<'default' | 'outline' | 'minimal'>('default');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  
  const basicSteps = [
    {
      title: "Step 1",
      description: "Basic information",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Let's start with some basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: "Step 2",
      description: "Select options",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Select Options</CardTitle>
            <CardDescription>Choose your preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select>
                <SelectTrigger id="topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="topic1">Climate Change</SelectItem>
                  <SelectItem value="topic2">Healthcare</SelectItem>
                  <SelectItem value="topic3">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea id="comments" placeholder="Additional comments" />
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      title: "Step 3",
      description: "Review and submit",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Review and Submit</CardTitle>
            <CardDescription>Please review your information</CardDescription>
          </CardHeader>
          <CardContent>
            <Message
              variant="info"
              title="Ready to submit"
              description="Please review all your information before submitting. This action cannot be undone."
            />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              By submitting this form, you agree to our terms and conditions.
            </p>
          </CardFooter>
        </Card>
      )
    }
  ];
  
  const verticalSteps = [
    {
      title: "Project Details",
      description: "Enter project information",
      icon: <InfoIcon className="h-4 w-4" />,
      content: (
        <div className="space-y-4 pl-4">
          <h3 className="text-lg font-medium">Project Information</h3>
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input id="project-name" placeholder="Enter project name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-desc">Description</Label>
            <Textarea id="project-desc" placeholder="Enter project description" />
          </div>
        </div>
      )
    },
    {
      title: "Configuration",
      description: "Configure project settings",
      icon: <SettingsIcon className="h-4 w-4" />,
      content: (
        <div className="space-y-4 pl-4">
          <h3 className="text-lg font-medium">Project Configuration</h3>
          <div className="space-y-2">
            <Label htmlFor="project-type">Project Type</Label>
            <Select>
              <SelectTrigger id="project-type">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="type1">Research</SelectItem>
                <SelectItem value="type2">Educational</SelectItem>
                <SelectItem value="type3">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-visibility">Visibility</Label>
            <Select>
              <SelectTrigger id="project-visibility">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="team">Team Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      title: "Data Sources",
      description: "Connect your data",
      icon: <DatabaseIcon className="h-4 w-4" />,
      content: (
        <div className="space-y-4 pl-4">
          <h3 className="text-lg font-medium">Data Sources</h3>
          <p className="text-gray-500">
            Connect your project to data sources to begin analysis.
          </p>
          <div className="space-y-2">
            <Label>Available Data Sources</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <span className="text-xs">1</span>
                </div>
                <div>Database 1</div>
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <span className="text-xs">2</span>
                </div>
                <div>API Endpoint</div>
              </div>
              <div className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white">
                  <span className="text-xs">3</span>
                </div>
                <div>File Import</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Finalize",
      description: "Review and create",
      icon: <CheckIcon className="h-4 w-4" />,
      content: (
        <div className="space-y-4 pl-4">
          <h3 className="text-lg font-medium">Finalize Project</h3>
          <p className="text-gray-500">
            Review your project details before creating.
          </p>
          <Message
            variant="success"
            title="Ready to create"
            description="Your project is configured and ready to be created."
          />
          <Button className="mt-4">Create Project</Button>
        </div>
      )
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Stepper Component</h1>
      <p className="text-gray-600 mb-8">
        A versatile stepper component for guided configurations and multi-step forms
      </p>
      
      <Tabs defaultValue="basic">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Basic Stepper</TabsTrigger>
          <TabsTrigger value="vertical">Vertical Stepper</TabsTrigger>
          <TabsTrigger value="variants">Visual Variants</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Stepper</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <Stepper
            steps={basicSteps}
            activeStep={basicActiveStep}
            onNext={() => setBasicActiveStep(prev => Math.min(prev + 1, basicSteps.length - 1))}
            onPrevious={() => setBasicActiveStep(prev => Math.max(prev - 1, 0))}
            onComplete={() => alert("Form completed!")}
            onStepClick={setBasicActiveStep}
            allowStepClick={true}
          />
        </TabsContent>
        
        <TabsContent value="vertical">
          <StepperVertical
            steps={verticalSteps}
            activeStep={verticalActiveStep}
            onNext={() => setVerticalActiveStep(prev => Math.min(prev + 1, verticalSteps.length - 1))}
            onPrevious={() => setVerticalActiveStep(prev => Math.max(prev - 1, 0))}
            onComplete={() => alert("Project created successfully!")}
            onStepClick={setVerticalActiveStep}
            allowStepClick={(step) => step <= verticalActiveStep}
          />
        </TabsContent>
        
        <TabsContent value="variants">
          <div className="space-y-8">
            <div className="flex gap-4">
              <Button
                variant={variantExample === 'default' ? 'default' : 'outline'}
                onClick={() => setVariantExample('default')}
              >
                Default
              </Button>
              <Button
                variant={variantExample === 'outline' ? 'default' : 'outline'}
                onClick={() => setVariantExample('outline')}
              >
                Outline
              </Button>
              <Button
                variant={variantExample === 'minimal' ? 'default' : 'outline'}
                onClick={() => setVariantExample('minimal')}
              >
                Minimal
              </Button>
            </div>
            
            <Stepper
              steps={basicSteps.map(step => ({...step, content: (
                <Card className="border-0 shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Variant: {variantExample}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0">
                    <p>This example shows the {variantExample} visual variant of the stepper.</p>
                  </CardContent>
                </Card>
              )}))}
              variant={variantExample}
              activeStep={basicActiveStep}
              onNext={() => setBasicActiveStep(prev => Math.min(prev + 1, basicSteps.length - 1))}
              onPrevious={() => setBasicActiveStep(prev => Math.max(prev - 1, 0))}
              onComplete={() => alert("Form completed!")}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          {analysisResult ? (
            <div className="space-y-4">
              <Message
                variant="success"
                title="Analysis Configuration Complete"
                description="Your analysis has been configured successfully."
                icon={<CheckIcon className="h-5 w-5 text-green-500" />}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Configuration Summary</CardTitle>
                  <CardDescription>The following settings will be used for your analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
                    {JSON.stringify(analysisResult, null, 2)}
                  </pre>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setAnalysisResult(null)}>
                    <ScrollTextIcon className="h-4 w-4 mr-2" />
                    Configure New Analysis
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <AnalysisStepper
              onComplete={(data) => {
                console.log("Analysis configured:", data);
                setAnalysisResult(data);
              }}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
