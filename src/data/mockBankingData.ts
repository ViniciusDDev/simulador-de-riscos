export interface ContratoCredito {
  id_contrato: number;
  id_cliente: number;
  safra_origem: string;
  valor_contratado: number;
  taxa_juros: number;
  status: string;
  dias_atraso: number;
}

export interface ClienteScore {
  id_cliente: number;
  faixa_renda: string;
  score_serasa: number;
  regiao: string;
  tempo_relacionamento_meses: number;
}

export const MOCK_CONTRATOS: ContratoCredito[] = [
  { id_contrato: 1001, id_cliente: 501, safra_origem: '2024-01', valor_contratado: 15000, taxa_juros: 2.1, status: 'Ativo', dias_atraso: 0 },
  { id_contrato: 1002, id_cliente: 502, safra_origem: '2024-01', valor_contratado: 8500, taxa_juros: 2.8, status: 'Ativo', dias_atraso: 45 },
  { id_contrato: 1003, id_cliente: 503, safra_origem: '2024-01', valor_contratado: 22000, taxa_juros: 1.9, status: 'Ativo', dias_atraso: 0 },
  { id_contrato: 1004, id_cliente: 504, safra_origem: '2024-01', valor_contratado: 12000, taxa_juros: 3.2, status: 'Inadimplente', dias_atraso: 95 },
  { id_contrato: 1005, id_cliente: 505, safra_origem: '2024-02', valor_contratado: 5000, taxa_juros: 2.4, status: 'Ativo', dias_atraso: 0 },
  { id_contrato: 1006, id_cliente: 506, safra_origem: '2024-02', valor_contratado: 35000, taxa_juros: 1.8, status: 'Ativo', dias_atraso: 12 },
  { id_contrato: 1007, id_cliente: 507, safra_origem: '2024-02', valor_contratado: 18000, taxa_juros: 2.9, status: 'Ativo', dias_atraso: 38 },
  { id_contrato: 1008, id_cliente: 508, safra_origem: '2024-02', valor_contratado: 9500, taxa_juros: 3.5, status: 'Inadimplente', dias_atraso: 110 },
  { id_contrato: 1009, id_cliente: 509, safra_origem: '2024-03', valor_contratado: 14000, taxa_juros: 2.2, status: 'Ativo', dias_atraso: 0 },
  { id_contrato: 1010, id_cliente: 510, safra_origem: '2024-03', valor_contratado: 27000, taxa_juros: 2.0, status: 'Ativo', dias_atraso: 5 },
  { id_contrato: 1011, id_cliente: 511, safra_origem: '2024-03', valor_contratado: 11500, taxa_juros: 3.1, status: 'Ativo', dias_atraso: 55 },
  { id_contrato: 1012, id_cliente: 512, safra_origem: '2024-03', valor_contratado: 40000, taxa_juros: 1.7, status: 'Ativo', dias_atraso: 0 },
  { id_contrato: 1013, id_cliente: 502, safra_origem: '2024-04', valor_contratado: 9000, taxa_juros: 2.7, status: 'Renegociado', dias_atraso: 62 },
  { id_contrato: 1014, id_cliente: 514, safra_origem: '2024-04', valor_contratado: 16500, taxa_juros: 2.3, status: 'Ativo', dias_atraso: 0 },
  { id_contrato: 1015, id_cliente: 515, safra_origem: '2024-04', valor_contratado: 23000, taxa_juros: 2.5, status: 'Ativo', dias_atraso: 15 },
  { id_contrato: 1016, id_cliente: 504, safra_origem: '2024-04', valor_contratado: 12500, taxa_juros: 3.4, status: 'Inadimplente', dias_atraso: 120 },
];

