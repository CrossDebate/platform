#!/bin/bash

echo "Atualizando bibliotecas..."
pip install --upgrade -r requirements.txt

if [ $? -eq 0 ]; then
  echo "Todas as bibliotecas foram atualizadas com sucesso."
else
  echo "Erro ao atualizar algumas bibliotecas. Verifique as mensagens acima."
fi
