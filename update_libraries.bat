@echo off
echo Atualizando bibliotecas...
pip install --upgrade -r requirements.txt

if %ERRORLEVEL% EQU 0 (
  echo Todas as bibliotecas foram atualizadas com sucesso.
) else (
  echo Erro ao atualizar algumas bibliotecas. Verifique as mensagens acima.
)
pause
