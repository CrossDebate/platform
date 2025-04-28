"use client";

import { MetricsDashboard, Metric } from '@/components/dashboard/MetricsDashboard';

// Sample data for the dashboard
const sampleMetrics: Metric[] = [
  // Cognitive Load metrics
  { id: '1', name: 'Reading Ease', category: 'cognitive_load', value: 6.2, timestamp: '2023-05-01', trend: -5.2 },
  { id: '2', name: 'Reading Ease', category: 'cognitive_load', value: 5.8, timestamp: '2023-05-08', trend: -6.5 },
  { id: '3', name: 'Reading Ease', category: 'cognitive_load', value: 4.9, timestamp: '2023-05-15', trend: -15.5 },
  { id: '4', name: 'Reading Ease', category: 'cognitive_load', value: 4.3, timestamp: '2023-05-22', trend: -12.2 },
  
  { id: '5', name: 'Complexity Score', category: 'cognitive_load', value: 7.1, timestamp: '2023-05-01', trend: 3.8 },
  { id: '6', name: 'Complexity Score', category: 'cognitive_load', value: 6.9, timestamp: '2023-05-08', trend: -2.8 },
  { id: '7', name: 'Complexity Score', category: 'cognitive_load', value: 7.4, timestamp: '2023-05-15', trend: 7.2 },
  { id: '8', name: 'Complexity Score', category: 'cognitive_load', value: 6.8, timestamp: '2023-05-22', trend: -8.1 },
  
  { id: '9', name: 'Processing Time', category: 'cognitive_load', value: 5.2, timestamp: '2023-05-01', source: 'Survey' },
  { id: '10', name: 'Processing Time', category: 'cognitive_load', value: 4.9, timestamp: '2023-05-08', source: 'Survey' },
  { id: '11', name: 'Processing Time', category: 'cognitive_load', value: 4.5, timestamp: '2023-05-15', source: 'Survey' },
  { id: '12', name: 'Processing Time', category: 'cognitive_load', value: 4.2, timestamp: '2023-05-22', source: 'Survey' },
  
  // Comprehension metrics
  { id: '13', name: 'Key Point Recognition', category: 'comprehension', value: 6.8, timestamp: '2023-05-01', trend: 0 },
  { id: '14', name: 'Key Point Recognition', category: 'comprehension', value: 7.2, timestamp: '2023-05-08', trend: 5.9 },
  { id: '15', name: 'Key Point Recognition', category: 'comprehension', value: 7.5, timestamp: '2023-05-15', trend: 4.2 },
  { id: '16', name: 'Key Point Recognition', category: 'comprehension', value: 8.1, timestamp: '2023-05-22', trend: 8.0 },
  
  { id: '17', name: 'Argument Recall', category: 'comprehension', value: 5.9, timestamp: '2023-05-01', source: 'Test' },
  { id: '18', name: 'Argument Recall', category: 'comprehension', value: 6.3, timestamp: '2023-05-08', source: 'Test' },
  { id: '19', name: 'Argument Recall', category: 'comprehension', value: 6.7, timestamp: '2023-05-15', source: 'Test' },
  { id: '20', name: 'Argument Recall', category: 'comprehension', value: 7.1, timestamp: '2023-05-22', source: 'Test' },
  
  { id: '21', name: 'Topic Understanding', category: 'comprehension', value: 6.2, timestamp: '2023-05-01', trend: 0 },
  { id: '22', name: 'Topic Understanding', category: 'comprehension', value: 6.8, timestamp: '2023-05-08', trend: 9.7 },
  { id: '23', name: 'Topic Understanding', category: 'comprehension', value: 7.3, timestamp: '2023-05-15', trend: 7.4 },
  { id: '24', name: 'Topic Understanding', category: 'comprehension', value: 7.8, timestamp: '2023-05-22', trend: 6.8 },
];

export default function MetricsDashboardExample() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">CL-CompL Metrics Dashboard Example</h1>
      
      <div className="space-y-8">
        <MetricsDashboard 
          metrics={sampleMetrics}
          title="Debate Performance Metrics"
          description="Tracking cognitive load and comprehension metrics over time"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricsDashboard 
            metrics={sampleMetrics.filter(m => m.category === 'cognitive_load')}
            title="Cognitive Load Analysis"
            description="Detailed metrics about information processing difficulty"
          />
          
          <MetricsDashboard 
            metrics={sampleMetrics.filter(m => m.category === 'comprehension')}
            title="Comprehension Assessment"
            description="Metrics related to understanding and retention of debate content"
          />
        </div>
      </div>
    </div>
  );
}
