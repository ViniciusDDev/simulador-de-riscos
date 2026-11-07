import React, { useState } from 'react';
import { 
  Database, 
  Binary, 
  Bug, 
  Crown, 
  CheckCircle, 
  Play, 
  ArrowRight,
  Sparkles, 
  Zap, 
  Lock, 
  ShieldAlert, 
  HelpCircle, 
  Briefcase, 
  Award, 
  ChevronRight,
  Layers,
  X,
  Flame,
  Cpu
} from 'lucide-react';
import { WORLDS, CHALLENGES, Challenge, checkChallengeUnlock, ChallengeUnlockStatus } from '../data/challenges';

interface WorldMapProps {
  completedChallengeIds: string[];
  activeChallenge: Challenge;
  onSelectChallenge: (challenge: Challenge) => void;
  onStartArena: () => void;
  xp: number;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  completedChallengeIds,
  activeChallenge,
  onSelectChallenge,
  onStartArena,
  xp,
}) => {
  const [selectedTierFilter, setSelectedTierFilter] = useState<'all' | 'Básico' | 'Intermediário' | 'Avançado'>('all');
  const [lockedModal, setLockedModal] = useState<{ challenge: Challenge; status: ChallengeUnlockStatus } | null>(null);

  const handleCardClick = (challenge: Challenge, unlockStatus: ChallengeUnlockStatus) => {
    if (!unlockStatus.isUnlocked) {
      setLockedModal({ challenge, status: unlockStatus });
      return;
    }
    onSelectChallenge(challenge);
    onStartArena();
  };

  const finalBossChallenge = CHALLENGES.find((c) => c.isFinalBoss) || CHALLENGES[CHALLENGES.length - 1];
  const finalBossUnlock = checkChallengeUnlock(finalBossChallenge, xp, completedChallengeIds);
  const isFinalBossCompleted = completedChallengeIds.includes(finalBossChallenge.id);

  const sqlCompletedCount = completedChallengeIds.filter((id) => id.startsWith('sql-')).length;
  const pyCompletedCount = completedChallengeIds.filter((id) => id.startsWith('py-')).length;

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono text-sky-400 flex items-center gap-2">
            <span>Trilha Oficial de Preparação</span>
            <span aria-hidden="true">·</span>
            <span>Data Scientist I - Riscos & Projeções</span>
            <span aria-hidden="true">·</span>
            <span>Bradesco & Instituições Reguladas</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            12 SQL + 12 Python + 6 Caça ao Bug + Boss Final
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Evolua gradualmente pelos 4 mundos temáticos. Cada ambiente possui identidade visual e desafios próprios para consolidar seu perfil técnico e garantir o selo Hire-Ready no Comitê Executivo de Riscos.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              {completedChallengeIds.length} de {CHALLENGES.length} Desafios Concluídos
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-amber-300 font-mono">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {xp} Total XP Acumulado
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-purple-300 font-mono font-semibold">
              Meta do Boss Final: 8 SQL + 8 Python · 1.800 XP
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs for Tiers (applies to World 1 and 2) */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(['all', 'Básico', 'Intermediário', 'Avançado'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTierFilter(tier)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedTierFilter === tier
                  ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tier === 'all' ? 'Todos os Níveis' : tier}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>4 Mundos com Identidade Estética Única</span>
        </div>
      </div>

      {/* Worlds List with Distinct Aesthetics */}
      <div className="space-y-10">
        {/* ===================================================================
            MUNDO 1: 100% SQL BANCÁRIO (Tema: Terminal Transacional Ciano/Azul)
            =================================================================== */}
        {(() => {
          const world = WORLDS[0];
          let worldChallenges = CHALLENGES.filter((c) => c.worldId === 1);
          if (selectedTierFilter !== 'all') {
            worldChallenges = worldChallenges.filter((c) => c.tier === selectedTierFilter);
          }
          const totalWorldChallenges = CHALLENGES.filter((c) => c.worldId === 1);
          const worldCompletedCount = totalWorldChallenges.filter((c) => completedChallengeIds.includes(c.id)).length;
          const isWorldCompleted = worldCompletedCount === totalWorldChallenges.length && totalWorldChallenges.length > 0;

          return (
            <div
              key={world.id}
              className="rounded-2xl border border-sky-800/50 bg-gradient-to-b from-sky-950/25 via-slate-900 to-slate-950 shadow-xl shadow-sky-950/30 overflow-hidden transition-all hover:border-sky-700/60"
            >
              {/* Cyan Accent Top Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600"></div>

              {/* World Header */}
              <div className="p-6 border-b border-sky-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-sky-950/15">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-sky-950/70 border border-sky-600/40 text-sky-400 shrink-0 mt-0.5 shadow-sm shadow-sky-500/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-sky-400 flex items-center gap-2">
                      <span className="font-semibold tracking-wide uppercase">{world.badge}</span>
                      <span aria-hidden="true" className="text-sky-700">·</span>
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5" />
                        Mini-Boss: {world.bossName}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5 tracking-tight">{world.title}</h2>
                    <p className="text-xs text-sky-200/80 mt-1 max-w-2xl leading-relaxed">{world.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Progresso SQL</div>
                    <div className="text-xs font-mono font-semibold text-white">
                      {worldCompletedCount}/{totalWorldChallenges.length} concluídos
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-sky-950">
                    <div
                      className={`h-full transition-all duration-500 ${isWorldCompleted ? 'bg-emerald-400' : 'bg-sky-400'}`}
                      style={{ width: `${totalWorldChallenges.length ? (worldCompletedCount / totalWorldChallenges.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* World 1 Cards Grid */}
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 items-stretch">
                  {worldChallenges.map((challenge) => {
                    const isCompleted = completedChallengeIds.includes(challenge.id);
                    const isActive = activeChallenge.id === challenge.id;
                    const unlockStatus = checkChallengeUnlock(challenge, xp, completedChallengeIds);

                    const cardNode = (
                      <div
                        onClick={() => handleCardClick(challenge, unlockStatus)}
                        className={`group relative p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-full ${
                          challenge.isMiniBoss
                            ? `mini-boss-sql-glow ${
                                !unlockStatus.isUnlocked
                                  ? 'border-sky-900/60 bg-gradient-to-b from-sky-950/30 via-slate-900 to-slate-950 opacity-75 hover:opacity-100 hover:border-sky-500'
                                  : isActive
                                  ? 'border-cyan-400 bg-sky-950/40 ring-1 ring-cyan-400 shadow-lg shadow-sky-950/50'
                                  : isCompleted
                                  ? 'border-emerald-700/60 bg-gradient-to-b from-sky-950/30 via-slate-900 to-slate-900 hover:border-emerald-500'
                                  : 'border-cyan-500/70 bg-gradient-to-b from-sky-950/40 via-slate-900 to-slate-950 hover:border-cyan-400 shadow-md'
                              }`
                            : !unlockStatus.isUnlocked
                            ? 'border-slate-800/80 bg-slate-950/70 opacity-70 hover:opacity-100 hover:border-sky-900/50'
                            : isActive
                            ? 'border-sky-400 bg-sky-950/40 ring-1 ring-sky-400 shadow-md shadow-sky-950/50'
                            : isCompleted
                            ? 'border-emerald-800/40 bg-slate-900/90 hover:border-emerald-600'
                            : 'border-sky-950/80 bg-slate-950/50 hover:border-sky-700/70 hover:bg-sky-950/20'
                        }`}
                      >
                        {challenge.isMiniBoss && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 rounded-t-xl animate-pulse"></div>
                        )}

                        <div className="space-y-1.5 pt-0.5">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className={challenge.isMiniBoss ? 'text-cyan-300 font-bold flex items-center gap-1' : 'text-sky-400'}>
                              {challenge.isMiniBoss && <Crown className="w-3 h-3 text-cyan-400" />}
                              {challenge.isMiniBoss ? 'Mini-Boss SQL' : `SQL ${challenge.tier}`}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {!unlockStatus.isUnlocked ? (
                                <span className="text-slate-400 text-[11px] flex items-center gap-1 font-mono">
                                  <Lock className="w-3 h-3 text-amber-400" />
                                  {challenge.requiredXp} XP
                                </span>
                              ) : (
                                <span className="text-amber-400 font-semibold font-mono">+{challenge.xpReward} XP</span>
                              )}
                            </div>
                          </div>

                          <h3 className={`text-xs font-semibold group-hover:text-sky-300 transition-colors line-clamp-2 ${challenge.isMiniBoss ? 'text-cyan-100 font-bold' : 'text-white'}`}>
                            {challenge.title}
                          </h3>

                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {challenge.businessContext}
                          </p>
                        </div>

                        <div className="pt-2.5 mt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
                          <div>
                            {isCompleted ? (
                              <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold">
                                <CheckCircle className="w-3 h-3" />
                                Concluído
                              </span>
                            ) : !unlockStatus.isUnlocked ? (
                              <span className="text-amber-400/90 flex items-center gap-1 text-[11px] font-mono">
                                <Lock className="w-3 h-3" />
                                {unlockStatus.missingXp > 0 ? `Faltam ${unlockStatus.missingXp} XP` : 'Bloqueado'}
                              </span>
                            ) : (
                              <span className={challenge.isMiniBoss ? 'text-amber-300 flex items-center gap-1 text-[11px] font-semibold' : 'text-slate-400 flex items-center gap-1 text-[11px]'}>
                                <Play className="w-3 h-3 text-sky-400" />
                                {challenge.difficulty}
                              </span>
                            )}
                          </div>

                          <span className={`text-[11px] font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1 ${challenge.isMiniBoss ? 'text-amber-400 font-bold' : 'text-sky-400'}`}>
                            {!unlockStatus.isUnlocked ? 'Bloqueado' : isActive ? 'Em Treino' : 'Iniciar'}
                            <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    );

                    return challenge.isMiniBoss ? (
                      <div key={challenge.id} className="mini-boss-card-floating-wrapper h-full">
                        {cardNode}
                      </div>
                    ) : (
                      <div key={challenge.id} className="h-full">
                        {cardNode}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ===================================================================
            MUNDO 2: 100% PYTHON (Tema: Quant Lab Esmeralda/Jade)
            =================================================================== */}
        {(() => {
          const world = WORLDS[1];
          let worldChallenges = CHALLENGES.filter((c) => c.worldId === 2);
          if (selectedTierFilter !== 'all') {
            worldChallenges = worldChallenges.filter((c) => c.tier === selectedTierFilter);
          }
          const totalWorldChallenges = CHALLENGES.filter((c) => c.worldId === 2);
          const worldCompletedCount = totalWorldChallenges.filter((c) => completedChallengeIds.includes(c.id)).length;
          const isWorldCompleted = worldCompletedCount === totalWorldChallenges.length && totalWorldChallenges.length > 0;

          return (
            <div
              key={world.id}
              className="rounded-2xl border border-emerald-800/50 bg-gradient-to-b from-emerald-950/25 via-slate-900 to-slate-950 shadow-xl shadow-emerald-950/30 overflow-hidden transition-all hover:border-emerald-700/60"
            >
              {/* Emerald Accent Top Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600"></div>

              {/* World Header */}
              <div className="p-6 border-b border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-950/15">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 shrink-0 mt-0.5 shadow-sm shadow-emerald-500/20">
                    <Binary className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                      <span className="font-semibold tracking-wide uppercase">{world.badge}</span>
                      <span aria-hidden="true" className="text-emerald-700">·</span>
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5" />
                        Mini-Boss: {world.bossName}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5 tracking-tight">{world.title}</h2>
                    <p className="text-xs text-emerald-200/80 mt-1 max-w-2xl leading-relaxed">{world.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Progresso Python</div>
                    <div className="text-xs font-mono font-semibold text-white">
                      {worldCompletedCount}/{totalWorldChallenges.length} concluídos
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-emerald-950">
                    <div
                      className={`h-full transition-all duration-500 ${isWorldCompleted ? 'bg-emerald-400' : 'bg-emerald-400'}`}
                      style={{ width: `${totalWorldChallenges.length ? (worldCompletedCount / totalWorldChallenges.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* World 2 Cards Grid */}
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 items-stretch">
                  {worldChallenges.map((challenge) => {
                    const isCompleted = completedChallengeIds.includes(challenge.id);
                    const isActive = activeChallenge.id === challenge.id;
                    const unlockStatus = checkChallengeUnlock(challenge, xp, completedChallengeIds);

                    const cardNode = (
                      <div
                        onClick={() => handleCardClick(challenge, unlockStatus)}
                        className={`group relative p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-full ${
                          challenge.isMiniBoss
                            ? `mini-boss-python-glow ${
                                !unlockStatus.isUnlocked
                                  ? 'border-emerald-900/60 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-950 opacity-75 hover:opacity-100 hover:border-emerald-500'
                                  : isActive
                                  ? 'border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-400 shadow-lg shadow-emerald-950/50'
                                  : isCompleted
                                  ? 'border-emerald-700/60 bg-gradient-to-b from-emerald-950/30 via-slate-900 to-slate-900 hover:border-emerald-500'
                                  : 'border-emerald-500/70 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-950 hover:border-emerald-400 shadow-md'
                              }`
                            : !unlockStatus.isUnlocked
                            ? 'border-slate-800/80 bg-slate-950/70 opacity-70 hover:opacity-100 hover:border-emerald-900/50'
                            : isActive
                            ? 'border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-400 shadow-md shadow-emerald-950/50'
                            : isCompleted
                            ? 'border-emerald-800/40 bg-slate-900/90 hover:border-emerald-600'
                            : 'border-emerald-950/80 bg-slate-950/50 hover:border-emerald-700/70 hover:bg-emerald-950/20'
                        }`}
                      >
                        {challenge.isMiniBoss && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 rounded-t-xl animate-pulse"></div>
                        )}

                        <div className="space-y-1.5 pt-0.5">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className={challenge.isMiniBoss ? 'text-emerald-300 font-bold flex items-center gap-1' : 'text-emerald-400'}>
                              {challenge.isMiniBoss && <Crown className="w-3 h-3 text-emerald-400" />}
                              {challenge.isMiniBoss ? 'Mini-Boss Python' : `Python ${challenge.tier}`}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {!unlockStatus.isUnlocked ? (
                                <span className="text-slate-400 text-[11px] flex items-center gap-1 font-mono">
                                  <Lock className="w-3 h-3 text-amber-400" />
                                  {challenge.requiredXp} XP
                                </span>
                              ) : (
                                <span className="text-amber-400 font-semibold font-mono">+{challenge.xpReward} XP</span>
                              )}
                            </div>
                          </div>

                          <h3 className={`text-xs font-semibold group-hover:text-emerald-300 transition-colors line-clamp-2 ${challenge.isMiniBoss ? 'text-emerald-100 font-bold' : 'text-white'}`}>
                            {challenge.title}
                          </h3>

                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {challenge.businessContext}
                          </p>
                        </div>

                        <div className="pt-2.5 mt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
                          <div>
                            {isCompleted ? (
                              <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold">
                                <CheckCircle className="w-3 h-3" />
                                Concluído
                              </span>
                            ) : !unlockStatus.isUnlocked ? (
                              <span className="text-amber-400/90 flex items-center gap-1 text-[11px] font-mono">
                                <Lock className="w-3 h-3" />
                                {unlockStatus.missingXp > 0 ? `Faltam ${unlockStatus.missingXp} XP` : 'Bloqueado'}
                              </span>
                            ) : (
                              <span className={challenge.isMiniBoss ? 'text-amber-300 flex items-center gap-1 text-[11px] font-semibold' : 'text-slate-400 flex items-center gap-1 text-[11px]'}>
                                <Play className="w-3 h-3 text-emerald-400" />
                                {challenge.difficulty}
                              </span>
                            )}
                          </div>

                          <span className={`text-[11px] font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1 ${challenge.isMiniBoss ? 'text-amber-400 font-bold' : 'text-emerald-400'}`}>
                            {!unlockStatus.isUnlocked ? 'Bloqueado' : isActive ? 'Em Treino' : 'Iniciar'}
                            <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    );

                    return challenge.isMiniBoss ? (
                      <div key={challenge.id} className="mini-boss-card-floating-wrapper h-full">
                        {cardNode}
                      </div>
                    ) : (
                      <div key={challenge.id} className="h-full">
                        {cardNode}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ===================================================================
            MUNDO 3: CAÇA AO BUG (Tema: Sala de Auditoria Forense Âmbar/Ouro)
            =================================================================== */}
        {(() => {
          const world = WORLDS[2];
          const worldChallenges = CHALLENGES.filter((c) => c.worldId === 3);
          const worldCompletedCount = worldChallenges.filter((c) => completedChallengeIds.includes(c.id)).length;
          const isWorldCompleted = worldCompletedCount === worldChallenges.length;

          return (
            <div
              key={world.id}
              className="rounded-2xl border border-amber-700/50 bg-gradient-to-b from-amber-950/20 via-slate-900 to-slate-950 shadow-xl shadow-amber-950/40 overflow-hidden transition-all hover:border-amber-600/60"
            >
              {/* Amber Accent Top Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>

              {/* World Header */}
              <div className="p-6 border-b border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-950/15">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400 shrink-0 mt-0.5 shadow-sm shadow-amber-500/25">
                    <Bug className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-amber-400 flex items-center gap-2">
                      <span className="font-semibold tracking-wide uppercase">{world.badge}</span>
                      <span aria-hidden="true" className="text-amber-700">·</span>
                      <span>Auditoria Forense: {world.bossName}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5 tracking-tight">{world.title}</h2>
                    <p className="text-xs text-amber-200/80 mt-1 max-w-2xl leading-relaxed">{world.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Progresso Code Review</div>
                    <div className="text-xs font-mono font-semibold text-white">
                      {worldCompletedCount}/{worldChallenges.length} depurados
                    </div>
                  </div>
                  <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-amber-950">
                    <div
                      className={`h-full transition-all duration-500 ${isWorldCompleted ? 'bg-emerald-400' : 'bg-amber-400'}`}
                      style={{ width: `${(worldCompletedCount / worldChallenges.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Balanced 3-Column Grid (6 items = 2 complete rows of 3) */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="text-xs font-mono text-amber-300/80 flex items-center justify-between border-b border-amber-900/30 pb-2">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    3 Casos em SQL Transacional + 3 Casos em Modelagem Python
                  </span>
                  <span className="text-slate-400 hidden sm:inline">Identifique o erro silencioso e apresente a causa-raiz</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {worldChallenges.map((challenge) => {
                    const isCompleted = completedChallengeIds.includes(challenge.id);
                    const isActive = activeChallenge.id === challenge.id;
                    const unlockStatus = checkChallengeUnlock(challenge, xp, completedChallengeIds);
                    const isSqlBug = challenge.id.startsWith('bug-1') || challenge.id.startsWith('bug-2') || challenge.id.startsWith('bug-3');

                    return (
                      <div
                        key={challenge.id}
                        onClick={() => handleCardClick(challenge, unlockStatus)}
                        className={`group relative p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          !unlockStatus.isUnlocked
                            ? 'border-slate-800 bg-slate-950/70 opacity-75 hover:opacity-100 hover:border-amber-900/60'
                            : isActive
                            ? 'border-amber-400 bg-amber-950/30 ring-1 ring-amber-400 shadow-md shadow-amber-950/40'
                            : isCompleted
                            ? 'border-emerald-800/40 bg-slate-900/90 hover:border-emerald-600'
                            : 'border-amber-900/50 bg-slate-950/70 hover:border-amber-500 hover:bg-amber-950/20'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                              {isSqlBug ? <Database className="w-3 h-3 text-sky-400" /> : <Binary className="w-3 h-3 text-emerald-400" />}
                              <span>{isSqlBug ? 'Bug SQL' : 'Bug Python'}</span>
                            </span>
                            <div className="flex items-center gap-2">
                              {!unlockStatus.isUnlocked ? (
                                <span className="text-slate-400 text-[11px] flex items-center gap-1 font-mono">
                                  <Lock className="w-3 h-3 text-amber-400" />
                                  {challenge.requiredXp} XP
                                </span>
                              ) : (
                                <span className="text-amber-300 font-semibold font-mono">+{challenge.xpReward} XP</span>
                              )}
                            </div>
                          </div>

                          <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-200 transition-colors line-clamp-2">
                            {challenge.title}
                          </h3>

                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {challenge.businessContext}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <div>
                            {isCompleted ? (
                              <span className="text-emerald-400 flex items-center gap-1 text-xs font-semibold">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Corrigido
                              </span>
                            ) : !unlockStatus.isUnlocked ? (
                              <span className="text-amber-400/90 flex items-center gap-1 text-[11px] font-mono">
                                <Lock className="w-3 h-3" />
                                Faltam {unlockStatus.missingXp} XP
                              </span>
                            ) : (
                              <span className="text-slate-400 flex items-center gap-1 text-xs">
                                <Play className="w-3 h-3 text-amber-400" />
                                {challenge.difficulty}
                              </span>
                            )}
                          </div>

                          <span className="text-xs font-medium text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-mono">
                            {!unlockStatus.isUnlocked ? 'Bloqueado' : isActive ? 'Em Análise' : 'Investigar'}
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ===================================================================
            MUNDO 4: O BOSS FINAL (Tema: Câmara Executiva da Diretoria Púrpura Imperial)
            =================================================================== */}
        {(() => {
          const world = WORLDS[3];
          const reqXp = finalBossChallenge.requiredXp || 1800;
          const reqSql = finalBossChallenge.minSqlCompleted || 8;
          const reqPy = finalBossChallenge.minPythonCompleted || 8;

          const xpPercent = Math.min(100, Math.round((xp / reqXp) * 100));
          const sqlPercent = Math.min(100, Math.round((sqlCompletedCount / reqSql) * 100));
          const pyPercent = Math.min(100, Math.round((pyCompletedCount / reqPy) * 100));

          return (
            <div key={world.id} className="boss-card-floating-wrapper py-3">
              <div
                className={`boss-card-glow rounded-2xl border overflow-hidden relative cursor-default ${
                  finalBossUnlock.isUnlocked
                    ? 'border-purple-500/80 bg-gradient-to-br from-purple-950/40 via-slate-900 to-purple-950/20 hover:border-purple-400'
                    : 'border-purple-800/60 bg-gradient-to-b from-purple-950/25 via-slate-900 to-slate-950 hover:border-purple-600'
                }`}
              >
                {/* Purple / Magenta Accent Top Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse"></div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Executive Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-purple-900/40">
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 font-semibold">
                          <Crown className="w-3.5 h-3.5 text-purple-400" />
                          Provação Máxima de Contratação
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-300">Banca: Superintendente & Head de Riscos</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-amber-400 font-bold font-mono">+{finalBossChallenge.xpReward} XP</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        {world.title}
                      </h2>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        A sabatina decisiva para a conquista do selo <strong className="text-purple-300">Hire-Ready Data Scientist I</strong>. A banca de diretores avaliará seu domínio conceitual em 4 Atos encadeados, culminando na mecânica da <strong className="text-white">Pergunta Invertida</strong>, onde você assume a iniciativa estratégica.
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {isFinalBossCompleted ? (
                        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
                          <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Aprovado pelo Comitê!
                          </div>
                          <div className="text-xs text-slate-400">Selo Hire-Ready Conquistado</div>
                        </div>
                      ) : finalBossUnlock.isUnlocked ? (
                        <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/50 text-center space-y-1 animate-pulse">
                          <div className="flex items-center justify-center gap-1.5 text-purple-300 font-bold text-sm">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            Portal do Comitê Aberto!
                          </div>
                          <div className="text-xs text-slate-300">8 SQL + 8 Python + 1.800 XP Atingidos</div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-900/50 text-center space-y-1">
                          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-xs font-mono">
                            <Lock className="w-3.5 h-3.5" />
                            Bloqueado por Requisitos
                          </div>
                          <div className="text-[11px] text-slate-400 space-y-0.5">
                            {finalBossUnlock.missingXp > 0 && (
                              <div>Faltam {finalBossUnlock.missingXp} XP</div>
                            )}
                            {finalBossUnlock.missingSqlCount && finalBossUnlock.missingSqlCount > 0 ? (
                              <div className="text-sky-300 font-mono">Faltam {finalBossUnlock.missingSqlCount} SQL</div>
                            ) : null}
                            {finalBossUnlock.missingPythonCount && finalBossUnlock.missingPythonCount > 0 ? (
                              <div className="text-emerald-300 font-mono">Faltam {finalBossUnlock.missingPythonCount} Python</div>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* The 4 Acts Showcase Grid */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-purple-300/80 font-semibold flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5" />
                      Estrutura da Sabatina em 4 Atos
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* Ato 1 */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/40 space-y-2 hover:border-purple-700/60 transition-colors">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-purple-400 font-bold">Ato 1</span>
                          <span className="text-slate-500 text-[10px]">Método STAR</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white">Fit Comportamental</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Relato de pressão extrema com prazos regulatórios e priorização de safras sob incerteza.
                        </p>
                      </div>

                      {/* Ato 2 */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/40 space-y-2 hover:border-purple-700/60 transition-colors">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-purple-400 font-bold">Ato 2</span>
                          <span className="text-slate-500 text-[10px]">Live Problem</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white">KS vs Acurácia</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Defesa estatística de por que um modelo com 98% de acurácia pode ser inútil para o risco de crédito.
                        </p>
                      </div>

                      {/* Ato 3 */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/40 space-y-2 hover:border-purple-700/60 transition-colors">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-purple-400 font-bold">Ato 3</span>
                          <span className="text-slate-500 text-[10px]">PCLD Bancária</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white">Defesa Executiva</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Cálculo de provisão de perda esperada (PE = EAD × PD × LGD) e sensibilidade a choques da Selic.
                        </p>
                      </div>

                      {/* Ato 4 */}
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/40 space-y-2 hover:border-purple-700/60 transition-colors">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-amber-400 font-bold">Ato 4</span>
                          <span className="text-amber-400/80 text-[10px]">Mecânica Chave</span>
                        </div>
                        <h4 className="text-sm font-semibold text-amber-200">A Pergunta Invertida</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          A mesa passa a palavra para você: formule 2 perguntas estratégicas para sabatinar a diretoria do banco.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progression Meters & Action CTA (3 Proportional Gauges) */}
                  <div className="p-5 rounded-xl bg-slate-950/80 border border-purple-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* 3 Gauges: XP, Mundo 1 (SQL), Mundo 2 (Python) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 flex-1">
                      {/* Gauge 1: XP */}
                      <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-purple-900/30">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono">XP Requerido</span>
                          <span className={`font-mono font-bold ${xp >= reqXp ? 'text-emerald-400' : 'text-purple-300'}`}>
                            {xp} / {reqXp} XP
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              xp >= reqXp ? 'bg-emerald-400' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                            }`}
                            style={{ width: `${xpPercent}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-right font-mono text-slate-500">{xpPercent}% atingido</div>
                      </div>

                      {/* Gauge 2: Mundo 1 (SQL) */}
                      <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-sky-900/30">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-sky-400 font-mono flex items-center gap-1">
                            <Database className="w-3 h-3" />
                            Mundo 1 (SQL)
                          </span>
                          <span className={`font-mono font-bold ${sqlCompletedCount >= reqSql ? 'text-emerald-400' : 'text-sky-300'}`}>
                            {sqlCompletedCount} / {reqSql}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              sqlCompletedCount >= reqSql ? 'bg-emerald-400' : 'bg-gradient-to-r from-sky-500 to-blue-500'
                            }`}
                            style={{ width: `${sqlPercent}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-right font-mono text-slate-500">Mín. 8 desafios SQL</div>
                      </div>

                      {/* Gauge 3: Mundo 2 (Python) */}
                      <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-emerald-900/30">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-emerald-400 font-mono flex items-center gap-1">
                            <Binary className="w-3 h-3" />
                            Mundo 2 (Python)
                          </span>
                          <span className={`font-mono font-bold ${pyCompletedCount >= reqPy ? 'text-emerald-400' : 'text-emerald-300'}`}>
                            {pyCompletedCount} / {reqPy}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              pyCompletedCount >= reqPy ? 'bg-emerald-400' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            }`}
                            style={{ width: `${pyPercent}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-right font-mono text-slate-500">Mín. 8 desafios Python</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0">
                      {finalBossUnlock.isUnlocked ? (
                        <button
                          onClick={() => {
                            onSelectChallenge(finalBossChallenge);
                            onStartArena();
                          }}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Crown className="w-4 h-4 text-amber-300" />
                          <span>{isFinalBossCompleted ? 'Repetir Sabatina com o Comitê' : 'Enfrentar o Comitê Executivo (Iniciar Sabatina)'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setLockedModal({ challenge: finalBossChallenge, status: finalBossUnlock })}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-xs bg-slate-900 border border-purple-900/80 text-purple-300/80 hover:border-purple-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Ver Pré-Requisitos para Desbloquear</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Locked Challenge Informational Modal */}
      {lockedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setLockedModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase">Desafio Bloqueado</span>
                <h3 className="text-base font-bold text-white mt-0.5">{lockedModal.challenge.title}</h3>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>XP Necessário:</span>
                <span className="font-mono font-bold text-amber-400">{lockedModal.status.requiredXp} XP</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Seu XP Atual:</span>
                <span className="font-mono font-bold text-white">{xp} XP</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-slate-800">
                <span>Faltam para Desbloquear:</span>
                <span className="font-mono font-bold text-sky-400">
                  {lockedModal.status.missingXp > 0 ? `${lockedModal.status.missingXp} XP` : '0 XP (verifique os desafios)'}
                </span>
              </div>
              {lockedModal.status.minSqlCompleted && (
                <div className="flex items-center justify-between text-slate-300 pt-1">
                  <span>Desafios SQL Concluídos:</span>
                  <span className="font-mono font-bold text-sky-400">
                    {sqlCompletedCount} / {lockedModal.status.minSqlCompleted}
                  </span>
                </div>
              )}
              {lockedModal.status.minPythonCompleted && (
                <div className="flex items-center justify-between text-slate-300 pt-1">
                  <span>Desafios Python Concluídos:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {pyCompletedCount} / {lockedModal.status.minPythonCompleted}
                  </span>
                </div>
              )}
              {lockedModal.status.minCompletedChallenges > 0 && (
                <div className="flex items-center justify-between text-slate-300 pt-1">
                  <span>Desafios Totais Mínimos:</span>
                  <span className="font-mono font-bold text-purple-300">
                    {completedChallengeIds.length} / {lockedModal.status.minCompletedChallenges}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              💡 <strong>Como ganhar XP:</strong> Resolva os desafios anteriores nos níveis Básico e Intermediário de cada mundo. O Agente Avaliador concede de <strong>+50 a +190 XP</strong> por exercício dependendo da sua nota técnica.
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setLockedModal(null)}
                className="w-full px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Entendido, vou avançar na trilha!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