export const MOCK_CLIENTES: ClienteScore[] = [
  { id_cliente: 501, faixa_renda: 'R$ 5.000 - 8.000', score_serasa: 780, regiao: 'Sudeste', tempo_relacionamento_meses: 48 },
  { id_cliente: 502, faixa_renda: 'R$ 2.500 - 5.000', score_serasa: 420, regiao: 'Nordeste', tempo_relacionamento_meses: 12 },
  { id_cliente: 503, faixa_renda: 'R$ 12.000+', score_serasa: 890, regiao: 'Sul', tempo_relacionamento_meses: 72 },
  { id_cliente: 504, faixa_renda: 'Até R$ 2.500', score_serasa: 310, regiao: 'Sudeste', tempo_relacionamento_meses: 6 },
  { id_cliente: 505, faixa_renda: 'R$ 5.000 - 8.000', score_serasa: 650, regiao: 'Centro-Oeste', tempo_relacionamento_meses: 24 },
  { id_cliente: 506, faixa_renda: 'R$ 15.000+', score_serasa: 920, regiao: 'Sudeste', tempo_relacionamento_meses: 80 },
  { id_cliente: 507, faixa_renda: 'R$ 5.000 - 8.000', score_serasa: 490, regiao: 'Norte', tempo_relacionamento_meses: 18 },
  { id_cliente: 508, faixa_renda: 'Até R$ 2.500', score_serasa: 340, regiao: 'Nordeste', tempo_relacionamento_meses: 9 },
  { id_cliente: 509, faixa_renda: 'R$ 8.000 - 12.000', score_serasa: 740, regiao: 'Sul', tempo_relacionamento_meses: 36 },
  { id_cliente: 510, faixa_renda: 'R$ 10.000+', score_serasa: 810, regiao: 'Sudeste', tempo_relacionamento_meses: 55 },
  { id_cliente: 511, faixa_renda: 'R$ 3.000 - 5.000', score_serasa: 430, regiao: 'Sudeste', tempo_relacionamento_meses: 15 },
  { id_cliente: 512, faixa_renda: 'R$ 20.000+', score_serasa: 950, regiao: 'Sudeste', tempo_relacionamento_meses: 110 },
  { id_cliente: 514, faixa_renda: 'R$ 6.000 - 9.000', score_serasa: 690, regiao: 'Centro-Oeste', tempo_relacionamento_meses: 30 },
  { id_cliente: 515, faixa_renda: 'R$ 7.500 - 11.000', score_serasa: 720, regiao: 'Sul', tempo_relacionamento_meses: 40 },
];

export interface QueryResult {
  columns: string[];
  rows: (string | number)[][];
  rowCount: number;
  executionTimeMs: number;
  message?: string;
}

/**
 * Robust in-memory SQL execution simulator for banking risk analytics
 */
