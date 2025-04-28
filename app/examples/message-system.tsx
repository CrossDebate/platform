"use client";

import React, { useState } from 'react';
import { Message, MessageBar, MessageGroup, ValidationMessage } from '@/components/ui/message';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw, Copy, Clipboard, RotateCcw, AlertOctagon } from 'lucide-react';

export default function MessageSystemExample() {
  const [messages, setMessages] = useState<{id: string, visible: boolean}[]>([
    { id: 'default', visible: true },
    { id: 'success', visible: true },
    { id: 'warning', visible: true },
    { id: 'error', visible: true },
  ]);
  
  const [progress, setProgress] = useState(45);
  const [validationExample, setValidationExample] = useState<'simple' | 'complex'>('simple');
  
  const hideMessage = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, visible: false } : msg
    ));
  };
  
  const resetMessages = () => {
    setMessages(messages.map(msg => ({ ...msg, visible: true })));
  };
  
  // Increment the progress bar every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const newValue = p + 5;
        return newValue > 100 ? 0 : newValue;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Message System</h1>
      <p className="text-gray-600 mb-8">
        A comprehensive message system with visual hierarchy and actionable suggestions
      </p>
      
      <div className="space-y-8">
        <Tabs defaultValue="standard">
          <TabsList>
            <TabsTrigger value="standard">Standard Messages</TabsTrigger>
            <TabsTrigger value="bars">Message Bars</TabsTrigger>
            <TabsTrigger value="validation">Validation Messages</TabsTrigger>
            <TabsTrigger value="groups">Message Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Messages</h2>
              <div className="space-y-4">
                {messages[0].visible && (
                  <Message
                    variant="neutral"
                    title="Information"
                    description="This is a neutral message with some general information."
                    dismissible
                    onDismiss={() => hideMessage('default')}
                  />
                )}
                
                {messages[1].visible && (
                  <Message
                    variant="success"
                    title="Changes saved successfully"
                    description="Your changes have been saved to the database."
                    dismissible
                    onDismiss={() => hideMessage('success')}
                    actions={[
                      { 
                        label: "View Changes", 
                        onClick: () => alert("Viewing changes"), 
                        variant: "default" 
                      }
                    ]}
                  />
                )}
                
                {messages[2].visible && (
                  <Message
                    variant="warning"
                    title="Connection issues detected"
                    description="Some features may be temporarily unavailable due to network issues."
                    dismissible
                    onDismiss={() => hideMessage('warning')}
                    actions={[
                      { 
                        label: "Try Again", 
                        onClick: () => alert("Retrying connection"), 
                        variant: "default" 
                      },
                      { 
                        label: "Work Offline", 
                        onClick: () => alert("Switching to offline mode"), 
                        variant: "link" 
                      }
                    ]}
                  />
                )}
                
                {messages[3].visible && (
                  <Message
                    variant="error"
                    title="Failed to save changes"
                    description="There was an error while trying to save your changes."
                    dismissible
                    onDismiss={() => hideMessage('error')}
                    collapsible
                    details={
                      <div>
                        <p className="font-mono text-xs bg-red-100 p-2 rounded">
                          Error: Network request failed. Server returned 500 Internal Server Error.
                        </p>
                        <p className="mt-2 text-sm">
                          This could be due to temporary server unavailability or network issues. 
                          Try again in a few minutes.
                        </p>
                      </div>
                    }
                    actions={[
                      { 
                        label: "Try Again", 
                        onClick: () => alert("Retrying"), 
                        variant: "default" 
                      },
                      { 
                        label: "Save Draft", 
                        onClick: () => alert("Saving draft"), 
                        variant: "link" 
                      }
                    ]}
                  />
                )}
              </div>
              
              {!messages.every(m => m.visible) && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={resetMessages}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Messages
                </Button>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
              <div className="space-y-4">
                <Message
                  variant="info"
                  description="This is a small message."
                  size="sm"
                />
                
                <Message
                  variant="info"
                  description="This is a default size message."
                />
                
                <Message
                  variant="info"
                  title="Large Message"
                  description="This is a large message with more padding and larger text."
                  size="lg"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Custom Message</h2>
              <Message
                icon={<AlertOctagon className="h-5 w-5 text-purple-500" />}
                className="bg-purple-50 border-purple-200 text-purple-800"
              >
                <p className="font-medium">Custom Message Example</p>
                <p className="mt-1">You can create custom messages with any content and styling.</p>
                <div className="mt-3 p-2 bg-white bg-opacity-50 rounded">
                  <p className="text-sm">This is a custom content area.</p>
                </div>
              </Message>
            </div>
          </TabsContent>
          
          <TabsContent value="bars" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Message Bars</h2>
              <div className="space-y-4">
                <MessageBar
                  variant="info"
                  description="This is an informational message bar."
                  dismissible
                  onDismiss={() => alert("Dismissed")}
                />
                
                <MessageBar
                  variant="success"
                  description="Operation completed successfully."
                  progress={progress}
                />
                
                <MessageBar
                  variant="error"
                  description="There was an error processing your request."
                  actions={[
                    { label: "Retry", onClick: () => alert("Retrying"), variant: "default" }
                  ]}
                />
                
                <div className="h-40 overflow-auto border p-4 rounded-md">
                  <div className="h-96 pt-12 space-y-4">
                    <p className="text-center text-gray-500">Scroll down to see sticky message</p>
                    <MessageBar
                      variant="warning"
                      description="This message will stick to the top when scrolling."
                      sticky
                    />
                    <p className="mt-20 text-center text-gray-500">Keep scrolling</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="validation" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Validation Messages</h2>
              
              <div className="space-y-2 mb-6">
                <Label>Example Type</Label>
                <div className="flex gap-2">
                  <Button
                    variant={validationExample === 'simple' ? 'default' : 'outline'}
                    onClick={() => setValidationExample('simple')}
                  >
                    Simple Example
                  </Button>
                  <Button
                    variant={validationExample === 'complex' ? 'default' : 'outline'}
                    onClick={() => setValidationExample('complex')}
                  >
                    Complex Example
                  </Button>
                </div>
              </div>
              
              <form id="example-form" className="space-y-6 border-b pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="example-form-name">Name</Label>
                    <Input id="example-form-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="example-form-email">Email</Label>
                    <Input id="example-form-email" placeholder="john@example.com" />
                  </div>
                </div>
                
                {validationExample === 'simple' ? (
                  <ValidationMessage
                    issues={[
                      { field: 'name', message: 'Name is required' },
                      { field: 'email', message: 'Email must be a valid email address', hint: 'Example: john@example.com' }
                    ]}
                    formId="example-form"
                  />
                ) : (
                  <ValidationMessage
                    issues={[
                      { message: 'Please correct the errors to continue', field: '_general' },
                      { field: 'name', message: 'Name must be at least 2 characters long' },
                      { field: 'name', message: 'Name can only contain letters and spaces', hint: 'No special characters or numbers allowed' },
                      { field: 'email', message: 'Email format is invalid', hint: 'Must be in format: user@domain.com' },
                      { field: 'email', message: 'This email is already in use', hint: 'Try logging in instead or use a different email' },
                      { field: 'password', message: 'Password does not meet security requirements', hint: 'Use at least 8 characters, one uppercase letter, one number, and one symbol' },
                      { field: 'passwordConfirm', message: 'Passwords do not match' },
                    ]}
                    formId="example-form"
                  />
                )}
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Message Groups</h2>
              
              <MessageGroup title="System Notifications">
                <Message
                  variant="info"
                  title="System Maintenance"
                  description="Scheduled maintenance will take place on Sunday, 2am-4am UTC."
                  size="sm"
                />
                <Message
                  variant="warning"
                  title="License Expiring"
                  description="Your license will expire in 5 days. Please renew to avoid service interruption."
                  size="sm"
                />
              </MessageGroup>
              
              <div className="h-6"></div>
              
              <MessageGroup title="Current Task Status">
                <Message
                  variant="success"
                  title="Data Import Complete"
                  description="Successfully imported 253 records from file 'customers.csv'."
                  size="sm"
                  actions={[
                    { label: "View Report", onClick: () => alert("Viewing report"), variant: "link" }
                  ]}
                />
                <Message
                  variant="error"
                  title="Export Failed"
                  description="Unable to export data to PDF format."
                  size="sm"
                  actions={[
                    { label: "Try Again", onClick: () => alert("Retrying"), variant: "link" }
                  ]}
                />
                <Message
                  variant="info"
                  title="Processing"
                  description="Background task is running: calculating statistics."
                  size="sm"
                  icon={<RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />}
                />
              </MessageGroup>
              
              <div className="h-6"></div>
              
              <MessageGroup title="Document Actions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Message
                    variant="neutral"
                    size="sm"
                    icon={<Copy className="h-4 w-4 text-gray-500" />}
                    description="Copy document to clipboard"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => alert("Copied")}
                  />
                  <Message
                    variant="neutral"
                    size="sm"
                    icon={<Clipboard className="h-4 w-4 text-gray-500" />}
                    description="Save document as draft"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => alert("Saved")}
                  />
                </div>
              </MessageGroup>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
