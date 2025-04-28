import React from 'react';

interface ModelListProps {
  models: string[];
  type: 'q4' | 'q8';
}

const ModelList: React.FC<ModelListProps> = ({ models, type }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-3">Lista de Modelos GGUF {type.toUpperCase()}</h3>
      <p className="mb-3 text-gray-600">
        Os seguintes modelos estão disponíveis na pasta <code>/media/sema/400E99720E9961A8/crossdebate/models/</code>:
      </p>
      <div className="p-3 bg-gray-100 rounded-md">
        <p className="text-sm mb-2 font-semibold">Total: {models.length} modelos</p>
        <div className="text-sm">
          {models.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default ModelList;
