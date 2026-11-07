# Plano de Implementação: Simulador Agêntico de Entrevistas de Risco (12 SQL + 12 Python + 6 Caça ao Bug + Boss Final)

Plano arquitetural e curricular para expandir o **Simulador Agêntico de Riscos Financeiros & Data Science**, estruturando 12 desafios práticos de SQL, 12 desafios de Python/Modelagem, 6 desafios dedicados de Caça ao Bug (Code Review) e o confronto final com o Comitê em 4 atos com a mecânica da Pergunta Invertida.

---

## Decisões Confirmadas com o Usuário

> [!IMPORTANT]
> As seguintes escolhas de design e escopo foram confirmadas pelo usuário e guiam este plano:
> - **Progressão Didática:** 12 desafios de SQL e 12 desafios de Python divididos em 3 níveis graduais: **Básico (1-4)**, **Intermediário (5-8)** e **Avançado (9-12)**.
> - **Caça ao Bug (Code Review):** Uma aba própria e dedicada na barra superior para os **6 desafios de depuração** (3 bugs silenciosos em SQL e 3 em Python).
> - **Boss Final:** Estruturado em **4 Atos** (Fit Comportamental STAR, Live Problem Solving, Defesa de Risco/Projeções e a **Pergunta Invertida** com avaliação de maturidade).
> - **Modo Aquecimento:** Preservado como opção rápida de 3 minutos para treinos conceituais rápidos.

---

## 1. Visão Geral do Currículo Expandido

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 SIMULADOR AGÊNTICO DE RISCOS & DATA SCIENCE                 │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│  MUNDO 1: SQL    │          │ MUNDO 2: PYTHON  │          │   CAÇA AO BUG    │
│  (12 Desafios)   │          │  (12 Desafios)   │          │   (6 Desafios)   │
├──────────────────┤          ├──────────────────┤          ├──────────────────┤
│• Básico (1 a 4)  │          │• Básico (1 a 4)  │          │• Bug 1 (SQL)     │
│• Interm. (5 a 8) │          │• Interm. (5 a 8) │          │• Bug 2 (SQL)     │
│• Avançado (9-12) │          │• Avançado (9-12) │          │• Bug 3 (SQL)     │
│  + Mini-Boss     │          │  + Alerta BACEN  │          │• Bug 4 (Python)  │
└────────┬─────────┘          └────────┬─────────┘          │• Bug 5 (Python)  │
         │                             │                    │• Bug 6 (Python)  │
         └──────────────────────┬──────┘                    └────────┬─────────┘
                                │                                    │
                                ▼                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│               O BOSS FINAL: SABATINA EXECUTIVA DO COMITÊ                    │
│   Ato 1: Fit STAR · Ato 2: Live Problem · Ato 3: Defesa · Ato 4: Invertida   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Detalhamento dos Desafios

### A. Mundo 1: 100% SQL Bancário (12 Desafios)

1. **Nível Básico (Fundações de Extração):**
   - **Desafio 1.1:** *Filtro de Carteira Ativa:* Filtrar contratos vigentes por modalidade de crédito e taxa de juros (`SELECT`, `WHERE`, `ORDER BY`).
   - **Desafio 1.2:** *Agrupamentos por Segmento:* Volume e quantidade de operações agrupadas por produto (`GROUP BY`, `SUM`, `COUNT`).
   - **Desafio 1.3:** *Métricas de Ticket Médio e Juros Médios:* Análise de rentabilidade bruta com `AVG` e `ROUND`.
   - **Desafio 1.4:** *Faixas de Prazo com `CASE WHEN`:* Categorização de contratos em curto prazo (< 12m), médio (12-36m) e longo (> 36m).

2. **Nível Intermediário (Relacionamentos & Análise de Carteira):**
   - **Desafio 1.5:** *Cruzamento Cadastral (`INNER JOIN`):* Relacionar contratos de crédito com bureau de crédito (`clientes_score`).
   - **Desafio 1.6:** *Identificação de Clientes Sem Operações Ativas:* Localização de contas dormentes via `LEFT JOIN` e `WHERE c.id_contrato IS NULL`.
   - **Desafio 1.7:** *Curva de Inadimplência D-30 por Safra (Cohorts):* Agrupamento por `safra_origem` e cálculo da taxa de atraso > 30 dias.
   - **Desafio 1.8:** *Atraso Grave (D-90) por Faixa de Score:* Cruzamento de faixas de bureau (Serasa) com inadimplência acima de 90 dias.

