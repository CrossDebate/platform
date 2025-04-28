import React from 'react';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Metric } from './MetricsDashboard';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsChartProps {
  metrics: Metric[];
  height?: number;
  type?: 'line' | 'bar' | 'scatter';
}

export function MetricsChart({ metrics, height = 400, type = 'line' }: MetricsChartProps) {
  // Group metrics by name
  const metricsByName = metrics.reduce((acc, metric) => {
    if (!acc[metric.name]) {
      acc[metric.name] = [];
    }
    acc[metric.name].push(metric);
    return acc;
  }, {} as Record<string, Metric[]>);

  // Extract unique timestamps and ensure they're sorted
  const timestamps = [...new Set(metrics.map(m => m.timestamp))].sort();

  // Generate colors for each metric
  const getColor = (index: number) => {
    const colors = [
      'rgba(54, 162, 235, 1)', // blue
      'rgba(255, 99, 132, 1)',  // red
      'rgba(75, 192, 192, 1)',  // green
      'rgba(255, 159, 64, 1)',  // orange
      'rgba(153, 102, 255, 1)', // purple
      'rgba(255, 205, 86, 1)',  // yellow
    ];
    return colors[index % colors.length];
  };

  if (type === 'scatter') {
    // Prepare data for scatter plot (cognitive load vs comprehension)
    const cognitiveLoadMetrics = metrics.filter(m => m.category === 'cognitive_load');
    const comprehensionMetrics = metrics.filter(m => m.category === 'comprehension');
    
    // Match metrics by timestamp
    const scatterData = timestamps.flatMap(timestamp => {
      const clMetrics = cognitiveLoadMetrics.filter(m => m.timestamp === timestamp);
      const compMetrics = comprehensionMetrics.filter(m => m.timestamp === timestamp);
      
      return clMetrics.flatMap(clMetric => 
        compMetrics.map(compMetric => ({
          x: clMetric.value,
          y: compMetric.value,
          label: `${clMetric.name} vs ${compMetric.name} (${timestamp})`
        }))
      );
    });

    const data = {
      datasets: [
        {
          label: 'Cognitive Load vs Comprehension',
          data: scatterData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' as const },
        tooltip: {
          callbacks: {
            label: (context: any) => context.raw.label,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Cognitive Load',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Comprehension',
          },
        },
      },
    };

    return <Scatter data={data} options={options} height={height} />;
  }

  // Prepare data for line or bar charts
  const data = {
    labels: timestamps,
    datasets: Object.entries(metricsByName).map(([name, metricData], index) => {
      const color = getColor(index);
      
      // Sort metrics by timestamp to ensure they match our labels
      const sortedMetrics = [...metricData].sort((a, b) => 
        timestamps.indexOf(a.timestamp) - timestamps.indexOf(b.timestamp)
      );
      
      return {
        label: name,
        data: timestamps.map(timestamp => {
          const metric = sortedMetrics.find(m => m.timestamp === timestamp);
          return metric ? metric.value : null;
        }),
        borderColor: color,
        backgroundColor: color.replace('1)', '0.5)'),
        tension: 0.1,
      };
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return type === 'line' 
    ? <Line data={data} options={options} height={height} />
    : <Bar data={data} options={options} height={height} />;
}
