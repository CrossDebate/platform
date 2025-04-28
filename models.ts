export interface AnalysisConfigData {
    analysisType: string;
    dependentVar?: string;
    independentVars?: string[];
    groupingVar?: string;
    alpha?: number;
    modelQuantization: "q4" | "q8" | "mix";
    workflowComplexity: "simple" | "complex";
}

export interface AnalysisResult {
    status: string;
    message?: string;
    numerical_results?: { [key: string]: any };
    interpretation?: string;
    plots?: { type: string; title?: string; data?: any }[]; // Added optional data for plots
    cl_compL_metrics?: { CompL_Estimate: number; CL_Estimate: number };
}

