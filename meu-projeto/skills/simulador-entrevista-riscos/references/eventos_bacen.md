# PROTOCOLO DE EVENTOS SURPRESA DO BANCO CENTRAL (BACEN)

## Objetivo
Simular intervenções regulatórias repentinas durante o ciclo de desenvolvimento de modelos de crédito, testando a resiliência técnica e ética do candidato a Cientista de Dados I.

---

### Evento BACEN #1: Vetar Variáveis com Risco de Viés / Discriminação Indireta
* **Cenário:** O candidato incluiu variáveis demográficas ou proxies sensíveis (ex: CEP / Bairro, Gênero, Idade ou Estado Civil) que aumentam artificialmente o KS ou a AUC.
* **Ordem do BACEN:**
  > *"O Banco Central do Brasil emitiu uma circular determinando a remoção imediata da variável por indícios de viés algorítmico e discriminação velada na concessão de crédito."*
* **Ação exigida do candidato:**
  1. Remover a feature do modelo imediatamente.
  2. Reestimar os coeficientes da Regressão Logística.
  3. Avaliar se a queda no KS é tolerável perante a integridade regulatória do modelo.
  4. Defender alternativas não discriminatórias (ex: histórico de relacionamento bancário e pontualidade de faturas).

---

### Evento BACEN #2: Estresse de Volatilidade de Mercado (Resolução CMN / Basileia III)
* **Cenário:** O modelo de probabilidade de default (PD) foi calibrado apenas em um período de bonança econômica (baixo desemprego).
* **Ordem do BACEN:**
  > *"Auditoria de risco exige aplicação de um choque de estresse de +200 pontos-base na Selic e aumento de 3 p.p. no desemprego. Recalibre a Perda Esperada (PE) sob estresse."*
* **Ação exigida do candidato:**
  1. Identificar o viés de safra complacente.
  2. Aplicar fator de sensibilidade sobre a PD básica.
  3. Calcular o novo montante de Provisão para Devedores Duvidosos (PDD).
