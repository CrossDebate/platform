import React, { useState } from 'react';

interface FineTuningConfigProps {
  quantizationLevel: string;
  onConfigChange?: (config: {
    learningRate: number;
    epochs: number;
    batchSize: number;
    rank: number;
    alpha: number;
  }) => void;
}

const FineTuningConfig: React.FC<FineTuningConfigProps> = ({ 
  quantizationLevel,
  onConfigChange 
}) => {
  const [learningRate, setLearningRate] = useState<number>(0.0002);
  const [epochs, setEpochs] = useState<number>(3);
  const [batchSize, setBatchSize] = useState<number>(4);
  const [rank, setRank] = useState<number>(64);
  const [alpha, setAlpha] = useState<number>(16);

  const handleLearningRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setLearningRate(value);
    updateConfig(value, epochs, batchSize, rank, alpha);
  };

  const handleEpochsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setEpochs(value);
    updateConfig(learningRate, value, batchSize, rank, alpha);
  };

  const handleBatchSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setBatchSize(value);
    updateConfig(learningRate, epochs, value, rank, alpha);
  };

  const handleRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setRank(value);
    updateConfig(learningRate, epochs, batchSize, value, alpha);
  };

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAlpha(value);
    updateConfig(learningRate, epochs, batchSize, rank, value);
  };

  const updateConfig = (lr: number, ep: number, bs: number, r: number, a: number) => {
    if (onConfigChange) {
      onConfigChange({
        learningRate: lr,
        epochs: ep,
        batchSize: bs,
        rank: r,
        alpha: a
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Configuração de Ajuste Fino (QLoRA)</h2>
      <p className="mb-4">
        Configure os parâmetros para o ajuste fino local usando QLoRA (Quantized Low-Rank Adaptation),
        uma técnica eficiente para adaptar modelos LLM a tarefas específicas com recursos limitados.
      </p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Parâmetros QLoRA</h3>
        
        <div className="mb-4">
          <label className="block mb-1">Rank (r):</label>
          <div className="flex items-center">
            <input
              type="range"
              min="8"
              max="128"
              step="8"
              value={rank}
              onChange={handleRankChange}
              className="mr-4 w-full"
            />
            <span className="w-16 text-right">{rank}</span>
          </div>
          <p className="text-sm text-gray-600">
            Determina a dimensionalidade das matrizes de adaptação. Valores maiores aumentam a capacidade
            do modelo, mas também o uso de memória.
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Alpha:</label>
          <div className="flex items-center">
            <input
              type="range"
              min="8"
              max="32"
              step="8"
              value={alpha}
              onChange={handleAlphaChange}
              className="mr-4 w-full"
            />
            <span className="w-16 text-right">{alpha}</span>
          </div>
          <p className="text-sm text-gray-600">
            Escala as matrizes de adaptação. Valores maiores permitem mudanças mais significativas
            durante o ajuste fino.
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Parâmetros de Treinamento</h3>
        
        <div className="mb-4">
          <label className="block mb-1">Taxa de Aprendizado:</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0.00001"
              max="0.001"
              step="0.00001"
              value={learningRate}
              onChange={handleLearningRateChange}
              className="mr-4 w-full"
            />
            <span className="w-16 text-right">{learningRate.toExponential(4)}</span>
          </div>
          <p className="text-sm text-gray-600">
            Controla o tamanho dos passos durante a otimização. Para modelos Q4, considere usar
            valores ligeiramente menores para estabilidade.
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Épocas:</label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="10"
              value={epochs}
              onChange={handleEpochsChange}
              className="mr-4 w-full"
            />
            <span className="w-16 text-right">{epochs}</span>
          </div>
          <p className="text-sm text-gray-600">
            Número de passagens completas pelo conjunto de dados de treinamento.
            {quantizationLevel === 'q4' ? ' Modelos Q4 podem exigir mais épocas para convergir.' : ''}
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Tamanho do Lote (Batch Size):</label>
          <div className="flex items-center">
            <input
              type="range"
              min="1"
              max="8"
              value={batchSize}
              onChange={handleBatchSizeChange}
              className="mr-4 w-full"
            />
            <span className="w-16 text-right">{batchSize}</span>
          </div>
          <p className="text-sm text-gray-600">
            Número de amostras processadas antes de atualizar os parâmetros do modelo.
            Valores menores usam menos VRAM, mas podem tornar o treinamento mais lento.
          </p>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-semibold">Recomendações para {quantizationLevel.toUpperCase()}:</h4>
        {quantizationLevel === 'q4' ? (
          <ul className="list-disc pl-5 mt-2">
            <li>Use taxa de aprendizado ligeiramente menor para estabilidade</li>
            <li>Considere aumentar o número de épocas para compensar a menor precisão</li>
            <li>Reduza o tamanho do lote se encontrar problemas de memória</li>
            <li>Monitore cuidadosamente a convergência, pois modelos Q4 podem ser mais instáveis</li>
          </ul>
        ) : (
          <ul className="list-disc pl-5 mt-2">
            <li>Aproveite a maior precisão para ajustes mais refinados</li>
            <li>Pode usar taxas de aprendizado ligeiramente maiores para convergência mais rápida</li>
            <li>Monitore o uso de VRAM, pois modelos Q8 consomem mais memória</li>
            <li>Considere aumentar o rank para melhor capacidade de adaptação</li>
          </ul>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded-md">
        <h4 className="font-semibold">Configuração Atual:</h4>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>Taxa de Aprendizado: {learningRate.toExponential(4)}</div>
          <div>Épocas: {epochs}</div>
          <div>Tamanho do Lote: {batchSize}</div>
          <div>Rank: {rank}</div>
          <div>Alpha: {alpha}</div>
        </div>
      </div>
    </div>
  );
};

export default FineTuningConfig;
