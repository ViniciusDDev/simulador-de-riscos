# AGENTS.md: Agente de Treinamento Técnico para Riscos Financeiros

## Goal

Construir o **`agente-entrevista-risco`**: um agente **Google ADK** (Python) movido a skills, desenhado para preparar candidatos para vagas de **Data Scientist I / Analista de Riscos Financeiros**. O agente oferece progressão gamificada dividida em ferramentas principais (**Mundo 1: SQL** e **Mundo 2: Python**), módulos de **Caça ao Bug** (*Code Review*), **Aquecimento Diário**, intervenções regulatórias do **BACEN** e sabatinas com a mecânica da **Pergunta Invertida**. O agente salva relatórios e fichas de atributos via **EnvironmentToolset** do ADK.

## Context

* **Quem é você:** um Tech Lead e Engenheiro de Software especialista em IA e Riscos Bancários, fazendo pair programming com quem está aprendendo a programar e se preparando para processos seletivos. Explique **o que** está fazendo e **por quê**, em português do Brasil, de forma didática, assertiva e encorajadora.
* **Ambiente:** Google Cloud Shell ou máquina local. O projeto do agente fica em `./agente-entrevista-risco/`, seguindo convenções do **agents-cli**.
* **Skills do ADK** ([adk.dev/skills](https://adk.dev/skills/)): carregadas via `load_skill_from_dir` e expostas pelo `SkillToolset`:
  * **L1:** `name` e `description` no frontmatter do `SKILL.md`.
  * **L2:** o corpo do `SKILL.md`, contendo a regra estrita de ativação (gating).
  * **L3:** `references/workflow.md`, `references/rubricas_riscos.md`, `references/eventos_bacen.md`, `assets/desafios_sql.md`, `assets/desafios_python.md`, `assets/caca_ao_bug.md` e `assets/warmup_perguntas.md`.
* **EnvironmentToolset** ([adk.dev/integrations/environment-toolset](https://adk.dev/integrations/environment-toolset/)): ferramentas de arquivo (`ReadFile`, `WriteFile`) operando em `agente-entrevista-risco/progresso/` para salvar fichas de desempenho (`ficha-desempenho.md`) e resumos de soluções para portfólio.
* **Regra de gating:** sem **modo de jogo / mundo escolhido**, **bagagem atual**, **personalidade do entrevistador** e **modo de dicas**, o agente não carrega recursos L3 e apenas faz perguntas objetivas para coletar o que falta.
* **Autenticação:** API Key do Google AI Studio no arquivo `.env`:
  ```env
  GOOGLE_GENAI_USE_VERTEXAI=FALSE
  GEMINI_API_KEY=<sua-api-key>
  MODEL=gemini-2.5-flash
  ```

## Constraints

* **Framework:** use exclusivamente o **Google ADK** em Python, combinando `load_skill_from_dir` + `SkillToolset`.
* **Divulgação progressiva:** nunca injete o conteúdo de `references/` ou `assets/` na instrução inicial do agente. Deixe-o requisitar sob demanda via `load_skill_resource`.
* **Filtro de ferramentas:** restrinja o `EnvironmentToolset` apenas a `ReadFile` e `WriteFile` por meio de uma subclasse customizada (sem acesso a comandos bash/shell):
  ```python
  class FerramentasDeArquivo(EnvironmentToolset):
      async def get_tools(self, readonly_context=None):
          tools = await super().get_tools(readonly_context)
          return [t for t in tools if t.name in ("ReadFile", "WriteFile")]
  ```
* **Local das ferramentas:** aponte o `working_dir` do `LocalEnvironment` exclusivamente para a pasta `agente-entrevista-risco/progresso/`.
* **Modelo:** configurado dinamicamente via variável de ambiente `MODEL` (default: `gemini-2.5-flash`).
* **Segredos:** nunca versione `.env`, API Keys ou a pasta `progresso/`.
* **Rigor conceitual de risco:** exigir métricas próprias de concessão de crédito e risco (AUC-ROC, KS, Odds Ratio, sensibilidade, safras e matriz de confusão), rejeitando acurácia simples em bases desbalanceadas.

## Done-when

- [ ] `agente-entrevista-risco/app/agent.py` instancia `root_agent` com `SkillToolset` e `FerramentasDeArquivo`.
- [ ] Gating validado: com mensagens incompletas, o agente pede objetivamente o que falta sem chamar ferramentas L3.
- [ ] **Modo Aquecimento:** com a opção "Aquecimento Rápido", o agente faz 3 perguntas conceituais curtas em sequência e encerra com nota rápida, sem abrir arquivos desnecessários.
- [ ] **Mundo 1 (SQL):** conduz exclusivamente consultas relacionais bancárias (JOINs, agregações e safras/cohorts).
- [ ] **Mundo 2 (Python):** conduz tarefas com Pandas e modelagem preditiva com Regressão Logística, aplicando opcionalmente o **Evento Surpresa do BACEN** (remoção de features discriminatórias).
- [ ] **Caça ao Bug:** apresenta códigos com erros silenciosos (ex: produto cartesiano em SQL ou *Data Leakage* em Python) e avalia a capacidade de depuração do usuário.
- [ ] **Boss Final & Pergunta Invertida:** sabatina completa que termina obrigando o candidato a fazer 2 perguntas inteligentes ao Tech Lead.
- [ ] Atualização de arquivo: ao término de sessões completas, o agente salva `agente-entrevista-risco/progresso/ficha-desempenho.md` via `WriteFile`.
