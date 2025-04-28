import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metric } from './MetricsDashboard';
import { Progress } from '@/components/ui/progress';

interface MetricsSummaryProps {
  metrics: Metric[];
}

export function MetricsSummary({ metrics }: MetricsSummaryProps) {
  // Calculate average values by category
  const clMetrics = metrics.filter(m => m.category === 'cognitive_load');
  const compMetrics = metrics.filter(m => m.category === 'comprehension');
  
  const avgCognitiveLoad = clMetrics.length > 0 
    ? clMetrics.reduce((sum, m) => sum + m.value, 0) / clMetrics.length 
    : 0;
  
  const avgComprehension = compMetrics.length > 0 
    ? compMetrics.reduce((sum, m) => sum + m.value, 0) / compMetrics.length 
    : 0;
  
  // Calculate trends (if available)
  const clTrend = clMetrics.length > 0 
    ? clMetrics.reduce((sum, m) => sum + (m.trend || 0), 0) / clMetrics.length 
    : 0;
  
  const compTrend = compMetrics.length > 0 
    ? compMetrics.reduce((sum, m) => sum + (m.trend || 0), 0) / compMetrics.length 
    : 0;
  
  // Find min and max values
  const minCL = clMetrics.length > 0 ? Math.min(...clMetrics.map(m => m.value)) : 0;
  const maxCL = clMetrics.length > 0 ? Math.max(...clMetrics.map(m => m.value)) : 0;
  const minComp = compMetrics.length > 0 ? Math.min(...compMetrics.map(m => m.value)) : 0;
  const maxComp = compMetrics.length > 0 ? Math.max(...compMetrics.map(m => m.value)) : 0;

  // Calculate overall score (this is a simplified example - adjust based on your actual metrics)
  const overallScore = avgComprehension / (avgCognitiveLoad > 0 ? avgCognitiveLoad : 1) * 100;
  const normalizedScore = Math.min(Math.max(overallScore, 0), 100);

  const getScoreText = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    if (score >= 20) return "Below Average";
    return "Poor";
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Cognitive Load Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Average Cognitive Load: {avgCognitiveLoad.toFixed(2)}</span>
                <span className={clTrend > 0 ? "text-red-500" : "text-green-500"}>
                  {clTrend > 0 ? "↑" : "↓"} {Math.abs(clTrend).toFixed(1)}%
                </span>
              </div>
              <Progress value={avgCognitiveLoad * 10} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Lowest: {minCL.toFixed(2)}</div>
              <div>Highest: {maxCL.toFixed(2)}</div>
            </div>
            <div className="text-sm text-gray-500">
              Lower cognitive load generally indicates better efficiency in processing information.
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Comprehension Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Average Comprehension: {avgComprehension.toFixed(2)}</span>
                <span className={compTrend > 0 ? "text-green-500" : "text-red-500"}>
                  {compTrend > 0 ? "↑" : "↓"} {Math.abs(compTrend).toFixed(1)}%
                </span>
              </div>
              <Progress value={avgComprehension * 10} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Lowest: {minComp.toFixed(2)}</div>
              <div>Highest: {maxComp.toFixed(2)}</div>
            </div>
            <div className="text-sm text-gray-500">
              Higher comprehension scores indicate better understanding of debate content.
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Overall CL-CompL Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-lg font-semibold">{getScoreText(normalizedScore)}</span>
              <span className="text-lg font-semibold">{normalizedScore.toFixed(1)}%</span>
            </div>
            <Progress value={normalizedScore} className="h-3" />
          </div>
          <div className="text-sm text-gray-500">
            This score represents the balance between comprehension and cognitive load. 
            Higher scores indicate better understanding with less mental effort.
          </div>
          
          <div className="mt-4 border-t pt-4">
            <h4 className="font-medium mb-2">Key Insights:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                {avgComprehension > 7 ? "Strong" : avgComprehension > 5 ? "Good" : "Needs improvement on"} comprehension levels
              </li>
              <li>
                {avgCognitiveLoad < 4 ? "Low" : avgCognitiveLoad < 6 ? "Moderate" : "High"} cognitive load detected
              </li>
              <li>
                {overallScore > 70 
                  ? "Excellent balance between understanding and mental effort" 
                  : overallScore > 50 
                  ? "Good balance, with room for optimization" 
                  : "Significant optimization needed for better cognitive efficiency"}
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
