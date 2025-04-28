import React from 'react';

interface AnalysisSelectorProps {
  onAnalysisSelect: (analysisType: string) => void;
}

type AnalysisOption = {
  id: string;
  name: string;
  description: string;
  category: string;
};

const analysisOptions: AnalysisOption[] = [
  { id: 'desc_stats', name: 'Estatística Descritiva', description: 'Calcular médias, medianas, desvios padrão, etc.', category: 'Básica' },
  { id: 't_test', name: 'Teste T', description: 'Comparar médias de uma ou duas amostras.', category: 'Testes de Hipóteses' },
  { id: 'chi_square', name: 'Teste Qui-Quadrado', description: 'Testar associação entre variáveis categóricas.', category: 'Testes de Hipóteses' },
  { id: 'anova', name: 'ANOVA', description: 'Comparar médias de três ou mais grupos.', category: 'Análise de Variância' },
  { id: 'lin_reg_simple', name: 'Regressão Linear Simples', description: 'Modelar a relação entre duas variáveis contínuas.', category: 'Regressão' },
  { id: 'lin_reg_multi', name: 'Regressão Linear Múltipla', description: 'Modelar a relação entre uma variável dependente e múltiplas independentes.', category: 'Regressão' },
  { id: 'doe', name: 'Desenho de Experimentos (DOE)', description: 'Planejar experimentos para investigar efeitos de fatores.', category: 'Avançada' },
  { id: 'spc', name: 'Controle Estatístico de Processo (CEP)', description: 'Monitorar a estabilidade e capacidade de um processo.', category: 'Avançada' },
];

const AnalysisSelector: React.FC<AnalysisSelectorProps> = ({ onAnalysisSelect }) => {
  const categories = [...new Set(analysisOptions.map(opt => opt.category))];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">Selecionar Análise Estatística</h3>
      <p className="mb-4 text-gray-600">Escolha o tratamento estatístico que deseja aplicar aos dados carregados:</p>
      
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category}>
            <h4 className="text-lg font-medium mb-2 text-blue-700">{category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisOptions
                .filter(opt => opt.category === category)
                .map(option => (
                  <button
                    key={option.id}
                    onClick={() => onAnalysisSelect(option.id)}
                    className="block w-full text-left p-4 border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  >
                    <p className="font-semibold">{option.name}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisSelector;