3. **Nível Avançado (Window Functions, CTEs & Mini-Boss):**
   - **Desafio 1.9:** *Deduplicação de Renegociações via `ROW_NUMBER()`:* Manter apenas o contrato mais recente de clientes reestruturados.
   - **Desafio 1.10:** *Saldo Devedor Acumulado (`SUM() OVER`):* Cálculo de exposição cumulativa por cliente na carteira de crédito.
   - **Desafio 1.11:** *Evolução Temporal da Dívida (Mob - Month on Book):* Acompanhamento da maturação do crédito mês a mês via Common Table Expressions (`WITH`).
   - **Desafio 1.12 (Mini-Boss SQL - O DBA Impiedoso):** *Auditoria Forense de Risco:* Consulta completa consolidando safras, flags de atraso D-60, exclusão de cancelados e cálculo de carteira exposta.

---

### B. Mundo 2: 100% Python & Modelagem de Risco (12 Desafios)

1. **Nível Básico (Tratamento & EDA em Pandas):**
   - **Desafio 2.1:** *Tratamento de Dados Nulos em Risco:* Imputação consistente de valores ausentes em renda e tempo de relacionamento.
   - **Desafio 2.2:** *Detecção de Outliers Financeiros:* Identificação e tratamento de valores discrepantes em endividamento via IQR e limites percentuais.
   - **Desafio 2.3:** *Análise de Correlação e Bivariada:* Matriz de correlação entre variáveis sociodemográficas e a taxa de atraso.
   - **Desafio 2.4:** *Codificação de Variáveis Categóricas:* Aplicação de One-Hot Encoding e agrupamento de categorias raras para modelos de crédito.

2. **Nível Intermediário (Modelagem & Métricas de Crédito):**
   - **Desafio 2.5:** *Regressão Logística Básica:* Ajuste do modelo preditivo de probabilidade de default (PD) com separação treino/teste.
   - **Desafio 2.6:** *Interpretação de Coeficientes e Odds Ratio:* Cálculo de $\exp(\beta)$ e explicação de impacto para o comitê de crédito.
   - **Desafio 2.7:** *A Armadilha da Acurácia & Matriz de Confusão:* Análise de bases severamente desbalanceadas (ex: 2% de calote) e custo assimétrico de Falsos Negativos.
   - **Desafio 2.8:** *Otimização de Ponto de Corte (Cut-off):* Calibração do limiar de probabilidade visando minimizar perdas financeiras líquidas.

3. **Nível Avançado (Métricas Regulatórias & Alerta BACEN):**
   - **Desafio 2.9:** *Cálculo e Curva AUC-ROC:* Medição da capacidade discriminatória global do scorecard.
   - **Desafio 2.10:** *Índice KS (Kolmogorov-Smirnov):* Determinação da distância vertical máxima entre bons e maus pagadores e comparação com benchmarks de mercado.
   - **Desafio 2.11:** *Diagnóstico de Multicolinearidade via VIF:* Cálculo do Variance Inflation Factor e tratamento de variáveis correlacionadas.
   - **Desafio 2.12 (Mini-Boss Python - Tech Lead Cético + Alerta BACEN):** *Compliance Regulatório ao Vivo:* Readequação urgente do scorecard após circular do BACEN vetando feature discriminatória, mantendo a estabilidade do KS.

---

### C. Mundo Especial: 6 Desafios de Caça ao Bug (Code Review)

