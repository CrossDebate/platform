import React, { useState, useEffect } from 'react';

interface AnalysisConfiguratorProps {
  analysisType: string;
  dataHeaders: string[];
  onConfigSubmit: (config: any) => void;
}

const AnalysisConfigurator: React.FC<AnalysisConfiguratorProps> = ({ analysisType, dataHeaders, onConfigSubmit }) => {
  const [dependentVar, setDependentVar] = useState<string>('');
  const [independentVars, setIndependentVars] = useState<string[]>([]);
  const [groupingVar, setGroupingVar] = useState<string>('');
  const [alpha, setAlpha] = useState<number>(0.05);
  const [modelQuantization, setModelQuantization] = useState<'q4' | 'q8' | 'mix'>('q8');
  const [workflowComplexity, setWorkflowComplexity] = useState<'simple' | 'complex'>('simple');

  // Reset state when analysis type changes
  useEffect(() => {
    setDependentVar('');
    setIndependentVars([]);
    setGroupingVar('');
    setAlpha(0.05);
    setModelQuantization('q8');
    setWorkflowComplexity('simple');
  }, [analysisType]);

  const handleIndependentVarChange = (header: string) => {
    setIndependentVars(prev => 
      prev.includes(header) ? prev.filter(h => h !== header) : [...prev, header]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      analysisType,
      dependentVar,
      independentVars,
      groupingVar, // Relevant for ANOVA, t-test etc.
      alpha,
      modelQuantization,
      workflowComplexity,
      // Add other specific parameters based on analysisType if needed
    };
    console.log("Configuração da Análise:", config);
    onConfigSubmit(config);
  };

  // Determine which fields are relevant based on analysisType
  const showDependentVar = ['t_test', 'anova', 'lin_reg_simple', 'lin_reg_multi'].includes(analysisType);
  const showIndependentVars = ['lin_reg_simple', 'lin_reg_multi'].includes(analysisType);
  const showGroupingVar = ['t_test', 'anova'].includes(analysisType);
  const showAlpha = ['t_test', 'chi_square', 'anova'].includes(analysisType); // Example

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">Configurar Análise: {analysisType}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Variable Selection */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-medium px-2">Seleção de Variáveis</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {showDependentVar && (
              <div>
                <label htmlFor="dependentVar" className="block text-sm font-medium text-gray-700 mb-1">Variável Dependente:</label>
                <select 
                  id="dependentVar"
                  value={dependentVar}
                  onChange={(e) => setDependentVar(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Selecione...</option>
                  {dataHeaders.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
            )}

            {showGroupingVar && (
              <div>
                <label htmlFor="groupingVar" className="block text-sm font-medium text-gray-700 mb-1">Variável Agrupadora:</label>
                <select 
                  id="groupingVar"
                  value={groupingVar}
                  onChange={(e) => setGroupingVar(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Selecione...</option>
                  {dataHeaders.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
            )}

            {showIndependentVars && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variável(eis) Independente(s):</label>
                <div className="border p-2 rounded-md max-h-32 overflow-y-auto">
                  {dataHeaders.filter(h => h !== dependentVar).map(header => (
                    <div key={header} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`indep-${header}`}
                        checked={independentVars.includes(header)}
                        onChange={() => handleIndependentVarChange(header)}
                        className="mr-2"
                      />
                      <label htmlFor={`indep-${header}`} className="text-sm">{header}</label>
                    </div>
                  ))}
                </div>
                 {independentVars.length === 0 && <p className="text-xs text-red-500 mt-1">Selecione ao menos uma.</p>}
              </div>
            )}
          </div>
        </fieldset>

        {/* Analysis Parameters */}
        {showAlpha && (
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-medium px-2">Parâmetros da Análise</legend>
            <div className="mt-2">
              <label htmlFor="alpha" className="block text-sm font-medium text-gray-700 mb-1">Nível de Significância (α):</label>
              <input 
                type="number" 
                id="alpha"
                value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                min="0.01" 
                max="0.1" 
                step="0.01"
                required
                className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </fieldset>
        )}

        {/* Multi-Agent Configuration */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-medium px-2">Configuração Multi-Agente (CrossDebate)</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label htmlFor="modelQuantization" className="block text-sm font-medium text-gray-700 mb-1">Preferência de Quantização:</label>
              <select 
                id="modelQuantization"
                value={modelQuantization}
                onChange={(e) => setModelQuantization(e.target.value as 'q4' | 'q8' | 'mix')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="q8">Q8 (Maior Qualidade, Maior CompL)</option>
                <option value="q4">Q4 (Menor CompL, Maior CL Potencial)</option>
                <option value="mix">Misto (Equilibrado)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Define se o sistema priorizará modelos Q4 ou Q8.</p>
            </div>
            <div>
              <label htmlFor="workflowComplexity" className="block text-sm font-medium text-gray-700 mb-1">Complexidade do Fluxo de Trabalho:</label>
              <select 
                id="workflowComplexity"
                value={workflowComplexity}
                onChange={(e) => setWorkflowComplexity(e.target.value as 'simple' | 'complex')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="simple">Simples (Menos Agentes)</option>
                <option value="complex">Complexo (Agentes Especializados)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Define como os agentes colaborarão (simulado).</p>
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar Análise
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnalysisConfigurator;
