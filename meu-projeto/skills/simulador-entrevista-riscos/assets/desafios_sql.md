# 🗄️ CATÁLOGO DE 12 DESAFIOS EM SQL BANCÁRIO

## Nível Básico (Fundações de Extração)
1. **Filtro de Contratos Ativos:** Filtragem de contratos com taxa > 2.0% ordenados por exposição.
2. **Agrupamento por Safra:** Quantidade e volume financeiro total por safra_origem.
3. **Média de Taxa e Ticket Médio:** Funções agregadas AVG() e ROUND() por status.
4. **Categorização de Prazos:** Segmentação de porte de empréstimo via CASE WHEN.

## Nível Intermediário (Relacionamentos & Análise de Carteira)
5. **Cruzamento Cadastral:** INNER JOIN entre contratos e clientes_score.
6. **Clientes Sem Operações:** Anti-join com LEFT JOIN e filtro IS NULL.
7. **Inadimplência Precoce D-30 por Safra:** Cálculo percentual de contratos com dias_atraso > 30.
8. **Default D-90 por Faixa Serasa:** Segmentação de bureau e atraso grave.

## Nível Avançado (Window Functions, CTEs & Mini-Boss)
9. **Deduplicação de Renegociações:** Window Function ROW_NUMBER() OVER (PARTITION BY id_cliente).
10. **Concentração Regional:** SUM() OVER (PARTITION BY regiao) sem colapsar linhas.
11. **Maturação de Safra (Mob):** Comparação entre safras recentes e maduras via CTE.
12. **Mini-Boss: O DBA Impiedoso:** Auditoria forense de carteira exposta e volume em risco.
