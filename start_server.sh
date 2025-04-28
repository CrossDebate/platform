#!/bin/bash

echo "Iniciando servidor local para CrossDebate..."

# Verificar se é um projeto Node.js
if [ -f "package.json" ]; then
    echo "Projeto Node.js detectado"
    if grep -q "\"start\":" "package.json"; then
        echo "Iniciando com npm start..."
        npm start
    elif [ -f "server.js" ]; then
        echo "Iniciando com node server.js..."
        node server.js
    else
        echo "Iniciando com npm run dev..."
        npm run dev
    fi

# Verificar se é um projeto Python/Django
elif [ -f "manage.py" ]; then
    echo "Projeto Django detectado"
    echo "Iniciando com python manage.py runserver..."
    python manage.py runserver

# Verificar se é um projeto Flask
elif [ -f "app.py" ] || [ -f "main.py" ]; then
    echo "Projeto Flask detectado"
    if [ -f "app.py" ]; then
        echo "Iniciando com flask run..."
        export FLASK_APP=app.py
        flask run
    else
        echo "Iniciando com python main.py..."
        python main.py
    fi

# Outras opções comuns
else
    echo "Tipo de projeto não detectado automaticamente"
    echo "Por favor escolha uma opção:"
    echo "1) npm start (Node.js/React)"
    echo "2) python manage.py runserver (Django)"
    echo "3) flask run (Flask)"
    read -p "Opção: " opcao
    
    case $opcao in
        1) npm start ;;
        2) python manage.py runserver ;;
        3) export FLASK_APP=app.py && flask run ;;
        *) echo "Opção inválida" ;;
    esac
fi

echo "Servidor iniciado. Acesse http://localhost:8000 no Chrome."