export function executeBankingQuery(sql: string): QueryResult {
  const startTime = performance.now();
  const cleanSql = sql.trim().toLowerCase();

  // Challenge 1.1: Safra & Inadimplencia D-30
  if (cleanSql.includes('safra_origem') && (cleanSql.includes('dias_atraso') || cleanSql.includes('perc_inadimplencia'))) {
    const safrasMap: { [key: string]: { count: number; vol: number; d30: number } } = {};

    MOCK_CONTRATOS.forEach((c) => {
      if (!safrasMap[c.safra_origem]) {
        safrasMap[c.safra_origem] = { count: 0, vol: 0, d30: 0 };
      }
      safrasMap[c.safra_origem].count += 1;
      safrasMap[c.safra_origem].vol += c.valor_contratado;
      if (c.dias_atraso > 30) {
        safrasMap[c.safra_origem].d30 += 1;
      }
    });

    const rows = Object.keys(safrasMap)
      .sort()
      .map((safra) => {
        const item = safrasMap[safra];
        const perc = Number(((item.d30 / item.count) * 100).toFixed(2));
        return [safra, item.count, `R$ ${item.vol.toLocaleString('pt-BR')}`, `${perc}%`];
      });

    return {
      columns: ['safra_origem', 'total_contratos', 'volume_total', 'perc_inadimplencia_d30'],
      rows,
      rowCount: rows.length,
      executionTimeMs: Math.round(performance.now() - startTime),
      message: 'Consulta executada com sucesso contra o cluster analítico.',
    };
  }

  // Challenge 1.2: Score Serasa Faixas & D-90
  if (cleanSql.includes('clientes_score') || cleanSql.includes('score_serasa') || cleanSql.includes('faixa_score')) {
    const faixas = {
      'Baixo (< 400)': { total: 0, d90: 0 },
      'Médio (400-700)': { total: 0, d90: 0 },
      'Alto (> 700)': { total: 0, d90: 0 },
    };

    MOCK_CONTRATOS.forEach((c) => {
      const cliente = MOCK_CLIENTES.find((cli) => cli.id_cliente === c.id_cliente);
      if (cliente) {
        let f: keyof typeof faixas = 'Médio (400-700)';
        if (cliente.score_serasa < 400) f = 'Baixo (< 400)';
        else if (cliente.score_serasa > 700) f = 'Alto (> 700)';

        faixas[f].total += 1;
        if (c.dias_atraso > 90) {
          faixas[f].d90 += 1;
        }
      }
    });

    const rows = [
      ['Baixo (< 400)', faixas['Baixo (< 400)'].total, `${((faixas['Baixo (< 400)'].d90 / faixas['Baixo (< 400)'].total) * 100).toFixed(2)}%`],
      ['Médio (400-700)', faixas['Médio (400-700)'].total, `${((faixas['Médio (400-700)'].d90 / faixas['Médio (400-700)'].total) * 100).toFixed(2)}%`],
      ['Alto (> 700)', faixas['Alto (> 700)'].total, `${((faixas['Alto (> 700)'].d90 / faixas['Alto (> 700)'].total) * 100).toFixed(2)}%`],
    ];

    return {
      columns: ['faixa_score', 'total_contratos', 'taxa_inadimplencia_d90'],
      rows,
      rowCount: rows.length,
      executionTimeMs: Math.round(performance.now() - startTime),
      message: 'JOIN executado com sucesso e segmentação de bureau calculada.',
    };
  }

  // Mini-Boss 1: Deduplicação e CTE
  if (cleanSql.includes('row_number') || cleanSql.includes('with') || cleanSql.includes('rn = 1') || cleanSql.includes('carteira_exposta')) {
    const rows = [
      ['2024-01', 4, 'R$ 57.500,00', 'R$ 12.000,00'],
      ['2024-02', 4, 'R$ 67.500,00', 'R$ 9.500,00'],
      ['2024-03', 4, 'R$ 92.500,00', 'R$ 0,00'],
      ['2024-04', 3, 'R$ 48.500,00', 'R$ 21.500,00'],
    ];

    return {
      columns: ['safra_origem', 'contratos_ativos_unicos', 'carteira_exposta', 'volume_em_risco_d60'],
      rows,
      rowCount: rows.length,
      executionTimeMs: Math.round(performance.now() - startTime),
      message: 'CTE analítica com Window Function executada. Contratos duplicados filtrados.',
    };
  }

  // Default fallback: general select
  const rows = MOCK_CONTRATOS.slice(0, 8).map((c) => [
    c.id_contrato,
    c.id_cliente,
    c.safra_origem,
    `R$ ${c.valor_contratado.toLocaleString('pt-BR')}`,
    `${c.taxa_juros}%`,
    c.status,
    `${c.dias_atraso} dias`,
  ]);

  return {
    columns: ['id_contrato', 'id_cliente', 'safra_origem', 'valor_contratado', 'taxa_juros', 'status', 'dias_atraso'],
    rows,
    rowCount: rows.length,
    executionTimeMs: Math.round(performance.now() - startTime),
    message: 'Exibindo amostra de contratos da carteira ativa.',
  };
}
