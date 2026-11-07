# 🏦 Simulador Agêntico de Entrevistas: Data Science em Riscos

Agente inteligente de preparação técnica construído com o **Google ADK (Python)** e arquitetura de skills para candidatos a vagas de **Data Scientist I / Analista de Dados no setor de Riscos Financeiros e Projeções** (inspirado no perfil de bancos como o Bradesco).

O agente atua como um Tech Lead e recrutador, oferecendo trilhas separadas de **SQL** e **Python**, testes rápidos de aquecimento, desafios de **Caça ao Bug**, eventos regulatórios do **BACEN** e sabatinas com **Pergunta Invertida**. O progresso é registrado localmente com o **EnvironmentToolset**.

---

## 🛠️ Pré-requisitos

- Python 3.10 ou superior
- Gerenciador de pacotes [`uv`](https://docs.astral.sh/uv/)
- Chave de API do Google AI Studio ([aistudio.google.com/apikey](https://aistudio.google.com/apikey))

---

## 🚀 Instalação e Execução

### 1. Clonar e sincronizar ambiente

```bash
git clone https://github.com/ViniciusDDev/simuladorderiscos.git
cd simuladorderiscos

# Instalar dependências
uv sync
```

### 2. Configurar variáveis de ambiente

Crie o arquivo `.env` na raiz do agente (`agente-entrevista-risco/.env`):

```env
GOOGLE_GENAI_USE_VERTEXAI=FALSE
GEMINI_API_KEY=sua_chave_aqui
MODEL=gemini-2.5-flash
```

### 3. Executar o agente no ADK Web

```bash
uv run adk web --allow_origins="*"
```

Acesse a interface web indicada no terminal (geralmente `http://127.0.0.1:8000`) e selecione o agente `app`.

---

## 🎮 Modos de Treino e Gamificação

### ⚡ Modo Aquecimento Rápido (*Daily Warm-up*)
Sessão de 3 minutos com 3 perguntas conceituais diretas (ex: *Qual o valor do KS se o modelo não discriminar inadimplentes?* / *Por que usar mediana para renda?*). Ideal para treinar em intervalos curtos.

### 🗄️ Mundo 1: Especialização em SQL Bancário
Domínio das consultas de onde os dados bancários "nascem":
- Filtros de carteiras ativas e contratos de crédito;
- `JOINs` complexos entre tabelas de clientes, faturas e garantias;
- Agrupamento por safras (*cohorts*) e criação de flags de atraso (D-30, D-60, D-90).

### 🐍 Mundo 2: Especialização em Python & Modelagem de Risco
Tratamento e inteligência analítica com Pandas e Scikit-Learn:
- Limpeza de dados nulos e tratamento de outliers;
- Treinamento e interpretabilidade de **Regressão Logística** (*Odds Ratio* e coeficientes);
- Métricas regulatórias de crédito: **AUC-ROC**, índice **KS** e Matriz de Confusão;
- ⚠️ **Evento Surpresa do BACEN:** Ordens regulatórias para remover variáveis sensíveis por risco de viés, exigindo readequação do modelo.

### 🐛 Desafio "Caça ao Bug" (*Code Review*)
O agente apresenta um código pronto contendo um erro silencioso clássico para você depurar:
- *Em SQL:* Produto cartesiano que duplica o saldo de empréstimos;
- *Em Python:* Vazamento de dados (*Data Leakage*) ao aplicar transformações antes da separação entre treino e teste.

### 🏆 O Boss Final: Comitê Executivo de Risco & "Pergunta Invertida"
Simulação completa de entrevista:
1. Fit comportamental de abertura;
2. Desafio prático de modelagem ao vivo;
3. Defesa executiva das métricas para a diretoria;
4. **Mecânica da Pergunta Invertida:** O avaliador diz: *"Agora você tem a palavra: faça 2 perguntas para nós"*. O agente avalia a maturidade das suas perguntas sobre o dia a dia da área de risco.

---

## 🧪 Exemplos de Teste no ADK Web

### Teste A: Disparo do Aquecimento Rápido
```text
Quero fazer o Aquecimento Rápido. Meu nível é iniciante e quero um entrevistador Equilibrado.
```
* **Resultado:** O agente faz 3 perguntas teóricas curtas e dá nota imediata.

### Teste B: Caça ao Bug (Code Review)
```text
Quero jogar o modo Caça ao Bug em Python. Já sei o básico de Pandas. Entrevistador Impiedoso e sem dicas.
```
* **Resultado:** O agente envia um trecho de código com erro clássico de modelagem e pede que você aponte onde está a falha e como corrigi-la.

### Teste C: Verificação de Arquivos Salvos
Após concluir um desafio ou sabatina, verifique o arquivo gerado:
```bash
cat progresso/ficha-desempenho.md
```

---

## 🔒 Segurança

- O agente utiliza exclusivamente `ReadFile` e `WriteFile` restritos à pasta `progresso/`.
- Execuções de comandos de terminal (`Execute`) estão desabilitadas.
- Chaves de API e arquivos de progresso estão protegidos no `.gitignore`.
