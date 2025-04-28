import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Model } from './VisualModelSelector';
import { cn } from '@/lib/utils';
import { Check, Eye } from 'lucide-react';

interface ModelCardProps {
  model: Model;
  isSelected?: boolean;
  onSelect: () => void;
  className?: string;
  role?: string;
  'aria-selected'?: boolean;
}

export function ModelCard({
  model,
  isSelected,
  onSelect,
  className,
  role,
  'aria-selected': ariaSelected,
  ...props
}: ModelCardProps & React.HTMLAttributes<HTMLDivElement>) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <Card 
      className={cn(
        "relative flex flex-col transition-all",
        isSelected && "ring-2 ring-primary ring-offset-2",
        className
      )}
      onClick={onSelect}
      tabIndex={0}
      role={role}
      aria-selected={ariaSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      {...props}
    >
      {isSelected && (
        <Badge className="absolute -top-2 -right-2 z-10" variant="default">
          <Check className="h-3 w-3 mr-1" /> Selected
        </Badge>
      )}

      {/* Thumbnail */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
        <Image
          src={model.thumbnailUrl}
          alt={`${model.name} thumbnail`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {model.previewUrl && (
          <Button
            variant="secondary" 
            size="sm"
            className="absolute bottom-2 right-2 opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              setShowPreview(true);
            }}
            aria-label={`Preview ${model.name}`}
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        )}
      </div>

      {/* Content */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{model.name}</CardTitle>
          <Badge variant="outline">{model.category}</Badge>
        </div>
        <CardDescription>{model.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex-grow">
        <div className="flex flex-wrap gap-1 mt-2">
          {model.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-2 border-t">
        <Button 
          variant={isSelected ? "secondary" : "default"} 
          className="w-full"
          onClick={onSelect}
          aria-label={isSelected ? `${model.name} (selected)` : `Select ${model.name}`}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardFooter>

      {/* Preview dialog */}
      {model.previewUrl && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{model.name} Preview</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={model.previewUrl}
                alt={`${model.name} preview`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 75vw"
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {model.description}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
