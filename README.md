# 🛡️ Simulador Agêntico de Riscos Financeiros & Data Science

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

```
[ Mundo 1: SQL Bancário ] ──┐
   (12 Desafios + Mini-Boss) │
                             ├──► [ Mundo 3: Bug Hunt ] ──► [ Mundo 4: Boss Final ]
[ Mundo 2: Python Quant ] ──┤    (6 Auditorias de Código)    (Comitê Executivo - 4 Atos)
   (12 Desafios + Mini-Boss) │                                (Requer: ≥1.800 XP + 8 SQL + 8 Py)
                             ┘
```

1. **Mundo 1: Terminal Transacional (SQL Bancário)**
   - Extração analítica, cálculo de safras (*vintages*), deduplicação de renegociações, *Window Functions* (`LAG`, `LEAD`, partições) e segmentação de atraso (*DPD 30+, 60+, 90+*).
   - **Mini-Boss:** *"O DBA Impiedoso"* (Query de alta performance e agregação sem produto cartesiano).
2. **Mundo 2: Laboratório Algorítmico (Python & Modelagem)**
   - Tratamento de variáveis, *Weight of Evidence* (WOE), *Information Value* (IV), regressão logística, explicabilidade com *Odds Ratio* e métricas regulatórias (**AUC-ROC, KS - Kolmogorov-Smirnov, PSI e Brier Score**).
   - **Mini-Boss:** *"O Tech Lead Cético"* (Defesa de hiperparâmetros e estabilidade temporal do modelo).
3. **Mundo 3: Câmara de Auditoria Forense (Caça ao Bug - Code Review)**
   - Resolução de falhas silenciosas críticas comuns em produção: *Target Leakage* (`fit_transform` antes do split), viés amostral (*sampling bias*), vazamento temporal e violações de *compliance* do BACEN.
4. **Mundo 4: Sala do Conselho Executivo (Boss Final - Comitê de Riscos)**
   - Desafio integrador em **4 Atos**: Diagnóstico da carteira, recalibração de modelo, impacto em Perda Esperada ($EL = PD \times LGD \times EAD$) e **Mecânica da Pergunta Invertida**.

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

```
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
```

1. **SQL Financeiro (Safras & Atrasos):** Consultas analíticas, agregações complexas e tratamento de coortes.
2. **Regressão Logística & Odds Ratio:** Modelos de probabilidade de default padrão BACEN e explicabilidade de risco.
3. **Métricas de Validação (AUC-ROC & KS):** Poder de separação estatística entre adimplentes e inadimplentes.
4. **Visão de Negócio & Projeções:** Perda Esperada ($PD \times LGD \times EAD$), provisão de balanço (PDD) e sensibilidade à taxa Selic.
5. **Comunicação Executiva:** Capacidade de traduzir números em impacto financeiro no formato estruturado (Método STAR).

---

## ⚙️ Resiliência & Motor Híbrido (Dual-Engine)

A aplicação foi projetada com arquitetura de **Degradação Graciosa (*Graceful Degradation*)**:

* **Modo Online (Com chave Gemini API):** Os agentes utilizam o modelo `gemini-3.8-flash` para avaliações e sabatinas generativas com nuance conversacional livre.
* **Modo Offline Resiliente (Sem chave / Sem internet):** O servidor ativa automaticamente o **Motor Avaliador Determinístico Local**, auditando comandos sintáticos, termos regulatórios do BACEN, calculando o score e liberando XP sem qualquer dependência externa.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* Git

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ViniciusDDev/simuladorderiscos.git
   cd simuladorderiscos
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```
   *(Caso ocorra algum conflito de pacotes no seu ambiente Windows/UCRT64, utilize `npm install --legacy-peer-deps`)*

3. **Configure as Variáveis de Ambiente (Opcional):**
   Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```
   Se desejar habilitar os agentes generativos com a nuvem, insira sua chave da API do Google AI Studio no arquivo `.env`:
   ```env
   GEMINI_API_KEY="sua_chave_aqui"
   ```
   > *Nota: O simulador funciona 100% mesmo sem chave de API, utilizando o motor determinístico local.*

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   Abra seu navegador em [http://localhost:3000](http://localhost:3000).

---

## 📂 Estrutura do Repositório

```plaintext
├── src/
│   ├── components/
│   │   ├── TitleScreen.tsx          # Tela de abertura arcade retro com efeito glow
│   │   ├── Header.tsx               # HUD superior limpo com dropdown de navegação
│   │   ├── WorldMap.tsx             # Mapa de mundos com estilização temática por área
│   │   ├── InterviewArena.tsx       # Arena de sabatina técnica com os agentes
│   │   ├── SqlSandbox.tsx           # Terminal interativo de execução SQL
│   │   ├── PythonModelingSandbox.tsx# Ambiente de modelagem estatística de crédito
│   │   ├── BugHuntArena.tsx         # Câmara de auditoria e resolução de bugs
│   │   ├── RpgCharacterSheet.tsx    # Relatório de Prontidão (Ficha Hire-Ready)
│   │   └── WarmupModal.tsx          # Aquecimento rápido de 3 minutos
│   ├── data/
│   │   └── challenges.ts            # Base estruturada dos 31 desafios e regras de XP
│   ├── App.tsx                      # Orquestrador de estado global e navegação
│   └── index.css                    # Design system Tailwind v4 e animações de iluminação
├── server.ts                        # Servidor Express com API multiagente e motor offline
├── package.json                     # Dependências e scripts de execução
└── README.md                        # Documentação do projeto
```

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
* **Back-end:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [TSX](https://github.com/privatenumber/tsx)
* **Inteligência Artificial:** [@google/genai SDK](https://www.npmjs.com/package/@google/genai) com `gemini-3.8-flash`
* **Arquitetura de Dados:** SQLite in-memory para validação de queries analíticas locais

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE) — sinta-se livre para utilizar, modificar e contribuir!

---

*Desenvolvido por [Vinícius Santana](https://github.com/ViniciusDDev) como demonstração de engenharia de software na era da IA aplicada ao setor financeiro.*
