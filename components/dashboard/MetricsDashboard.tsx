import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricsChart } from './MetricsChart';
import { MetricsTable } from './MetricsTable';
import { MetricsSummary } from './MetricsSummary';
import { MetricsFilter } from './MetricsFilter';

export interface Metric {
  id: string;
  name: string;
  value: number;
  trend?: number;
  category: 'cognitive_load' | 'comprehension';
  timestamp: string;
  source?: string;
}

interface MetricsDashboardProps {
  title?: string;
  description?: string;
  metrics: Metric[];
  className?: string;
}

export function MetricsDashboard({ 
  title = "CL-CompL Metrics Dashboard", 
  description = "Interactive visualization of cognitive load and comprehension metrics",
  metrics,
  className 
}: MetricsDashboardProps) {
  const [filteredMetrics, setFilteredMetrics] = useState<Metric[]>(metrics);
  const [activeView, setActiveView] = useState<'charts' | 'table'>('charts');
  
  const handleFilterChange = (filtered: Metric[]) => {
    setFilteredMetrics(filtered);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <MetricsFilter metrics={metrics} onFilterChange={handleFilterChange} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="charts" onValueChange={(value) => setActiveView(value as 'charts' | 'table')}>
          <TabsList className="mb-4">
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cognitive Load Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricsChart 
                    metrics={filteredMetrics.filter(m => m.category === 'cognitive_load')} 
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Comprehension Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricsChart 
                    metrics={filteredMetrics.filter(m => m.category === 'comprehension')} 
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Metrics Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                <MetricsChart 
                  metrics={filteredMetrics} 
                  height={300}
                  type="scatter"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="table">
            <MetricsTable metrics={filteredMetrics} />
          </TabsContent>
          
          <TabsContent value="summary">
            <MetricsSummary metrics={filteredMetrics} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
