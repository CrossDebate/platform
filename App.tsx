import { useState } from 'react';
import Header from './components/Header';
import QuantizationConfig from './components/QuantizationConfig';
import WorkflowConfig from './components/WorkflowConfig';
import MonitoringDashboard from './components/MonitoringDashboard';
import FineTuningConfig from './components/FineTuningConfig';
import ModelInteraction from './components/ModelInteraction';
import ModelInfo from './components/ModelInfo';

// Lista de modelos Q8 e Q4
const modelsQ8 = [
  "QW-6X1.5B-DEEPSEEK-QWEN-LAM-E32",
  "PHI-4",
  "QWEN2.5-QWQ-35B-EUREKA-CUBED",
  "MISTRAL-7B-INSTRUCT-V0.2",
  "QWEN2.5-14B-INSTRUCT",
  "DEEPSEEK-CODER-V2-LITE-INSTRUCT",
  "QWEN2.5-CODER-14B-INSTRUCT-THINKING",
  "FIMBULVETR-11B-V2.1-16K.",
  "HONEY-YUZU-13B.",
  "GRYPHE_PANTHEON-RP-1.8-24B-SMALL-3.1",
  "FALLEN-MISTRAL-R1-24B-V1C",
  "MERGEKIT-SLERP-FMRAZCR",
  "AYA-EXPANSE-8B",
  "BANGLA-S1K-QWQ-32B-INSTRUCT.I1",
  "DEEPSEEK-R1-PSYCHOLOGY-COT.",
  "PANTHEON-RP-1.8-24B-SMALL-3.1.I1",
  "MISTRAL-ZEPHYR-7B-SLERP.",
  "MIXTRAL_7BX2_MOE_13B.I1",
  "HAMANASU-QWQ-V2-RP.I1",
  "INTERNLM2-CHAT-7B-EXPO.",
  "LCARS_AI_002.I1",
  "QWQ-CODER-32B.I1",
  "REASONING-TIES-CODER-V1.1.",
  "SRINI-DEEPSEEK-R1-MEDICAL-COT.",
  "VERTILAKE-11B.I1",
  "ZEPHYR-7B-ALPHA-EXPO.",
  "ROMULUS-MISTRAL-NEMO-12B-SIMPO",
  "DEEPSEEK-R1-QWEN-LORABLATED-32B",
  "EVERYONE-CODER-4X7B-BASE",
  "ZERO-MISTRAL-SMALL-3.1-24B-INSTRUCT-2503-BETA6"
];

const modelsQ4 = [
  "VICUNA-7B-V1.3",
  "FIMBULVETR-11B-V2.1-16K.",
  "HONEY-YUZU-13B.",
  "GRYPHE_PANTHEON-RP-1.8-24B-SMALL-3.1",
  "FALLEN-MISTRAL-R1-24B-V1C",
  "MERGEKIT-SLERP-FMRAZCR",
  "AYA-EXPANSE-8B",
  "BANGLA-S1K-QWQ-32B-INSTRUCT.I1",
  "DEEPSEEK-R1-PSYCHOLOGY-COT.",
  "PANTHEON-RP-1.8-24B-SMALL-3.1.I1",
  "MISTRAL-ZEPHYR-7B-SLERP.",
  "MISTRAL_7B_CREWAI.",
  "MIXTRAL_7BX2_MOE_13B.I1",
  "HAMANASU-QWQ-V2-RP.I1",
  "HELPINGAI-9B-200K.I1",
  "INTERNLM2-CHAT-7B-EXPO.",
  "L3-STHENOMAIDBLACKROOT-15B.",
  "LCARS_AI_002.I1",
  "QWEN2.5-7B-INSTRUCT-MEDICAL_SUMMARY_LATEST.I1",
  "QWQ-CODER-32B.I1",
  "REASONING-TIES-CODER-V1.1.",
  "S1-LLAMA-3.2-3BX4-MOE.I1",
  "SRINI-DEEPSEEK-R1-MEDICAL-COT.",
  "VERTILAKE-11B.I1",
  "ZEPHYR-7B-ALPHA-EXPO.",
  "ROMULUS-MISTRAL-NEMO-12B-SIMPO",
  "OPTIMUS-7B.",
  "DEEPSEEK-R1-QWEN-LORABLATED-32B",
  "EVERYONE-CODER-4X7B-BASE",
  "ZERO-MISTRAL-SMALL-3.1-24B-INSTRUCT-2503-BETA6"
];

