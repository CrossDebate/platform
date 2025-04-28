import React, { useState } from 'react';

interface ModelSelectorProps {
  modelType: 'q4' | 'q8';
  models: string[];
  onModelSelect: (selectedModels: string[]) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ modelType, models, onModelSelect }) => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleModelToggle = (model: string) => {
    setSelectedModels(prev => {
      if (prev.includes(model)) {
        return prev.filter(m => m !== model);
      } else {
        return [...prev, model];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedModels.length === models.length) {
      setSelectedModels([]);
    } else {
      setSelectedModels([...models]);
    }
  };

  const handleSubmit = () => {
    if (selectedModels.length === 0) {
      setResponse("Por favor, selecione pelo menos um modelo para interagir.");
      return;
    }
    
    if (!userInput.trim()) {
      setResponse("Por favor, digite uma mensagem para enviar aos modelos.");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulação de processamento
    setTimeout(() => {
      setResponse(`Resposta dos modelos ${modelType.toUpperCase()} (${selectedModels.length} selecionados):\n\n${userInput}\n\nEsta é uma simulação de resposta dos modelos ${modelType.toUpperCase()} selecionados. Em uma implementação real, esta mensagem seria processada pelos modelos GGUF locais.`);
      setIsProcessing(false);
    }, 1500);
    
    // Notificar o componente pai sobre os modelos selecionados
    onModelSelect(selectedModels);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Interação com Modelos GGUF {modelType.toUpperCase()}
      </h2>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Modelos Disponíveis</h3>
          <button 
            onClick={handleSelectAll}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            {selectedModels.length === models.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
          </button>
        </div>
        
        <div className="p-3 bg-gray-100 rounded-md mb-3 max-h-40 overflow-y-auto">
          <p className="text-sm mb-2">Modelos selecionados: {selectedModels.length}/{models.length}</p>
          <div className="flex flex-wrap gap-1">
            {selectedModels.map(model => (
              <span 
                key={model} 
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {model}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-3 border border-gray-300 rounded-md max-h-60 overflow-y-auto">
          {models.map(model => (
            <div key={model} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`${modelType}-${model}`}
                checked={selectedModels.includes(model)}
                onChange={() => handleModelToggle(model)}
                className="mr-2"
              />
              <label htmlFor={`${modelType}-${model}`} className="text-sm">{model}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Enviar Mensagem</h3>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={`Digite sua mensagem para os modelos ${modelType.toUpperCase()} selecionados...`}
          className="w-full p-3 border border-gray-300 rounded-md h-32"
          disabled={isProcessing}
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className={`px-4 py-2 rounded text-white ${
          isProcessing ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? 'Processando...' : 'Enviar para Modelos Selecionados'}
      </button>
      
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Resposta:</h3>
          <pre className="whitespace-pre-wrap text-sm">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
