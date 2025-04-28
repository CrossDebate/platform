import React, { useState, useEffect } from 'react';
import { Metric } from './MetricsDashboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CheckIcon, FilterIcon, XIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MetricsFilterProps {
  metrics: Metric[];
  onFilterChange: (filteredMetrics: Metric[]) => void;
}

export function MetricsFilter({ metrics, onFilterChange }: MetricsFilterProps) {
  // Extract unique values for filters
  const categories = [...new Set(metrics.map(m => m.category))];
  const metricNames = [...new Set(metrics.map(m => m.name))];
  const sources = [...new Set(metrics.map(m => m.source).filter(Boolean))];
  const timestamps = [...new Set(metrics.map(m => m.timestamp))].sort();
  
  // Find min and max values for the value range slider
  const minValue = Math.min(...metrics.map(m => m.value));
  const maxValue = Math.max(...metrics.map(m => m.value));
  
  // Filter state
  const [filters, setFilters] = useState({
    category: '',
    name: '',
    source: '',
    timeRange: [timestamps[0] || '', timestamps[timestamps.length - 1] || ''],
    valueRange: [minValue, maxValue],
  });
  
  // Apply filters and pass result to parent
  useEffect(() => {
    let result = [...metrics];
    
    if (filters.category) {
      result = result.filter(m => m.category === filters.category);
    }
    
    if (filters.name) {
      result = result.filter(m => m.name === filters.name);
    }
    
    if (filters.source) {
      result = result.filter(m => m.source === filters.source);
    }
    
    if (filters.timeRange[0] && filters.timeRange[1]) {
      result = result.filter(m => {
        return m.timestamp >= filters.timeRange[0] && m.timestamp <= filters.timeRange[1];
      });
    }
    
    result = result.filter(m => {
      return m.value >= filters.valueRange[0] && m.value <= filters.valueRange[1];
    });
    
    onFilterChange(result);
  }, [filters, metrics, onFilterChange]);
  
  const resetFilters = () => {
    setFilters({
      category: '',
      name: '',
      source: '',
      timeRange: [timestamps[0] || '', timestamps[timestamps.length - 1] || ''],
      valueRange: [minValue, maxValue],
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="filters">
        <AccordionTrigger className="py-2">
          <div className="flex items-center">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter Metrics
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => setFilters({...filters, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'cognitive_load' ? 'Cognitive Load' : 'Comprehension'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="name">Metric Name</Label>
                <Select 
                  value={filters.name} 
                  onValueChange={(value) => setFilters({...filters, name: value})}
                >
                  <SelectTrigger id="name">
                    <SelectValue placeholder="All Metrics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Metrics</SelectItem>
                    {metricNames.map(name => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {sources.length > 0 && (
                <div>
                  <Label htmlFor="source">Source</Label>
                  <Select 
                    value={filters.source} 
                    onValueChange={(value) => setFilters({...filters, source: value})}
                  >
                    <SelectTrigger id="source">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sources</SelectItem>
                      {sources.map(source => (
                        <SelectItem key={source || 'unknown'} value={source || ''}>
                          {source || 'Unknown'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <div>
              <Label>Value Range: {filters.valueRange[0].toFixed(1)} - {filters.valueRange[1].toFixed(1)}</Label>
              <Slider
                value={filters.valueRange}
                min={minValue}
                max={maxValue}
                step={0.1}
                onValueChange={(value) => setFilters({...filters, valueRange: value as [number, number]})}
                className="my-2"
              />
            </div>
            
            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <XIcon className="h-4 w-4 mr-2" /> Reset
              </Button>
              <Button variant="default" size="sm">
                <CheckIcon className="h-4 w-4 mr-2" /> Apply
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
