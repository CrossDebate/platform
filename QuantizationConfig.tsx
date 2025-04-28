import React, { useState } from 'react';

interface QuantizationConfigProps {
  onConfigChange?: (config: {
    quantizationLevel: string;
    modelCount: number;
  }) => void;
}

const QuantizationConfig: React.FC<QuantizationConfigProps> = ({ onConfigChange }) => {
  const [quantizationLevel, setQuantizationLevel] = useState<string>('q8');
  const [modelCount, setModelCount] = useState<number>(30);

  const handleQuantizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantizationLevel(e.target.value);
    if (onConfigChange) {
      onConfigChange({
        quantizationLevel: e.target.value,
        modelCount
      });
    }
  };

  const handleModelCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    setModelCount(count);
    if (onConfigChange) {
      onConfigChange({
        quantizationLevel,
        modelCount: count
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Configuração de Quantização GGUF</h2>
      <p className="mb-4">
        A quantização GGUF permite reduzir a pegada de memória dos modelos LLM, 
        possibilitando sua execução em hardware de consumidor com recursos limitados.
      </p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Nível de Quantização</h3>
        <p className="mb-3">
          Escolha entre Q4 (maior compressão, menor qualidade) e Q8 (menor compressão, maior qualidade).
        </p>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="quantization"
              value="q4"
              checked={quantizationLevel === 'q4'}
              onChange={handleQuantizationChange}
              className="mr-2"
            />
            <span>Q4 (4-bit)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="quantization"
              value="q8"
              checked={quantizationLevel === 'q8'}
              onChange={handleQuantizationChange}
              className="mr-2"
            />
            <span>Q8 (8-bit)</span>
          </label>
        </div>
        
        <div className="mt-4">
          <p className="mb-2">Impacto esperado:</p>
          <ul className="list-disc pl-5">
            {quantizationLevel === 'q4' ? (
              <>
                <li>Redução de 40-50% no uso de VRAM</li>
                <li>Economia de 15-25% no consumo de energia</li>
                <li>Possível aumento na carga cognitiva do operador</li>
                <li>Possível degradação na qualidade das saídas</li>
              </>
            ) : (
              <>
                <li>Melhor qualidade de saída e estabilidade</li>
                <li>Maior uso de VRAM (requer hardware mais robusto)</li>
                <li>Maior consumo de energia</li>
                <li>Menor carga cognitiva para o operador</li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Número de Modelos</h3>
        <p className="mb-3">
          Configure a quantidade de modelos no enxame para cada nível de quantização.
        </p>
        <div className="flex items-center">
          <input
            type="range"
            min="1"
            max="60"
            value={modelCount}
            onChange={handleModelCountChange}
            className="mr-4"
          />
          <span>{modelCount} modelos</span>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-semibold">Configuração Atual:</h4>
        <p>Nível de Quantização: {quantizationLevel.toUpperCase()}</p>
        <p>Número de Modelos: {modelCount}</p>
        <p>VRAM Estimada: {quantizationLevel === 'q4' ? modelCount * 2 : modelCount * 4} GB</p>
      </div>
    </div>
  );
};

export default QuantizationConfig;
