# BANCO DE PERGUNTAS DE AQUECIMENTO RÁPIDO (3 MINUTOS)

Perguntas conceituais curtas, diretas e de alta densidade técnica para respostas de 1 ou 2 parágrafos.

---

### Pergunta 1: O Valor Nulo do Índice KS
* **Enunciado:** "Se um modelo de probabilidade de default atribuir exatamente o mesmo score para todos os clientes (bons e maus), qual será o valor do índice KS (Kolmogorov-Smirnov)? O que isso significa graficamente?"
* **Gabarito Curto:** O KS será 0 (ou 0%). Graficamente, as funções de distribuição acumulada de bons e de maus coincidem perfeitamente, sem nenhuma distância vertical entre elas, indicando capacidade discriminatória nula.

---

### Pergunta 2: Mediana vs Média em Dados Financeiros
* **Enunciado:** "Ao analisar a renda declarada de clientes que solicitam financiamento imobiliário, por que o time de risco prefere a mediana em vez da média aritmética?"
* **Gabarito Curto:** A renda possui distribuição com forte assimetria à direita (presença de milionários/outliers extremos). A média aritmética é sensível a valores extremos e inflaria a estimativa da carteira, enquanto a mediana é uma medida robusta que reflete com precisão o patamar central de 50% da população.

---

### Pergunta 3: Interpretação de Odds Ratio Negativo?
* **Enunciado:** "Um estagiário calculou o Odds Ratio de uma variável e disse que ele deu -0.45. Por que esse resultado é matematicamente impossível na Regressão Logística?"
* **Gabarito Curto:** O Odds Ratio é obtido por $\exp(\beta)$, onde a função exponencial de qualquer número real é estritamente positiva ($e^\beta > 0$). O coeficiente $\beta$ pode ser negativo (indicando fator de proteção ou redução de chance), mas a razão de chances resultante estará sempre entre 0 e 1, jamais negativa.
