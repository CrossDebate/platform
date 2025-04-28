from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import pandas as pd
import io
import time
import random
import asyncio
import numpy as np # For more realistic simulation

# Import Pydantic models
from models import AnalysisConfig, AnalysisResult

# --- Simulation Helper Functions ---

def simulate_cl_compl(config: AnalysisConfig) -> dict:
    """Simulates CL and CompL based on configuration."""
    base_compl = random.uniform(20, 50)
    base_cl = random.uniform(15, 40)

    # Quantization effect
    if config.modelQuantization == "q4":
        compl_factor = 0.7 # Lower CompL for Q4
        cl_factor = 1.3    # Higher CL for Q4
    elif config.modelQuantization == "q8":
        compl_factor = 1.0
        cl_factor = 1.0
    else: # mix
        compl_factor = 0.85
        cl_factor = 1.15

    # Workflow complexity effect
    if config.workflowComplexity == "complex":
        compl_factor *= 1.2 # Higher CompL for complex
        cl_factor *= 1.4    # Higher CL for complex
    
    # Analysis type complexity (example)
    if config.analysisType in ["anova", "lin_reg_multi", "doe", "spc"]:
        compl_factor *= 1.1
        cl_factor *= 1.1
        
    final_compl = min(max(base_compl * compl_factor, 10), 95) # Clamp between 10-95
    final_cl = min(max(base_cl * cl_factor, 10), 95)       # Clamp between 10-95

    return {
        "CompL_Estimate": round(final_compl, 1),
        "CL_Estimate": round(final_cl, 1)
    }

