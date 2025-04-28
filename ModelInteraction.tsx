import React, { useState } from 'react';

interface ModelInteractionProps {
  modelType: 'q4' | 'q8';
  models: string[];
}

const ModelInteraction: React.FC<ModelInteractionProps> = ({ modelType, models }) => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showAllModels, setShowAllModels] = useState<boolean>(false);

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
      setResponse(`Resposta dos modelos ${modelType.toUpperCase()} (${selectedModels.length} selecionados):\n\n${userInput}\n\nEsta é uma simulação de resposta dos modelos ${modelType.toUpperCase()} selecionados. Em uma implementação real, esta mensagem seria processada pelos modelos GGUF locais da pasta /media/sema/400E99720E9961A8/crossdebate/models/`);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Interação com Modelos GGUF {modelType.toUpperCase()}
      </h2>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Modelos Disponíveis</h3>
          <div className="flex space-x-2">
            <button 
              onClick={handleSelectAll}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              {selectedModels.length === models.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </button>
            <button 
              onClick={() => setShowAllModels(!showAllModels)}
              className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
            >
              {showAllModels ? 'Ocultar Lista' : 'Mostrar Lista Completa'}
            </button>
          </div>
        </div>
        
        {showAllModels && (
          <div className="p-3 bg-gray-100 rounded-md mb-3 max-h-60 overflow-y-auto">
            <p className="text-sm mb-2 font-semibold">Lista completa de modelos {modelType.toUpperCase()}:</p>
            <div className="text-sm">
              {models.join(', ')}
            </div>
          </div>
        )}
        
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
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
        <p className="font-semibold">Localização dos modelos:</p>
        <code>/media/sema/400E99720E9961A8/crossdebate/models/</code>
      </div>
    </div>
  );
};

export default ModelInteraction;
