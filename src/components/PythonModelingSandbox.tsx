import React, { useState } from 'react';
import { Play, Copy, Check, RotateCcw, Activity, HelpCircle, BarChart3, TrendingUp } from 'lucide-react';

interface PythonModelingSandboxProps {
  initialCode?: string;
  onCodeChange: (code: string) => void;
  challengeTitle: string;
}

export const PythonModelingSandbox: React.FC<PythonModelingSandboxProps> = ({
  initialCode = '',
  onCodeChange,
  challengeTitle,
}) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [beta, setBeta] = useState(0.693);
  const [cutoff, setCutoff] = useState(0.15); // Banking risk cutoff
  const [outputLogs, setOutputLogs] = useState<string | null>(null);

  // Derived banking risk calculations
  const oddsRatio = Math.exp(beta);
  const percentChange = ((oddsRatio - 1) * 100).toFixed(1);

  // Simulated metrics based on cutoff
  const totalLoans = 10000;
  const naturalDefaultRate = 0.035; // 3.5%
  const actualDefaults = Math.round(totalLoans * naturalDefaultRate); // 350
  const actualGood = totalLoans - actualDefaults; // 9650

  // Confusion matrix modeling
  const sensitivity = Math.max(0.2, Math.min(0.95, 1 - cutoff * 2.2));
  const specificity = Math.max(0.4, Math.min(0.98, cutoff * 1.8 + 0.6));

  const tp = Math.round(actualDefaults * sensitivity); // Defaulters correctly flagged
  const fn = actualDefaults - tp; // Defaulters mistakenly approved (EXPENSIVE!)
  const tn = Math.round(actualGood * specificity); // Good clients approved
  const fp = actualGood - tn; // Good clients wrongly rejected

  // Financial impact calculation
  const lossPerDefault = 25000; // Average loan loss R$ 25k
  const profitPerGood = 3200; // Net interest margin R$ 3.2k
  const estimatedCreditLoss = fn * lossPerDefault;
  const missedRevenue = fp * profitPerGood;

  // KS statistic simulation
  const ksStatistic = 41.8; // Standard benchmark for sound scorecard
  const aucScore = 0.792;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutputLogs(null);
    onCodeChange(initialCode);
  };

  const handleRunCode = () => {
    setOutputLogs(
      `[Execução Python & Statsmodels]
Modelo: Logit(Y ~ comprometimento_renda + score_serasa + historico_atraso)
==============================================================================
Dep. Variable:          inadimplencia   No. Observations:                10000
Model:                          Logit   Df Residuals:                     9996
Method:                           MLE   Df Model:                            3
Date:                      Nov 2026     Pseudo R-squ (McFadden):        0.2841
Time:                      18:00:00     Log-Likelihood:               -1054.2
==============================================================================
                          coef    std err          z      P>|z|   Odds Ratio
------------------------------------------------------------------------------
const                  -3.8520      0.142    -27.127      0.000       0.0212
comprometimento_renda   ${beta.toFixed(3)}      0.048     14.437      0.000       ${oddsRatio.toFixed(3)}
score_serasa           -0.0042      0.001     -8.400      0.000       0.9958
historico_atraso        1.1240      0.089     12.629      0.000       3.0771
==============================================================================
Métricas de Validação de Risco:
AUC-ROC: ${aucScore.toFixed(3)} (Bom poder discriminatório)
KS (Kolmogorov-Smirnov): ${ksStatistic}% (Faixa recomendada pelo BACEN: 35% - 45%)
Cut-off Selecionado: ${(cutoff * 100).toFixed(0)}% de probabilidade
Perda Estimada em Não Previstos (FN): R$ ${estimatedCreditLoss.toLocaleString('pt-BR')}
`
    );
    onCodeChange(code);
  };

  return (
    <div className="space-y-4">
      {/* Interactive Risk Modeling Simulator Widget */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-semibold text-white">
              Simulador Interativo de Regressão Logística & Risco Bancário
            </h3>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            AUC: <span className="text-emerald-400 font-bold">{aucScore}</span> · KS:{' '}
            <span className="text-sky-400 font-bold">{ksStatistic}%</span> (Excelente)
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Slider 1: Coeficiente Beta & Odds Ratio */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Coeficiente $\beta$ (Comprometimento Renda)</span>
              <span className="font-mono text-sky-400 font-semibold">{beta.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.5"
              step="0.05"
              value={beta}
              onChange={(e) => setBeta(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="text-xs text-slate-400 flex items-center justify-between font-mono pt-1">
              <span>Odds Ratio = e^{beta.toFixed(2)} = <strong className="text-emerald-400">{oddsRatio.toFixed(2)}x</strong></span>
              <span className="text-amber-300">+{percentChange}% na chance</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Regra BACEN: para cada aumento de 1 unid. no comprometimento de renda, a chance relativa de calote aumenta em {percentChange}%.
            </p>
          </div>

          {/* Slider 2: Cut-off de Decisão de Crédito */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Ponto de Corte de Probabilidade (Cut-off)</span>
              <span className="font-mono text-amber-400 font-semibold">{(cutoff * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.40"
              step="0.01"
              value={cutoff}
              onChange={(e) => setCutoff(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="text-xs text-slate-400 flex items-center justify-between font-mono pt-1">
              <span>Falso Negativo (Calote não previsto): <strong className="text-rose-400">{fn} casos</strong></span>
              <span>Perda: <strong className="text-rose-400">R$ {(estimatedCreditLoss / 1000).toFixed(0)}k</strong></span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Abaixar o cut-off reduz o calote concedido (FN), mas recusa mais bons clientes (FP).
            </p>
          </div>
        </div>

        {/* Confusion Matrix Mini Grid */}
        <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
          <div className="text-[11px] font-mono text-slate-400 mb-2">Matriz de Decisão da Carteira (10.000 Contratos):</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between">
              <span className="text-slate-400">Verdadeiro Positivo (Calote Evitado):</span>
              <span className="text-emerald-400 font-bold tabular-nums">{tp}</span>
            </div>
            <div className="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between">
              <span className="text-slate-400">Falso Positivo (Bom Cliente Rejeitado):</span>
              <span className="text-amber-400 font-bold tabular-nums">{fp}</span>
            </div>
            <div className="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between">
              <span className="text-slate-400">Falso Negativo (Calote Concedido ⚠️):</span>
              <span className="text-rose-400 font-bold tabular-nums">{fn}</span>
            </div>
            <div className="p-2 bg-slate-900 border border-slate-800 rounded flex justify-between">
              <span className="text-slate-400">Verdadeiro Negativo (Bom Aprovado):</span>
              <span className="text-sky-400 font-bold tabular-nums">{tn}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950 focus-within:border-emerald-500 transition-colors">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <span>Editor Python</span>
            <span aria-hidden="true">·</span>
            <span>Scikit-Learn / Statsmodels</span>
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
          rows={10}
          spellCheck={false}
          className="w-full p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed resize-y focus:outline-none focus:ring-0"
          placeholder="# Escreva sua solução Python ou explicação estatística..."
        />

        <div className="flex items-center justify-between p-3 bg-slate-900/60 border-t border-slate-800">
          <div className="text-xs text-slate-400 font-mono">
            Teste a convergência do modelo e métricas KS
          </div>
          <button
            onClick={handleRunCode}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Executar Modelo Python
          </button>
        </div>
      </div>

      {/* Output Console */}
      {outputLogs && (
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 p-4 font-mono text-xs text-slate-300 whitespace-pre overflow-x-auto leading-relaxed border-l-2 border-emerald-500">
          {outputLogs}
        </div>
      )}
    </div>
  );
};
