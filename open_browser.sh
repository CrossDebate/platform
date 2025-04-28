#!/bin/bash

# Porta padrão
PORTA=8000

# Verificar se uma porta foi especificada como argumento
if [ $# -eq 1 ]; then
    PORTA=$1
fi

# Abrir o Chrome com o localhost na porta especificada
google-chrome http://localhost:$PORTA

echo "Chrome aberto com http://localhost:$PORTA"
