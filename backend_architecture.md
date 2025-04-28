# Arquitetura Backend FastAPI - Telemetria e Orquestração

## Componentes Principais

- **API FastAPI**: Exposição de endpoints REST para controle e consulta.
- **Gerenciador de Agentes**: Inicia, para e monitora agentes.
- **Módulo LSL**: Integração com sensores via Lab Streaming Layer.
- **Banco de Dados**: Persistência de dados de telemetria e logs.

## Fluxo de Dados

1. Usuário faz requisição à API (ex: iniciar agente).
2. FastAPI aciona o Gerenciador de Agentes.
3. Agente coleta dados dos sensores via LSL.
4. Dados são enviados para a API e armazenados no banco.
5. Usuário pode consultar telemetria em tempo real ou histórico.

## Endpoints Principais

- `POST /agents/start`: Inicia agente.
- `POST /agents/stop`: Para agente.
- `GET /agents/status`: Status dos agentes.
- `GET /telemetry/live`: Telemetria em tempo real.
- `GET /telemetry/history`: Histórico de telemetria.

## Integração LSL

- Utiliza biblioteca `pylsl` para leitura de streams.
- Dados são processados e enviados para a API.

## Protocolos de Comunicação entre Agentes

Para garantir interoperabilidade e clareza na comunicação entre agentes, os protocolos adotados devem ser padronizados e bem documentados.

### JSON-RPC

- Utilizado para chamadas remotas entre agentes e backend.
- Mensagens trocadas seguem o padrão JSON-RPC 2.0.

**Exemplo de requisição JSON-RPC:**
```json
{
  "jsonrpc": "2.0",
  "method": "start_agent",
  "params": {"agent_id": "abc123"},
  "id": 1
}
```

**Exemplo de resposta JSON-RPC:**
```json
{
  "jsonrpc": "2.0",
  "result": {"status": "started"},
  "id": 1
}
```

### ACP (Agent Communication Protocol)

- Protocolo customizado para mensagens assíncronas entre agentes.
- Estrutura baseada em JSON, com campos obrigatórios: `type`, `payload`, `timestamp`.

**Exemplo de mensagem ACP:**
```json
{
  "type": "telemetry_update",
  "payload": {
    "agent_id": "abc123",
    "metrics": {"hr": 72, "temp": 36.7}
  },
  "timestamp": "2024-06-01T12:00:00Z"
}
```

### Documentação

- Todos os métodos, parâmetros e formatos de mensagem devem ser documentados em repositório compartilhado.
- Alterações nos protocolos devem ser versionadas e comunicadas a todos os desenvolvedores.

## Banco de Dados

- Tabelas: `agents`, `telemetry`, `logs`.
- Sugestão: SQLite ou PostgreSQL.
- **Otimização de conexões**: Utilizar connection pooling para reduzir overhead de conexões.
- **Query optimization**: Implementar índices para colunas frequentemente consultadas (`agent_id`, `timestamp`).
- **Particionamento de dados**: Particionar tabela `telemetry` por períodos para consultas mais eficientes.

## Templates de Análise Estatística

Para padronizar análises e facilitar reuso, recomenda-se o uso de templates para análises estatísticas dos dados de telemetria.

**Exemplo de template de análise (JSON):**
```json
{
  "analysis_type": "correlation",
  "variables": ["hr", "temp"],
  "method": "pearson",
  "filters": {
    "agent_id": "abc123",
    "time_range": ["2024-06-01T00:00:00Z", "2024-06-01T23:59:59Z"]
  }
}
```

**Exemplo de template para análise de tendência:**
```json
{
  "analysis_type": "trend",
  "variable": "hr",
  "window_size": 10,
  "aggregation": "mean"
}
```

## Recomendações Automáticas de Modelos

O backend pode sugerir modelos estatísticos ou de machine learning com base nas características dos dados.

