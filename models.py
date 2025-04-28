from pydantic import BaseModel
from typing import List, Optional, Literal

class AnalysisConfig(BaseModel):
    analysisType: str
    dependentVar: Optional[str] = None
    independentVars: Optional[List[str]] = None
    groupingVar: Optional[str] = None
    alpha: Optional[float] = 0.05
    modelQuantization: Literal["q4", "q8", "mix"]
    workflowComplexity: Literal["simple", "complex"]
    # We might add raw data or file reference later
    # data: List[dict] # Or reference to uploaded data

class AnalysisResult(BaseModel):
    status: str
    message: Optional[str] = None
    numerical_results: Optional[dict] = None
    interpretation: Optional[str] = None
    plots: Optional[List[dict]] = None # e.g., {type: 'boxplot', data: {...}}
    cl_compL_metrics: Optional[dict] = None # Simulated metrics

