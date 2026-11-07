import React, { useState } from 'react';
import { X, CheckCircle2, Sliders, UserCheck, Sparkles, Zap, Bug, Crown, RotateCcw, AlertTriangle } from 'lucide-react';
import { WORLDS } from '../data/challenges';

export interface UserConfig {
  currentWorld: string;
  worldId: number;
  experienceLevel: string;
  interviewerPersona: 'amigavel' | 'equilibrado' | 'impiedoso';
  seniorTokensEnabled: boolean;
  targetRole: string;
  selectedMode?: 'warmup' | 'standard';
}

interface GatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: UserConfig;
  onSaveConfig: (newConfig: UserConfig) => void;
  onOpenWarmup?: () => void;
  onResetProgress?: () => void;
}

export const GatingModal: React.FC<GatingModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onOpenWarmup,
  onResetProgress,
}) => {
  const [worldId, setWorldId] = useState(config.worldId);
  const [experienceLevel, setExperienceLevel] = useState(config.experienceLevel);
  const [interviewerPersona, setInterviewerPersona] = useState(config.interviewerPersona);
  const [seniorTokensEnabled, setSeniorTokensEnabled] = useState(config.seniorTokensEnabled);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const selectedWorld = WORLDS.find((w) => w.id === worldId) || WORLDS[0];
    onSaveConfig({
      ...config,
      worldId,
      currentWorld: selectedWorld.title,
      experienceLevel,
      interviewerPersona,
      seniorTokensEnabled,
    });
    onClose();
  };

  const handleTriggerWarmup = () => {
    onClose();
    if (onOpenWarmup) {
      onOpenWarmup();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-sky-400" />
              Alinhamento de Sabatina (Gating Rule)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Conforme a regra do <code>SKILL.md</code>, defina o modo e escopo para calibrar os agentes antes do início.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Warm-up Callout */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Aquecimento Rápido (3 minutos)
              </div>
              <p className="text-[11px] text-slate-300">
                Pouco tempo agora? Faça 3 perguntas conceituais diretas (KS nulo, mediana de renda, Odds Ratio) para aquecer!
              </p>
            </div>
            <button
              type="button"
              onClick={handleTriggerWarmup}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shrink-0 ml-3"
            >
              Iniciar 3 min
            </button>
          </div>

          {/* Question 1: Modo / Mundo */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200">
              1. Qual modo de treino ou mundo você deseja jogar?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WORLDS.map((w) => {
                const isSelected = worldId === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWorldId(w.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-950/40 text-white ring-1 ring-sky-500'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-mono text-sky-400 mb-1 flex items-center justify-between">
                      <span>{w.badge}</span>
                      {w.id === 3 && <Bug className="w-3.5 h-3.5 text-amber-400" />}
                      {w.id === 4 && <Crown className="w-3.5 h-3.5 text-purple-400" />}
                    </div>
                    <div className="text-sm font-semibold">{w.title}</div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-2">{w.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Bagagem Atual */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200">
              2. Qual é a sua bagagem atual em programação e dados?
            </label>
            <div className="space-y-2">
              {[
                'Lógica básica, começando em Python e SQL do zero',
                'Sei Python básico mas nunca vi SQL',
                'Já conheço Pandas e quero treinar modelos preditivos de risco',
                'Tenho boa base estatística e quero focar em métricas bancárias e BACEN',
              ].map((level) => {
                const isSelected = experienceLevel === level;
                return (
                  <label
                    key={level}
                    onClick={() => setExperienceLevel(level)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-950/40 text-white ring-1 ring-sky-500'
                        : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      checked={isSelected}
                      onChange={() => setExperienceLevel(level)}
                      className="mt-1 text-sky-500 focus:ring-sky-500"
                    />
                    <span className="text-xs leading-relaxed">{level}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Question 3: Personalidade do Entrevistador */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span>3. Qual postura você prefere no Agente Entrevistador?</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'amigavel' as const,
                  title: 'Amigável',
                  desc: 'Incentivador, celebra acertos e orienta passo a passo sem pressão excessiva.',
                },
                {
                  id: 'equilibrado' as const,
                  title: 'Equilibrado (Padrão)',
                  desc: 'Simula fielmente a entrevista formal corporativa, com foco em clareza executiva.',
                },
                {
                  id: 'impiedoso' as const,
                  title: 'Impiedoso / Cético',
                  desc: 'Tech Lead rigoroso que questiona premissas, audita multicolinearidade e pressiona.',
                },
              ].map((p) => {
                const isSelected = interviewerPersona === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setInterviewerPersona(p.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-950/40 text-white ring-1 ring-sky-500'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-sm font-semibold text-white">{p.title}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{p.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 4: Senior Tokens */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Modo Senior Tokens (Dicas com Custo de XP)
              </span>
              <span className="text-xs font-mono text-amber-400">
                {seniorTokensEnabled ? 'Ativado' : 'Desativado'}
              </span>
            </label>
            <div
              onClick={() => setSeniorTokensEnabled(!seniorTokensEnabled)}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div>
                <p className="text-xs text-slate-300 font-medium">
                  {seniorTokensEnabled
                    ? 'Dicas disponíveis! Pedir dicas do Mentor Sênior descontará entre 5 e 30 XP.'
                    : 'Modo hardcore: sem auxílio de dicas, pontuação integral mantida.'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Ensina a investigar e pensar criticamente antes de acionar a ajuda sênior.
                </p>
              </div>
              <div
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  seniorTokensEnabled ? 'bg-sky-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </div>
            </div>
          </div>

          {/* Zona de Gerenciamento de Progresso (Zerar XP & Tokens) */}
          {onResetProgress && (
            <div className="pt-4 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                    <span>Zerar Progresso & Pontuação (Novo Início)</span>
                  </div>
                  {!confirmReset ? (
                    <button
                      type="button"
                      onClick={() => setConfirmReset(true)}
                      className="px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-800/40 rounded-lg transition-colors cursor-pointer"
                    >
                      Zerar Tokens e XP
                    </button>
                  ) : null}
                </div>

                {confirmReset ? (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 space-y-2.5 animate-fade-in">
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Confirmar reinicialização?</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Seus Tokens e XP voltarão para 0, e os desafios avançados e Bosses serão travados novamente para você recomeçar sua trilha do zero.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          onResetProgress();
                          setConfirmReset(false);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors cursor-pointer shadow-sm"
                      >
                        Sim, Zerar Tudo
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmReset(false)}
                        className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Seu progresso é gravado automaticamente a cada desafio concluído. Use o botão acima apenas se desejar reiniciar toda a pontuação e travas do zero.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Salvar e Iniciar Sessão
          </button>
        </div>
      </div>
    </div>
  );
};
