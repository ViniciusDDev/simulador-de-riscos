export interface Challenge {
  id: string;
  worldId: number;
  worldTitle: string;
  worldSubtitle: string;
  tier: 'Básico' | 'Intermediário' | 'Avançado' | 'Boss';
  title: string;
  type: 'sql' | 'python' | 'bug_hunt' | 'boss';
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Boss';
  xpReward: number;
  requiredXp?: number;
  minCompletedChallenges?: number;
  minSqlCompleted?: number;
  minPythonCompleted?: number;
  isMiniBoss?: boolean;
  isFinalBoss?: boolean;
  isBugHunt?: boolean;
  bossName?: string;
  description: string;
  businessContext: string;
  initialCode?: string;
  buggyCode?: string;
  bugExplanation?: string;
  bacenAlert?: string;
  isReverseQuestion?: boolean;
  hints: string[];
  expectedCriteria: string;
  datasetAvailable?: string[];
  solutionExplanation: string;
}

export interface ChallengeUnlockStatus {
  isUnlocked: boolean;
  requiredXp: number;
  missingXp: number;
  minCompletedChallenges: number;
  missingChallengesCount: number;
  minSqlCompleted?: number;
  missingSqlCount?: number;
  minPythonCompleted?: number;
  missingPythonCount?: number;
  reason?: string;
}

export function checkChallengeUnlock(
  challenge: Challenge,
  userXp: number,
  completedIds: string[]
): ChallengeUnlockStatus {
  const isCompleted = completedIds.includes(challenge.id);
  const requiredXp = challenge.requiredXp || 0;
  const minChallenges = challenge.minCompletedChallenges || 0;
  const minSql = challenge.minSqlCompleted || 0;
  const minPy = challenge.minPythonCompleted || 0;

  // sql-1 e py-1 são portas de entrada abertas desde o início
  if (isCompleted || challenge.id === 'sql-1' || challenge.id === 'py-1') {
    return {
      isUnlocked: true,
      requiredXp,
      missingXp: 0,
      minCompletedChallenges: minChallenges,
      missingChallengesCount: 0,
      minSqlCompleted: minSql,
      missingSqlCount: 0,
      minPythonCompleted: minPy,
      missingPythonCount: 0,
    };
  }

  const missingXp = Math.max(0, requiredXp - userXp);
  const missingChallenges = Math.max(0, minChallenges - completedIds.length);

  const completedSql = completedIds.filter((id) => id.startsWith('sql-')).length;
  const completedPy = completedIds.filter((id) => id.startsWith('py-')).length;

  const missingSql = Math.max(0, minSql - completedSql);
  const missingPy = Math.max(0, minPy - completedPy);

  const isUnlocked = missingXp === 0 && missingChallenges === 0 && missingSql === 0 && missingPy === 0;

  let reason = '';
  if (!isUnlocked) {
    const parts: string[] = [];
    if (missingXp > 0) parts.push(`Requer ${requiredXp} XP (faltam ${missingXp} XP)`);
    if (missingSql > 0) parts.push(`Requer ${minSql} desafios de SQL concluídos (você tem ${completedSql})`);
    if (missingPy > 0) parts.push(`Requer ${minPy} desafios de Python concluídos (você tem ${completedPy})`);
    if (missingChallenges > 0) parts.push(`Requer ${minChallenges} desafios totais concluídos (faltam ${missingChallenges})`);
    reason = `Bloqueado: ${parts.join('; ')}. Complete desafios anteriores para cumprir os requisitos!`;
  }

  return {
    isUnlocked,
    requiredXp,
    missingXp,
    minCompletedChallenges: minChallenges,
    missingChallengesCount: missingChallenges,
    minSqlCompleted: minSql,
    missingSqlCount: missingSql,
    minPythonCompleted: minPy,
    missingPythonCount: missingPy,
    reason,
  };
}

export interface WarmupQuestion {
  id: string;
  title: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  conceptTag: string;
}

export const WARMUP_QUESTIONS: WarmupQuestion[] = [
  {
    id: 'w1',
    title: 'Poder Discriminatório Nulo',
    question: 'Se um modelo preditivo de crédito atribuir exatamente o mesmo score/probabilidade para todos os clientes da carteira, qual será o valor do índice KS (Kolmogorov-Smirnov)?',
    options: [
      'KS = 50% (equivale ao chute aleatório)',
      'KS = 0% (não há separação vertical entre acumulada de bons e maus)',
      'KS = 100% (o modelo não comete falso positivo)',
      'KS = -1.0 (indica concordância inversa)',
    ],
    correctOptionIndex: 1,
    explanation: 'O KS calcula a distância vertical máxima entre as funções acumuladas de bons e maus pagadores: KS = max|F_bom(s) - F_mau(s)|. Se todos recebem a mesma nota, as duas curvas são idênticas e a distância máxima é rigorosamente zero.',
    conceptTag: 'Índice KS',
  },
  {
    id: 'w2',
    title: 'Mediana vs Média em Crédito',
    question: 'Por que comitês de risco financeiro preferem analisar a mediana da renda dos proponentes em vez da média aritmética?',
    options: [
      'Porque a média não pode ser calculada com dados nulos',
      'Porque a renda tem assimetria à direita com outliers extremos que inflariam a média',
      'Porque o Banco Central proíbe o uso da média em relatórios de auditoria',
      'Porque a mediana é sempre igual ao desvio padrão amostral',
    ],
    correctOptionIndex: 1,
    explanation: 'A distribuição de renda é assimétrica à direita (poucas pessoas ganham quantias astronômicas). A média é puxada para cima por esses outliers, enquanto a mediana divide exatamente 50% da população, fornecendo uma métrica robusta de capacidade de pagamento.',
    conceptTag: 'Estatística Descritiva',
  },
  {
    id: 'w3',
    title: 'Matemática do Odds Ratio',
    question: 'Um analista declarou que o Odds Ratio (razão de chances) de uma variável na Regressão Logística foi de -0.45. Por que essa declaração é matematicamente impossível?',
    options: [
      'Porque o Odds Ratio é dado por exp(beta), e a função exponencial de números reais é estritamente positiva (> 0)',
      'Porque o Odds Ratio só varia entre -1 e +1 como o coeficiente de correlação',
      'Porque o p-valor anula valores negativos do estimador',
      'Porque o odds ratio negativo só existe em regressões lineares multivariadas',
    ],
    correctOptionIndex: 0,
    explanation: 'Na Regressão Logística, log(odds) = beta. Logo, Odds Ratio = exp(beta). Como a exponencial de qualquer número real é sempre positiva (e^x > 0), o Odds Ratio jamais pode ser negativo. Valores entre 0 e 1 indicam redução de chance (fator protetor), e valores > 1 indicam aumento de chance.',
    conceptTag: 'Regressão Logística',
  },
];

export const WORLDS = [
  {
    id: 1,
    title: 'Mundo 1: 100% SQL Bancário',
    subtitle: '12 Desafios: Consultas Relacionais, Safras & Deduplicação',
    badge: '12 Desafios SQL',
    description: 'Domine a extração e manipulação na camada transacional de onde os dados bancários nascem. Queries analíticas, JOINs, agregações e safras.',
    bossName: 'O DBA Impiedoso',
  },
  {
    id: 2,
    title: 'Mundo 2: 100% Python & Modelagem de Risco',
    subtitle: '12 Desafios: Regressão Logística, Odds Ratio, KS/AUC & Alerta BACEN',
    badge: '12 Desafios Python',
    description: 'Tratamento de dados, modelos de concessão de crédito, explicabilidade de coeficientes e intervenções regulatórias do BACEN.',
    bossName: 'O Tech Lead Cético',
  },
  {
    id: 3,
    title: 'Mundo Especial: Caça ao Bug (Code Review)',
    subtitle: '6 Desafios: 3 Bugs em SQL e 3 Bugs em Python',
    badge: '6 Bugs Dedicados',
    description: 'Encontre erros silenciosos perigosos em códigos reais: produtos cartesianos, divisão inteira, Data Leakage e classes invertidas.',
    bossName: 'Auditor de Código de Risco',
  },
  {
    id: 4,
    title: 'O BOSS FINAL: Comitê de Risco & Pergunta Invertida',
    subtitle: 'Sabatina em 4 Atos: Fit STAR, Live Problem, Defesa & Pergunta Invertida',
    badge: 'Hire-Ready End-to-End',
    description: 'Simulação completa de contratação em 4 atos, finalizada com a mecânica da Pergunta Invertida perante os diretores.',
    bossName: 'Comitê Executivo de Risco de Crédito',
  },
];

