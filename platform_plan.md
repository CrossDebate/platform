# Planejamento da Plataforma CrossDebate para Engenharia

## 1. Visão Geral

Criar uma versão da plataforma CrossDebate adaptada para estudantes de Engenharia, com foco na aplicação de tratamentos estatísticos utilizando um sistema multi-agente GGUF (30 Q4 e 30 Q8). A plataforma deve seguir os princípios descritos no arquivo `Documentation.txt`, equilibrando carga cognitiva (CL) e carga computacional (CompL).

## 2. Estrutura da Plataforma (Frontend React)

- **Página Inicial/Dashboard:**
    - Boas-vindas e introdução à plataforma.
    - Acesso rápido a projetos recentes.
    - Opções para iniciar nova análise ou carregar projeto existente.

- **Gerenciamento de Projetos/Dados:**
    - Criação/Seleção de projetos.
    - Upload de datasets (formatos comuns como CSV, Excel).
    - Visualização tabular dos dados.
    - Ferramentas básicas de pré-processamento (seleção de colunas, tratamento de valores ausentes - talvez assistido por um agente LLM).

- **Seleção de Análise Estatística:**
    - Interface guiada para ajudar o estudante a escolher o tratamento estatístico adequado com base no tipo de dados e objetivo da análise.
    - Categorias: Estatística Descritiva, Testes de Hipóteses (Testes T, Qui-Quadrado), Análise de Variância (ANOVA, MANOVA), Regressão (Linear Simples, Múltipla, Logística), Desenho de Experimentos (DOE), Controle Estatístico de Processo (CEP).

- **Configuração da Análise:**
    - **Seleção de Variáveis:** Interface para selecionar variáveis dependentes e independentes.
    - **Parâmetros do Teste:** Campos para definir parâmetros específicos do teste escolhido (e.g., nível de significância α).
    - **Configuração Multi-Agente (CrossDebate Core Adaptado):**
        - **Seleção de Modelos:** Permitir ao usuário escolher entre usar predominantemente modelos Q4 (menor CompL, maior CL potencial) ou Q8 (maior CompL, menor CL potencial), ou um mix.
        - **Complexidade do Fluxo:** Definir como os agentes colaborarão (e.g., fluxo simples: um agente faz tudo; fluxo complexo: agentes especializados para limpeza, execução, interpretação).
        - **Ajuste Fino (QLoRA - Descritivo/Simulado):** Interface similar à versão anterior, explicando o conceito e permitindo configurar parâmetros (rank, alpha, etc.), mas a execução do ajuste fino em si pode ser simulada ou apenas descritiva, dado o foco na aplicação estatística.

- **Execução e Monitoramento:**
    - Botão para iniciar a análise.
    - Feedback visual do progresso (etapas do fluxo multi-agente).
    - **Monitoramento CL-CompL (Simulado/Visual):** Gráficos ou indicadores mostrando a carga computacional estimada (baseada na escolha Q4/Q8 e complexidade) e a carga cognitiva estimada (baseada na complexidade da tarefa e interação necessária).

- **Resultados e Interpretação:**
    - **Resultados Numéricos:** Apresentação clara das saídas do teste estatístico (e.g., estatística de teste, valor-p).
    - **Visualizações:** Gráficos relevantes gerados (e.g., boxplots para ANOVA, gráfico de dispersão para regressão, cartas de controle para CEP). A geração pode usar bibliotecas como Recharts ou ser simulada/descrita por um agente LLM.
    - **Interpretação Assistida por IA:** Seção onde um agente LLM interpreta os resultados no contexto do problema de engenharia (com base no input do usuário ou metadados do projeto), verifica pressupostos (simulado) e sugere próximos passos.

- **Relatórios:**
    - Opção para compilar e exportar a análise (configurações, dados, resultados, gráficos, interpretação) em um formato como PDF ou Markdown.

## 3. Backend (FastAPI)

- Endpoints para gerenciar projetos e dados.
- Endpoint para receber configurações de análise e dados.
- Lógica de orquestração do fluxo multi-agente (simulada ou real, dependendo da capacidade de executar modelos GGUF localmente no ambiente de desenvolvimento/implantação).
    - Simular a interação entre agentes Q4/Q8 para diferentes tarefas (limpeza, cálculo, interpretação).
    - Gerar respostas estatísticas simuladas ou chamar bibliotecas Python (Statsmodels, SciPy) se a execução real não for viável.
- Endpoints para retornar progresso, métricas simuladas de CL/CompL e resultados finais (numéricos, gráficos, interpretação textual).

## 4. Foco para Graduandos de Engenharia

- Exemplos e datasets relevantes para problemas comuns de engenharia.
- Linguagem clara e explicações sobre os conceitos estatísticos.
- Interface intuitiva para guiar usuários com diferentes níveis de conhecimento estatístico.
- Ênfase na interpretação prática dos resultados no contexto da engenharia.

## 5. Próximos Passos (Plano de Implementação)

1.  **Estrutura do Projeto:** Criar a estrutura de pastas para o frontend React e backend FastAPI.
2.  **Interface Base:** Desenvolver os componentes React básicos (Navegação, Layout, Páginas principais).
3.  **Gerenciamento de Dados:** Implementar upload e visualização de dados.
4.  **Seleção de Análise:** Criar a interface para seleção dos testes estatísticos.
5.  **Configuração da Análise:** Desenvolver os componentes para configurar variáveis, parâmetros e o sistema multi-agente (CrossDebate adaptado).
6.  **Backend - Orquestração (Simulada):** Implementar a lógica no FastAPI para simular o fluxo multi-agente e a execução estatística.
7.  **Resultados:** Criar componentes React para exibir resultados numéricos, gráficos (com dados simulados ou biblioteca) e interpretação textual (simulada).
8.  **Testes e Refinamento:** Testar o fluxo completo e refinar a interface.
9.  **Implantação:** Implantar a plataforma.
