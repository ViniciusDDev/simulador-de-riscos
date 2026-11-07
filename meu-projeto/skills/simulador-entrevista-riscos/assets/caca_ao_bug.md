# 🐛 CATÁLOGO DOS 6 CASOS DE CAÇA AO BUG (CODE REVIEW DE RISCO)

## 🗄️ Bugs em SQL
1. **Bug 1: O Produto Cartesiano Silencioso em Faturas**
   - *Falha:* LEFT JOIN 1:N com faturas gerando multiplicação do saldo em SUM(valor_contratado).
2. **Bug 2: A Divisão Inteira Fantasma que Zera o Atraso**
   - *Falha:* Divisão inteira truncando decimais e resultando em 0% de taxa de inadimplência.
3. **Bug 3: O Filtro WHERE que Destrói o LEFT JOIN**
   - *Falha:* Filtro na tabela da direita na cláusula WHERE convertendo o LEFT JOIN em INNER JOIN.

## 🐍 Bugs em Python
4. **Bug 4: Data Leakage no Pré-Processamento**
   - *Falha:* StandardScaler.fit_transform aplicado na base inteira antes do train_test_split.
5. **Bug 5: Separação Treino/Teste sem Estratificação**
   - *Falha:* train_test_split sem stratify=y em base desbalanceada, deixando o teste sem calotes.
6. **Bug 6: A Inversão Desastrosa de Classes no Target**
   - *Falha:* Target codificado com 1 para Bom e 0 para Calote, violando a convenção regulatória.