export const CHALLENGES: Challenge[] = [
  // =========================================================================
  // MUNDO 1: 100% SQL BANCÁRIO (12 DESAFIOS)
  // =========================================================================

  // --- Nível Básico (1 a 4) ---
  {
    id: 'sql-1',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Básico · Desafio 1/12',
    tier: 'Básico',
    title: '01. Filtro de Contratos Ativos e Carteira de Crédito',
    type: 'sql',
    difficulty: 'Iniciante',
    xpReward: 90,
    description: 'Selecione todos os contratos ativos na tabela `contratos_credito` com taxa de juros superior a 2.0% ao mês. Ordene o resultado pelo valor contratado de forma decrescente.',
    businessContext: 'O monitoramento diário da carteira ativa com taxas elevadas permite avaliar a exposição aos segmentos de maior margem de juros (spread).',
    datasetAvailable: ['contratos_credito'],
    initialCode: `-- Selecione id_contrato, id_cliente, valor_contratado e taxa_juros dos contratos ativos com taxa > 2.0%
SELECT 
  id_contrato, 
  id_cliente, 
  valor_contratado, 
  taxa_juros, 
  status 
FROM contratos_credito
WHERE status = 'Ativo' AND taxa_juros > 2.0
ORDER BY valor_contratado DESC;`,
    hints: [
      'Dica: Use a cláusula WHERE para filtrar status = \'Ativo\' E taxa_juros > 2.0.',
      'Dica: Use ORDER BY valor_contratado DESC para listar os maiores valores primeiro.',
    ],
    expectedCriteria: 'Filtragem correta por status e taxa_juros; ordenação decrescente por valor_contratado.',
    solutionExplanation: 'Filtra os contratos vigentes com taxa de juros estipulada e os organiza por exposição de capital.',
  },
  {
    id: 'sql-2',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Básico · Desafio 2/12',
    tier: 'Básico',
    title: '02. Agrupamento por Safra e Volume Total Concedido',
    type: 'sql',
    difficulty: 'Iniciante',
    xpReward: 100,
    description: 'Calcule a quantidade total de contratos e o volume total financeiro concedido (`SUM(valor_contratado)`) agrupados por `safra_origem`.',
    businessContext: 'Bancos acompanham a originação mês a mês para verificar o cumprimento de metas comerciais e o apetite a risco da instituição.',
    datasetAvailable: ['contratos_credito'],
    initialCode: `-- Agrupe por safra_origem e calcule quantidade e soma financeira
SELECT 
  safra_origem,
  COUNT(id_contrato) AS total_contratos,
  SUM(valor_contratado) AS volume_total
FROM contratos_credito
GROUP BY safra_origem
ORDER BY safra_origem ASC;`,
    hints: [
      'Dica: O agrupamento deve ser feito por safra_origem usando GROUP BY.',
      'Dica: Calcule o volume usando a função agregada SUM(valor_contratado).',
    ],
    expectedCriteria: 'Uso de GROUP BY safra_origem; agregações COUNT e SUM consistentes.',
    solutionExplanation: 'Sumariza a produção mensal da carteira de crédito por safra de contratação.',
  },
  {
    id: 'sql-3',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Básico · Desafio 3/12',
    tier: 'Básico',
    title: '03. Média de Taxa de Juros e Ticket Médio por Status',
    type: 'sql',
    difficulty: 'Iniciante',
    xpReward: 110,
    description: 'Escreva uma consulta que calcule o ticket médio dos empréstimos (`AVG(valor_contratado)`) e a taxa média de juros (`AVG(taxa_juros)`) agrupados pelo `status` do contrato.',
    businessContext: 'Permite checar se contratos inadimplentes ou renegociados tinham originalmente taxas de juros mais agressivas.',
    datasetAvailable: ['contratos_credito'],
    initialCode: `-- Calcule a média de valor e taxa por status do contrato
SELECT 
  status,
  COUNT(id_contrato) AS qtd_contratos,
  ROUND(AVG(valor_contratado), 2) AS ticket_medio,
  ROUND(AVG(taxa_juros), 2) AS taxa_juros_media
FROM contratos_credito
GROUP BY status
ORDER BY qtd_contratos DESC;`,
    hints: [
      'Dica: Use AVG() com ROUND(..., 2) para formatar a média com duas casas decimais.',
      'Dica: Agrupe pelo campo status.',
    ],
    expectedCriteria: 'Agrupamento por status; uso de AVG com formatação de arredondamento.',
    solutionExplanation: 'Evidencia a distribuição de valores médios e spreads por situação contratual.',
  },
  {
    id: 'sql-4',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Básico · Desafio 4/12',
    tier: 'Básico',
    title: '04. Categorização de Prazos e Faixas de Valor com CASE WHEN',
    type: 'sql',
    difficulty: 'Iniciante',
    xpReward: 120,
    description: 'Crie uma coluna calculada `porte_emprestimo` categorizando os contratos em: "Microcrédito" (até R$ 10.000), "Médio Porte" (R$ 10.001 a R$ 25.000) e "Grande Porte" (acima de R$ 25.000). Exiba a contagem e o valor total por porte.',
    businessContext: 'A segmentação por tíquete é obrigatória para calibrar os modelos de aprovação e provisão mínima de capital.',
    datasetAvailable: ['contratos_credito'],
    initialCode: `-- Use CASE WHEN para criar o porte e agrupar os resultados
SELECT 
  CASE 
    WHEN valor_contratado <= 10000 THEN 'Microcrédito (<= 10k)'
    WHEN valor_contratado <= 25000 THEN 'Médio Porte (10k-25k)'
    ELSE 'Grande Porte (> 25k)'
  END AS porte_emprestimo,
  COUNT(id_contrato) AS total_contratos,
  SUM(valor_contratado) AS volume_financeiro
FROM contratos_credito
GROUP BY 1
ORDER BY volume_financeiro DESC;`,
    hints: [
      'Dica: Estruture o CASE WHEN valor_contratado <= 10000 THEN ... ELSE ... END.',
      'Dica: Agrupe pelo índice da coluna calculada (GROUP BY 1) ou pela expressão completa.',
    ],
    expectedCriteria: 'Classificação condicional precisa com CASE WHEN e sumarização agrupada.',
    solutionExplanation: 'Segmenta a carteira por faixas de exposição individual facilitando a análise de concentração.',
  },

  // --- Nível Intermediário (5 a 8) ---
  {
    id: 'sql-5',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Intermediário · Desafio 5/12',
    tier: 'Intermediário',
    title: '05. Cruzamento Cadastral de Clientes e Contratos (INNER JOIN)',
    type: 'sql',
    difficulty: 'Intermediário',
    xpReward: 140,
    description: 'Faça um `INNER JOIN` entre `contratos_credito` e `clientes_score`. Traga o `id_contrato`, `safra_origem`, `valor_contratado`, `score_serasa` e a `regiao` do cliente.',
    businessContext: 'A integração entre dados operacionais e dados sociodemográficos de bureaus é a matéria-prima básica de qualquer scorecard de risco.',
    datasetAvailable: ['contratos_credito', 'clientes_score'],
    initialCode: `-- Faça o INNER JOIN relacionando pela chave id_cliente
SELECT 
  c.id_contrato,
  c.safra_origem,
  c.valor_contratado,
  s.score_serasa,
  s.regiao,
  s.tempo_relacionamento_meses
FROM contratos_credito c
INNER JOIN clientes_score s ON c.id_cliente = s.id_cliente
ORDER BY c.id_contrato ASC;`,
    hints: [
      'Dica: Use c.id_cliente = s.id_cliente na cláusula ON.',
      'Dica: Especifique os aliases de tabela para evitar ambiguidade.',
    ],
    expectedCriteria: 'INNER JOIN correto por id_cliente com projeção dos atributos combinados.',
    solutionExplanation: 'Enriquece as operações de crédito com as características de bureau e relacionamento do cliente.',
  },
  {
    id: 'sql-6',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Intermediário · Desafio 6/12',
    tier: 'Intermediário',
    title: '06. Identificação de Clientes Sem Contratos Ativos (LEFT JOIN)',
    type: 'sql',
    difficulty: 'Intermediário',
    xpReward: 150,
    description: 'Escreva uma consulta com `LEFT JOIN` que liste os clientes cadastrados em `clientes_score` que NÃO possuem nenhum contrato em `contratos_credito`. Exiba `id_cliente`, `score_serasa` e `faixa_renda`.',
    businessContext: 'Identificar clientes da base que não tomaram crédito ajuda as equipes de CRM e concessão preventiva a ofertar produtos pré-aprovados.',
    datasetAvailable: ['contratos_credito', 'clientes_score'],
    initialCode: `-- Use LEFT JOIN e filtre pelo campo nulo do lado direito
SELECT 
  s.id_cliente,
  s.score_serasa,
  s.faixa_renda,
  s.regiao
FROM clientes_score s
LEFT JOIN contratos_credito c ON s.id_cliente = c.id_cliente
WHERE c.id_contrato IS NULL;`,
    hints: [
      'Dica: No LEFT JOIN, clientes sem correspondência na tabela da direita terão c.id_contrato IS NULL.',
      'Dica: A cláusula WHERE c.id_contrato IS NULL isola com precisão os clientes sem contratos.',
    ],
    expectedCriteria: 'LEFT JOIN de clientes para contratos com filtro IS NULL identificando exclusão.',
    solutionExplanation: 'Padrão clássico de anti-join em SQL para encontrar entidades não vinculadas.',
  },
  {
    id: 'sql-7',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Intermediário · Desafio 7/12',
    tier: 'Intermediário',
    title: '07. Curva de Inadimplência Precoce por Safra (D-30)',
    type: 'sql',
    difficulty: 'Intermediário',
    xpReward: 160,
    description: 'Para cada `safra_origem`, calcule o percentual de contratos que apresentaram atraso superior a 30 dias (`dias_atraso > 30`) em relação ao total da safra.',
    businessContext: 'A métrica D-30 é o principal gatilho de alerta precoce (Early Warning Indicator) monitorado semanalmente pelas mesas de crédito bancário.',
    datasetAvailable: ['contratos_credito'],
    initialCode: `-- Calcule a taxa percentual de inadimplência D-30 por safra
SELECT 
  safra_origem,
  COUNT(id_contrato) AS total_contratos,
  SUM(CASE WHEN dias_atraso > 30 THEN 1 ELSE 0 END) AS qtd_inadimplentes_d30,
  ROUND(
    100.0 * SUM(CASE WHEN dias_atraso > 30 THEN 1 ELSE 0 END) / COUNT(id_contrato), 
    2
  ) AS taxa_inadimplencia_d30
FROM contratos_credito
GROUP BY safra_origem
ORDER BY safra_origem ASC;`,
    hints: [
      'Dica: Use a soma condicional SUM(CASE WHEN dias_atraso > 30 THEN 1 ELSE 0 END).',
      'Dica: Multiplique por 100.0 antes de dividir pelo COUNT(*) para garantir precisão decimal.',
    ],
    expectedCriteria: 'Agrupamento por safra com cálculo exato de proporção percentual de atraso.',
    solutionExplanation: 'Gera a curva de inadimplência precoce de cada safra originada.',
  },
  {
    id: 'sql-8',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Intermediário · Desafio 8/12',
    tier: 'Intermediário',
    title: '08. Atraso Grave (D-90 / Default) por Faixa de Score Serasa',
    type: 'sql',
    difficulty: 'Intermediário',
    xpReward: 170,
    description: 'Faça um `INNER JOIN` entre contratos e clientes e calcule a taxa de atraso grave (`dias_atraso > 90`, considerado Default por Basileia) para clientes com score < 400 vs clientes com score >= 400.',
    businessContext: 'O atraso de 90 dias define formalmente o estado de calote no balanço de um banco, exigindo provisão contábil integral de perda esperada.',
    datasetAvailable: ['contratos_credito', 'clientes_score'],
    initialCode: `-- Compare a taxa de inadimplência D-90 entre alto e baixo score
SELECT 
  CASE 
    WHEN s.score_serasa < 400 THEN 'Score Baixo (< 400)'
    ELSE 'Score Médio/Alto (>= 400)'
  END AS perfil_bureau,
  COUNT(c.id_contrato) AS total_contratos,
  ROUND(100.0 * SUM(CASE WHEN c.dias_atraso > 90 THEN 1 ELSE 0 END) / COUNT(c.id_contrato), 2) AS taxa_default_d90
FROM contratos_credito c
INNER JOIN clientes_score s ON c.id_cliente = s.id_cliente
GROUP BY 1;`,
    hints: [
      'Dica: O filtro do CASE WHEN separa os grupos de bureau.',
      'Dica: dias_atraso > 90 é a condição para o Default.',
    ],
    expectedCriteria: 'INNER JOIN entre as tabelas; classificação binária de score e taxa percentual de default.',
    solutionExplanation: 'Demonstra a discriminação empírica de risco de crédito por faixas de bureau.',
  },

  // --- Nível Avançado (9 a 12) ---
  {
    id: 'sql-9',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Avançado · Desafio 9/12',
    tier: 'Avançado',
    title: '09. Deduplicação de Renegociações via Window Function ROW_NUMBER()',
    type: 'sql',
    difficulty: 'Avançado',
    xpReward: 200,
    description: 'Alguns clientes possuem múltiplos contratos de renegociação na base. Escreva uma CTE com `ROW_NUMBER() OVER (PARTITION BY id_cliente ORDER BY safra_origem DESC, id_contrato DESC)` para filtrar apenas o contrato mais recente de cada cliente.',
    businessContext: 'Ao consolidar safras, contabilizar contratos quitados por novas renegociações duplica artificialmente o volume da carteira e distorce os indicadores.',
    datasetAvailable: ['contratos_credito'],
    initialCode: `-- Use CTE com ROW_NUMBER() e filtre rn = 1
WITH ContratosRankeados AS (
  SELECT 
    id_contrato,
    id_cliente,
    safra_origem,
    valor_contratado,
    dias_atraso,
    status,
    ROW_NUMBER() OVER (
      PARTITION BY id_cliente 
      ORDER BY safra_origem DESC, id_contrato DESC
    ) AS rn
  FROM contratos_credito
)
SELECT 
  id_contrato,
  id_cliente,
  safra_origem,
  valor_contratado,
  dias_atraso,
  status
FROM ContratosRankeados
WHERE rn = 1
ORDER BY id_cliente ASC;`,
    hints: [
      'Dica: A cláusula PARTITION BY id_cliente reinicia a contagem para cada cliente.',
      'Dica: ORDER BY safra_origem DESC garante que o contrato mais recente receba rn = 1.',
    ],
    expectedCriteria: 'Uso correto de CTE com ROW_NUMBER() particionado por cliente e filtro de rn = 1.',
    solutionExplanation: 'Garante a unicidade dos clientes na carteira exposta considerando apenas a operação mais atual.',
  },
  {
    id: 'sql-10',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Avançado · Desafio 10/12',
    tier: 'Avançado',
    title: '10. Saldo Devedor Acumulado por Região Geográfica (SUM OVER)',
    type: 'sql',
    difficulty: 'Avançado',
    xpReward: 210,
    description: 'Escreva uma consulta que traga cada contrato ativo e calcule o percentual que aquele contrato representa em relação ao volume total da sua respectiva `regiao`, usando `SUM(valor_contratado) OVER (PARTITION BY regiao)`.',
    businessContext: 'Permite identificar contratos que concentram risco financeiro desproporcional em uma praça geográfica específica.',
    datasetAvailable: ['contratos_credito', 'clientes_score'],
    initialCode: `-- Calcule a participação do contrato na carteira regional via Window Function
SELECT 
  c.id_contrato,
  c.id_cliente,
  s.regiao,
  c.valor_contratado,
  SUM(c.valor_contratado) OVER (PARTITION BY s.regiao) AS volume_total_regiao,
  ROUND(
    100.0 * c.valor_contratado / SUM(c.valor_contratado) OVER (PARTITION BY s.regiao), 
    2
  ) AS perc_concentracao_regional
FROM contratos_credito c
INNER JOIN clientes_score s ON c.id_cliente = s.id_cliente
WHERE c.status = 'Ativo'
ORDER BY s.regiao, perc_concentracao_regional DESC;`,
    hints: [
      'Dica: A função SUM(c.valor_contratado) OVER (PARTITION BY s.regiao) computa o total do grupo sem colapsar as linhas.',
      'Dica: Divida o valor_contratado individual por esse total da janela para achar a porcentagem.',
    ],
    expectedCriteria: 'Uso de Window Function com PARTITION BY calculando proporção relativa sem agregação destrutiva.',
    solutionExplanation: 'Mede a concentração de crédito por contrato dentro de cada região atendida pela instituição.',
  },
  {
    id: 'sql-11',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Avançado · Desafio 11/12',
    tier: 'Avançado',
    title: '11. Análise de Maturação de Safra (Mob - Month on Book)',
    type: 'sql',
    difficulty: 'Avançado',
    xpReward: 230,
    description: 'Escreva uma consulta que classifique os contratos em faixas de tempo de carteira ("Safra Recente": safra >= \'2024-03\', "Safra Madura": safra < \'2024-03\') e compare o saldo médio e o atraso médio de cada grupo.',
    businessContext: 'Safras recentes quase não têm atraso por ainda não terem chegado ao vencimento das primeiras parcelas. Comparar safras sem levar o Mob em conta é um erro clássico em risco.',
    datasetAvailable: ['contratos_credito'],
    initialCode: `-- Compare o comportamento entre safras maduras e safras recentes
SELECT 
  CASE 
    WHEN safra_origem >= '2024-03' THEN 'Safra Recente (Mob < 6)'
    ELSE 'Safra Madura (Mob >= 6)'
  END AS estagio_maturacao,
  COUNT(id_contrato) AS total_contratos,
  ROUND(AVG(valor_contratado), 2) AS ticket_medio,
  ROUND(AVG(dias_atraso), 1) AS dias_atraso_medio,
  ROUND(100.0 * SUM(CASE WHEN dias_atraso > 30 THEN 1 ELSE 0 END) / COUNT(*), 2) AS taxa_atraso_d30
FROM contratos_credito
GROUP BY 1;`,
    hints: [
      'Dica: Categorize por safra_origem para separar o estágio de vida da dívida.',
      'Dica: Compare a taxa de atraso entre o crédito recém-concedido e o crédito já maturado.',
    ],
    expectedCriteria: 'Agrupamento por maturidade de coorte com comparação de métricas de atraso e valor.',
    solutionExplanation: 'Demonstra a importância de avaliar o tempo de maturação da dívida para não subestimar o risco.',
  },
  {
    id: 'sql-12',
    worldId: 1,
    worldTitle: 'Mundo 1: 100% SQL Bancário',
    worldSubtitle: 'Avançado · Mini-Boss SQL (12/12)',
    tier: 'Avançado',
    title: '12. Mini-Boss SQL: O DBA Impiedoso & Auditoria Forense',
    type: 'sql',
    difficulty: 'Avançado',
    xpReward: 300,
    isMiniBoss: true,
    bossName: 'O DBA Impiedoso (Auditoria de Dados Legados)',
    description: 'O DBA intervém na sua máquina: "Uma diretoria inteira foi demitida no passado por apresentar relatórios com duplicatas de renegociação e status cancelados somados na carteira!". Monte uma query com CTE deduplicando contratos por cliente, excluindo cancelados, calculando o volume total exposto e o volume em risco grave (D-60).',
    businessContext: 'A prova definitiva do domínio de SQL em ambiente bancário: tratamento rigoroso de integridade relacional e valores expostos.',
    datasetAvailable: ['contratos_credito', 'clientes_score'],
    initialCode: `-- CTE com ROW_NUMBER() + tratamento de status e cálculo de volume em risco
WITH ContratosLimpos AS (
  SELECT 
    id_contrato,
    id_cliente,
    safra_origem,
    valor_contratado,
    dias_atraso,
    status,
    ROW_NUMBER() OVER(PARTITION BY id_cliente ORDER BY safra_origem DESC, id_contrato DESC) AS rn
  FROM contratos_credito
)
SELECT 
  safra_origem,
  COUNT(id_contrato) AS contratos_ativos_unicos,
  SUM(valor_contratado) AS carteira_exposta_real,
  SUM(CASE WHEN dias_atraso > 60 THEN valor_contratado ELSE 0 END) AS volume_em_risco_d60,
  ROUND(
    100.0 * SUM(CASE WHEN dias_atraso > 60 THEN valor_contratado ELSE 0 END) / SUM(valor_contratado),
    2
  ) AS perc_volume_em_risco
FROM ContratosLimpos
WHERE rn = 1 AND status != 'Cancelado'
GROUP BY safra_origem
ORDER BY safra_origem ASC;`,
    hints: [
      'Dica: Exclua contratos cancelados usando status != \'Cancelado\'.',
      'Dica: Some o volume_contratado condicionalmente quando dias_atraso > 60.',
      'Dica: Garanta o filtro rn = 1 da CTE para evitar duplicidade de clientes.',
    ],
    expectedCriteria: 'CTE analítica com Window Function, deduplicação por cliente, filtro de status inválido e métricas de risco financeiro.',
    solutionExplanation: 'Deduplica a base e calcula o capital real em risco, eliminando distorções contábeis.',
  },

  // =========================================================================
  // MUNDO 2: 100% PYTHON & MODELAGEM DE RISCO (12 DESAFIOS)
  // =========================================================================

  // --- Nível Básico (1 a 4) ---
  {
    id: 'py-1',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Básico · Desafio 1/12',
    tier: 'Básico',
    title: '01. Tratamento de Valores Nulos em Dados de Risco',
    type: 'python',
    difficulty: 'Iniciante',
    xpReward: 90,
    description: 'Em um dataset de crédito com proponentes, a coluna `renda_mensal` possui 8% de valores nulos e `tempo_relacionamento` possui 3% de nulos. Escreva um script em Pandas que impute a mediana na renda e zero no tempo de relacionamento, justificando o porquê da mediana.',
    businessContext: 'Imputar a média em renda distorce a capacidade financeira da carteira. Em risco, técnicas de imputação exigem justificativa estatística.',
    initialCode: `import pandas as pd
import numpy as np

# Imputação de valores nulos orientada a risco bancário
def tratar_nulos(df):
    # Impute a mediana na renda_mensal (robusta a milionários/outliers)
    mediana_renda = df['renda_mensal'].median()
    df['renda_mensal'] = df['renda_mensal'].fillna(mediana_renda)
    
    # Impute 0 no tempo_relacionamento (cliente novo no banco)
    df['tempo_relacionamento'] = df['tempo_relacionamento'].fillna(0)
    return df`,
    hints: [
      'Dica: Use df[\'renda_mensal\'].fillna(df[\'renda_mensal\'].median()).',
      'Dica: Use fillna(0) para tempo_relacionamento.',
    ],
    expectedCriteria: 'Imputação correta com justificativa de robustez da mediana contra assimetria.',
    solutionExplanation: 'Preserva a integridade do dataset sem introduzir viés por valores extremos.',
  },
  {
    id: 'py-2',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Básico · Desafio 2/12',
    tier: 'Básico',
    title: '02. Detecção e Tratamento de Outliers em Endividamento (IQR)',
    type: 'python',
    difficulty: 'Iniciante',
    xpReward: 100,
    description: 'A variável `razao_divida_renda` possui registros com valores impossíveis (ex: 9999). Implemente a regra de corte via Intervalo Interquartil (IQR = Q3 - Q1), aplicando winsorization (capping) no percentil 99.',
    businessContext: 'Valores espúrios em variáveis de alavancagem financeira geram distorções graves nos coeficientes da regressão logística.',
    initialCode: `import pandas as pd
import numpy as np

def tratar_outliers_divida(df, coluna='razao_divida_renda'):
    q1 = df[coluna].quantile(0.25)
    q3 = df[coluna].quantile(0.75)
    iqr = q3 - q1
    limite_superior = q3 + 1.5 * iqr
    
    # Capping no limite superior
    df[coluna] = np.where(df[coluna] > limite_superior, limite_superior, df[coluna])
    return df`,
    hints: [
      'Dica: Q1 = quantile(0.25), Q3 = quantile(0.75), IQR = Q3 - Q1.',
      'Dica: Limite superior = Q3 + 1.5 * IQR.',
    ],
    expectedCriteria: 'Cálculo correto do IQR e aplicação de capping nos valores extremos.',
    solutionExplanation: 'Neutraliza o impacto de dados corrompidos sem descartar a observação.',
  },
  {
    id: 'py-3',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Básico · Desafio 3/12',
    tier: 'Básico',
    title: '03. Análise Exploratória e Matriz de Correlação de Indicadores',
    type: 'python',
    difficulty: 'Iniciante',
    xpReward: 110,
    description: 'Calcule a matriz de correlação de Pearson entre as features financeiras e a variável alvo `inadimplente` (0 ou 1). Identifique quais variáveis têm maior correlação direta ou inversa.',
    businessContext: 'A análise preliminar de correlação orienta a seleção de variáveis com maior potencial preditivo para o scorecard.',
    initialCode: `import pandas as pd

def correlacao_risco(df_credito):
    corr_matrix = df_credito.corr()
    corr_target = corr_matrix['inadimplente'].sort_values()
    print("Correlações com Inadimplência:")
    print(corr_target)
    return corr_target`,
    hints: [
      'Dica: Use df.corr() para computar a matriz completa.',
      'Dica: Ordene a coluna do alvo com .sort_values().',
    ],
    expectedCriteria: 'Cálculo correto da correlação e identificação de preditores positivos e negativos.',
    solutionExplanation: 'Mapeia a força e direção da associação linear com o evento de default.',
  },
  {
    id: 'py-4',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Básico · Desafio 4/12',
    tier: 'Básico',
    title: '04. Codificação de Variáveis Categóricas e Dummy Variables',
    type: 'python',
    difficulty: 'Iniciante',
    xpReward: 120,
    description: 'Transforme a coluna `tipo_vinculo_empregaticio` ("CLT", "Funcionario_Publico", "Autonomo", "Desempregado") em variáveis binárias (dummies) usando `pd.get_dummies(..., drop_first=True)` para evitar a armadilha da multicolinearidade.',
    businessContext: 'Em modelos lineares e logísticos, incluir todas as categorias gera matriz de covariância singular (dummy variable trap).',
    initialCode: `import pandas as pd

def codificar_categorias(df):
    # drop_first=True elimina uma categoria de referência para evitar multicolinearidade perfeita
    df_encoded = pd.get_dummies(df, columns=['tipo_vinculo_empregaticio'], drop_first=True)
    return df_encoded`,
    hints: [
      'Dica: Sempre use drop_first=True ao gerar dummies para Regressão Logística.',
      'Dica: A categoria descartada serve como base de comparação para os coeficientes.',
    ],
    expectedCriteria: 'Uso de pd.get_dummies com drop_first=True e explicação da armadilha das dummies.',
    solutionExplanation: 'Garante que os dados categóricos sejam adequadamente processados sem colinearidade estrita.',
  },

  // --- Nível Intermediário (5 a 8) ---
  {
    id: 'py-5',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Intermediário · Desafio 5/12',
    tier: 'Intermediário',
    title: '05. Treinamento de Regressão Logística e Separação Treino/Teste',
    type: 'python',
    difficulty: 'Intermediário',
    xpReward: 150,
    description: 'Divida os dados em 70% treino e 30% teste usando `train_test_split` com `stratify=y` e treine uma `LogisticRegression` do Scikit-Learn. Explique por que o parâmetro `stratify` é obrigatório em risco.',
    businessContext: 'Em bases onde o calote ocorre em apenas 2% a 5% dos casos, não estratificar pode gerar uma amostra de teste sem nenhum inadimplente.',
    initialCode: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

def treinar_modelo_credito(X, y):
    # stratify=y preserva a taxa natural de inadimplência nas duas partes
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )
    
    modelo = LogisticRegression(max_iter=1000)
    modelo.fit(X_train, y_train)
    return modelo, X_test, y_test`,
    hints: [
      'Dica: stratify=y garante que a proporção de 0s e 1s seja idêntica no treino e teste.',
      'Dica: Ajuste max_iter para garantir convergência numérica.',
    ],
    expectedCriteria: 'Divisão correta com stratify=y e treinamento do estimador logístico.',
    solutionExplanation: 'Assegura representatividade estatística das classes minoritárias na validação.',
  },
  {
    id: 'py-6',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Intermediário · Desafio 6/12',
    tier: 'Intermediário',
    title: '06. Interpretação de Coeficientes & Razão de Chances (Odds Ratio)',
    type: 'python',
    difficulty: 'Intermediário',
    xpReward: 160,
    description: 'O modelo estimou $\\beta = 0.693$ para `comprometimento_renda`. Calcule o Odds Ratio $\\exp(\\beta)$ e escreva um parágrafo executivo explicando o que esse número significa para a política de concessão do banco.',
    businessContext: 'O Banco Central exige que as regras de recusa de crédito sejam explicáveis ao proponente. O Odds Ratio traduz a matemática em chances relativas.',
    initialCode: `import numpy as np

beta = 0.693
odds_ratio = np.exp(beta)
print(f"Odds Ratio: {odds_ratio:.2f}")

# Explique abaixo como você traduz esse resultado para a Diretoria de Riscos:
# Resposta:`,
    hints: [
      'Dica: exp(0.693) é aproximadamente 2.0.',
      'Dica: Odds Ratio de 2.0 significa que as chances relativas de calote dobram a cada unidade adicional.',
    ],
    expectedCriteria: 'Cálculo de exp(beta) e explicação em linguagem de negócios clara.',
    solutionExplanation: 'Traduz os parâmetros matemáticos do modelo em impactos tangíveis de concessão.',
  },
  {
    id: 'py-7',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Intermediário · Desafio 7/12',
    tier: 'Intermediário',
    title: '07. A Armadilha da Acurácia & Construção da Matriz de Confusão',
    type: 'python',
    difficulty: 'Intermediário',
    xpReward: 170,
    description: 'Um modelo ingênuo que sempre prevê "Não Calote" (classe 0) atinge 98,2% de acurácia em uma base com 1,8% de calote. Demonstre via matriz de confusão por que essa acurácia quebra o banco.',
    businessContext: 'O custo de um Falso Negativo (conceder empréstimo para quem não paga) é dezenas de vezes superior ao de um Falso Positivo (recusar um bom cliente).',
    initialCode: `from sklearn.metrics import confusion_matrix, classification_report
import numpy as np

# Demonstre o impacto da acurácia vs matriz de confusão
# Mostre que a sensibilidade (Recall da classe 1) do modelo ingênuo é ZERO.`,
    hints: [
      'Dica: Falso Negativo representa o calote não previsto que gera prejuízo contábil direto.',
      'Dica: Acurácia mede acertos totais, sem ponderar a assimetria dos custos de erro.',
    ],
    expectedCriteria: 'Construção da matriz de confusão; identificação da sensibilidade zero do modelo ingênuo.',
    solutionExplanation: 'Prova a inutilidade da acurácia simples em problemas severamente desbalanceados.',
  },
  {
    id: 'py-8',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Intermediário · Desafio 8/12',
    tier: 'Intermediário',
    title: '08. Calibração de Ponto de Corte (Cut-off) por Matriz de Custos',
    type: 'python',
    difficulty: 'Intermediário',
    xpReward: 180,
    description: 'Assuma que o prejuízo médio de um calote (FN) é R$ 25.000 e a receita de juros de um bom cliente (FP evitado) é R$ 3.000. Escreva uma função que teste cut-offs de 0.05 a 0.50 e encontre o limiar que minimiza a perda financeira total.',
    businessContext: 'O ponto de corte de 0.50 padrão da estatística não faz sentido em crédito bancário; o cut-off deve ser otimizado pelo valor financeiro esperado.',
    initialCode: `import numpy as np

def otimizar_cutoff(y_true, y_prob, custo_fn=25000, custo_fp=3000):
    melhor_cutoff = 0.5
    menor_perda = float('inf')
    
    for c in np.linspace(0.05, 0.40, 36):
        y_pred = (y_prob >= c).astype(int)
        fn = np.sum((y_true == 1) & (y_pred == 0))
        fp = np.sum((y_true == 0) & (y_pred == 1))
        perda_total = fn * custo_fn + fp * custo_fp
        
        if perda_total < menor_perda:
            menor_perda = perda_total
            melhor_cutoff = c
            
    return melhor_cutoff, menor_perda`,
    hints: [
      'Dica: Teste valores baixos de cut-off (ex: entre 0.10 e 0.25).',
      'Dica: Multiplique Falsos Negativos pelo prejuízo e Falsos Positivos pelo custo de oportunidade.',
    ],
    expectedCriteria: 'Algoritmo de varredura de cut-off ponderado pela matriz de custos assimétricos.',
    solutionExplanation: 'Determina a política de aprovação de crédito baseada em retorno financeiro ótimo.',
  },

  // --- Nível Avançado (9 a 12) ---
  {
    id: 'py-9',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Avançado · Desafio 9/12',
    tier: 'Avançado',
    title: '09. Cálculo da Métrica AUC-ROC e Curva de Discriminação',
    type: 'python',
    difficulty: 'Avançado',
    xpReward: 200,
    description: 'Calcule a área sob a curva ROC (`roc_auc_score`) do modelo treinado. Explique por que a AUC-ROC é invariante à taxa de calote e como interpretar um valor de AUC de 0.78.',
    businessContext: 'A AUC avalia a capacidade de ordenação de risco do modelo independente do ponto de corte selecionado pela área de negócios.',
    initialCode: `from sklearn.metrics import roc_auc_score, roc_curve
import numpy as np

def avaliar_auc(y_true, y_prob):
    auc = roc_auc_score(y_true, y_prob)
    fpr, tpr, thresholds = roc_curve(y_true, y_prob)
    print(f"AUC-ROC do Modelo: {auc:.3f}")
    return auc`,
    hints: [
      'Dica: roc_auc_score(y_true, y_prob) recebe as probabilidades contínuas, não as classes preditas.',
      'Dica: AUC de 0.78 é considerado um poder discriminatório robusto para scorecards de crédito.',
    ],
    expectedCriteria: 'Uso de roc_auc_score com probabilidades e explicação conceitual da métrica.',
    solutionExplanation: 'Mede a probabilidade de um inadimplente aleatório ter score pior que um adimplente aleatório.',
  },
  {
    id: 'py-10',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Avançado · Desafio 10/12',
    tier: 'Avançado',
    title: '10. Implementação do Índice KS (Kolmogorov-Smirnov)',
    type: 'python',
    difficulty: 'Avançado',
    xpReward: 220,
    description: 'Escreva uma função que calcule o índice KS a partir de `y_true` e `y_prob`. O KS é a distância vertical máxima entre as funções acumuladas de bons e maus: $KS = \\max(TPR - FPR)$.',
    businessContext: 'O índice KS é a métrica número 1 exigida por reguladores e comitês de risco para autorizar a entrada de um modelo em produção.',
    initialCode: `from scipy.stats import ks_2samp
import numpy as np

def calcular_ks(y_true, y_prob):
    # Separa as probabilidades dos adimplentes (bons) e inadimplentes (maus)
    prob_bons = y_prob[y_true == 0]
    prob_maus = y_prob[y_true == 1]
    
    # Aplica o teste de Kolmogorov-Smirnov de 2 amostras
    ks_stat, _ = ks_2samp(prob_maus, prob_bons)
    ks_percent = ks_stat * 100
    print(f"Índice KS: {ks_percent:.2f}%")
    return ks_percent`,
    hints: [
      'Dica: Você pode usar scipy.stats.ks_2samp(prob_maus, prob_bons).',
      'Dica: Em crédito, KS acima de 35% é considerado bom, e acima de 45% é excelente.',
    ],
    expectedCriteria: 'Cálculo correto do KS e citação dos benchmarks bancários de mercado.',
    solutionExplanation: 'Quantifica a máxima separação alcançada entre adimplentes e inadimplentes.',
  },
  {
    id: 'py-11',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Avançado · Desafio 11/12',
    tier: 'Avançado',
    title: '11. Diagnóstico de Multicolinearidade via VIF (Variance Inflation Factor)',
    type: 'python',
    difficulty: 'Avançado',
    xpReward: 240,
    description: 'No modelo foram incluídas as features `saldo_devedor_total`, `limite_rotativo_utilizado` e `total_faturas_abertas`. Escreva um script em Statsmodels para calcular o VIF de cada feature e definir quais devem ser descartadas.',
    businessContext: 'Multicolinearidade severa (VIF > 5 ou 10) infla os erros padrão dos estimadores, invertendo sinais de coeficientes e reprovando o modelo em auditorias.',
    initialCode: `from statsmodels.stats.outliers_influence import variance_inflation_factor
import pandas as pd

def calcular_vif(X_features):
    vif_df = pd.DataFrame()
    vif_df['feature'] = X_features.columns
    vif_df['VIF'] = [
        variance_inflation_factor(X_features.values, i) 
        for i in range(X_features.shape[1])
    ]
    return vif_df.sort_values(by='VIF', ascending=False)`,
    hints: [
      'Dica: VIF > 5 indica alerta de colinearidade; VIF > 10 exige descarte ou combinação de variáveis.',
      'Dica: Variáveis de saldo e limite costumam ter correlação superior a 0.85.',
    ],
    expectedCriteria: 'Cálculo do VIF com Statsmodels e diretriz de corte para eliminação de redundâncias.',
    solutionExplanation: 'Elimina instabilidade numérica nos estimadores da Regressão Logística.',
  },
  {
    id: 'py-12',
    worldId: 2,
    worldTitle: 'Mundo 2: 100% Python & Modelagem de Risco',
    worldSubtitle: 'Avançado · Mini-Boss Python (12/12)',
    tier: 'Avançado',
    title: '12. Mini-Boss Python: O Tech Lead Cético + ⚠️ Alerta Regulatório do BACEN',
    type: 'python',
    difficulty: 'Avançado',
    xpReward: 320,
    isMiniBoss: true,
    bossName: 'O Tech Lead Cético & Fiscalização BACEN',
    bacenAlert: 'ORDEM DO BANCO CENTRAL DO BRASIL: A circular regulatória determinou a remoção imediata da variável "bairro_residencia" do pipeline por indícios de viés algorítmico e discriminação velada (redlining). Remova a variável imediatamente, recalibre o modelo e justifique a estabilidade do KS.',
    description: 'Durante a homologação, o BACEN veta uma variável sensível por viés discriminatório e o Tech Lead audita o pipeline! Remova a feature proibida, reestime o scorecard e comprove que o KS e a interpretabilidade se sustentam.',
    businessContext: 'Conformidade ética e regulatória é inegociável em instituições financeiras. O candidato deve saber se adaptar a ordens do BACEN sem comprometer a estabilidade do modelo.',
    initialCode: `# 1. Remova a feature discriminatória 'bairro_residencia'
# 2. Reestime a Regressão Logística
# 3. Calcule o novo KS e reporte o parecer executivo:`,
    hints: [
      'Dica: Elimine a coluna imediatamente da matriz de treino X.',
      'Dica: Variáveis comportamentais (histórico de pagamentos) substituem atributos demográficos sem perda substancial de poder discriminatório.',
    ],
    expectedCriteria: 'Exclusão sumária da feature discriminatória, recálculo dos coeficientes e defesa da governança perante a fiscalização.',
    solutionExplanation: 'Demonstra prontidão para lidar com exigências éticas e regulatórias do Banco Central.',
  },

  // =========================================================================
  // MUNDO 3: 6 DESAFIOS DE CAÇA AO BUG (CODE REVIEW)
  // =========================================================================
  {
    id: 'bug-1',
    worldId: 3,
    worldTitle: 'Mundo Especial: Caça ao Bug (Code Review)',
    worldSubtitle: 'Bug 1/6 · SQL',
    tier: 'Intermediário',
    title: 'Bug 1 (SQL): O Produto Cartesiano Silencioso em Faturas',
    type: 'bug_hunt',
    difficulty: 'Intermediário',
    xpReward: 160,
    isBugHunt: true,
    description: 'Um analista enviou este código afirmando que a carteira de crédito totalizou R$ 300 milhões. A diretoria suspeita do valor. Onde está o erro de cardinalidade no JOIN?',
    businessContext: 'O relacionamento entre contratos e faturas é de 1 para N. Fazer o SUM diretamente no JOIN duplica o valor tantas vezes quantas faturas houver sem acusar erro de sintaxe!',
    buggyCode: `-- CÓDIGO COM BUG SILENCIOSO:
SELECT 
    c.safra_origem,
    COUNT(c.id_contrato) AS total_contratos,
    SUM(c.valor_contratado) AS volume_carteira -- BUG: duplica pelo JOIN 1:N com faturas!
FROM contratos_credito c
LEFT JOIN pagamentos_faturas f ON c.id_contrato = f.id_contrato
GROUP BY c.safra_origem;`,
    initialCode: `-- Aponte o erro e escreva a consulta SQL corrigida:
-- ONDE ESTÁ O BUG?
-- COMO CORRIGIR?`,
    hints: [
      'Dica: Cada contrato tem múltiplas faturas associadas.',
      'Dica: O SUM(valor_contratado) é repetido para cada linha de fatura.',
      'Dica: Corrija agregando as faturas previamente ou somando apenas na tabela de contratos.',
    ],
    expectedCriteria: 'Identificação da multiplicação por cardinalidade 1:N no JOIN e consulta corrigida.',
    solutionExplanation: 'A cardinalidade 1:N inflava a soma financeira. A correção remove o JOIN indevido ou pré-agrega os registros.',
  },
  {
    id: 'bug-2',
    worldId: 3,
    worldTitle: 'Mundo Especial: Caça ao Bug (Code Review)',
    worldSubtitle: 'Bug 2/6 · SQL',
    tier: 'Intermediário',
    title: 'Bug 2 (SQL): A Divisão Inteira Fantasma que Zera o Atraso',
    type: 'bug_hunt',
    difficulty: 'Intermediário',
    xpReward: 170,
    isBugHunt: true,
    description: 'A query do estagiário retorna `0` em todas as linhas para a taxa de inadimplência, mesmo havendo contratos com atraso de 90 dias na tabela. Por quê?',
    businessContext: 'Em diversos dialetos SQL (como PostgreSQL/SQL Server), dividir um inteiro por outro inteiro trunca o resultado para zero se o numerador for menor que o denominador.',
    buggyCode: `-- CÓDIGO COM BUG SILENCIOSO:
SELECT 
    safra_origem,
    -- BUG: Divisão inteira (ex: 5 / 100 = 0)!
    SUM(CASE WHEN dias_atraso > 30 THEN 1 ELSE 0 END) / COUNT(*) AS taxa_inadimplencia
FROM contratos_credito
GROUP BY safra_origem;`,
    initialCode: `-- Aponte por que o resultado dá zero e escreva a versão corrigida com casting decimal:`,
    hints: [
      'Dica: Dividir INT por INT resulta em INT com decimais descartados.',
      'Dica: Multiplique por 100.0 ou use CAST(... AS FLOAT).',
    ],
    expectedCriteria: 'Identificação da divisão inteira com truncamento para zero e correção com cast para float.',
    solutionExplanation: 'A divisão inteira descartava as casas decimais. A multiplicação por 100.0 força o casting para ponto flutuante.',
  },
  {
    id: 'bug-3',
    worldId: 3,
    worldTitle: 'Mundo Especial: Caça ao Bug (Code Review)',
    worldSubtitle: 'Bug 3/6 · SQL',
    tier: 'Avançado',
    title: 'Bug 3 (SQL): O Filtro WHERE que Destrói o LEFT JOIN',
    type: 'bug_hunt',
    difficulty: 'Avançado',
    xpReward: 190,
    isBugHunt: true,
    description: 'O analista queria listar TODOS os clientes e, para os que tivessem sinistro de garantia, trazer o status. Mas a query só trouxe 3 clientes! O que o WHERE fez com o LEFT JOIN?',
    businessContext: 'Colocar filtros na tabela da direita dentro do WHERE elimina as linhas nulas geradas pelo LEFT JOIN, transformando-o silenciosamente em um INNER JOIN restritivo.',
    buggyCode: `-- CÓDIGO COM BUG SILENCIOSO:
SELECT 
    c.id_cliente,
    c.score_serasa,
    g.status_garantia
FROM clientes_score c
LEFT JOIN garantias_credito g ON c.id_cliente = g.id_cliente
WHERE g.status_garantia = 'Aprovada'; -- BUG: anula o LEFT JOIN e vira INNER JOIN!`,
    initialCode: `-- Explique por que o LEFT JOIN foi anulado e reescreva passando o filtro para a cláusula ON:`,
    hints: [
      'Dica: Clientes sem garantia têm g.status_garantia = NULL. A condição WHERE descarta esses clientes!',
      'Dica: Mova a condição g.status_garantia = \'Aprovada\' para dentro da cláusula ON do JOIN.',
    ],
    expectedCriteria: 'Identificação da anulação do LEFT JOIN por filtro na cláusula WHERE e correção na cláusula ON.',
    solutionExplanation: 'Filtros na tabela opcional devem residir na cláusula ON para preservar as linhas nulas da esquerda.',
  },
  {
    id: 'bug-4',
    worldId: 3,
    worldTitle: 'Mundo Especial: Caça ao Bug (Code Review)',
    worldSubtitle: 'Bug 4/6 · Python',
    tier: 'Intermediário',
    title: 'Bug 4 (Python): Data Leakage com StandardScaler antes do Split',
    type: 'bug_hunt',
    difficulty: 'Intermediário',
    xpReward: 180,
    isBugHunt: true,
    description: 'O modelo de concessão obteve 99,4% de AUC nos testes, mas fracassou vergonhosamente na produção. Onde ocorreu o vazamento de dados (Data Leakage)?',
    businessContext: 'Calcular médias e desvios usando a base completa vaza informações estatísticas do teste para o treino, gerando overfitting invisível.',
    buggyCode: `# CÓDIGO COM DATA LEAKAGE:
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# BUG GRAVE: fit_transform na base inteira antes do split!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)`,
    initialCode: `-- Aponte o vazamento e escreva a versão corrigida (fit apenas em X_train):`,
    hints: [
      'Dica: O scaler aprendeu parâmetros de X_test antes da separação.',
      'Dica: O split deve ser feito primeiro. Em seguida, fit_transform(X_train) e transform(X_test).',
    ],
    expectedCriteria: 'Identificação do fit_transform antes do split e reordenação com Pipeline ou transform isolado no teste.',
    solutionExplanation: 'Impede o vazamento de parâmetros populacionais do teste para dentro do estimador de treino.',
  },
  {
    id: 'bug-5',
    worldId: 3,
    worldTitle: 'Mundo Especial: Caça ao Bug (Code Review)',
    worldSubtitle: 'Bug 5/6 · Python',
    tier: 'Avançado',
    title: 'Bug 5 (Python): Separação Treino/Teste sem Estratificação',
    type: 'bug_hunt',
    difficulty: 'Avançado',
    xpReward: 200,
    isBugHunt: true,
    description: 'A carteira tem 1.000 clientes e apenas 15 inadimplentes. Ao rodar `train_test_split(X, y, test_size=0.2)`, o Scikit-Learn colocou 14 inadimplentes no treino e apenas 1 no teste! Como evitar isso?',
    businessContext: 'Em eventos raros, amostragens aleatórias simples produzem conjuntos de validação não representativos, inviabilizando o cálculo do KS.',
    buggyCode: `# CÓDIGO COM FALHA DE ESTRATIFICAÇÃO:
from sklearn.model_selection import train_test_split

# BUG: Amostragem simples em base com 1.5% de calote
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# Resultado: y_test ficou quase sem nenhum caso positivo!`,
    initialCode: `-- Mostre qual parâmetro obrigatório do train_test_split resolve a distribuição das classes:`,
    hints: [
      'Dica: O parâmetro stratify força a mesma proporção de classes nas duas partições.',
      'Dica: Use stratify=y.',
    ],
    expectedCriteria: 'Identificação da ausência de estratificação em evento raro e correção com stratify=y.',
    solutionExplanation: 'Garante que a proporção exata de inadimplentes seja mantida no conjunto de treino e de teste.',
  },
  {
    id: 'bug-6',
    worldId: 3,
    worldTitle: 'Mundo Especial: Caça ao Bug (Code Review)',
    worldSubtitle: 'Bug 6/6 · Python',
    tier: 'Avançado',
    title: 'Bug 6 (Python): A Inversão Desastrosa de Classes no Target',
    type: 'bug_hunt',
    difficulty: 'Avançado',
    xpReward: 220,
    isBugHunt: true,
    description: 'O cientista mapeou `status_pagamento`: se o cliente pagou em dia, atribuiu `target = 1`; se deu calote, `target = 0`. O modelo aprendeu a predizer quem paga, mas o comitê aprovou os clientes com as maiores probabilidades de calote! Por que a convenção de risco bancário foi violada?',
    businessContext: 'Em modelagem de risco, a classe 1 (evento positivo) deve ser SEMPRE a inadimplência/default. Inverter isso distorce a curva ROC, os Odds Ratios e o raciocínio das mesas de crédito.',
    buggyCode: `# CÓDIGO COM INVERSÃO DE CONVENÇÃO REGULATÓRIA:
# BUG: Definiu calote como 0 e bom cliente como 1
df['target'] = np.where(df['dias_atraso'] > 90, 0, 1)

# As probabilidades do modelo passaram a ser P(Bom), mas o corte foi aplicado como se fosse P(Calote)!`,
    initialCode: `-- Explique o impacto regulatório dessa inversão e aponte a convenção BACEN correta (Target=1 para Default):`,
    hints: [
      'Dica: Em modelagem de risco de crédito, a classe de interesse minoritária (calote) deve ser codificada como 1.',
      'Dica: O correto é target = np.where(df[\'dias_atraso\'] > 90, 1, 0).',
    ],
    expectedCriteria: 'Explicação da convenção regulatória de risco de crédito (Default = 1) e correção da codificação do target.',
    solutionExplanation: 'Restaura a convenção estatística e regulatória de identificação do evento de perda.',
  },

  // =========================================================================
  // MUNDO 4: O BOSS FINAL (SABATINA EXECUTIVA EM 4 ATOS COM PERGUNTA INVERTIDA)
  // =========================================================================
  {
    id: 'boss-final',
    worldId: 4,
    worldTitle: 'O BOSS FINAL: Comitê de Risco & Pergunta Invertida',
    worldSubtitle: 'Sabatina Geral de Contratação (4 Atos)',
    tier: 'Boss',
    title: 'O BOSS FINAL: Sabatina Executiva do Comitê de Riscos',
    type: 'boss',
    difficulty: 'Boss',
    xpReward: 600,
    isFinalBoss: true,
    isReverseQuestion: true,
    bossName: 'Comitê Executivo de Risco de Crédito & Projeções',
    description: 'A prova definitiva para conquistar o selo Hire-Ready. A banca executiva conduzirá a avaliação em 4 Atos encadeados, culminando na Mecânica da Pergunta Invertida onde VOCÊ deve formular 2 perguntas estratégicas para a banca sobre a área de risco do banco.',
    businessContext: 'Simulação integral do dia da entrevista: alinhamento comportamental (STAR), teste prático de raciocínio, defesa das projeções de perda esperada perante diretores e demonstração de curiosidade estratégica.',
    initialCode: `# RESPOSTA AOS 4 ATOS DA SABATINA DO COMITÊ DE RISCO:

# ATO 1 (FIT COMPORTAMENTAL - MÉTODO STAR):
# Conte sobre um momento em que precisou aprender uma ferramenta de dados sob pressão e entregar um resultado rápido.
# Situação:
# Tarefa:
# Ação:
# Resultado:

# ATO 2 (LIVE PROBLEM SOLVING - KS vs ACURÁCIA):
# O banco tem 2% de inadimplência. Um modelo A tem 98% de acurácia e KS de 15%. O modelo B tem 85% de acurácia e KS de 42%.
# Qual modelo você escolhe para a esteira de crédito e por quê?

# ATO 3 (DEFESA EXECUTIVA & PROJEÇÃO DE PERDA ESPERADA):
# Com EAD de R$ 500 milhões, PD de 4% e LGD de 60%, qual a Perda Esperada (PE) a ser provisionada no balanço?
# Qual o impacto no resultado do banco se a taxa Selic subir 200 bps?

# ATO 4 (A MECÂNICA DA PERGUNTA INVERTIDA):
# O Diretor diz: "Agora a palavra é sua: faça 2 perguntas estratégicas para nós sobre a área de risco do banco."
# Pergunta 1:
# Pergunta 2:`,
    hints: [
      'Dica Ato 1: Estruture com clareza a Situação, Tarefa, Ação técnica tomada e Resultado mensurável alcançado.',
      'Dica Ato 2: Escolha o Modelo B! O KS de 42% separa com excelência os caloteiros, enquanto o Modelo A não discrimina nada.',
      'Dica Ato 3: PE = EAD * PD * LGD = R$ 500M * 0.04 * 0.60 = R$ 12 milhões. O choque de juros eleva o custo de crédito das famílias e a inadimplência.',
      'Dica Ato 4: Não faça perguntas genéricas sobre benefícios. Pergunte sobre governança de modelos no BACEN, safras de crédito sob a Selic atual ou a integração entre legados e data lakes do banco.',
    ],
    expectedCriteria: 'Resolução completa e convincente dos 4 atos técnicos e comportamentais, com formulação de 2 perguntas de alto calibre na Pergunta Invertida.',
    solutionExplanation: 'Conquista a aprovação unânime do comitê com pontuação máxima na ficha de atributos de risco bancário.',
  },
];

