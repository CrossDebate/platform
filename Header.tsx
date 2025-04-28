import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">CrossDebate</h1>
        <p className="text-lg">Orquestrador de Ajuste Fino Multi-Agente</p>
        <nav className="mt-4">
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:underline">Início</a></li>
            <li><a href="#configuracao-quantizacao" className="hover:underline">Configuração de Quantização</a></li>
            <li><a href="#fluxos-trabalho" className="hover:underline">Fluxos de Trabalho</a></li>
            <li><a href="#monitoramento" className="hover:underline">Monitoramento</a></li>
            <li><a href="#ajuste-fino" className="hover:underline">Ajuste Fino</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