**Exemplo de resposta de recomendação automática:**
```json
{
  "recommended_models": [
    {
      "model": "ARIMA",
      "use_case": "previsão de séries temporais",
      "parameters": {"p": 2, "d": 1, "q": 2}
    },
    {
      "model": "RandomForest",
      "use_case": "classificação de eventos",
      "parameters": {"n_estimators": 100}
    }
  ]
}
```

- As recomendações podem ser baseadas em análise prévia dos dados (ex: estacionariedade, distribuição, volume).
- O endpoint sugerido para recomendações: `GET /models/recommendation?agent_id=abc123`.

## Segurança

- Autenticação via token JWT.
- CORS configurado para clientes autorizados.

## Validação

- Testes unitários para endpoints.
- Testes de integração com sensores LSL simulados.
- Monitoramento de logs e métricas.

## Otimização de Performance

### Lazy-Loading

- **Carregamento sob demanda de dados históricos**: Implementar paginação e lazy-loading para consultas de telemetria.
  ```python
  @app.get("/telemetry/history")
  async def get_telemetry(
      agent_id: str, 
      page: int = 0, 
      page_size: int = 100,
      start_date: Optional[datetime] = None
  ):
      offset = page * page_size
      return await db.get_telemetry(agent_id, limit=page_size, offset=offset, start_date=start_date)
  ```
- **Inicialização gradual de componentes**: Inicializar agentes e serviços apenas quando necessário.

### Virtualização de Dados

- **Janela deslizante para streaming de dados**: Manter apenas os dados mais recentes na memória.
  ```python
  class TelemetryBuffer:
      def __init__(self, max_size=1000):
          self.buffer = deque(maxlen=max_size)
          
      def add(self, data):
          self.buffer.append(data)
          
      def get_recent(self, n=100):
          return list(itertools.islice(self.buffer, max(0, len(self.buffer) - n), len(self.buffer)))
  ```
- **Streaming de respostas**: Usar FastAPI's `StreamingResponse` para dados volumosos.

### Memoização

- **Cache de consultas frequentes**: Implementar TTL cache para resultados de análises.
  ```python
  from functools import lru_cache
  
  @lru_cache(maxsize=128, ttl=300)  # Cache de 5 minutos
  async def get_agent_stats(agent_id: str):
      return await expensive_computation(agent_id)
  ```
- **Resultados intermediários**: Armazenar em cache resultados intermediários de processamento estatístico.

### Compressão de Dados

- **Compressão de payload**: Usar algoritmos como gzip para reduzir volume de dados em trânsito.
- **Serialização eficiente**: Considerar formatos binários como MessagePack para APIs de alto throughput.

### Monitoramento e Escalonamento Dinâmico

- **Métricas de performance**: Coletar métricas de CPU, memória e latência de cada componente.
- **Adaptação de recursos**: Ajustar limites de buffer e timeouts com base na carga observada.
- **Circuit breakers**: Implementar padrões de circuit breaker para evitar sobrecarga em cascata.
  ```python
  class CircuitBreaker:
      def __init__(self, failure_threshold=5, reset_timeout=30):
          self.failures = 0
          self.threshold = failure_threshold
          self.reset_timeout = reset_timeout
          self.state = "CLOSED"  # CLOSED, OPEN, HALF-OPEN
          self.last_failure_time = 0
          
      async def execute(self, func, *args, **kwargs):
          if self.state == "OPEN":
              if time.time() - self.last_failure_time > self.reset_timeout:
                  self.state = "HALF-OPEN"
              else:
                  raise Exception("Circuit breaker is open")
                  
          try:
              result = await func(*args, **kwargs)
              if self.state == "HALF-OPEN":
                  self.state = "CLOSED"
                  self.failures = 0
              return result
          except Exception as e:
              self.failures += 1
              self.last_failure_time = time.time()
              if self.failures >= self.threshold:
                  self.state = "OPEN"
              raise e
  ```

