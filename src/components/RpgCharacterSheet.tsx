import React, { useState } from 'react';
import { Award, Shield, CheckCircle, Sparkles, Download, Copy, Check, BarChart2, Star } from 'lucide-react';
import { CHALLENGES } from '../data/challenges';

interface RpgCharacterSheetProps {
  xp: number;
  tokens: number;
  levelName: string;
  completedChallengeIds: string[];
  attributes: {
    sqlFinanceiro: number;
    regressaoLogistica: number;
    metricasValidacao: number;
    visaoNegocio: number;
    comunicacaoExecutiva: number;
  };
}

export const RpgCharacterSheet: React.FC<RpgCharacterSheetProps> = ({
  xp,
  tokens,
  levelName,
  completedChallengeIds,
  attributes,
}) => {
  const [copied, setCopied] = useState(false);

  // Overall Market Readiness Score (average of 5 attributes)
  const averageScore = Math.round(
    (attributes.sqlFinanceiro +
      attributes.regressaoLogistica +
      attributes.metricasValidacao +
      attributes.visaoNegocio +
      attributes.comunicacaoExecutiva) /
      5
  );

  const isHireReady = averageScore >= 75 && completedChallengeIds.length >= 4;

  const attributeList = [
    {
      name: 'SQL Financeiro (Safras & Atrasos)',
      value: attributes.sqlFinanceiro,
      desc: 'Capacidade de extrair e sumarizar safras de contratos, deduplicar renegociações e segmentar atraso D-30/D-90.',
      color: 'bg-sky-400',
      textColor: 'text-sky-400',
    },
    {
      name: 'Regressão Logística & Odds Ratio',
      value: attributes.regressaoLogistica,
      desc: 'Domínio do modelo preditivo de crédito padrão BACEN, cálculo de exp(beta) e explicabilidade de risco.',
      color: 'bg-emerald-400',
      textColor: 'text-emerald-400',
    },
    {
      name: 'Métricas de Validação (AUC-ROC & KS)',
      value: attributes.metricasValidacao,
      desc: 'Separação estatística de bons e maus pagadores, distância máxima de Kolmogorov-Smirnov e matriz de custos.',
      color: 'bg-purple-400',
      textColor: 'text-purple-400',
    },
    {
      name: 'Visão de Negócio & Projeções (PD, LGD, EAD)',
      value: attributes.visaoNegocio,
      desc: 'Cálculo de Perda Esperada para provisão de balanço (PDD) e sensibilidade a choques de taxa Selic.',
      color: 'bg-amber-400',
      textColor: 'text-amber-400',
    },
    {
      name: 'Comunicação Executiva & Método STAR',
      value: attributes.comunicacaoExecutiva,
      desc: 'Clareza na tradução de modelos matemáticos complexos para recomendações de crédito a diretores.',
      color: 'bg-rose-400',
      textColor: 'text-rose-400',
    },
  ];

  const handleExportMarkdown = () => {
    const report = `# 🛡️ RELATÓRIO DE PRONTIDÃO DE MERCADO (HIRE-READY)
**Candidato:** Aspirante a Data Scientist I - Riscos Financeiros
**Status:** ${isHireReady ? '✅ HIRE-READY (Apto para Processos Seletivos)' : '⏳ Em Desenvolvimento de Competências'}
**Nível Atual:** ${levelName} (${xp} XP acumulados)
**Data de Emissão:** ${new Date().toLocaleDateString('pt-BR')}

---

### 📊 Ficha de Atributos de Risco (0 - 100):
- **SQL Financeiro & Safras:** ${attributes.sqlFinanceiro}/100
- **Regressão Logística & Odds Ratio:** ${attributes.regressaoLogistica}/100
- **Métricas de Validação (AUC-ROC & KS):** ${attributes.metricasValidacao}/100
- **Visão de Negócio & Projeções (PD/LGD/EAD):** ${attributes.visaoNegocio}/100
- **Comunicação Executiva:** ${attributes.comunicacaoExecutiva}/100
- **Média Geral de Prontidão:** ${averageScore}/100

---

### 🏆 Desafios Concluídos (${completedChallengeIds.length} de ${CHALLENGES.length}):
${completedChallengeIds
  .map((id) => {
    const c = CHALLENGES.find((ch) => ch.id === id);
    return `- [x] **${c?.title}** (${c?.worldTitle} - ${c?.difficulty})`;
  })
  .join('\n')}

---
*Gerado pelo Simulador Agêntico de Entrevistas de Risco.*`;

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Top Banner Character Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
            <Award className="w-8 h-8 text-sky-400" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-400 flex items-center gap-2">
              <span>Ficha de RPG Profissional</span>
              <span aria-hidden="true">·</span>
              <span>{levelName}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Prontidão de Mercado: Data Scientist I
            </h1>

            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Baseada nos padrões de auditoria do Banco Central (BACEN) e nos requisitos de vagas corporativas de modelagem de risco e crédito do Sistema Financeiro Nacional.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 shrink-0">
          <div className="text-left md:text-right">
            <div className="text-xs text-slate-400 font-mono">Índice Geral de Prontidão</div>
            <div className="text-3xl font-black font-mono text-white tabular-nums flex items-baseline gap-1">
              <span>{averageScore}</span>
              <span className="text-sm text-slate-400 font-normal">/100</span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Status:{' '}
              <strong className={isHireReady ? 'text-emerald-400' : 'text-amber-400'}>
                {isHireReady ? 'Hire-Ready' : 'Em Preparação'}
              </strong>
            </div>
          </div>

          <button
            onClick={handleExportMarkdown}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Ficha em Markdown'}</span>
          </button>
        </div>
      </div>

      {/* Attributes Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-sky-400" />
              Os 5 Pilares de Risco Financeiro
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Cada desafio superado pontua nos atributos correspondentes da sua ficha.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">{completedChallengeIds.length} Desafios Registrados</span>
        </div>

        <div className="space-y-5">
          {attributeList.map((attr, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{attr.name}</span>
                <span className={`font-mono font-bold ${attr.textColor} tabular-nums`}>
                  {attr.value}/100
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full ${attr.color} transition-all duration-700 rounded-full`}
                  style={{ width: `${attr.value}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{attr.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Milestones & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Desafios Práticos Superados
          </h3>
          <div className="space-y-2 text-xs">
            {completedChallengeIds.length === 0 ? (
              <p className="text-slate-500 italic">
                Nenhum desafio concluído ainda. Entre na Arena de Sabatina para começar!
              </p>
            ) : (
              completedChallengeIds.map((id) => {
                const c = CHALLENGES.find((ch) => ch.id === id);
                return (
                  <div
                    key={id}
                    className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-center justify-between"
                  >
                    <span className="text-slate-200 font-medium truncate max-w-[260px]">
                      {c?.title}
                    </span>
                    <span className="text-amber-400 font-mono text-[11px]">+{c?.xpReward} XP</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Conquistas de Risco Bancário
          </h3>
          <div className="space-y-2 text-xs">
            <div className={`p-2.5 rounded-xl border flex items-center gap-3 ${
              attributes.sqlFinanceiro >= 70 ? 'bg-sky-950/30 border-sky-800/60 text-sky-200' : 'bg-slate-950/40 border-slate-800 text-slate-500'
            }`}>
              <Shield className="w-4 h-4 shrink-0 text-sky-400" />
              <div>
                <div className="font-semibold">Mestre das Safras (D-30 / D-90)</div>
                <div className="text-[11px] text-slate-400">Classificou contratos por coorte sem duplicatas.</div>
              </div>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-3 ${
              attributes.metricasValidacao >= 70 ? 'bg-purple-950/30 border-purple-800/60 text-purple-200' : 'bg-slate-950/40 border-slate-800 text-slate-500'
            }`}>
              <Shield className="w-4 h-4 shrink-0 text-purple-400" />
              <div>
                <div className="font-semibold">Destruidor da Acurácia Ilusória</div>
                <div className="text-[11px] text-slate-400">Adotou KS & AUC-ROC em bases desbalanceadas.</div>
              </div>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center gap-3 ${
              attributes.regressaoLogistica >= 70 ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200' : 'bg-slate-950/40 border-slate-800 text-slate-500'
            }`}>
              <Shield className="w-4 h-4 shrink-0 text-emerald-400" />
              <div>
                <div className="font-semibold">Tradutor de Odds Ratio</div>
                <div className="text-[11px] text-slate-400">Interpretou exp(beta) para conformidade regulatória.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