// Mapeamento progressivo de XP e pré-requisitos para os 31 desafios
interface RequirementConfig {
  requiredXp: number;
  minCompletedChallenges?: number;
  minSqlCompleted?: number;
  minPythonCompleted?: number;
}

const REQUIREMENTS_MAP: Record<string, RequirementConfig> = {
  // Mundo 1: SQL Bancário (12 Desafios)
  'sql-1': { requiredXp: 0 },
  'sql-2': { requiredXp: 80 },
  'sql-3': { requiredXp: 160 },
  'sql-4': { requiredXp: 240 },
  'sql-5': { requiredXp: 350 },
  'sql-6': { requiredXp: 460 },
  'sql-7': { requiredXp: 580 },
  'sql-8': { requiredXp: 700 },
  'sql-9': { requiredXp: 840 },
  'sql-10': { requiredXp: 980 },
  'sql-11': { requiredXp: 1120 },
  'sql-12': { requiredXp: 1200, minSqlCompleted: 7 },

  // Mundo 2: Python & Modelagem de Risco (12 Desafios)
  'py-1': { requiredXp: 0 },
  'py-2': { requiredXp: 80 },
  'py-3': { requiredXp: 160 },
  'py-4': { requiredXp: 240 },
  'py-5': { requiredXp: 350 },
  'py-6': { requiredXp: 460 },
  'py-7': { requiredXp: 580 },
  'py-8': { requiredXp: 700 },
  'py-9': { requiredXp: 840 },
  'py-10': { requiredXp: 980 },
  'py-11': { requiredXp: 1120 },
  'py-12': { requiredXp: 1200, minPythonCompleted: 7 },

  // Mundo 3 Especial: Caça ao Bug (6 Desafios)
  'bug-1': { requiredXp: 200 },
  'bug-2': { requiredXp: 350 },
  'bug-3': { requiredXp: 500 },
  'bug-4': { requiredXp: 650 },
  'bug-5': { requiredXp: 800 },
  'bug-6': { requiredXp: 950 },

  // Mundo 4: O Boss Final (Sabatina Executiva em 4 Atos)
  // Requer no mínimo 8 desafios concluídos de SQL e 8 de Python com XP proporcional (1.800 XP)
  'boss-final': { requiredXp: 1800, minSqlCompleted: 8, minPythonCompleted: 8 },
};

CHALLENGES.forEach((ch) => {
  const req = REQUIREMENTS_MAP[ch.id];
  if (req) {
    ch.requiredXp = req.requiredXp;
    ch.minCompletedChallenges = req.minCompletedChallenges;
    ch.minSqlCompleted = req.minSqlCompleted;
    ch.minPythonCompleted = req.minPythonCompleted;
  }
});

