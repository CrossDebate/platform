import React from 'react';
import { AnalysisResult } from '../models'; // Assuming models.ts exists in src
// Placeholder for charting library (e.g., Recharts)
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultsViewerProps {
  results: AnalysisResult | null;
  isLoading: boolean;
}

const ResultsViewer: React.FC<ResultsViewerProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-8 text-center">
        <h3 className="text-xl font-semibold mb-4 text-blue-700">Executando Análise...</h3>
        <p className="text-gray-600">Aguarde enquanto o sistema multi-agente processa sua solicitação (simulado).</p>
        {/* Add a spinner or loading animation here */}
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mt-4"></div>
      </div>
    );
  }

  if (!results) {
    return null; // Don't render anything if there are no results yet
  }

  if (results.status !== 'completed') {
    return (
      <div className="bg-red-50 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-red-700">Erro na Análise</h3>
        <p className="text-red-600">{results.message || 'Ocorreu um erro inesperado durante a análise simulada.'}</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md mb-8 space-y-6">
      <h3 className="text-xl font-semibold mb-4 text-green-800">Resultados da Análise ({results.message})</h3>

      {/* CL/CompL Metrics */}
      {results.cl_compL_metrics && (
        <div className="border p-4 rounded-md bg-white">
          <h4 className="text-lg font-medium mb-2">Métricas CL/CompL (Estimadas)</h4>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{results.cl_compL_metrics.CompL_Estimate}%</p>
              <p className="text-sm text-gray-500">Carga Computacional (CompL)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{results.cl_compL_metrics.CL_Estimate}%</p>
              <p className="text-sm text-gray-500">Carga Cognitiva (CL)</p>
            </div>
          </div>
        </div>
      )}

      {/* Numerical Results */}
      {results.numerical_results && Object.keys(results.numerical_results).length > 0 && (
        <div className="border p-4 rounded-md bg-white">
          <h4 className="text-lg font-medium mb-2">Resultados Numéricos</h4>
          <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
            {JSON.stringify(results.numerical_results, null, 2)}
          </pre>
        </div>
      )}

      {/* Interpretation */}
      {results.interpretation && (
        <div className="border p-4 rounded-md bg-white">
          <h4 className="text-lg font-medium mb-2">Interpretação (Assistida por IA - Simulada)</h4>
          <p className="text-gray-700 whitespace-pre-wrap">{results.interpretation}</p>
        </div>
      )}

      {/* Plots (Simulated) */}
      {results.plots && results.plots.length > 0 && (
        <div className="border p-4 rounded-md bg-white">
          <h4 className="text-lg font-medium mb-2">Gráficos (Simulados)</h4>
          <div className="space-y-4">
            {results.plots.map((plot, index) => (
              <div key={index} className="text-center p-4 border rounded bg-gray-50">
                <p className="font-semibold">{plot.title || `Gráfico ${index + 1}`}</p>
                <p className="text-sm text-gray-500">(Visualização do tipo '{plot.type}' seria exibida aqui)</p>
                {/* Placeholder for actual chart component */}
                <div className="h-40 w-full bg-gray-200 flex items-center justify-center text-gray-400 mt-2">
                  [Gráfico Simulado]
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsViewer;
