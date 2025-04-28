import React, { useState } from 'react';

interface MonitoringDashboardProps {
  quantizationLevel: string;
  workflowType: string;
}

const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({ 
  quantizationLevel, 
  workflowType 
}) => {
  // Valores simulados para demonstração
  const getVramUsage = () => {
    return quantizationLevel === 'q4' ? 
      Math.floor(Math.random() * 3) + 2 : // 2-4GB para Q4
      Math.floor(Math.random() * 5) + 4;  // 4-8GB para Q8
  };

  const getCpuUsage = () => {
    return workflowType === 'single' ? 
      Math.floor(Math.random() * 20) + 10 : // 10-30% para agente único
      workflowType === 'sequential' ? 
        Math.floor(Math.random() * 30) + 20 : // 20-50% para sequencial
        Math.floor(Math.random() * 40) + 30;  // 30-70% para paralelo
  };

  const getGpuUsage = () => {
    return workflowType === 'single' ? 
      Math.floor(Math.random() * 30) + 20 : // 20-50% para agente único
      workflowType === 'sequential' ? 
        Math.floor(Math.random() * 40) + 30 : // 30-70% para sequencial
        Math.floor(Math.random() * 50) + 40;  // 40-90% para paralelo
  };

  const getTemperature = () => {
    return workflowType === 'single' ? 
      Math.floor(Math.random() * 10) + 50 : // 50-60°C para agente único
      workflowType === 'sequential' ? 
        Math.floor(Math.random() * 15) + 55 : // 55-70°C para sequencial
        Math.floor(Math.random() * 20) + 60;  // 60-80°C para paralelo
  };

  const getCognitiveLoad = () => {
    return quantizationLevel === 'q4' ? 
      Math.floor(Math.random() * 30) + 60 : // 60-90% para Q4
      Math.floor(Math.random() * 30) + 30;  // 30-60% para Q8
  };

  const [metrics, setMetrics] = useState({
    vramUsage: getVramUsage(),
    cpuUsage: getCpuUsage(),
    gpuUsage: getGpuUsage(),
    temperature: getTemperature(),
    cognitiveLoad: getCognitiveLoad(),
    energyConsumption: quantizationLevel === 'q4' ? 
      (Math.random() * 0.2 + 0.1).toFixed(2) : // 0.1-0.3 kWh para Q4
      (Math.random() * 0.3 + 0.2).toFixed(2)   // 0.2-0.5 kWh para Q8
  });

  // Simular atualização de métricas
  const updateMetrics = () => {
    setMetrics({
      vramUsage: getVramUsage(),
      cpuUsage: getCpuUsage(),
      gpuUsage: getGpuUsage(),
      temperature: getTemperature(),
      cognitiveLoad: getCognitiveLoad(),
      energyConsumption: quantizationLevel === 'q4' ? 
        (Math.random() * 0.2 + 0.1).toFixed(2) : // 0.1-0.3 kWh para Q4
        (Math.random() * 0.3 + 0.2).toFixed(2)   // 0.2-0.5 kWh para Q8
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Monitoramento em Tempo Real</h2>
        <button 
          onClick={updateMetrics}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Atualizar Métricas
        </button>
      </div>
      
      <p className="mb-4">
        Monitore a carga computacional (CompL) e a carga cognitiva (CL) em tempo real durante 
        a execução de tarefas na plataforma CrossDebate.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Carga Computacional (CompL)</h3>
          
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Uso de VRAM:</span>
              <span>{metrics.vramUsage} GB</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(metrics.vramUsage / 12) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Uso de CPU:</span>
              <span>{metrics.cpuUsage}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${metrics.cpuUsage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Uso de GPU:</span>
              <span>{metrics.gpuUsage}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${metrics.gpuUsage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Temperatura:</span>
              <span>{metrics.temperature}°C</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  metrics.temperature < 60 ? 'bg-green-600' : 
                  metrics.temperature < 70 ? 'bg-yellow-500' : 'bg-red-600'
                }`}
                style={{ width: `${(metrics.temperature / 100) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span>Consumo de Energia:</span>
              <span>{metrics.energyConsumption} kWh</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Carga Cognitiva (CL)</h3>
          
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Carga Cognitiva Estimada:</span>
              <span>{metrics.cognitiveLoad}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  metrics.cognitiveLoad < 40 ? 'bg-green-600' : 
                  metrics.cognitiveLoad < 70 ? 'bg-yellow-500' : 'bg-red-600'
                }`}
                style={{ width: `${metrics.cognitiveLoad}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Indicadores de CL:</h4>
            <ul className="list-disc pl-5">
              <li>Diâmetro pupilar médio: {(Math.random() * 1 + 3).toFixed(2)} mm</li>
              <li>Potência Teta frontal (EEG): {(Math.random() * 2 + 4).toFixed(2)} μV²</li>
              <li>Variabilidade da frequência cardíaca: {(Math.random() * 30 + 40).toFixed(1)} ms</li>
              <li>Saturação periférica de oxigênio: {Math.floor(Math.random() * 3) + 96}%</li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Avaliação Subjetiva:</h4>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                <button 
                  key={rating}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    rating <= Math.ceil(metrics.cognitiveLoad / 15) 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <p className="text-sm mt-1">Escala NASA-TLX Adaptada (1-7)</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-yellow-50 rounded-md">
        <h4 className="font-semibold">Análise de Compensação CL-CompL:</h4>
        <p>
          {quantizationLevel === 'q4' 
            ? 'A quantização Q4 está reduzindo a carga computacional, mas aumentando a carga cognitiva do operador.' 
            : 'A quantização Q8 está mantendo a qualidade do modelo, resultando em menor carga cognitiva, mas maior uso de recursos computacionais.'}
        </p>
        <p className="mt-2">
          {workflowType === 'single' 
            ? 'O fluxo de agente único é simples e eficiente, com baixa complexidade de orquestração.' 
            : workflowType === 'sequential' 
              ? 'O fluxo sequencial aumenta moderadamente tanto a carga computacional quanto a cognitiva.' 
              : 'O fluxo paralelo/complexo representa o maior desafio tanto computacional quanto cognitivo.'}
        </p>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
