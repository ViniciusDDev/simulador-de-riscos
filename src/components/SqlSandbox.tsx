import React, { useState } from 'react';
import { Play, RotateCcw, Table2, Info, Check, Copy } from 'lucide-react';
import { executeBankingQuery, QueryResult, MOCK_CONTRATOS, MOCK_CLIENTES } from '../data/mockBankingData';

interface SqlSandboxProps {
  initialCode?: string;
  onCodeChange: (code: string) => void;
  challengeTitle: string;
}

export const SqlSandbox: React.FC<SqlSandboxProps> = ({
  initialCode = '',
  onCodeChange,
  challengeTitle,
}) => {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<QueryResult | null>(() => executeBankingQuery(initialCode));
  const [activeSchemaTab, setActiveSchemaTab] = useState<'contratos' | 'clientes'>('contratos');
  const [copied, setCopied] = useState(false);

  const handleRunQuery = () => {
    const res = executeBankingQuery(code);
    setResult(res);
    onCodeChange(code);
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult(executeBankingQuery(initialCode));
    onCodeChange(initialCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Bar with Schema Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          <Table2 className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-white">Esquemas Analíticos Disponíveis:</span>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setActiveSchemaTab('contratos')}
              className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                activeSchemaTab === 'contratos'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              contratos_credito (16 rows)
            </button>
            <button
              onClick={() => setActiveSchemaTab('clientes')}
              className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                activeSchemaTab === 'clientes'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              clientes_score (14 rows)
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>Cluster SQL Analítico Ativo</span>
        </div>
      </div>

      {/* Schema Drawer Preview */}
      <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs font-mono text-slate-400 overflow-x-auto">
        {activeSchemaTab === 'contratos' ? (
          <div>
            <span className="text-sky-300 font-bold">contratos_credito: </span>
            <span>id_contrato (INT), id_cliente (INT), safra_origem (VARCHAR 'YYYY-MM'), valor_contratado (DECIMAL), taxa_juros (DECIMAL), status (VARCHAR), dias_atraso (INT)</span>
          </div>
        ) : (
          <div>
            <span className="text-emerald-300 font-bold">clientes_score: </span>
            <span>id_cliente (INT), faixa_renda (VARCHAR), score_serasa (INT 0-1000), regiao (VARCHAR), tempo_relacionamento_meses (INT)</span>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950 focus-within:border-sky-500 transition-colors">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <span>Editor SQL</span>
            <span aria-hidden="true">·</span>
            <span>PostgreSQL / DuckDB Syntax</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar</span>
            </button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            onCodeChange(e.target.value);
          }}
          rows={9}
          spellCheck={false}
          className="w-full p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-0"
          placeholder="-- Digite sua consulta SQL aqui..."
        />

        <div className="flex items-center justify-between p-3 bg-slate-900/60 border-t border-slate-800">
          <div className="text-xs text-slate-400 font-mono">
            Ctrl + Enter para executar
          </div>
          <button
            onClick={handleRunQuery}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Executar Consulta SQL
          </button>
        </div>
      </div>

      {/* Results Grid */}
      {result && (
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-3 font-mono">
              <span className="font-semibold text-white">Resultado da Query</span>
              <span className="text-slate-400 tabular-nums">{result.rowCount} registros</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 tabular-nums">{result.executionTimeMs} ms</span>
            </div>
            {result.message && (
              <span className="text-emerald-400 text-xs">{result.message}</span>
            )}
          </div>

          <div className="overflow-x-auto max-h-60">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 sticky top-0">
                <tr>
                  {result.columns.map((col, idx) => (
                    <th key={idx} className="px-4 py-2 font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {result.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2 tabular-nums">
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
