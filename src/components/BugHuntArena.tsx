import React, { useState } from 'react';
import { 
  Bug, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Send, 
  Code2, 
  Award, 
  Loader2, 
  Sparkles, 
  ChevronRight,
  Database,
  Binary,
  Lock
} from 'lucide-react';
import { CHALLENGES, Challenge, checkChallengeUnlock } from '../data/challenges';
import { SqlSandbox } from './SqlSandbox';
import { PythonModelingSandbox } from './PythonModelingSandbox';

interface BugHuntArenaProps {
  completedChallengeIds: string[];
  xp?: number;
  onSelectChallengeForArena: (challenge: Challenge) => void;
  onUpdateXpAndTokens: (xpDelta: number, tokenDelta: number) => void;
  onChallengeComplete: (challengeId: string, evaluation: any) => void;
  onOpenLinkedInModal: (challenge: Challenge, solution: string, evalResult: any) => void;
}

export const BugHuntArena: React.FC<BugHuntArenaProps> = ({
  completedChallengeIds,
  xp = 150,
  onSelectChallengeForArena,
  onUpdateXpAndTokens,
  onChallengeComplete,
  onOpenLinkedInModal,
}) => {
  const bugChallenges = CHALLENGES.filter((c) => c.isBugHunt);
  const [selectedBugId, setSelectedBugId] = useState(bugChallenges[0].id);
  const activeBug = bugChallenges.find((b) => b.id === selectedBugId) || bugChallenges[0];

  const [userSolution, setUserSolution] = useState(activeBug.initialCode || '');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any | null>(null);

  const handleSelectBug = (bug: Challenge) => {
    const unlock = checkChallengeUnlock(bug, xp, completedChallengeIds);
    if (!unlock.isUnlocked) {
      alert(`🔒 Bug Bloqueado: ${unlock.reason}`);
      return;
    }
    setSelectedBugId(bug.id);
    setUserSolution(bug.initialCode || '');
    setEvaluation(null);
  };

  const handleSubmitReview = async () => {
    setEvaluating(true);
    try {
      const response = await fetch('/api/agent/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge: activeBug,
          userCodeOrAnswer: userSolution,
        }),
      });

      const evalData = await response.json();
      setEvaluation(evalData);
      onUpdateXpAndTokens(evalData.xpEarned, 20);
      onChallengeComplete(activeBug.id, evalData);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="text-xs font-mono text-amber-400 flex items-center gap-2">
            <span>Módulo Especial de Code Review</span>
            <span aria-hidden="true">·</span>
            <span>Auditoria de Código em Riscos Financeiros</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <Bug className="w-6 h-6 text-amber-400" />
            Caça ao Bug: Erros Silenciosos de SQL & Python
          </h1>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Em bancos, bugs silenciosos não quebram o código — eles rodam normalmente, mas geram números desastrosos: triplicam carteiras, zeram inadimplências ou causam vazamento de dados. Identifique a falha e escreva a correção.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400 shrink-0">
          <span className="text-amber-400 font-bold tabular-nums">
            {bugChallenges.filter((b) => completedChallengeIds.includes(b.id)).length} de {bugChallenges.length}
          </span>
          <span>Bugs Resolvidos</span>
        </div>
      </div>

      {/* Bug Selectors Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {bugChallenges.map((bug, index) => {
          const isSelected = selectedBugId === bug.id;
          const isDone = completedChallengeIds.includes(bug.id);
          const unlock = checkChallengeUnlock(bug, xp, completedChallengeIds);

          return (
            <button
              key={bug.id}
              onClick={() => handleSelectBug(bug)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                !unlock.isUnlocked
                  ? 'border-slate-800 bg-slate-950/40 text-slate-500 opacity-60 hover:opacity-90'
                  : isSelected
                  ? 'border-amber-500 bg-amber-950/30 text-white ring-1 ring-amber-500'
                  : isDone
                  ? 'border-emerald-800/40 bg-slate-900/60 text-slate-300'
                  : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span className="flex items-center gap-1 font-semibold">
                  {bug.type === 'sql' ? (
                    <Database className="w-3 h-3 text-sky-400" />
                  ) : (
                    <Binary className="w-3 h-3 text-emerald-400" />
                  )}
                  {bug.type === 'sql' ? 'SQL' : 'Python'}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : !unlock.isUnlocked ? (
                  <span className="text-amber-400 flex items-center gap-0.5 text-[10px]">
                    <Lock className="w-2.5 h-2.5" />
                    {bug.requiredXp} XP
                  </span>
                ) : (
                  <span className="text-amber-400">+{bug.xpReward} XP</span>
                )}
              </div>
              <div className="text-xs font-semibold text-slate-200 line-clamp-1">{bug.title.replace(/^Bug \d+ \([A-Za-z]+\): /, '')}</div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono flex items-center justify-between">
                <span>Bug {index + 1}/6</span>
                {!unlock.isUnlocked && <span className="text-amber-400/80 font-mono text-[9px]">🔒 Bloqueado</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Workstation: Code Inspector + Solution Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Buggy Code Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-amber-400 flex items-center gap-2">
              <span>{activeBug.worldSubtitle}</span>
              <span aria-hidden="true">·</span>
              <span>{activeBug.difficulty}</span>
            </div>
            <h2 className="text-base font-bold text-white">{activeBug.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{activeBug.businessContext}</p>
          </div>

          {/* Buggy Code Snippet Display */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Código Enviado para Code Review:
              </span>
              <span>Auditoria Forense</span>
            </div>
            <div className="p-4 bg-slate-950 border border-rose-900/40 rounded-xl font-mono text-xs text-rose-200 whitespace-pre overflow-x-auto leading-relaxed shadow-inner">
              {activeBug.buggyCode}
            </div>
          </div>

          {/* Clues & Guidelines */}
          <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs">
            <span className="text-slate-300 font-semibold block">Orientações do Tech Lead:</span>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              <li>Identifique exatamente a linha e cláusula causadora da falha.</li>
              <li>Explique o impacto no balanço ou na métrica estatística.</li>
              <li>Reescreva o código corrigido na bancada ao lado.</li>
            </ul>
          </div>
        </div>

        {/* Right: Solution Sandbox & Evaluation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-semibold text-white">
                  Bancada de Depuração & Código Corrigido
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {activeBug.type === 'sql' ? 'Dialeto SQL' : 'Python 3'}
              </span>
            </div>

            {/* Sandbox Renderer */}
            {activeBug.type === 'sql' ? (
              <SqlSandbox
                initialCode={activeBug.initialCode}
                onCodeChange={(code) => setUserSolution(code)}
                challengeTitle={activeBug.title}
              />
            ) : (
              <PythonModelingSandbox
                initialCode={activeBug.initialCode}
                onCodeChange={(code) => setUserSolution(code)}
                challengeTitle={activeBug.title}
              />
            )}

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Terminou a depuração? Submeta para o Auditor de Risco.
              </span>
              <button
                onClick={handleSubmitReview}
                disabled={evaluating}
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 shadow-sm"
              >
                {evaluating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Auditando Code Review...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Submeter Code Review</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Evaluator Verdict Card */}
          {evaluation && (
            <div className="p-5 rounded-2xl border border-amber-800/80 bg-gradient-to-b from-amber-950/30 to-slate-900 space-y-4 animate-fade-in shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-amber-300 flex items-center gap-2">
                    <span>Parecer da Auditoria de Código</span>
                    <span aria-hidden="true">·</span>
                    <span>{evaluation.executiveVerdict}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {evaluation.feedbackTitle}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black font-mono text-amber-300 tabular-nums">
                    {evaluation.score}/100
                  </div>
                  <span className="text-xs font-mono text-emerald-400">+{evaluation.xpEarned} XP</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-amber-900/40">
                {evaluation.detailedFeedback}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => onOpenLinkedInModal(activeBug, userSolution, evaluation)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Compartilhar Resolução no LinkedIn
                </button>

                <button
                  onClick={() => onSelectChallengeForArena(activeBug)}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Debater na Arena com o Tech Lead</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
