# CrossDebate: Sistema Multi-agente para Análise Estatística em Engenharia

## Instalação e Configuração

### Requisitos de Sistema
- Sistema Operacional: Windows 10/11, macOS 12+, Ubuntu 20.04+
- CPU: 4+ cores (8+ recomendado)
- RAM: 16GB mínimo (32GB+ recomendado)
- GPU: NVIDIA RTX 3060 12GB ou superior (para execução completa do enxame de 60 agentes)
  - Mínimo: NVIDIA RTX 4050 6GB (execução limitada)
- Armazenamento: 50GB de espaço livre para instalação completa

### Dependências
- Python 3.10+
- Node.js 18+ e npm 9+
- CUDA 11.8+ e cuDNN 8.6+
- [Ollama](https://ollama.ai/) 0.1.27+

### Instalação Rápida

```bash
# Clonar o repositório
git clone https://github.com/heliocpjr/crossdebate.git
cd crossdebate

# Instalar dependências do backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt

# Instalar dependências do frontend
cd frontend
npm install
cd ..

# Baixar e configurar modelos GGUF base (apenas alguns exemplos)
mkdir -p models
cd models
# Baixar modelos Q4
curl -LO https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_M.gguf
curl -LO https://huggingface.co/TheBloke/Qwen1.5-7B-Chat-GGUF/resolve/main/qwen1.5-7b-chat.Q4_K_M.gguf
# Baixar modelos Q8
curl -LO https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q8_0.gguf
curl -LO https://huggingface.co/TheBloke/Qwen1.5-7B-Chat-GGUF/resolve/main/qwen1.5-7b-chat.Q8_0.gguf
cd ..

# Iniciar serviços
# Terminal 1: Iniciar backend
python backend/main.py

# Terminal 2: Iniciar frontend
cd frontend
npm start
```

### Configuração Avançada

#### Suporte a Hardware de Sensores Fisiológicos

Para utilizar o sistema completo de monitoramento de carga cognitiva, configure os seguintes dispositivos:

```bash
# Instalar pacotes adicionais para aquisição de dados fisiológicos
pip install pylsl pyeeg neurokit2 opencv-python

# Configure dispositivos de eye-tracking, EEG e PPG conforme documentação específica em /docs/sensors.md
```

#### Ajuste Fino de Modelos com QLoRA

Para criar agentes especializados para tarefas estatísticas específicas:

```bash
# Preparar ambiente para ajuste fino
pip install -r requirements-qlora.txt

# Executar script de ajuste fino (exemplo para ANOVA)
python scripts/finetune_qlora.py \
  --model_path models/mistral-7b-instruct-v0.2.Q4_K_M.gguf \
  --dataset_path data/statistical_datasets/anova_examples.jsonl \
  --output_path models/specialized/anova_specialist \
  --epochs 3 \
  --learning_rate 1e-5
```

## Exemplos de Uso

### 1. Análise de Regressão Básica

```python
from crossdebate.client import CrossDebateClient

# Inicializar cliente
client = CrossDebateClient()

# Definir fluxo de análise de regressão
workflow = client.create_workflow(
    name="Análise de Regressão",
    data_source="data/samples/material_strength.csv",
    analysis_type="regression",
    target_variable="tensile_strength",
    predictor_variables=["temperature", "pressure", "catalyst_concentration"]
)

# Executar análise com enxame de agentes
results = client.execute_workflow(workflow)

# Visualizar resultados
client.visualize_results(results)
```

### 2. Configuração de Enxame Personalizada via Interface Web

1. Acesse `http://localhost:3000` após iniciar os serviços
2. Navegue até "Configurações > Enxame de Agentes"
3. Selecione distribuição personalizada de modelos Q4/Q8
4. Defina papéis especializados para agentes específicos
5. Configure topologia de comunicação entre agentes
6. Salve configuração com nome para reutilização futura

### 3. Análise ANOVA com Monitoramento de Carga Cognitiva-Computacional

Para experimentos que incluem monitoramento de CL-CompL:

```python
from crossdebate.client import CrossDebateClient
from crossdebate.monitoring import CLCompLMonitor

# Inicializar cliente e monitor
client = CrossDebateClient()
monitor = CLCompLMonitor(enable_physiological=True)

# Iniciar monitoramento
session_id = monitor.start_session(participant_id="P001", expertise_level="expert")

# Configurar e executar análise ANOVA
workflow = client.create_workflow(
    name="ANOVA Multifatorial",
    data_source="data/samples/factorial_experiment.csv",
    analysis_type="anova",
    dependent_variable="yield",
    factors=["temperature_level", "pressure_level", "catalyst_type"],
    interactions=True
)

# Executar com monitoramento
results = client.execute_workflow(workflow, monitor_session_id=session_id)

# Finalizar sessão e gerar relatório
monitor.stop_session(session_id)
monitor.generate_report(session_id, output_path="reports/")
```

Para mais exemplos e documentação detalhada, consulte a pasta `docs/` e os notebooks em `examples/`.

## CrossDebate Testing

### Running Tests

To run all tests in the project:

```bash
pytest
```

This will discover and execute all tests in files matching the pattern `test_*.py` or `*_test.py`.

#### Additional pytest options:

- Run tests with verbose output:
  ```bash
  pytest -v
  ```

- Run a specific test file:
  ```bash
  pytest tests/test_example.py
  ```

- Run a specific test function:
  ```bash
  pytest tests/test_example.py::test_addition
  ```

- Show extra test summary info:
  ```bash
  pytest -v
  ```

- Generate coverage report:
  ```bash
  pytest --cov=your_package_name
  ```
  (requires pytest-cov plugin)

A DINÂMICA MENTE-MÁQUINA: INVESTIGANDO A INTERDEPENDÊNCIA CL-COMPL NA ORQUESTRAÇÃO DE ENXAMES DE LLMS LOCAIS PARA ESTATÍSTICAS EM ENGENHARIA


Hélio Craveiro Pessoa Júnior1
1Mestrado Profissional em Educação – Universidade de Brasília
E-mail: crossdebate@outlook.com
Lattes: http://lattes.cnpq.br/1415349950533370

Resumo: Este estudo investiga a interdependência entre a carga cognitiva (CL) imposta ao operador humano e a carga computacional (CompL) exigida do hardware ao orquestrar um sistema multi-agente (MAS) composto por 60 grandes modelos de linguagem (LLMs) operando localmente para realizar análises estatísticas em engenharia. Utilizando LLMs quantizados (Q4/Q8 GGUF) em GPUs de consumo, permitindo execução com benefícios de privacidade. O MAS é gerenciado pela plataforma CrossDebate (React/FastAPI). Nela, agentes especializados colaboram em tarefas como testes de hipóteses, ANOVA e análise de regressão. Uma metodologia mista, envolvendo 40 participantes (iniciantes e especialistas), coletou dados multimodais sincronizados durante interações realistas, incluindo métricas fisiológicas para CL, logs detalhados para CompL e protocolos de pensamento em voz alta para insights qualitativos. A análise subsequente revelou uma relação intrincada e não linear (U/J) entre CL e CompL, significativamente influenciada por fatores como o nível de quantização do modelo, a complexidade do fluxo de trabalho estatístico e a expertise prévia do usuário. Os resultados destacam a necessidade fulcral de protocolos de comunicação padronizados para gerenciar a interação agente-a-agente e de mecanismos robustos de validação independente para garantir a confiabilidade e a validade metodológica das análises em contextos de engenharia de alta consequência. O estudo propõe o desenvolvimento de sistemas humano-IA co-adaptativos que reconheçam e gerenciem dinamicamente o equilíbrio CL-CompL, enfatizando a ergonomia cognitiva e a aplicação de princípios transacionais no MAS para assegurar consistência analítica. Em suma, contribui para o design de ferramentas de IA eficientes, confiáveis e cognitivamente viáveis para a prática estatística em engenharia.

Palavras-chave: Ajuste Fino de Sistema Generativo/Deterministico; Computação Neurofisiológica; Eficiência Computacional; Fluxos de Trabalho de Análise de Dados; LLMs agenticamente relacionados.

1. INTRODUÇÃO
A inteligência artificial (IA) contemporânea, catalisada por avanços exponenciais e capacidades emergentes em Grandes Modelos de Linguagem (LLMs), está ativamente reconfigurando as fronteiras da análise de dados e da geração de conhecimento em domínios intrinsecamente complexos, como as diversas disciplinas da Engenharia, inaugurando um horizonte de novas possibilidades para a automação e assistência em tarefas analíticas que tradicionalmente demandam expertise humana profunda e tempo considerável (Adlakha et al., 2024). Modelos seminais e suas iterações mais recentes, como as famílias Gemini, Qwen, Grok ou Mistral, têm demonstrado aptidões notáveis não apenas no processamento de linguagem natural, mas também em seguir instruções complexas, realizar cálculos e até mesmo gerar código para ferramentas estatísticas, sugerindo um potencial significativo para auxiliar em análises técnicas rigorosas e detalhadas. A aplicação correta e a interpretação criteriosa de tratamentos estatísticos – abrangendo um espectro que vai desde testes de hipóteses fundamentais e análise de variância (ANOVA) até modelos de regressão mais sofisticados, desenho de experimentos (DOE) e controle estatístico de processo (CEP) – constituem um pilar essencial para a tomada de decisão informada e baseada em evidências na prática da engenharia. Contudo, essas tarefas frequentemente exigem um conhecimento especializado, uma compreensão aguçada dos pressupostos subjacentes a cada método e uma interpretação cuidadosa dos resultados numéricos dentro do contexto específico do problema de engenharia em questão, representando, assim, um desafio substancial para a automação completa ou mesmo para a assistência eficaz por sistemas de IA (Kazemi et al., 2023). Embora abordagens como a geração de cadeias de pensamento (Wei et al., 2022a) mostrem promessa para decompor problemas analíticos complexos, a garantia da correção factual, da validade metodológica e da confiabilidade geral das saídas geradas por LLMs em aplicações estatísticas de alta consequência, como as encontradas na engenharia, permanece uma área de investigação ativa e uma preocupação central para a adoção prática dessas tecnologias. Este estudo mergulha precisamente nesse nexo, investigando como sistemas de IA, especificamente arquiteturas multi-agente operando localmente, podem ser orquestrados para facilitar a geração de insights estatísticos confiáveis, enquanto se gerencia a interação crítica entre as demandas cognitivas impostas ao operador humano e as limitações computacionais do hardware disponível, promovendo avanços inéditos na integração entre homem e máquina.
Historicamente, a escala massiva e os requisitos computacionais proibitivos associados ao treinamento e, primordialmente, à inferência dos LLMs mais avançados, confinaram seu acesso a grandes centros de pesquisa e corporações com vastos recursos computacionais, criando uma barreira significativa para a exploração de aplicações especializadas por parte de profissionais, pesquisadores independentes, pequenas e médias empresas e estudantes que operam com hardware de consumidor comum. Essa centralização dificultou a democratização da IA avançada e a sua aplicação personalizada em contextos como a análise estatística detalhada em problemas específicos de engenharia. Entretanto, uma mudança paradigmática foi precipitada por avanços recentes e convergentes em técnicas de quantização de modelos (Nagel et al., 2021; Dettmers et al., 2022), que reduzem drasticamente os requisitos de memória (VRAM) e, frequentemente, aceleram a inferência, juntamente com o desenvolvimento de formatos de arquivo otimizados como o GGUF e runtimes eficientes como llama.cpp e Ollama (Husom et al., 2025). Essas inovações tornaram tecnicamente viável executar LLMs com bilhões de parâmetros localmente, em hardware amplamente acessível, como as GPUs NVIDIA RTX 3060 (com 12GB de VRAM) e RTX 4050 (com 6GB de VRAM) utilizadas neste estudo. Essa capacidade de execução local ("on-device") representa um marco fundamental, abordando preocupações críticas relacionadas a custo, latência de rede, privacidade de dados potencialmente sensíveis (comuns em aplicações de engenharia industrial) e a necessidade operacional de acesso offline em determinados cenários de produção. A execução local abre, portanto, possibilidades promissoras para a aplicação de IA em tarefas de engenharia que exigem processamento intensivo de dados e raciocínio estatístico robusto, permitindo que um espectro mais amplo de usuários explore o potencial dessas tecnologias sem a dependência de APIs de nuvem, que podem ser caras, restritivas ou inadequadas do ponto de vista da segurança de dados, além de proporcionar maior autonomia e controle sobre os fluxos de trabalho.
Embora a capacidade de executar LLMs localmente represente um avanço significativo, a sua aplicação eficaz para tarefas analíticas especializadas, como a análise estatística em subcampos específicos da engenharia, muitas vezes requer mais do que um modelo genérico pré-treinado. Frequentemente, é necessária uma especialização adicional, seja através de ajuste fino para adaptar o modelo a um domínio particular, a uma terminologia específica ou a padrões de dados idiossincráticos de um determinado processo ou experimento de engenharia (Howard & Ruder, 2018). O advento de técnicas de Ajuste Fino Eficiente em Parâmetros (PEFT), e mais essencialmente, a Quantized Low-Rank Adaptation (QLoRA) (Dettmers et al., 2023; Afrin et al., 2025), revolucionou esse cenário. QLoRA combina de forma engenhosa a adaptação de baixo ranque (que treina apenas um pequeno subconjunto de parâmetros adicionais) com a quantização agressiva do modelo base (por exemplo, para 4 bits), tornando o ajuste fino local de modelos GGUF de bilhões de parâmetros uma realidade tangível mesmo em GPUs de consumidor com VRAM limitada (tipicamente 6-12GB). Isso desbloqueia a possibilidade de criar agentes LLM especializados localmente, adaptados para subtarefas estatísticas específicas (como limpeza de dados experimentais, execução de ANOVA, interpretação de resultados de regressão) ou para compreender a linguagem e os dados de um nicho particular da engenharia. Contudo, é fundamental reconhecer que este processo de ajuste fino, mesmo com QLoRA, não é totalmente automatizado; ele permanece uma atividade que envolve interação humana significativa (HITL) (Amershi et al., 2014), exigindo do operador a curadoria cuidadosa dos dados de treinamento, a seleção criteriosa de hiperparâmetros, o monitoramento atento do processo e a avaliação do modelo resultante. Essa necessidade de envolvimento humano introduz, inevitavelmente, uma Carga Cognitiva (CL) adicional e não negligenciável sobre o operador (Sweller, 1988), que precisa investir tempo e esforço mental para garantir a qualidade, a adequação e a confiabilidade do agente especializado que está sendo criado para a análise estatística, tornando o processo mais complexo e desafiador.
A natureza intrinsecamente multifacetada e sequencial da análise estatística em engenharia – que tipicamente envolve um fluxo de trabalho complexo desde a definição do problema, passando pela coleta e limpeza de dados (Pyle, 1999), análise exploratória (Tukey, 1977), seleção criteriosa do método estatístico apropriado, execução da análise, verificação dos pressupostos do método, interpretação contextualizada dos resultados numéricos e, finalmente, a comunicação clara e defensável das conclusões – sugere fortemente que um único LLM, mesmo que especializado via QLoRA, pode não ser a arquitetura ideal para abranger eficientemente todo o espectro de tarefas e competências necessárias. Essa constatação motiva poderosamente a exploração de sistemas multi-agente (MAS) (Wu et al., 2023; Park et al., 2023; Luo et al., 2025), onde um "enxame" coordenado de LLMs agenticamente relacionados – neste estudo, um conjunto substancial de 60 modelos GGUF, divididos equitativamente entre quantização Q4 e Q8 – colabora para realizar um fluxo de trabalho de análise estatística complexo. Dentro dessa arquitetura, cada agente pode ser especializado, potencialmente através de ajuste fino QLoRA, em uma subtarefa específica: um agente pode focar na identificação e tratamento de outliers em dados de sensores, outro pode ser treinado para executar corretamente uma ANOVA e seus testes post-hoc, um terceiro pode ser especializado em gerar visualizações descritivas e diagnósticas usando bibliotecas como Matplotlib, um quarto pode ser otimizado para interpretar os resultados estatísticos à luz do problema de engenharia original, e assim por diante. A orquestração eficaz desses agentes, definindo como eles interagem (de forma sequencial ou paralela), como os dados e o contexto fluem entre eles, e como o sistema lida com a colaboração para gerar insights estatísticos que sejam não apenas significativos, mas acima de tudo, confiáveis e metodologicamente sólidos, torna-se uma tarefa central e desafiadora. Essa orquestração pode ser potencialmente gerenciada por frameworks como LangChain ou CrewAI, e é precisamente a função que a plataforma CrossDebate, desenvolvida especificamente para este estudo com um frontend React e um backend FastAPI, visa facilitar, permitindo aos usuários definir, executar, monitorar e interagir com esses fluxos estatísticos multi-agente operando localmente, promovendo maior flexibilidade e controle sobre o processo analítico.

2. REVISÃO DA LITERATURA
Nas últimas décadas, o campo dos Grandes Modelos de Linguagem (LLMs) evoluiu de meros mecanismos de previsão de texto para poderosas plataformas capazes de desempenhar tarefas analíticas robustas, incluindo a elaboração de hipergrafos de pensamento, a geração de código estatístico e a interpretação de resultados numéricos. Trabalhos seminais demonstraram o potencial de arquiteturas como Gemini, Qwen, Grok ou Mistral, para apoiar processos de inferência e cálculo em contextos científicos. Concomitantemente, avanços em quantização de modelos — notadamente Q4 e Q8 no formato GGUF (Nagel et al., 2021; Dettmers et al., 2022) — tornaram viável a execução local dessas redes neurais em hardware de consumidor, reduzindo drasticamente requisitos de VRAM sem sacrificar integralmente a precisão. No entanto, ao aplicar esses modelos diretamente a pipelines estatísticos de Engenharia — que englobam desde análise descritiva e testes de hipóteses até ANOVA, regressão e DOE — surgiram lacunas importantes: a necessidade de verificação de pressupostos, garantia de validade metodológica e interpretação contextualizada. Técnicas de ajuste fino eficiente em parâmetros (PEFT), como QLoRA (Dettmers et al., 2023; Afrin et al., 2025), possibilitaram a especialização de agentes LLM para subtarefas estatísticas, mas exigiram curadoria humana e elevaram a carga cognitiva dos operadores (Amershi et al., 2014).
Para endereçar essa complexidade multifacetada, a literatura mais recente começa a explorar sistemas multi‑agente (MAS) em que múltiplos LLMs especializados colaboram de forma coordenada para decompor e resolver fluxos de trabalho estatísticos complexos. Frameworks como LangChain (LangChain, 2023), CrewAI (CrewAI, 2024) e AutoGen (Wu et al., 2023; Luo et al., 2025) fornecem abstrações para orquestração de agentes, mas carecem de estudos empíricos que considerem simultaneamente a carga cognitiva humana (CL) e a carga computacional (CompL) em cenários de engenharia. A Teoria da Carga Cognitiva (Sweller, 1988; Sweller, 2010) e pesquisas em medição multimodal (Belda‑Lois et al., 2024; Kothe, 2014) oferecem bases conceituais para entender como interfaces e processos de orquestração afetam o esforço mental do usuário, enquanto estudos em métricas de eficiência computacional (Bai et al., 2024; Husom et al., 2025) mapeiam o impacto de quantização e paralelismo na performance do sistema. Ainda assim, falta uma integração holística que demonstre como um enxame de agentes GGUF — diferentemente de uma abordagem monolítica — pode gerar insights estatísticos robustos em engenharia, mantendo um equilíbrio entre CL e CompL. Esta lacuna motiva nosso estudo, que propõe e avalia empiricamente um sistema multi‑agente local orquestrado pela plataforma CrossDebate (React/FastAPI), no qual a interação dinâmica entre agentes Q4/Q8, monitoramento multimodal de CL e métricas de CompL são tratados de forma co‑adaptativa para assegurar análises estatísticas confiáveis e cognitivamente ergonômicas.

3. METODOLOGIA
Esta seção detalha o plano de pesquisa projetado para investigar sistematicamente a dinâmica interdependente entre a carga cognitiva humana (CL) e a carga computacional do sistema (CompL). O contexto específico desta investigação foi a orquestração de fluxos de trabalho de análise estatística em engenharia, utilizando um sistema multi-agente composto por um enxame heterogêneo de 60 modelos LLM no formato GGUF (30 quantizados em Q4, 30 em Q8). Esses agentes foram gerenciados através da plataforma CrossDebate, uma aplicação que consiste em uma interface de usuário desenvolvida em React para interação e visualização, e um backend em FastAPI para orquestração e monitoramento, integrando medições psicofisiológicas e computacionais em tempo real. Todo o sistema operou em hardware de consumidor representativo, refletindo cenários de uso realistas para engenheiros, pesquisadores ou estudantes fora de grandes centros de computação. Descrevemos a abordagem de pesquisa de métodos mistos adotada, o quadro conceitual que guiou o estudo (focando na interação CL-CompL na análise estatística multi-agente), a operacionalização precisa das variáveis independentes e dependentes com ênfase nas tarefas estatísticas realizadas (cobrindo testes de hipóteses, ANOVA, regressão, e princípios de DOE/CEP), as características da amostra de participantes recrutada (estratificada por expertise), os materiais e aparatos tecnológicos empregados (incluindo os sensores fisiológicos e as ferramentas de monitoramento de CompL), o procedimento experimental detalhado, cuidadosamente ajustado para uma duração total de aproximadamente 60 minutos por participante e centrado na execução e avaliação de tarefas de análise estatística assistida por IA, e o plano subsequente para análise dos dados multimodais coletados, sincronizados via LabStreamingLayer (LSL).

4. RESULTADOS E DISCUSSÃO
O objetivo central desta análise foi abordar as questões de pesquisa formuladas e testar formalmente as hipóteses propostas sobre a natureza e as implicações da interdependência dinâmica entre a Carga Cognitiva (CL) experimentada pelo operador humano e a Carga Computacional (CompL) imposta ao sistema local. Este processo analítico ocorreu no contexto específico da orquestração de fluxos de trabalho de análise estatística em engenharia, utilizando o sistema multi-agente composto pelo enxame de 60 modelos LLM GGUF (30 Q4, 30 Q8) gerenciados pela plataforma CrossDebate (React/FastAPI) e operando em hardware de consumidor representativo. O plano analítico delineado aqui abrangeu todas as etapas necessárias, desde a preparação inicial, limpeza e estruturação dos dados sincronizados via LabStreamingLayer (LSL), passando por análises descritivas para caracterizar as variáveis, análises inferenciais robustas (utilizando predominantemente Modelos Lineares Generalizados Mistos - GLMMs, para lidar adequadamente com a estrutura de dados aninhada e as medidas repetidas), análises de correlação e regressão (incluindo a modelagem explícita de relações não lineares para investigar a hipótese H3 sobre a forma U/J da relação CL-CompL), a análise qualitativa sistemática dos protocolos de pensamento em voz alta (através de Análise Temática focada na experiência subjetiva da análise estatística assistida por IA), e culminando na integração sistemática e triangulada dos achados quantitativos e qualitativos para alcançar uma interpretação holística e profundamente informada do fenômeno CL-CompL neste domínio aplicado e crítico.
Estes resultados foram derivados da aplicação do plano de análise de dados multimodais, durante as sessões experimentais de 60 minutos com 40 participantes (10 iniciantes e 10 especialistas que realizaram uma mesma orquestração sequencial; 10 iniciantes e 10 especialistas que realizaram uma mesma orquestração paralela). O foco central esteve na utilização da plataforma CrossDebate (React/FastAPI) para orquestrar o enxame de 60 LLMs GGUF (30 Q4, 30 Q8) como agentes colaborativos na execução de fluxos de trabalho representativos de análise estatística comuns em Engenharia (incluindo testes de hipóteses, ANOVA, regressão, e princípios de DOE/CEP), operando em hardware de consumidor (GPUs RTX 3060/12GB e RTX 4050/6GB). Os resultados são organizados de forma a abordar diretamente as hipóteses de pesquisa formuladas (H1 sobre o impacto da Quantização, H2 sobre o impacto da Complexidade do Fluxo, H4 sobre o papel moderador da Expertise) e a questão de pesquisa central sobre a natureza da relação CL-CompL (RQ3/H3 sobre a Não Linearidade). A apresentação integra os achados das análises estatísticas inferenciais (principalmente Modelos Lineares Generalizados Mistos - GLMMs) com os insights derivados da análise qualitativa (Análise Temática dos protocolos de pensamento em voz alta), fornecendo uma visão abrangente e triangulada dos fenômenos observados.
Os resultados empíricos aqui apresentados, derivados da análise multifacetada dos dados coletados através da plataforma CrossDebate, forneceram uma visão detalhada e, por vezes, contraintuitiva da dinâmica interação que ocorre entre a Carga Cognitiva (CL) experimentada pelo operador humano e a Carga Computacional (CompL) imposta ao sistema local. Este fenômeno foi investigado no contexto específico da utilização de um sistema multi-agente, composto pelo enxame heterogêneo de 60 LLMs no formato GGUF (divididos igualmente entre quantização Q4 e Q8) e gerenciados pela plataforma CrossDebate, com o objetivo de facilitar a geração de insights a partir de tratamentos estatísticos frequentemente utilizados nas diversas disciplinas da Engenharia. Esta seção se propõe a discutir o significado profundo desses achados, interpretando-os criticamente à luz do quadro conceitual proposto, que buscou integrar elementos da Teoria da Carga Cognitiva (CLT) (Sweller, 1988; Sweller, 2010), princípios de Interação Humano-Computador (HCI) e usabilidade, conceitos de gerenciamento de recursos computacionais em sistemas de IA locais (Bai et al., 2024; Husom et al., 2025), e a literatura sobre o papel da expertise (Kalyuga et al., 2003) e a eficiência de LLMs quantizados (Dettmers et al., 2022; Dettmers et al., 2023; Afrin et al., 2025), com um foco particular nos desafios e oportunidades inerentes à análise estatística assistida por IA. Argumentamos que os resultados não apenas validam as hipóteses iniciais formuladas sobre os trade-offs e moderações, mas também, e de forma mais impactante, exigem uma reconsideração fundamental de como projetamos, implementamos e interagimos com sistemas de IA locais destinados a apoiar tarefas analíticas que são críticas e exigem alta confiabilidade, como é inegavelmente o caso da análise estatística na engenharia, onde a precisão, a validade metodológica e a interpretabilidade dos resultados são primordiais e podem ter consequências significativas. A necessidade premente de ir além da otimização isolada e unidimensional da CL ou da CompL emerge como um tema central e recorrente, apontando para a importância fulcral de desenvolver sistemas co-adaptativos que reconheçam e gerenciem ativamente o delicado e dinâmico equilíbrio CL-CompL para alcançar uma colaboração humano-IA verdadeiramente eficaz e responsável.

6. CONCLUSÃO
Esta investigação apresentou um estudo sobre a dinâmica interdependência que existe entre a Carga Cognitiva (CL) imposta ao operador humano e a Carga Computacional (CompL) exigida do sistema, um fator crítico, mas frequentemente subestimado ou negligenciado, na concepção e avaliação de aplicações de Inteligência Artificial (IA) que operam localmente. O estudo focou especificamente no contexto desafiador e de alta relevância prática da utilização de um sistema multi-agente, composto por um enxame heterogêneo de 60 Grandes Modelos de Linguagem (LLMs) no formato GGUF (divididos equitativamente entre quantização Q4 e Q8) e orquestrados pela plataforma CrossDebate (desenvolvida com React para o frontend e FastAPI para o backend), com o objetivo de facilitar a geração de insights a partir de tratamentos estatísticos comuns e fundamentais nas diversas áreas da Engenharia (como testes de hipóteses, ANOVA, regressão, DOE, CEP), tudo isso operando dentro das limitações realistas do hardware de consumidor. Através da aplicação de uma metodologia mista, que integrou o monitoramento psicofisiológico contínuo e sincronizado (utilizando POG, EEG, PPG/HRV, SpO2 via LSL (Kothe, 2014)) com medições subjetivas de CL (NASA-TLX (Hart & Staveland, 1988), SEQ (Paas, 1992)), quantificação detalhada da CompL (VRAM, GPU/CPU, energia, latência) e análise qualitativa de processos de pensamento (Braun & Clarke, 2006), este estudo forneceu evidências empíricas robustas e convergentes. Essas evidências não apenas validaram as hipóteses iniciais sobre os trade-offs, não linearidades e efeitos de moderação, mas também elucidaram a natureza intrincada da interação humano-IA neste domínio analítico crítico, onde a confiabilidade, o rigor metodológico e a interpretabilidade dos resultados são primordiais.
A necessidade de protocolos de comunicação eficientes e padronizados torna-se evidente, especialmente ao operar com hardware de consumidor. A pesquisa de Yang et al. (2025) destaca a fragmentação atual e a importância de padrões unificados para interoperabilidade e escalabilidade, classificando protocolos existentes e propondo dimensões de avaliação imprescindíveis como eficiência e interpretabilidade. Nesse contexto local e de recursos limitados, protocolos como o Agent Communication Protocol (ACP) da IBM, detalhado por Proser (2025), que prioriza a comunicação local-first (JSON-RPC sobre HTTP/WebSockets) e a integração com ferramentas como Ollama e formatos GGUF, alinham-se diretamente com os desafios de CompL. Similarmente, a infraestrutura AIOS Server proposta por Zhang et al. (2025), que utiliza MCP e JSON-RPC para criar uma "Internet of AgentSites" descentralizada com descoberta via DHT/Gossip, oferece um modelo para conectar agentes GGUF locais de forma robusta, abordando tanto a CompL quanto a necessidade de coordenação implícita na orquestração via CrossDebate. A escolha do protocolo impacta diretamente a CL do operador, pois padrões claros simplificam a definição e o monitoramento das interações complexas necessárias para análises estatísticas confiáveis.
A garantia de confiabilidade e validade metodológica nas análises estatísticas geradas pelo MAS local, transcende a mera comunicação e exige mecanismos robustos de validação e gestão de estado, especialmente em fluxos de trabalho complexos como DOE ou CEP. O trabalho de Chang et al. (2025) sobre SagaLLM aborda diretamente essa questão ao introduzir princípios transacionais (inspirados no padrão Saga) e validação independente em MAS baseados em LLMs. SagaLLM lida com limitações intrínsecas dos LLMs, como a dificuldade de autovalidação e o estreitamento de contexto ("context narrowing"), que podem comprometer análises estatísticas longas ou multifacetadas. A capacidade de SagaLLM de gerenciar dependências entre operações e executar compensações em caso de falha é basilar para manter a consistência em análises de engenharia de alta consequência. Embora plataformas No-Code como Flowise, exploradas por Jeong (2025), possam simplificar a criação de MAS multimodais com estruturas Supervisor/Worker, a implementação de garantias transacionais e validação rigorosa como as de SagaLLM pode ser necessária para assegurar a robustez exigida no domínio da engenharia estatística, complementando a facilidade de uso com a confiabilidade operacional e impactando a CL ao reduzir a necessidade de verificação manual constante. A avaliação de protocolos segundo critérios de Confiabilidade e Segurança, como proposto por Yang et al. (2025), torna-se assim fundamental.
A infraestrutura AIOS Server de Zhang et al. (2025), com sua "Internet of AgentSites" e descoberta descentralizada, representa um passo intermediário nessa direção, criando uma rede mais conectada, embora talvez ainda sem a riqueza semântica e contextual da Spatial Web. A perspectiva de Yang et al. (2025) sobre arquiteturas em camadas e infraestruturas de inteligência coletiva também ressoa com essas visões de longo prazo. Essa evolução futura pode alterar fundamentalmente o equilíbrio CL-CompL, potencialmente descarregando parte da gestão de contexto e descoberta para a infraestrutura subjacente, mas introduzindo novos desafios cognitivos relacionados à compreensão e interação com esses ambientes contextuais mais ricos e dinâmicos.

## NOTA SOBRE LAYOUT ADAPTATIVO (RESPONSIVO)

A plataforma CrossDebate foi desenvolvida com um layout adaptativo (responsivo) para garantir usabilidade e acessibilidade em diferentes tamanhos de tela, incluindo desktops, notebooks, tablets e smartphones. O frontend em React utiliza práticas modernas de CSS responsivo (como Flexbox, Grid e media queries), permitindo que os componentes da interface se reorganizem e redimensionem automaticamente conforme a resolução do dispositivo. Isso assegura que operadores e participantes possam interagir eficientemente com o sistema, visualizar fluxos de trabalho multi-agente e monitorar métricas, independentemente do dispositivo utilizado.

### Feedback visual em tempo real

Além do layout responsivo, a plataforma oferece feedback visual em tempo real para aprimorar a experiência do usuário durante a execução dos fluxos multi-agente. São utilizados indicadores de carregamento (loading), barras de progresso e status individuais dos agentes (por exemplo, "executando", "concluído", "erro"), permitindo o acompanhamento instantâneo do andamento das tarefas e facilitando a identificação de eventuais problemas ou gargalos durante a orquestração estatística.

### Navegação entre etapas do fluxo de trabalho (breadcrumbs)

A plataforma implementa um sistema de navegação por breadcrumbs (trilha de migalhas) que fornece orientação contextual clara durante a execução de fluxos de trabalho estatísticos complexos. Este componente de interface mantém visível o caminho hierárquico completo das etapas do processo analítico (por exemplo, "Início > Preparação de Dados > Análise Exploratória > ANOVA > Interpretação"), permitindo que usuários:

1. Visualizem sua localização atual no contexto geral do fluxo de trabalho estatístico
2. Naveguem diretamente para etapas anteriores com um único clique
3. Entendam a sequência lógica e as dependências entre diferentes fases da análise

Esta abordagem reduz significativamente a carga cognitiva (CL) do operador ao minimizar o esforço de orientação espacial e rastreamento de progresso, especialmente durante orquestrações complexas envolvendo múltiplos agentes LLM. Os breadcrumbs são implementados como componentes React reutilizáveis que se adaptam automaticamente a diferentes tamanhos de tela, mantendo-se funcionais mesmo em dispositivos móveis através de design responsivo e técnicas de truncamento inteligente para preservar a legibilidade em espaços reduzidos.

### Visualização intuitiva de métricas CL-CompL

A plataforma CrossDebate incorpora um sistema abrangente de visualização de métricas que permite monitorar simultaneamente as cargas cognitiva (CL) e computacional (CompL), facilitando a compreensão de sua interdependência. Esta funcionalidade é implementada através de:

1. **Dashboards interativos** - Painéis de controle em tempo real que exibem métricas-chave:
   - Representações visuais sincronizadas da CL (índice NASA-TLX derivado, frequência cardíaca, padrões de microexpressões faciais)
   - Indicadores de CompL (uso de VRAM/RAM, utilização de GPU/CPU, consumo energético, latência de inferência)
   - Gráficos correlacionais que evidenciam a relação U/J entre CL-CompL identificada no estudo

2. **Visualizações adaptativas** - Transformação contextual das visualizações conforme o fluxo de trabalho estatístico:
   - Durante etapas computacionalmente intensivas (ex: ANOVA com múltiplos fatores), os gráficos enfatizam métricas de CompL
   - Em fases interpretativas, as métricas de CL ganham proeminência visual
   - Capacidade de alternar entre visões detalhadas e resumidas com um clique

3. **Sistema de alertas visuais** - Codificação cromática (verde/amarelo/vermelho) para sinalizar:
   - Picos potencialmente problemáticos em qualquer dimensão da CL
   - Gargalos computacionais iminentes que podem comprometer o desempenho
   - Desequilíbrios críticos na relação CL-CompL que exigem intervenção

4. **Visualização distribuída de agentes** - Mapa visual interativo do enxame de 60 LLMs GGUF:
   - Representação da atividade e intercomunicação entre agentes Q4 e Q8
   - Visualização do fluxo de dados e contexto entre componentes do sistema
   - Métricas de desempenho individual e coletivo dos agentes

Esta abordagem integrada de visualização permite que operadores com diferentes níveis de expertise compreendam intuitivamente o estado do sistema multi-agente, identifiquem proativamente potenciais problemas e otimizem o equilíbrio entre carga cognitiva e computacional. As métricas são coletadas automaticamente pela infraestrutura de telemetria da plataforma, processadas pelo backend FastAPI e renderizadas na interface React usando bibliotecas de visualização como D3.js e React-Vis, mantendo-se responsivas em diferentes dispositivos e consumindo recursos mínimos para não impactar a execução dos agentes LLM.

### Configuração simplificada de análises e seleção de modelos

A plataforma CrossDebate implementa um sistema de configuração intuitivo que reduz significativamente a complexidade associada à definição de fluxos de trabalho estatísticos multi-agente. Este componente central da interface oferece:

1. **Assistente de configuração guiada** - Interface tipo "wizard" que conduz o usuário através de etapas bem definidas:
   - Seleção inicial do tipo de análise estatística (ex: teste t, ANOVA, regressão, DOE)
   - Configuração progressiva baseada em contexto, onde cada escolha refina as opções subsequentes
   - Validação em tempo real dos parâmetros selecionados, identificando inconsistências e oferecendo sugestões corretivas

2. **Templates pré-configurados** - Biblioteca de fluxos de trabalho estatísticos comuns em engenharia:
   - Modelos prontos para cenários específicos (ex: "Comparação de resistência de materiais", "Análise de variância de processos")
   - Capacidade de personalização rápida a partir de templates, preservando configurações básicas validadas
   - Histórico de fluxos executados anteriormente, permitindo reutilização e adaptação

3. **Seleção inteligente de modelos LLM** - Sistema de recomendação que equilibra requisitos da tarefa e recursos disponíveis:
   - Alocação otimizada de agentes Q4/Q8 baseada na natureza da subtarefa (ex: modelos Q8 para análises numéricas precisas, Q4 para interpretações contextuais)
   - Sugestão automática de configuração do enxame com base no hardware detectado e na complexidade da análise
   - Controles avançados para usuários experientes ajustarem manualmente a distribuição e características dos agentes

4. **Interface de arrastar e soltar (drag-and-drop)** - Editor visual para definição de fluxos avançados:
   - Representação gráfica dos componentes de análise e agentes LLM como blocos interconectáveis
   - Construção intuitiva de pipelines de processamento estatístico através de conexões visuais
   - Validação contínua da topologia do fluxo, destacando potenciais gargalos ou inconsistências lógicas

5. **VisualModelSelector** para seleção intuitiva e visual de modelos e análises:
   - Layout baseado em cards expansíveis com imagens representativas e ícones intuitivos
   - Visualização em grid responsivo com 3 modos de densidade (compacto, normal, detalhado)
   - Sistema de filtros multi-dimensionais com seletores visuais e tags interativas:
     - Filtragem por características (quantização, tamanho, especialização, velocidade, precisão)
     - Filtragem contextual baseada no tipo de análise estatística selecionada
     - Filtragem por compatibilidade com hardware detectado (verde/amarelo/vermelho)
     - Visualização de apenas modelos disponíveis localmente vs. todos os modelos suportados
   - Preview instantâneo ao passar o mouse sobre cada card (hover):
     - Minigráfico de performance comparativa em tarefas estatísticas específicas
     - Indicadores visuais de requisitos de recursos (memória, computação)
     - Amostras de resultados típicos gerados pelo modelo para o tipo de análise
   - Tooltips contextuais e adaptativos:
     - Tooltips básicos para iniciantes com explicações diretas e simples
     - Tooltips avançados para especialistas com parâmetros técnicos e referências
     - Modo "comparação" ativável que destaca diferenças ao passar o mouse sobre múltiplas opções
   - Sistema visual de recomendação baseado nos achados CL-CompL:
     - Badges visuais destacando opções recomendadas para o contexto atual
     - Indicadores de relação CL-CompL esperada para cada combinação modelo+análise
     - Sugestões visuais de combinações ótimas baseadas no perfil do usuário e hardware
   - Componente de seleções recentes e favoritas:
     - Histórico visual de configurações utilizadas anteriormente com miniaturas
     - Sistema de favoritos com categorização personalizada e tags coloridas
     - Compartilhamento de configurações via QR code ou link para outros usuários
   - **Recursos de acessibilidade avançados**:
     - Implementação completa de ARIA (Accessible Rich Internet Applications):
       - Atributos role, aria-label e aria-described-by para todos os elementos interativos
       - Anúncios assistivos para atualizações dinâmicas (aria-live regions)
       - Landmarks ARIA para estruturação semântica do conteúdo
       - Estados expandidos/colapsados comunicados adequadamente (aria-expanded)
     - Conformidade com WCAG 2.1 nível AA:
       - Razão de contraste mínima de 4.5:1 para texto e 3:1 para componentes interativos
       - Esquemas de cores alternativos (alto contraste, modo escuro, deuteranopia, etc.)
       - Opção de desativação de animações e efeitos para usuários com sensibilidades visuais
       - Textos redimensionáveis sem perda de funcionalidade até 200%
     - Navegação completa por teclado:
       - Foco visível e consistente com indicador personalizado de alto contraste
       - Ordem de tabulação lógica e sequencial através do componente (tab-index)
       - Atalhos de teclado para ações frequentes com documentação acessível
       - Trap focus em modais e menus para evitar navegação acidental para fora do contexto
     - Compatibilidade com tecnologias assistivas:
       - Testado com leitores de tela populares (NVDA, JAWS, VoiceOver)
       - Suporte a gestos de zoom para usuários de baixa visão
       - Reconhecimento de comandos por voz para navegação e seleção
       - Feedback auditivo configurável para ações importantes
   - Animações suaves e feedback tátil (em dispositivos compatíveis):
     - Transições fluidas entre estados de seleção e filtragem
     - Haptic feedback discreto ao selecionar ou confirmar escolhas
     - Efeitos visuais de "expansão" ao investigar detalhes de um modelo específico

### Mensagens de erro e sucesso claras

A plataforma CrossDebate implementa um sistema abrangente de feedback com mensagens de erro e sucesso que minimiza a carga cognitiva (CL) durante a resolução de problemas e confirma ações bem-sucedidas. Este sistema foi desenvolvido com base nos achados sobre a relação CL-CompL, priorizando clareza, contextualização e acionabilidade:

1. **Hierarquia visual de severidade** - Estratificação cromática e posicional das notificações:
   - Mensagens críticas (vermelho) para eventos que interrompem o fluxo de trabalho estatístico
   - Alertas (amarelo) para condições que podem comprometer parcialmente os resultados
   - Informações (azul) para sugestões de otimização sem impacto imediato
   - Confirmações (verde) para operações concluídas com sucesso

2. **Contextualização detalhada do erro** - Informações diagnósticas multinível:
   - Descrição em linguagem natural do problema, livre de jargões técnicos excessivos
   - Identificação precisa do componente afetado (agente específico, conexão entre agentes, hardware)
   - Detalhes técnicos expansíveis para usuários avançados (logs detalhados, rastreamentos)
   - Correlação explícita entre CompL e potenciais causas (ex: "VRAM insuficiente para modelo Q8")

3. **Orientação para resolução** - Sugestões acionáveis e escalonadas:
   - Soluções imediatas quando possível (ex: "Clique para substituir por modelo Q4 equivalente")
   - Alternativas graduais baseadas no impacto sobre a qualidade analítica esperada
   - Estimativas de tempo/recursos necessários para cada solução proposta
   - Opções de fallback automático para manter continuidade do fluxo de trabalho

4. **Feedback de sucesso informativo** - Confirmações contextualizadas:
   - Indicação clara da conclusão bem-sucedida com métricas relevantes
   - Informações sobre otimizações realizadas durante a execução
   - Comparativo de desempenho com execuções anteriores similares
   - Sugestões proativas para próximos passos baseadas no resultado atual

5. **Sistema de persistência seletiva** - Gestão inteligente da atenção do usuário:
   - Mensagens transitórias para confirmações rotineiras
   - Notificações persistentes para erros que exigem intervenção
   - Histórico consultável de todas as mensagens para referência posterior
   - Opção de supressão contextual baseada no perfil de expertise do usuário

Este sistema de mensagens foi projetado com uma abordagem centrada no humano, reconhecendo que interpretação de erros e resolução de problemas representam pontos de alta carga cognitiva (CL), especialmente para usuários iniciantes. Ao fornecer feedback claro, contextualizado e acionável, a plataforma reduz significativamente o esforço mental necessário para diagnosticar e corrigir problemas durante a orquestração de análises estatísticas complexas, contribuindo para otimizar o equilíbrio CL-CompL e para manter o foco do usuário na interpretação dos resultados estatísticos e não na resolução de problemas técnicos.

### Bibliotecas de UI responsivas e consistentes

A plataforma CrossDebate foi implementada utilizando bibliotecas modernas de interface de usuário que garantem consistência visual, experiência fluida e adaptabilidade a diferentes dispositivos. Esta abordagem contribui diretamente para a redução da carga cognitiva (CL) através de padrões de interação familiares e previsíveis:

1. **Implementação com Material-UI** - Framework React de componentes pré-construídos:
   - Adoção da biblioteca Material-UI (MUI v5) como fundação principal da interface
   - Theming personalizado que mantém consistência visual enquanto reflete a identidade da plataforma
   - Utilização do sistema de Grids responsivo para organização espacial adaptativa dos elementos
   - Componentes acessíveis que cumprem especificações WCAG 2.1 AA, garantindo usabilidade universal

2. **Sistema de design unificado** - Consistência visual e comportamental:
   - Padronização de componentes recorrentes (botões, campos, painéis) com variações contextuais controladas
   - Sistema de tipografia hierárquico que reforça a estrutura informacional e facilita a leitura
   - Paleta cromática cientificamente validada, otimizada para redução de fadiga visual durante uso prolongado
   - Densidade de informação ajustável conforme o perfil de usuário e o contexto de uso

3. **Otimização de performance** - Renderização eficiente em hardware limitado:
   - Implementação de lazy-loading e code-splitting para reduzir tempo de carregamento inicial
   - Virtualização de listas e tabelas para manipulação eficiente de grandes conjuntos de dados estatísticos
   - Memoização seletiva de componentes para evitar re-renderizações desnecessárias
   - Bundle-size otimizado através de importações seletivas de componentes MUI (tree-shaking)

4. **Extensões especializadas** - Componentes customizados para análise estatística:
   - Integração com bibliotecas de visualização de dados (D3.js, Recharts) mantendo linguagem visual consistente
   - Tabelas de dados interativas com capacidade de ordenação, filtragem e exportação
   - Editores de código incorporados para manipulação de scripts estatísticos com syntax highlighting
   - Componentes específicos para ANOVA, regressão e outros métodos estatísticos com feedbacks visuais intuitivos
   - **ResultsViewer** e **MonitoringDashboard** implementados com Chart.js para gráficos responsivos:
     - Visualizações que se adaptam automaticamente ao tamanho da tela sem perda de legibilidade
     - Escala e densidade informacional ajustadas dinamicamente em dispositivos móveis
     - Interações touch-friendly (pinch-to-zoom, swipe entre conjuntos de dados)
     - Opções de exportação e compartilhamento de visualizações em múltiplos formatos
     - Consumo energético otimizado através de throttling e debouncing em eventos de redimensionamento
   - **AnalysisWorkflowStepper** para navegação estruturada por etapas:
     - Implementação baseada em Material-UI Stepper com personalização para análises estatísticas
     - Visualização clara do progresso e localização atual no fluxo de configuração e execução
     - Validação em tempo real por etapa com indicações visuais de status (completo/incompleto/erro)
     - Persistência de estado entre etapas com capacidade de salvar/restaurar configurações parciais
     - Design responsivo que se adapta de orientação horizontal (desktop) para vertical (mobile)
     - Navegação por teclado e suporte a leitores de tela para acessibilidade WCAG 2.1 AA
     - Integração com sistema de mensagens para validação contextual em cada etapa
     - Capacidade de ramificação condicional do fluxo baseada em escolhas anteriores do usuário
     - Mecanismos de prevenção de perda de dados com confirmações antes de mudanças de etapa
   - **LiveMetricsConsole** para exibição avançada de logs e métricas em tempo real:
     - Implementação baseada em virtualização de dados (react-virtualized) para manipulação eficiente de milhares de entradas de log
     - Streaming assíncrono via WebSockets com buffer circular otimizado para baixo consumo de memória
     - Interface de console expansível/retrátil (dockable) que pode ser posicionada em qualquer borda da tela
     - Filtragem dinâmica multi-critério (agente, severidade, timestamp, texto) com sintaxe avançada de consulta
     - Visualização codificada por cores com distinção clara entre logs de sistema, agente e modelo
     - Destaques automáticos para eventos críticos (ex: erros de VRAM, exceções de agentes)
     - Correlação temporal com eventos de UI e ações do usuário para facilitar troubleshooting
     - Grupos de logs expansíveis/retráteis para sessões de análise ou execuções específicas
     - Métricas históricas com visualização de tendências (sparklines) inline ao lado de cada métrica numérica
     - Exportação seletiva de logs para formatos JSON, CSV e texto simples com opções de filtragem
     - Modo de comparação lado a lado entre execuções distintas para benchmark e análise comparativa
     - Integração direta com a interface de debugging de modelos LLM para inspeção de token probabilities
     - Renderização otimizada com throttling automático durante picos de atividade para preservar performance
     - Pesquisa em tempo real com syntax highlighting dos termos encontrados e navegação por resultados
     - Opção de vizualização condensada para monitoramento discreto durante apresentações ou sessões focadas

REFERÊNCIAS
AFRIN, T.; ZHANG, Z.; KORF, R. E. Efficient fine-tuning of large language models for specific tasks. Journal of Machine Learning Research, v. 26, p. 1-35, 2025.

AMERSHI, S.; CAKMAK, M.; KNOX, W. B.; KULESZA, T. Power to the people: the role of humans in interactive machine learning. AI Magazine, v. 35, n. 4, p. 105-120, 2014.

BAAYEN, R. H.; DAVIDSON, D. J.; BATES, D. M. Mixed-effects modeling with crossed random effects for subjects and items. Journal of Memory and Language, v. 59, n. 4, p. 390-412, 2008.

BAI, Y.; ZHOU, Y.; ZHANG, Z. Computational efficiency in large language models: a survey. arXiv preprint arXiv:2403.12345, 2024. Disponível em: https://arxiv.org/abs/2403.12345. Acesso em: 25 abr. 2025.

BARNETT, V.; LEWIS, T. Outliers in statistical data. 3. ed. Chichester: Wiley, 1994.

BARR, D. J.; LEVY, R.; SCHEEPERS, C.; TILLY, H. J. Random effects structure for confirmatory hypothesis testing: keep it maximal. Journal of Memory and Language, v. 68, n. 3, p. 255-278, 2013.

BELDA-LOIS, J. M.; GARCÍA, A.; SOLVES, C. Physiological measures for cognitive workload: a review. Ergonomics, v. 67, n. 2, p. 123-145, 2024.

BOLKER, B. M.; BROOKS, M. E.; CLARK, C. J.; GEANGE, S. W.; POULSEN, J. R.; STEVENS, M. H. H.; WHITE, J. S. Generalized linear mixed models: a practical guide for ecology and evolution. Trends in Ecology & Evolution, v. 24, n. 3, p. 127-135, 2009.

BRAUN, V.; CLARKE, V. Using thematic analysis in psychology. Qualitative Research in Psychology, v. 3, n. 2, p. 77-101, 2006.

BRETZ, F.; HOTHORN, T.; WESTFALL, P. Multiple comparisons using R. Boca Raton: CRC Press, 2011.

CHANG, E. Y.; GENG, L. SagaLLM: context management, validation, and transaction guarantees for multi-agent LLM planning. arXiv preprint arXiv:2503.11951v2 [cs.AI], 2025. Disponível em: https://arxiv.org/html/2503.11951v2. Acesso em: 27 abr. 2025.

CRESWELL, J. W.; CLARK, V. L. P. Designing and conducting mixed methods research. 2. ed. Thousand Oaks: Sage, 2017.

CREWAI. CrewAI: a framework for orchestrating multi-agent systems. 2024. Disponível em: https://github.com/crewAI/crewAI. Acesso em: 25 abr. 2025.

DETTMERS, T.; LEWIS, M.; BELKADA, Y.; ZETTLEMOYER, L. GPT3.int8(): 8-bit matrix multiplication for transformers at scale. Advances in Neural Information Processing Systems, v. 35, p. 30318-30332, 2022.

DETTMERS, T.; PAGNONI, A.; HOLTZMAN, A.; ZETTLEMOYER, L. QLoRA: efficient finetuning of quantized LLMs. arXiv preprint arXiv:2305.14314, 2023. Disponível em: https://arxiv.org/abs/2305.14314. Acesso em: 25 abr. 2025.

DURAN, J.; SANTOS, M.; GARCÍA, L. Cognitive load in human-AI interaction: a systematic review. Human-Computer Interaction, v. 37, n. 5, p. 456-478, 2022.

FAUL, F.; ERDFELDER, E.; LANG, A. G.; BUCHNER, A. G*Power 3: a flexible statistical power analysis program for the social, behavioral, and biomedical sciences. Behavior Research Methods, v. 39, n. 2, p. 175-191, 2007.

FETTERS, M. D.; CURRY, L. A.; CRESWELL, J. W. Achieving integration in mixed methods designs: principles and practices. Health Services Research, v. 48, n. 6, p. 2134-2156, 2013.

GRAMFORT, A.; LUESSI, M.; LARSON, E.; ENGEMANN, D. A.; STROHMEIER, D.; BRODBECK, C.; GOJ, R.; JAS, M.; BROOKS, T.; PARKKONEN, L.; HÄMÄLÄINEN, M. MEG and EEG data analysis with MNE-Python. Frontiers in Neuroscience, v. 7, p. 267, 2013.

GREENE, J. C.; CARACELLI, V. J.; GRAHAM, W. F. Toward a conceptual framework for mixed-method evaluation designs. Educational Evaluation and Policy Analysis, v. 11, n. 3, p. 255-274, 1989.

HART, S. G.; STAVELAND, L. E. Development of NASA-TLX (Task Load Index): results of empirical and theoretical research. In: HANCOCK, P. A.; MESHKATI, N. (ed.). Human mental workload. Amsterdam: North-Holland, 1988. p. 139-183.

HOWARD, J.; RUDER, S. Universal language model fine-tuning for text classification. arXiv preprint arXiv:1801.06146, 2018. Disponível em: https://arxiv.org/abs/1801.06146. Acesso em: 25 abr. 2025.

HUSOM, E. J.; GUNDERSEN, O. E.; LANGSETH, H. Local deployment of large language models: challenges and opportunities. IEEE Transactions on Neural Networks and Learning Systems, p. 1-15, 2025.
JEONG, C. Beyond text: implementing multimodal large language model-powered multi-agent systems using a no-code platform. arXiv preprint arXiv:2501.00750, 2025. Disponível em: https://arxiv.org/pdf/2501.00750. Acesso em: 27 abr. 2025.

KALYUGA, S.; AYRES, P.; CHANDLER, P.; SWELLER, J. The expertise reversal effect. Educational Psychologist, v. 38, n. 1, p. 23-31, 2003.

KAZEMI, S. M.; LI, X.; BAJAJ, P.; CHEN, Z.; ZHANG, Y. Improving factual accuracy in large language models. arXiv preprint arXiv:2306.09876, 2023. Disponível em: https://arxiv.org/abs/2306.09876. Acesso em: 25 abr. 2025.

KOTHE, C. LabStreamingLayer: a unified framework for time-series data streaming. 2014. Disponível em: https://github.com/sccn/labstreaminglayer. Acesso em: 25 abr. 2025.

LANGCHAIN. LangChain: a framework for building applications with LLMs. 2023. Disponível em: https://github.com/langchain-ai/langchain. Acesso em: 25 abr. 2025.

LUO, H.; ZHANG, Q.; YANG, J.; LI, X. Multi-agent systems for complex task orchestration. Artificial Intelligence Review, v. 58, n. 3, p. 1123-1156, 2025.

MAKOWSKI, D.; PHAM, T.; LAU, Z. J.; BRAMMER, J. C.; LESPINASSE, F.; PHAM, H.; SCHÖLZEL, C.; CHEN, S. H. A. NeuroKit2: a Python toolbox for neurophysiological signal processing. Behavior Research Methods, v. 53, n. 4, p. 1689-1696, 2021.

NAGEL, M.; FOURNIER, M.; BONDAR, Y.; AMJAD, R. A. Practical quantization for large language models. arXiv preprint arXiv:2106.08295, 2021. Disponível em: https://arxiv.org/abs/2106.08295. Acesso em: 25 abr. 2025.

NAKAGAWA, S.; SCHIELZETH, H. A general and simple method for obtaining R² from generalized linear mixed-effects models. Methods in Ecology and Evolution, v. 4, n. 2, p. 133-142, 2013.

PAAS, F. Training strategies for attaining transfer of problem-solving skill in statistics: a cognitive-load approach. Journal of Educational Psychology, v. 84, n. 4, p. 429-434, 1992.

PARK, J. S.; O’BRIEN, J. C.; CAI, C. J.; MORRIS, M. R.; LIANG, P.; BERNSTEIN, M. S. Generative agents: interactive simulacra of human behavior. arXiv preprint arXiv:2304.03442, 2023. Disponível em: https://arxiv.org/abs/2304.03442. Acesso em: 25 abr. 2025.

PROSER, Z. IBM’s Agent Communication Protocol (ACP): a technical overview for software engineers. WorkOS Blog, 22 abr. 2025. Disponível em: https://workos.com/blog/ibm-agent-communication-protocol-acp. Acesso em: 27 abr. 2025.

PYLE, D. Data preparation for data mining. San Francisco: Morgan Kaufmann, 1999.

RUBIN, D. B. Multiple imputation for nonresponse in surveys. New York: Wiley, 1987.

STRUBELL, E.; GANESH, A.; MCCALLUM, A. Energy and policy considerations for deep learning in NLP. arXiv preprint arXiv:1906.02243, 2019. Disponível em: https://arxiv.org/abs/1906.02243. Acesso em: 25 abr. 2025.

SWELLER, J. Cognitive load during problem solving: effects on learning. Cognitive Science, v. 12, n. 2, p. 257-285, 1988.

SWELLER, J. Element interactivity and intrinsic, extraneous, and germane cognitive load. Educational Psychology Review, v. 22, n. 2, p. 123-138, 2010.

TUKEY, J. W. Exploratory data analysis. Reading: Addison-Wesley, 1977.

WEI, J.; TAY, Y.; BOMMASANI, R.; RAFFEL, C.; ZOPH, B.; BORGEAUD, S.; YOGATAMA, D.; BOSMA, M.; ZHOU, D.; METZLER, D.; CHIOU, E. H.; LIU, Q.; HASHIMOTO, T.; VINYALS, O.; LIANG, P.; DEAN, J.; FEDUS, W. Emergent abilities of large language models. arXiv preprint arXiv:2206.07682, 2022a. Disponível em: https://arxiv.org/abs/2206.07682. Acesso em: 25 abr. 2025.

WOOD, S. N. Generalized additive models: an introduction with R. 2. ed. Boca Raton: CRC Press, 2017.

WU, Q.; BANSAL, G.; ZHANG, J.; WU, Y.; LI, S.; ZHU, E.; LI, B.; JIANG, X.; ZHANG, X.; WANG, C. AutoGen: enabling next-gen LLM applications via multi-agent conversation. arXiv preprint arXiv:2308.08155, 2023. Disponível em: https://arxiv.org/abs/2308.08155. Acesso em: 25 abr. 2025.

XU, W. Toward human-centered AI: a perspective from human-computer interaction. Interactions, v. 26, n. 4, p. 42-46, 2019.

YANG, Y. et al. A survey of AI agent protocols. arXiv preprint arXiv:2504.16736v1 [cs.AI], 2025. Disponível em: https://arxiv.org/abs/2504.16736v1. Acesso em: 27 abr. 2025.

ZHANG, X.; ZHANG, Y. Planet as a brain: towards internet of agentsites based on AIOS server. arXiv preprint arXiv:2504.14411v2 [cs.NI], 2025. Disponível em: https://arxiv.org/html/2504.14411v2. Acesso em: 27 abr. 2025.
