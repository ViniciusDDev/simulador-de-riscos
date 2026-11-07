# 🐍 CATÁLOGO DE 12 DESAFIOS EM PYTHON & MODELAGEM DE RISCO

## Nível Básico (Tratamento & EDA em Pandas)
1. **Tratamento de Nulos:** Imputação orientada a risco (mediana para renda).
2. **Outliers Financeiros:** Detecção por IQR e winsorization de dívida/renda.
3. **Análise de Correlação:** Mapeamento de preditores de inadimplência.
4. **Dummies & Categóricas:** pd.get_dummies com drop_first=True evitando dummy trap.

## Nível Intermediário (Modelagem & Métricas de Crédito)
5. **Regressão Logística:** Separação treino/teste com stratify=y e LogisticRegression.
6. **Interpretação de Odds Ratio:** Cálculo de exp(beta) e tradução executiva.
7. **Armadilha da Acurácia:** Matriz de confusão e sensibilidade zero de modelo ingênuo.
8. **Otimização de Cut-off:** Calibração por matriz de custos de prejuízo e oportunidade.

## Nível Avançado (Métricas Regulatórias & Alerta BACEN)
9. **AUC-ROC:** Avaliação de ordenamento global independente do cut-off.
10. **Índice KS (Kolmogorov-Smirnov):** Distância vertical máxima e benchmarks bancários.
11. **Multicolinearidade via VIF:** Diagnóstico de inflação de variância com Statsmodels.
12. **Mini-Boss: O Tech Lead Cético + Alerta BACEN:** Exclusão de feature discriminatória e defesa de estabilidade.