function App() {
  const [quantizationConfig, setQuantizationConfig] = useState({
    quantizationLevel: 'q8',
    modelCount: 30
  });

  const [workflowConfig, setWorkflowConfig] = useState({
    workflowType: 'single',
    agentCount: 1
  });

  // Definindo o estado mas não usando diretamente na renderização
  // Usado apenas para passar para o componente FineTuningConfig
  const [_, setFineTuningConfig] = useState({
    learningRate: 0.0002,
    epochs: 3,
    batchSize: 4,
    rank: 64,
    alpha: 16
  });

  const handleQuantizationChange = (config: {
    quantizationLevel: string;
    modelCount: number;
  }) => {
    setQuantizationConfig(config);
  };

  const handleWorkflowChange = (config: {
    workflowType: string;
    agentCount: number;
  }) => {
    setWorkflowConfig(config);
  };

  const handleFineTuningChange = (config: {
    learningRate: number;
    epochs: number;
    batchSize: number;
    rank: number;
    alpha: number;
  }) => {
    setFineTuningConfig(config);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">CrossDebate</h1>
          <p className="text-xl">
            Um orquestrador de ajuste fino multi-agente que gerencia compensações entre 
            carga cognitiva (CL) e carga computacional (CompL).
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Caixas de interação com modelos na página inicial */}
          <section id="interacao-modelos" className="scroll-mt-16">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="md:w-1/2">
                <ModelInfo modelType="q8" />
              </div>
              <div className="md:w-1/2">
                <ModelInfo modelType="q4" />
              </div>
            </div>
            
            <ModelInteraction 
              modelType="q8" 
              models={modelsQ8} 
            />
            
            <ModelInteraction 
              modelType="q4" 
              models={modelsQ4} 
            />
          </section>
          
          <section id="configuracao-quantizacao" className="scroll-mt-16">
            <QuantizationConfig onConfigChange={handleQuantizationChange} />
          </section>
          
          <section id="fluxos-trabalho" className="scroll-mt-16">
            <WorkflowConfig onConfigChange={handleWorkflowChange} />
          </section>
          
          <section id="monitoramento" className="scroll-mt-16">
            <MonitoringDashboard 
              quantizationLevel={quantizationConfig.quantizationLevel} 
              workflowType={workflowConfig.workflowType} 
            />
          </section>
          
          <section id="ajuste-fino" className="scroll-mt-16">
            <FineTuningConfig 
              quantizationLevel={quantizationConfig.quantizationLevel}
              onConfigChange={handleFineTuningChange}
            />
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Sobre a Plataforma CrossDebate</h2>
            <p className="mb-4">
              A plataforma CrossDebate foi desenvolvida para investigar a interdependência crítica e dinâmica 
              entre a Carga Cognitiva (CL) do operador humano e a Carga Computacional (CompL) do sistema, 
              um desafio central na era da IA democratizada.
            </p>
            <p className="mb-4">
              Utilizando uma interface React com backend FastAPI, a plataforma orquestra um enxame de 60 modelos 
              LLM no formato GGUF (30 Q4 e 30 Q8) para tarefas de ajuste fino local (QLoRA) e gerenciamento de 
              fluxos de trabalho multi-agente (sequencial, paralelo).
            </p>
            <p className="mb-4">
              O sistema monitora continuamente tanto a carga computacional (VRAM, uso de GPU/CPU, energia) 
              quanto a carga cognitiva do operador (através de instrumentos psicométricos e monitoramento 
              neurofisiológico), buscando o equilíbrio ideal entre eficiência computacional e experiência do usuário.
            </p>
            <div className="p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold">Principais Descobertas:</h4>
              <ul className="list-disc pl-5 mt-2">
                <li>A quantização agressiva (Q4) reduz a CompL, mas aumenta significativamente a CL (H1)</li>
                <li>A complexidade crescente dos fluxos eleva ambas as cargas (H2)</li>
                <li>A relação CL-CompL é não linear (forma de U/J), indicando um "ponto ideal" de CompL/qualidade moderada (Q8) que minimiza a CL (H3)</li>
                <li>A expertise atua como moderador, amortecendo o aumento da CL para especialistas (H4)</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center">
            CrossDebate.com - Plataforma de Orquestração de Ajuste Fino Multi-Agente
          </p>
          <p className="text-center text-sm mt-2">
            Localização dos modelos: /media/sema/400E99720E9961A8/crossdebate/models/
          </p>
          <p className="text-center text-sm mt-1">
            Projeto adaptado para execução local em: /media/sema/400E99720E9961A8/crossdebate/app
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
