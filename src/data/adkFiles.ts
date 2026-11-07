export interface AdkFile {
  name: string;
  path: string;
  category: 'core' | 'skill' | 'reference' | 'asset' | 'local';
  description: string;
  content: string;
}

export const ADK_PROJECT_FILES: AdkFile[] = [
  {
    name: 'README.md',
    path: 'README.md',
    category: 'core',
    description: 'Documentação oficial completa do projeto para o GitHub e execução local.',
    content: `# 🛡️ Simulador Agêntico de Riscos Financeiros & Data Science

> **Plataforma gamificada full-stack com arquitetura multiagente para simulação de cenários reais de Risco de Crédito, Modelagem Preditiva bancária (BACEN/IFRS 9) e Auditoria de Código.**

[![React 19](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js / Express](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green?logo=node.js)](https://nodejs.org/)
[![Google Gemini API](https://img.shields.io/badge/AI-Gemini%203.8%20Flash-orange?logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 Sobre o Projeto

O **Simulador Agêntico de Riscos Financeiros** é uma aplicação interativa concebida para transpor o abismo entre o aprendizado acadêmico/teórico de Ciência de Dados e as exigências reais de uma mesa de **Risco de Crédito e Ferramentas de Projeções** de instituições financeiras (como Bradesco, Itaú, Nubank e cooperativas de crédito).

Em vez de notebooks estáticos com dados sintéticos genéricos, a aplicação coloca o usuário em uma jornada imersiva com **31 desafios estruturados**, submetidos à avaliação em tempo real por agentes especializados de inteligência artificial.

---

## 🗺️ Os 4 Mundos & Progressão de Carreira

A plataforma adota um sistema de progressão por XP e comprovação de proficiência mínima para desbloqueio:

\`\`\`
[ Mundo 1: SQL Bancário ] ──┐
   (12 Desafios + Mini-Boss) │
                             ├──► [ Mundo 3: Bug Hunt ] ──► [ Mundo 4: Boss Final ]
[ Mundo 2: Python Quant ] ──┤    (6 Auditorias de Código)    (Comitê Executivo - 4 Atos)
   (12 Desafios + Mini-Boss) │                                (Requer: ≥1.800 XP + 8 SQL + 8 Py)
                             ┘
\`\`\`

1. **Mundo 1: Terminal Transacional (SQL Bancário)**
   - Extração analítica, cálculo de safras (*vintages*), deduplicação de renegociações, *Window Functions* (\`LAG\`, \`LEAD\`, partições) e segmentação de atraso (*DPD 30+, 60+, 90+*).
   - **Mini-Boss:** *"O DBA Impiedoso"* (Query de alta performance e agregação sem produto cartesiano).
2. **Mundo 2: Laboratório Algorítmico (Python & Modelagem)**
   - Tratamento de variáveis, *Weight of Evidence* (WOE), *Information Value* (IV), regressão logística, explicabilidade com *Odds Ratio* e métricas regulatórias (**AUC-ROC, KS - Kolmogorov-Smirnov, PSI e Brier Score**).
   - **Mini-Boss:** *"O Tech Lead Cético"* (Defesa de hiperparâmetros e estabilidade temporal do modelo).
3. **Mundo 3: Câmara de Auditoria Forense (Caça ao Bug - Code Review)**
   - Resolução de falhas silenciosas críticas comuns em produção: *Target Leakage* (\`fit_transform\` antes do split), viés amostral (*sampling bias*), vazamento temporal e violações de *compliance* do BACEN.
4. **Mundo 4: Sala do Conselho Executivo (Boss Final - Comitê de Riscos)**
   - Desafio integrador em **4 Atos**: Diagnóstico da carteira, recalibração de modelo, impacto em Perda Esperada ($EL = PD \\times LGD \\times EAD$) e **Mecânica da Pergunta Invertida**.

---

## 🤖 Arquitetura Multiagente

A plataforma implementa um ecossistema com **4 papéis agênticos especializados**, orquestrados através de *system instructions* e *guardrails* rigorosos:

| Agente | Papel e Comportamento |
| :--- | :--- |
| **Agente Entrevistador** | Conduz a sabatina com 3 personas selecionáveis: *Tech Lead Cético/Impiedoso* (focado em matemática e BACEN), *Entrevistador Corporativo* (formal e incisivo) e *Mentor Amigável* (método socrático). |
| **Agente Juiz / Avaliador** | Inspeciona a resposta/código do usuário, verifica alertas regulatórios, concede XP, atribui notas (0 a 100) e alimenta o **Radar de 5 Dimensões**. |
| **Agente Mentor Sênior** | Oferece *scaffolding* pedagógico adaptativo em **3 níveis progressivos**: Nível 1 (Conceitual), Nível 2 (Estrutural/Sintaxe) e Nível 3 (Resolução Comentada). |
| **Agente do Comitê (Boss Final)** | Avalia a maturidade técnica e visão de negócio das perguntas formuladas pelo próprio candidato (**Mecânica da Pergunta Invertida**). |

---

## 📊 Radar de Prontidão de Mercado (5 Dimensões)

O progresso é consolidado em uma **Ficha de Personagem / Relatório Hire-Ready**, auditando 5 competências fundamentais:

\`\`\`
                    [1] SQL Financeiro & Safras
                                ▲
                                │
   [5] Comunicação ◄──────────┼──────────► [2] Regressão Logística
       Executiva               │               & Odds Ratio
                               ▼
            [4] Visão de Negócio & P&L
                 (PD, LGD, EAD, BACEN)
                               ▲
                               │
            [3] Métricas de Validação (AUC & KS)
\`\`\`

1. **SQL Financeiro (Safras & Atrasos):** Consultas analíticas, agregações complexas e tratamento de coortes.
2. **Regressão Logística & Odds Ratio:** Modelos de probabilidade de default padrão BACEN e explicabilidade de risco.
3. **Métricas de Validação (AUC-ROC & KS):** Poder de separação estatística entre adimplentes e inadimplentes.
4. **Visão de Negócio & Projeções:** Perda Esperada ($PD \\times LGD \\times EAD$), provisão de balanço (PDD) e sensibilidade à taxa Selic.
5. **Comunicação Executiva:** Capacidade de traduzir números em impacto financeiro no formato estruturado (Método STAR).

---

## ⚙️ Resiliência & Motor Híbrido (Dual-Engine)

A aplicação foi projetada com arquitetura de **Degradação Graciosa (*Graceful Degradation*)**:

* **Modo Online (Com chave Gemini API):** Os agentes utilizam o modelo \`gemini-3.8-flash\` para avaliações e sabatinas generativas com nuance conversacional livre.
* **Modo Offline Resiliente (Sem chave / Sem internet):** O servidor ativa automaticamente o **Motor Avaliador Determinístico Local**, auditando comandos sintáticos, termos regulatórios do BACEN, calculando o score e liberando XP sem qualquer dependência externa.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* Git

### Passo a Passo

1. **Clone o repositório:**
   \`\`\`bash
   git clone https://github.com/ViniciusDDev/simuladorderiscos.git
   cd simuladorderiscos
   \`\`\`

2. **Instale as dependências:**
   \`\`\`bash
   npm install
   \`\`\`
   *(Caso ocorra algum conflito de pacotes no seu ambiente Windows/UCRT64, utilize \`npm install --legacy-peer-deps\`)*

3. **Configure as Variáveis de Ambiente (Opcional):**
   Copie o arquivo de exemplo:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Se desejar habilitar os agentes generativos com a nuvem, insira sua chave da API do Google AI Studio no arquivo \`.env\`:
   \`\`\`env
   GEMINI_API_KEY="sua_chave_aqui"
   \`\`\`
   > *Nota: O simulador funciona 100% mesmo sem chave de API, utilizando o motor determinístico local.*

4. **Inicie o servidor de desenvolvimento:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Acesse a aplicação:**
   Abra seu navegador em [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
* **Back-end:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [TSX](https://github.com/privatenumber/tsx)
* **Inteligência Artificial:** [@google/genai SDK](https://www.npmjs.com/package/@google/genai) com \`gemini-3.8-flash\`
* **Arquitetura de Dados:** SQLite in-memory para validação de queries analíticas locais

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE) — sinta-se livre para utilizar, modificar e contribuir!

---

*Desenvolvido por [Vinícius Santana](https://github.com/ViniciusDDev) como demonstração de engenharia de software na era da IA aplicada ao setor financeiro.*`,
  },
  {
    name: 'AGENTS.md',
    path: 'meu-projeto/AGENTS.md',
    category: 'core',
    description: 'Declaração e regras de arquitetura do agente Google ADK.',
    content: `# AGENTS.md: Agente de Treinamento Técnico para Riscos Financeiros

## Goal

Construir o **\`agente-entrevista-risco\`**: um agente **Google ADK** (Python) movido a skills, desenhado para preparar candidatos para vagas de **Data Scientist I / Analista de Riscos Financeiros**. O agente oferece progressão gamificada dividida em ferramentas principais (**Mundo 1: SQL com 12 desafios** e **Mundo 2: Python com 12 desafios**), módulos de **Caça ao Bug (6 desafios de Code Review)**, **Aquecimento Diário (3 min)**, intervenções regulatórias do **BACEN** e sabatinas com a mecânica da **Pergunta Invertida**. O agente salva relatórios e fichas de atributos via **EnvironmentToolset** do ADK.

## Context

* **Quem é você:** um Tech Lead e Engenheiro de Software especialista em IA e Riscos Bancários, fazendo pair programming com quem está aprendendo a programar e se preparando para processos seletivos. Explique **o que** está fazendo e **por quê**, em português do Brasil, de forma didática, assertiva e encorajadora.
* **Ambiente:** Google Cloud Shell ou máquina local. O projeto do agente fica em \`./agente-entrevista-risco/\`, seguindo convenções do **agents-cli**.
* **Skills do ADK** ([adk.dev/skills](https://adk.dev/skills/)): carregadas via \`load_skill_from_dir\` e expostas pelo \`SkillToolset\`:
  * **L1:** \`name\` e \`description\` no frontmatter do \`SKILL.md\`.
  * **L2:** o corpo do \`SKILL.md\`, contendo a regra estrita de ativação (gating).
  * **L3:** \`references/workflow.md\`, \`references/rubricas_riscos.md\`, \`references/eventos_bacen.md\`, \`assets/desafios_sql.md\`, \`assets/desafios_python.md\`, \`assets/caca_ao_bug.md\` e \`assets/warmup_perguntas.md\`.
* **EnvironmentToolset** ([adk.dev/integrations/environment-toolset](https://adk.dev/integrations/environment-toolset/)): ferramentas de arquivo (\`ReadFile\`, \`WriteFile\`) operando em \`agente-entrevista-risco/progresso/\` para salvar fichas de desempenho (\`ficha-desempenho.md\`) e resumos de soluções para portfólio.
* **Regra de gating:** sem **modo de jogo / mundo escolhido**, **bagagem atual**, **personalidade do entrevistador** e **modo de dicas**, o agente não carrega recursos L3 e apenas faz perguntas objetivas para coletar o que falta.
* **Autenticação:** API Key do Google AI Studio no arquivo \`.env\`:
  \`\`\`env
  GOOGLE_GENAI_USE_VERTEXAI=FALSE
  GEMINI_API_KEY=<sua-api-key>
  MODEL=gemini-2.5-flash
  \`\`\`

## Constraints

* **Framework:** use exclusivamente o **Google ADK** em Python, combinando \`load_skill_from_dir\` + \`SkillToolset\`.
* **Divulgação progressiva:** nunca injete o conteúdo de \`references/\` ou \`assets/\` na instrução inicial do agente. Deixe-o requisitar sob demanda via \`load_skill_resource\`.
* **Filtro de ferramentas:** restrinja o \`EnvironmentToolset\` apenas a \`ReadFile\` e \`WriteFile\` por meio de uma subclasse customizada.
* **Local das ferramentas:** aponte o \`working_dir\` do \`LocalEnvironment\` exclusivamente para a pasta \`agente-entrevista-risco/progresso/\`.
* **Modelo:** configurado dinamicamente via variável de ambiente \`MODEL\` (default: \`gemini-2.5-flash\`).
* **Rigor conceitual de risco:** exigir métricas próprias de concessão de crédito e risco (AUC-ROC, KS, Odds Ratio, sensibilidade, safras e matriz de confusão), rejeitando acurácia simples em bases desbalanceadas.`,
  },
  {
    name: 'SKILL.md',
    path: 'meu-projeto/skills/simulador-entrevista-riscos/SKILL.md',
    category: 'skill',
    description: 'Declaração da Skill e regras estritas de Gating.',
    content: `---
name: simulador-entrevista-riscos
description: Conduz simulações de entrevistas e desafios técnicos gamificados em Ciência de Dados para Riscos Bancários. Inclui Mundo 1 (12 Desafios SQL de Safras), Mundo 2 (12 Desafios Python & Regressão Logística), Desafio de Caça ao Bug (6 Desafios de Code Review), Eventos de Regulação do BACEN, Aquecimento Diário e Sabatina com Pergunta Invertida. Use quando o usuário quiser se preparar para entrevistas de bancos ou treinar código de dados.
---

# [IMPORTANTE] SIMULADOR TÉCNICO DE RISCOS & MODELAGEM BANCÁRIA

Esta skill transforma o estudo em uma trilha prática voltada para a aprovação em vagas como **Data Scientist I - Riscos Financeiros**. 

Antes de propor qualquer exercício ou pergunta, o agente precisa calibrar a sessão de treino com o usuário.

## Regra de Ativação (Gating Rule)

Verifique se a conversa já possui **todas** as informações obrigatórias abaixo:

| # | Informação obrigatória | Opções / Exemplos |
|---|---|---|
| 1 | **Modo ou Mundo escolhido** | "Aquecimento Rápido (3 min)", "Mundo 1 (12 SQL)", "Mundo 2 (12 Python)", "Caça ao Bug (6 Code Reviews)", "Boss Final" |
| 2 | **Bagagem atual** | "Lógica básica", "Sei Python básico mas nunca vi SQL", "Já conheço Pandas e quero treinar modelos" |
| 3 | **Personalidade do entrevistador** | "Amigável", "Equilibrado", "Impiedoso (Tech Lead exigente)" |
| 4 | **Senior Tokens (Dicas)** | "Ativado (dicas descontam XP)" ou "Desativado" |

* **Se faltar alguma informação:** **NÃO chame** \`load_skill_resource\`. Envie uma única mensagem, curta e encorajadora, listando apenas os pontos que faltam.
* **Se o usuário disser "você escolhe":** assuma *Mundo 1 (SQL)*, *Entrevistador Equilibrado* e *Senior Tokens Ativados*, declare essas premissas e inicie.`,
  },
  {
    name: 'desafios_sql.md',
    path: 'meu-projeto/skills/simulador-entrevista-riscos/assets/desafios_sql.md',
    category: 'asset',
    description: 'Catálogo completo dos 12 desafios práticos de SQL Bancário.',
    content: `# 🗄️ CATÁLOGO DE 12 DESAFIOS EM SQL BANCÁRIO

## Básico (1 a 4)
1. Filtro de Contratos Ativos
2. Agrupamento por Safra e Volume Total Concedido
3. Média de Taxa e Ticket Médio por Status
4. Categorização de Prazos e Faixas de Valor com CASE WHEN

## Intermediário (5 a 8)
5. Cruzamento Cadastral de Clientes e Contratos (INNER JOIN)
6. Identificação de Clientes Sem Contratos Ativos (LEFT JOIN)
7. Curva de Inadimplência Precoce por Safra (D-30)
8. Atraso Grave (D-90 / Default) por Faixa de Score Serasa

## Avançado (9 a 12)
9. Deduplicação de Renegociações via Window Function ROW_NUMBER()
10. Saldo Devedor Acumulado por Região Geográfica (SUM OVER)
11. Análise de Maturação de Safra (Mob - Month on Book)
12. Mini-Boss SQL: O DBA Impiedoso & Auditoria Forense`,
  },
  {
    name: 'desafios_python.md',
    path: 'meu-projeto/skills/simulador-entrevista-riscos/assets/desafios_python.md',
    category: 'asset',
    description: 'Catálogo completo dos 12 desafios de Python & Modelagem de Risco.',
    content: `# 🐍 CATÁLOGO DE 12 DESAFIOS EM PYTHON & MODELAGEM DE RISCO

## Básico (1 a 4)
1. Tratamento de Valores Nulos em Dados de Risco
2. Detecção e Tratamento de Outliers em Endividamento (IQR)
3. Análise Exploratória e Matriz de Correlação de Indicadores
4. Codificação de Variáveis Categóricas e Dummy Variables

## Intermediário (5 a 8)
5. Treinamento de Regressão Logística e Separação Treino/Teste
6. Interpretação de Coeficientes & Razão de Chances (Odds Ratio)
7. A Armadilha da Acurácia & Construção da Matriz de Confusão
8. Calibração de Ponto de Corte (Cut-off) por Matriz de Custos

## Avançado (9 a 12)
9. Cálculo da Métrica AUC-ROC e Curva de Discriminação
10. Implementação do Índice KS (Kolmogorov-Smirnov)
11. Diagnóstico de Multicolinearidade via VIF (Variance Inflation Factor)
12. Mini-Boss Python: O Tech Lead Cético + ⚠️ Alerta Regulatório do BACEN`,
  },
  {
    name: 'caca_ao_bug.md',
    path: 'meu-projeto/skills/simulador-entrevista-riscos/assets/caca_ao_bug.md',
    category: 'asset',
    description: 'Catálogo dos 6 casos de Code Review (3 SQL e 3 Python).',
    content: `# 🐛 CATÁLOGO DOS 6 CASOS DE CAÇA AO BUG (CODE REVIEW DE RISCO)

1. Bug 1 (SQL): O Produto Cartesiano Silencioso em Faturas
2. Bug 2 (SQL): A Divisão Inteira Fantasma que Zera o Atraso
3. Bug 3 (SQL): O Filtro WHERE que Destrói o LEFT JOIN
4. Bug 4 (Python): Data Leakage com StandardScaler antes do Split
5. Bug 5 (Python): Separação Treino/Teste sem Estratificação
6. Bug 6 (Python): A Inversão Desastrosa de Classes no Target`,
  },
  {
    name: 'eventos_bacen.md',
    path: 'meu-projeto/skills/simulador-entrevista-riscos/references/eventos_bacen.md',
    category: 'reference',
    description: 'Regras de compliance e intervenção regulatória do Banco Central.',
    content: `# PROTOCOLO DE EVENTOS SURPRESA DO BANCO CENTRAL (BACEN)

## Evento BACEN #1: Vetar Variáveis com Risco de Viés / Discriminação Indireta
* Remoção imediata da variável e reestimação dos coeficientes e do KS sem redlining.

## Evento BACEN #2: Estresse de Volatilidade de Mercado (Basileia III)
* Choque de estresse de +200 bps na Selic e recálculo da Perda Esperada (PE) e Provisão (PDD).`,
  },
  {
    name: 'agent.py',
    path: 'meu-projeto/app/agent.py',
    category: 'core',
    description: 'Código Python do agente Google ADK com ferramentas de arquivo seguras.',
    content: `"""
Agente de Entrevistas e Desafios de Riscos Financeiros (Google ADK)
"""
import os
from dotenv import load_dotenv
from google.adk import Agent
from google.adk.skills import load_skill_from_dir, SkillToolset
from google.adk.toolsets.environment import EnvironmentToolset, LocalEnvironment

load_dotenv()

class FerramentasDeArquivo(EnvironmentToolset):
    """Restringe ferramentas exclusivamente a leitura e escrita segura de arquivos."""
    async def get_tools(self, readonly_context=None):
        tools = await super().get_tools(readonly_context)
        return [t for t in tools if t.name in ("ReadFile", "WriteFile")]

os.makedirs("progresso", exist_ok=True)
env = LocalEnvironment(working_dir="progresso")

skill = load_skill_from_dir("skills/simulador-entrevista-riscos")

root_agent = Agent(
    model=os.getenv("MODEL", "gemini-2.5-flash"),
    system_instruction=(
        "Você é o Agente de Entrevistas Técnicas para vagas de Data Scientist I em Riscos Financeiros. "
        "Siga rigorosamente a regra de gating definida na sua skill antes de iniciar os testes."
    ),
    toolsets=[
        SkillToolset(skills=[skill]),
        FerramentasDeArquivo(environment=env)
    ]
)
`,
  },
  {
    name: 'ollama_local_guide.md',
    path: 'meu-projeto/ollama_local_guide.md',
    category: 'local',
    description: 'Guia passo a passo para rodar 100% local, offline e grátis com Ollama.',
    content: `# 🖥️ Como Rodar 100% Localmente (Sem Custos e Sem Tokens)

1. Baixe o Ollama em ollama.com
2. Execute no terminal:
   ollama run qwen2.5-coder:7b
3. Use o script com a biblioteca ollama em Python com custo zero permanente!`,
  },
];