def simulate_analysis_results(config: AnalysisConfig) -> tuple[dict, str, list]:
    """Simulates numerical results, interpretation, and plots based on analysis type."""
    numerical_results = {}
    interpretation = f"### Interpretação Simulada para {config.analysisType}\n\n"
    interpretation += f"Configuração: Quantização={config.modelQuantization}, Fluxo={config.workflowComplexity}\n\n"
    plots = []
    alpha = config.alpha or 0.05

    # Simulate some basic data properties for context
    n_samples = random.randint(50, 200)
    n_groups = random.randint(2, 5) if config.analysisType in ["anova", "t_test"] else 1

    if config.analysisType == "desc_stats":
        mean_val = random.uniform(10, 100)
        std_dev_val = random.uniform(max(1, mean_val * 0.1), mean_val * 0.3)
        numerical_results = {
            "Número de Amostras": n_samples,
            "Média": round(mean_val, 2),
            "Desvio Padrão": round(std_dev_val, 2),
            "Mínimo": round(mean_val - 2 * std_dev_val, 2),
            "Máximo": round(mean_val + 2 * std_dev_val, 2),
            "Mediana": round(random.uniform(mean_val - 0.5 * std_dev_val, mean_val + 0.5 * std_dev_val), 2)
        }
        # Corrected f-strings using single quotes for keys
        interpretation += f"A análise descritiva de {n_samples} amostras revela uma média de {numerical_results['Média']} com um desvio padrão de {numerical_results['Desvio Padrão']}. "
        interpretation += f"Os dados variam de {numerical_results['Mínimo']} a {numerical_results['Máximo']}."
        plots.append({"type": "histogram", "title": f"Histograma de {config.dependentVar or 'Variável'}"}) 
        plots.append({"type": "boxplot", "title": f"Boxplot de {config.dependentVar or 'Variável'}"})

    elif config.analysisType == "t_test":
        p_value = random.uniform(0.001, 0.2)
        t_stat = random.uniform(-3.5, 3.5)
        df_error = n_samples - n_groups
        numerical_results = {
            "Estatística t": round(t_stat, 3),
            "Graus de Liberdade": df_error,
            "Valor-p": round(p_value, 4),
            "Nível de Significância (α)": alpha
        }
        interpretation += f"O teste t foi realizado para comparar as médias (variável: {config.dependentVar}, grupo: {config.groupingVar}). "
        interpretation += f"Com um valor-p de {p_value:.4f} e α = {alpha}, "
        if p_value < alpha:
            interpretation += f"rejeitamos a hipótese nula (H0), sugerindo uma diferença estatisticamente significativa entre as médias dos grupos (t({df_error}) = {t_stat:.3f}, p < {alpha})."
        else:
            interpretation += f"não rejeitamos a hipótese nula (H0), indicando que não há evidência suficiente para afirmar uma diferença significativa entre as médias dos grupos (t({df_error}) = {t_stat:.3f}, p = {p_value:.4f})."
        plots.append({"type": "boxplot", "title": f"Comparação de Grupos ({config.dependentVar} por {config.groupingVar})"})

    elif config.analysisType == "anova":
        p_value = random.uniform(0.001, 0.2)
        f_stat = random.uniform(0.5, 15.0)
        df_group = n_groups - 1
        df_error = n_samples - n_groups
        numerical_results = {
            "Estatística F": round(f_stat, 3),
            "Graus de Liberdade (Grupo)": df_group,
            "Graus de Liberdade (Erro)": df_error,
            "Valor-p": round(p_value, 4),
            "Nível de Significância (α)": alpha
        }
        interpretation += f"A ANOVA foi realizada para comparar as médias de {n_groups} grupos (variável: {config.dependentVar}, grupo: {config.groupingVar}). "
        interpretation += f"Com um valor-p de {p_value:.4f} e α = {alpha}, "
        if p_value < alpha:
            interpretation += f"rejeitamos a hipótese nula (H0), indicando que há uma diferença estatisticamente significativa entre as médias de pelo menos dois grupos (F({df_group}, {df_error}) = {f_stat:.3f}, p < {alpha}). Testes post-hoc (simulados) seriam necessários para identificar quais grupos diferem."
        else:
            interpretation += f"não rejeitamos a hipótese nula (H0), indicando que não há evidência suficiente para afirmar uma diferença significativa entre as médias dos grupos (F({df_group}, {df_error}) = {f_stat:.3f}, p = {p_value:.4f})."
        plots.append({"type": "boxplot", "title": f"Comparação ANOVA ({config.dependentVar} por {config.groupingVar})"})

    elif config.analysisType.startswith("lin_reg"):
        is_multiple = config.analysisType == "lin_reg_multi"
        num_predictors = len(config.independentVars) if config.independentVars else 1
        r_squared = random.uniform(0.3, 0.9)
        adj_r_squared = r_squared * (1 - random.uniform(0.01, 0.05) * num_predictors)
        coeffs = {f"{var}": round(random.uniform(-2, 2), 3) for var in (config.independentVars or ["var_indep"])}
        coeffs["(Intercepto)"] = round(random.uniform(1, 20), 3)
        f_stat_reg = random.uniform(5, 50)
        p_value_reg = random.uniform(0.0001, 0.05)
        numerical_results = {
            "R²": round(r_squared, 3),
            "R² Ajustado": round(adj_r_squared, 3),
            "Coeficientes": coeffs,
            "Estatística F (Modelo)": round(f_stat_reg, 2),
            "Valor-p (Modelo)": round(p_value_reg, 5)
        }
        interpretation += f"Foi ajustado um modelo de regressão linear {'múltipla' if is_multiple else 'simples'} para prever {config.dependentVar} usando {num_predictors} preditor(es). "
        interpretation += f"O modelo explica aproximadamente {r_squared*100:.1f}% da variância na variável dependente (R² = {r_squared:.3f}). "
        interpretation += f"O modelo geral é estatisticamente significativo (F = {f_stat_reg:.2f}, p < 0.001). Os coeficientes indicam a relação estimada entre cada preditor e a variável dependente."
        plots.append({"type": "scatterplot", "title": f"Regressão: {config.dependentVar} vs Preditor(es)"})
        plots.append({"type": "residual_plot", "title": "Análise de Resíduos (Simulada)"})

    elif config.analysisType == "doe":
        numerical_results = {"Fator A (p-valor)": random.uniform(0.001, 0.1), "Fator B (p-valor)": random.uniform(0.01, 0.3), "Interação AB (p-valor)": random.uniform(0.1, 0.5)}
        interpretation += "A análise do Desenho de Experimentos (DOE) simulado indica os efeitos principais e de interação dos fatores investigados. "
        # Corrected f-strings using single quotes for keys
        interpretation += f"O Fator A parece ter um efeito significativo (p={numerical_results['Fator A (p-valor)']:.3f}), enquanto o Fator B (p={numerical_results['Fator B (p-valor)']:.3f}) e a interação AB (p={numerical_results['Interação AB (p-valor)']:.3f}) não mostraram significância neste nível alfa simulado."
        plots.append({"type": "main_effects_plot", "title": "Gráfico de Efeitos Principais (Simulado)"})
        plots.append({"type": "interaction_plot", "title": "Gráfico de Interação (Simulado)"})

    elif config.analysisType == "spc":
        cpk = random.uniform(0.5, 1.8)
        out_of_control = random.choice([True, False, False]) # Higher chance of being in control
        numerical_results = {"Cp": round(cpk * random.uniform(0.95, 1.05), 2), "Cpk": round(cpk, 2), "Pontos Fora de Controle": random.randint(0, 3) if out_of_control else 0}
        interpretation += "A análise de Controle Estatístico de Processo (CEP) simulada avaliou a estabilidade e capacidade do processo. "
        interpretation += f"O índice de capacidade Cpk estimado é {cpk:.2f}. "
        if out_of_control:
            # Corrected f-string using single quotes for key
            interpretation += f"Foram detectados {numerical_results['Pontos Fora de Controle']} pontos fora dos limites de controle, sugerindo que o processo pode estar instável e requer investigação."
        else:
            interpretation += "O processo parece estar estatisticamente sob controle."
        plots.append({"type": "control_chart_xbar", "title": "Carta de Controle X-barra (Simulada)"})
        plots.append({"type": "control_chart_r", "title": "Carta de Controle R (Simulada)"})
        plots.append({"type": "capability_histogram", "title": "Histograma de Capacidade (Simulado)"})

    else:
        interpretation += "Tipo de análise não reconhecido ou ainda não implementado na simulação detalhada."
        numerical_results = {"info": "Simulação não disponível para este tipo."} 

    return numerical_results, interpretation, plots

