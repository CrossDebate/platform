import React, { useState } from 'react';

interface WorkflowConfigProps {
  onConfigChange?: (config: {
    workflowType: string;
    agentCount: number;
  }) => void;
}

const WorkflowConfig: React.FC<WorkflowConfigProps> = ({ onConfigChange }) => {
  const [workflowType, setWorkflowType] = useState<string>('single');
  const [agentCount, setAgentCount] = useState<number>(1);

  const handleWorkflowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkflowType(e.target.value);
    
    // Ajustar automaticamente o número de agentes com base no tipo de fluxo
    let newAgentCount = agentCount;
    if (e.target.value === 'single') {
      newAgentCount = 1;
    } else if (e.target.value === 'sequential' && agentCount < 2) {
      newAgentCount = 2;
    } else if (e.target.value === 'parallel' && agentCount < 3) {
      newAgentCount = 3;
    }
    
    setAgentCount(newAgentCount);
    
    if (onConfigChange) {
      onConfigChange({
        workflowType: e.target.value,
        agentCount: newAgentCount
      });
    }
  };

  const handleAgentCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    setAgentCount(count);
    if (onConfigChange) {
      onConfigChange({
        workflowType,
        agentCount: count
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Configuração de Fluxos de Trabalho Multi-Agente</h2>
      <p className="mb-4">
        Configure o tipo de fluxo de trabalho e o número de agentes LLM envolvidos na tarefa.
      </p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Tipo de Fluxo de Trabalho</h3>
        <p className="mb-3">
          Escolha entre fluxos de agente único, sequencial ou paralelo/complexo.
        </p>
        <select 
          value={workflowType}
          onChange={handleWorkflowChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="single">Agente Único</option>
          <option value="sequential">Multi-Agente Sequencial</option>
          <option value="parallel">Multi-Agente Paralelo/Complexo</option>
        </select>
        
        <div className="mt-4">
          <p className="mb-2">Descrição do fluxo:</p>
          {workflowType === 'single' && (
            <div className="p-3 bg-gray-100 rounded">
              <p><strong>Agente Único:</strong> A tarefa é realizada por um único modelo GGUF. 
              Este é o fluxo mais simples, com menor carga computacional agregada e menor 
              complexidade de orquestração.</p>
            </div>
          )}
          {workflowType === 'sequential' && (
            <div className="p-3 bg-gray-100 rounded">
              <p><strong>Multi-Agente Sequencial:</strong> Pipeline linear envolvendo múltiplos 
              agentes GGUF do enxame. A saída de um agente serve como entrada para o próximo, 
              formando uma cadeia de processamento.</p>
            </div>
          )}
          {workflowType === 'parallel' && (
            <div className="p-3 bg-gray-100 rounded">
              <p><strong>Multi-Agente Paralelo/Complexo:</strong> Fluxo de trabalho com execução 
              concorrente e/ou dependências não lineares entre múltiplos agentes GGUF. Este é o 
              fluxo mais complexo, com maior carga computacional agregada e maior complexidade 
              de orquestração.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Número de Agentes</h3>
        <p className="mb-3">
          Configure a quantidade de modelos LLM envolvidos no fluxo de trabalho.
        </p>
        <div className="flex items-center">
          <input
            type="range"
            min={workflowType === 'single' ? 1 : workflowType === 'sequential' ? 2 : 3}
            max={10}
            value={agentCount}
            onChange={handleAgentCountChange}
            className="mr-4"
            disabled={workflowType === 'single'}
          />
          <span>{agentCount} {agentCount === 1 ? 'agente' : 'agentes'}</span>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-semibold">Configuração Atual:</h4>
        <p>Tipo de Fluxo: {
          workflowType === 'single' ? 'Agente Único' : 
          workflowType === 'sequential' ? 'Multi-Agente Sequencial' : 
          'Multi-Agente Paralelo/Complexo'
        }</p>
        <p>Número de Agentes: {agentCount}</p>
        <p>Complexidade de Orquestração: {
          workflowType === 'single' ? 'Baixa' : 
          workflowType === 'sequential' ? 'Média' : 
          'Alta'
        }</p>
      </div>
    </div>
  );
};

export default WorkflowConfig;
