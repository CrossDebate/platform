import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse'; // Using papaparse for robust CSV parsing

interface DataManagerProps {
  onDataLoaded: (data: any[], fileName: string) => void;
}

// Sample data for testing (based on sample_data.csv)
const sampleCsvData = `Tempo,Temperatura,Pressao,Vibracao
0,25.1,101.3,0.1
1,25.3,101.4,0.12
2,25.2,101.3,0.11
3,25.5,101.5,0.15
4,25.6,101.5,0.16
5,25.4,101.4,0.13
6,25.7,101.6,0.18
7,25.8,101.6,0.19
8,25.6,101.5,0.17
9,25.9,101.7,0.2
10,26.1,101.8,0.22
11,26.0,101.7,0.21
12,26.2,101.9,0.24
13,26.3,101.9,0.25
14,26.1,101.8,0.23`;

const DataManager: React.FC<DataManagerProps> = ({ onDataLoaded }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length === 0) {
      setError("Nenhum arquivo selecionado.");
      return;
    }
    const file = acceptedFiles[0];

    if (file.type !== 'text/csv') {
      setError("Formato de arquivo inválido. Apenas CSV é suportado.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true, // Automatically convert numbers
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error("Erros ao parsear CSV:", results.errors);
          setError(`Erro ao ler o arquivo CSV: ${results.errors[0].message}`);
        } else if (!results.data || results.data.length === 0) {
          setError("Arquivo CSV está vazio ou não contém dados válidos.");
        } else {
          console.log("CSV Parseado:", results.data);
          onDataLoaded(results.data as any[], file.name);
        }
      },
      error: (err) => {
        console.error("Erro no PapaParse:", err);
        setError(`Erro ao processar o arquivo CSV: ${err.message}`);
      }
    });

  }, [onDataLoaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'text/csv': ['.csv'] },
    multiple: false
  });

  // Function to load sample data
  const loadSampleData = () => {
    setError(null);
    Papa.parse(sampleCsvData, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError("Erro ao parsear dados de amostra.");
        } else {
          onDataLoaded(results.data as any[], "sample_data.csv");
        }
      },
      error: (err) => {
        setError(`Erro ao processar dados de amostra: ${err.message}`);
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4">Gerenciamento de Dados</h3>
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p className="text-blue-600">Solte o arquivo CSV aqui ...</p> :
            <p className="text-gray-500">Arraste e solte um arquivo CSV aqui, ou clique para selecionar.</p>
        }
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      
      {/* Botão para carregar dados de amostra */}      
      <div className="mt-4 text-center">
        <button 
          onClick={loadSampleData}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded text-sm"
        >
          Carregar Dados de Amostra (sample_data.csv)
        </button>
      </div>
    </div>
  );
};

export default DataManager;
