import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Model } from './VisualModelSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { InfoIcon } from 'lucide-react';

interface ModelPreviewProps {
  model: Model;
  className?: string;
}

export function ModelPreview({ model, className }: ModelPreviewProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{model.name}</CardTitle>
          <Badge>{model.category}</Badge>
        </div>
        <CardDescription>{model.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="preview">
          <TabsList className="mb-4" aria-label="Model preview tabs">
            <TabsTrigger value="preview">Visual Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            {model.metadata?.examples && (
              <TabsTrigger value="examples">Examples</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="preview" className="space-y-4">
            {model.previewUrl ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image
                  src={model.previewUrl}
                  alt={`${model.name} preview`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 75vw"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 rounded-lg bg-gray-100 text-gray-400">
                <InfoIcon className="h-8 w-8 mb-2" />
                <p>No preview available for this model</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="details">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {model.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {model.metadata && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Metadata</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(model.metadata)
                        .filter(([key]) => key !== 'examples')
                        .map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <span className="text-gray-500 capitalize">{key.replace('_', ' ')}</span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          
          {model.metadata?.examples && (
            <TabsContent value="examples">
              <div className="space-y-4">
                {Array.isArray(model.metadata.examples) && model.metadata.examples.map((example: any, index: number) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b">
                      <h5 className="font-medium">Example {index + 1}</h5>
                    </div>
                    <div className="p-4">
                      {typeof example === 'string' ? (
                        <p>{example}</p>
                      ) : (
                        <pre className="text-sm overflow-x-auto p-2 bg-gray-50 rounded">
                          {JSON.stringify(example, null, 2)}
                        </pre>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
