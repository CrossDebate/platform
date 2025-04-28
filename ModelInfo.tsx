import React from 'react';

interface ModelInfoProps {
  modelType: 'q4' | 'q8';
}

const ModelInfo: React.FC<ModelInfoProps> = ({ modelType }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Informações sobre Modelos GGUF {modelType.toUpperCase()}</h3>
      
      <div className="p-3 bg-gray-50 rounded-md">
        <p className="mb-2">
          Os modelos {modelType.toUpperCase()} representam um {modelType === 'q4' ? 'maior' : 'menor'} nível de compressão:
        </p>
        
        {modelType === 'q4' ? (
          <ul className="list-disc pl-5 text-sm">
            <li>Quantização de 4 bits (maior compressão)</li>
            <li>Menor uso de VRAM (40-50% menos que Q8)</li>
            <li>Menor consumo de energia (15-25% menos)</li>
            <li>Maior carga cognitiva para o operador</li>
            <li>Possível degradação na qualidade das saídas</li>
          </ul>
        ) : (
          <ul className="list-disc pl-5 text-sm">
            <li>Quantização de 8 bits (menor compressão)</li>
            <li>Melhor qualidade de saída e estabilidade</li>
            <li>Maior uso de VRAM (requer hardware mais robusto)</li>
            <li>Maior consumo de energia</li>
            <li>Menor carga cognitiva para o operador</li>
          </ul>
        )}
      </div>
      
      <p className="mt-3 text-sm text-gray-600">
        Localização: <code>/media/sema/400E99720E9961A8/crossdebate/models/</code>
      </p>
    </div>
  );
};

export default ModelInfo;