1. **Bug 1 (SQL):** *O Produto Cartesiano Silencioso:* `LEFT JOIN` com faturas que triplica o saldo da carteira sem gerar erro de sintaxe.
2. **Bug 2 (SQL):** *A Divisão Inteira Fantasma:* Taxa de inadimplência resultando em `0` porque a divisão de inteiros em SQL truncou os decimais.
3. **Bug 3 (SQL):** *O Filtro WHERE que Destrói o LEFT JOIN:* Cláusula `WHERE f.status = 'Atrasado'` que converte silenciosamente o `LEFT JOIN` em `INNER JOIN`, ocultando os clientes adimplentes.
4. **Bug 4 (Python):** *Data Leakage no Pré-Processamento:* `StandardScaler().fit_transform(X)` aplicado na base inteira antes do `train_test_split`.
5. **Bug 5 (Python):** *Divisão de Amostra sem Estratificação:* `train_test_split` em base desbalanceada sem `stratify=y`, deixando o conjunto de teste sem nenhum caloteiro.
6. **Bug 6 (Python):** *Inversão de Classes no Scorecard:* Mapeamento invertido ($Y=0$ para calote e $Y=1$ para bom), gerando matriz de confusão espelhada e conclusões desastrosas.

---

### D. O Boss Final: Comitê Executivo de Risco (4 Atos)

- **Ato 1: Fit Comportamental (Método STAR):** Defesa de postura sob pressão, gestão de prazos e aprendizado técnico acelerado.
- **Ato 2: Live Problem Solving:** Resolução rápida de um impasse quantitativo em base real.
- **Ato 3: Defesa Executiva perante Diretoria:** Tradução de Perda Esperada ($PE = EAD \times PD \times LGD$) e sensibilidade a choques de taxa Selic.
- **Ato 4: A Mecânica da Pergunta Invertida:** O Tech Lead passa a palavra para o candidato: *"Agora você tem a palavra: faça 2 perguntas estratégicas para nós sobre a área de risco do banco"*. Avaliação da profundidade e maturidade estratégica das perguntas.

---

## 3. Arquitetura da Interface & Navegação

A navegação superior receberá abas claras e dedicadas:
1. **Mundos de Treino:** Hub visual exibindo o Mundo 1 (SQL), Mundo 2 (Python), Caça ao Bug e o Boss Final.
2. **Arena de Sabatina:** Ambiente interativo com o Agente Entrevistador, Agente Avaliador, Agente Mentor e sandboxes de execução.
3. **Caça ao Bug (Code Review):** Aba dedicada com os 6 códigos sob auditoria, com área para apontar a falha e enviar a correção.
4. **Ficha Hire-Ready:** Ficha de RPG com pontuações dos 5 pilares, nível de carreira e botão de exportação.
5. **Arquitetura & Código Local:** Repositório completo de arquivos sincronizados para download e instrução para Ollama local.
6. **Botão Rápido de Aquecimento (3 min):** Acesso instantâneo ao quiz diário em qualquer tela.

---

## 4. Plano de Execução Técnica

1. **`src/data/challenges.ts`:**
   - Cadastrar os 12 desafios de SQL com enunciados, contexto de risco, código inicial e critérios.
   - Cadastrar os 12 desafios de Python com simuladores de Odds Ratio, VIF, AUC e Alerta BACEN.
   - Cadastrar os 6 desafios de Caça ao Bug com trecho com bug, explicação e gabarito.
   - Configurar o Boss Final em 4 atos com a Pergunta Invertida.
2. **`src/data/adkFiles.ts` & Arquivos na Pasta `meu-projeto/`:**
   - Atualizar `AGENTS.md`, `SKILL.md`, `README.md`, `assets/desafios_sql.md`, `assets/desafios_python.md`, `assets/caca_ao_bug.md` e `references/eventos_bacen.md`.
3. **`server.ts`:**
   - Calibrar o prompt e as regras do Agente Avaliador para pontuar com precisão os 6 bugs, o alerta BACEN e as perguntas da Pergunta Invertida.
4. **Interface (`App.tsx`, `Header.tsx`, `WorldMap.tsx`, `InterviewArena.tsx`):**
   - Adicionar a aba dedicada de Caça ao Bug no Header.
   - Atualizar a exibição dos mundos em 3 níveis (Básico, Intermediário e Avançado).
   - Validar build e lint sem erros.