# --- FastAPI App Setup ---

app = FastAPI(
    title="CrossDebate Engenharia API",
    description="Backend para a plataforma CrossDebate adaptada para Engenharia, simulando análise estatística multi-agente.",
    version="0.1.2" # Incremented version
)

# Configure CORS
origins = [
    "http://localhost:5173", # Default React dev server port
    "http://localhost:3000", # Common alternative React dev port
    # Add deployed frontend URL if applicable
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for uploaded data (replace with proper storage if needed)
uploaded_data_store = {}

@app.post("/upload-data/", response_model=dict)
async def upload_data(file: UploadFile = File(...)):
    """Recebe um arquivo CSV, faz uma leitura básica e armazena temporariamente."""
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Formato de arquivo inválido. Apenas CSV é suportado.")

    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        
        if df.empty:
             raise HTTPException(status_code=400, detail="Arquivo CSV está vazio.")
        if len(df.columns) < 1:
             raise HTTPException(status_code=400, detail="Arquivo CSV não contém colunas válidas.")

        file_id = f"data_{int(time.time())}_{random.randint(100, 999)}.csv" # More unique ID
        uploaded_data_store[file_id] = df
        
        headers = df.columns.tolist()
        preview = df.head(10).to_dict(orient="records")
        
        return {
            "message": f"Arquivo '{file.filename}' carregado com sucesso.",
            "file_id": file_id,
            "headers": headers,
            "preview": preview,
            "rows_count": len(df)
        }
    except pd.errors.ParserError as e:
        raise HTTPException(status_code=400, detail=f"Erro ao parsear CSV: {e}")
    except Exception as e:
        # Log the full error for debugging
        print(f"Erro inesperado no upload: {e}") 
        raise HTTPException(status_code=500, detail=f"Erro inesperado ao processar o arquivo.")

@app.post("/analyze/", response_model=AnalysisResult)
async def run_analysis(config: AnalysisConfig):
    """Recebe a configuração da análise e simula a execução multi-agente."""
    print(f"Recebida configuração para análise: {config.analysisType}")
    
    # Simulate processing time based on complexity
    delay = random.uniform(1, 3)
    if config.workflowComplexity == 'complex':
        delay += random.uniform(1, 2)
    if config.modelQuantization == 'q8':
        delay += random.uniform(0.5, 1.5)
    await asyncio.sleep(delay)

    # Simulate CL/CompL metrics
    cl_compL_metrics = simulate_cl_compl(config)

    # Simulate analysis results
    try:
        numerical_results, interpretation, plots = simulate_analysis_results(config)
    except Exception as e:
        print(f"Erro durante a simulação da análise {config.analysisType}: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao simular a análise {config.analysisType}.")

    return AnalysisResult(
        status="completed",
        message=f"Análise simulada ({config.analysisType}) concluída.",
        numerical_results=numerical_results,
        interpretation=interpretation,
        plots=plots,
        cl_compL_metrics=cl_compL_metrics
    )

# Basic root endpoint for testing
@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API CrossDebate Engenharia v0.1.2"}

# To run the server (from the backend directory):
# uvicorn main:app --reload --port 8000

