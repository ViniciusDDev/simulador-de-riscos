import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WorldMap } from './components/WorldMap';
import { InterviewArena } from './components/InterviewArena';
import { BugHuntArena } from './components/BugHuntArena';
import { RpgCharacterSheet } from './components/RpgCharacterSheet';
import { AdkArchitectureModal } from './components/AdkArchitectureModal';
import { GatingModal, UserConfig } from './components/GatingModal';
import { PortfolioPostModal } from './components/PortfolioPostModal';
import { WarmupModal } from './components/WarmupModal';
import { TitleScreen } from './components/TitleScreen';
import { CHALLENGES, Challenge } from './data/challenges';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'roadmap' | 'arena' | 'bugs' | 'ficha' | 'arquitetura'>('roadmap');
  const [showTitleScreen, setShowTitleScreen] = useState(true);

  // User Profile & Gating State
  const [userConfig, setUserConfig] = useState<UserConfig>(() => {
    const saved = localStorage.getItem('simulador_riscos_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      currentWorld: 'Mundo 1: 100% SQL Bancário',
      worldId: 1,
      experienceLevel: 'Lógica básica, começando em Python e SQL do zero',
      interviewerPersona: 'equilibrado',
      seniorTokensEnabled: true,
      targetRole: 'Data Scientist I - Riscos (Ferramentas de Projeções)',
    };
  });

  const [isGatingOpen, setIsGatingOpen] = useState(false);
  const [isWarmupOpen, setIsWarmupOpen] = useState(false);

  // RPG State & Gamification
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('simulador_riscos_xp');
    return saved ? parseInt(saved, 10) : 150;
  });

  const [tokens, setTokens] = useState<number>(() => {
    const saved = localStorage.getItem('simulador_riscos_tokens');
    return saved ? parseInt(saved, 10) : 50;
  });

  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('simulador_riscos_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [attributes, setAttributes] = useState(() => {
    const saved = localStorage.getItem('simulador_riscos_attributes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      sqlFinanceiro: 45,
      regressaoLogistica: 40,
      metricasValidacao: 50,
      visaoNegocio: 42,
      comunicacaoExecutiva: 48,
    };
  });

  const [activeChallenge, setActiveChallenge] = useState<Challenge>(CHALLENGES[0]);

  // LinkedIn Modal State
  const [isLinkedInOpen, setIsLinkedInOpen] = useState(false);
  const [linkedInChallenge, setLinkedInChallenge] = useState<Challenge | null>(null);
  const [linkedInSolution, setLinkedInSolution] = useState<string>('');
  const [linkedInPerformance, setLinkedInPerformance] = useState<any>(null);

  // Persist State
  useEffect(() => {
    localStorage.setItem('simulador_riscos_config', JSON.stringify(userConfig));
  }, [userConfig]);

  useEffect(() => {
    localStorage.setItem('simulador_riscos_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('simulador_riscos_tokens', tokens.toString());
  }, [tokens]);

  useEffect(() => {
    localStorage.setItem('simulador_riscos_completed', JSON.stringify(completedChallengeIds));
  }, [completedChallengeIds]);

  useEffect(() => {
    localStorage.setItem('simulador_riscos_attributes', JSON.stringify(attributes));
  }, [attributes]);

  const getLevelName = (currentXp: number): string => {
    if (currentXp >= 1500) return 'Hire-Ready Data Scientist I';
    if (currentXp >= 900) return 'Nível 3: Modelador de Crédito';
    if (currentXp >= 400) return 'Nível 2: Analista Júnior I';
    return 'Nível 1: Estagiário de Riscos';
  };

  const levelName = getLevelName(xp);

  const handleUpdateXpAndTokens = (xpDelta: number, tokenDelta: number) => {
    setXp((prev) => Math.max(0, prev + xpDelta));
    setTokens((prev) => Math.max(0, prev + tokenDelta));
  };

  const handleChallengeComplete = (challengeId: string, evaluation: any) => {
    if (!completedChallengeIds.includes(challengeId)) {
      setCompletedChallengeIds((prev) => [...prev, challengeId]);
    }

    if (evaluation.radarAttributes) {
      setAttributes((prev: any) => ({
        sqlFinanceiro: Math.max(prev.sqlFinanceiro, evaluation.radarAttributes.sqlFinanceiro),
        regressaoLogistica: Math.max(prev.regressaoLogistica, evaluation.radarAttributes.regressaoLogistica),
        metricasValidacao: Math.max(prev.metricasValidacao, evaluation.radarAttributes.metricasValidacao),
        visaoNegocio: Math.max(prev.visaoNegocio, evaluation.radarAttributes.visaoNegocio),
        comunicacaoExecutiva: Math.max(prev.comunicacaoExecutiva, evaluation.radarAttributes.comunicacaoExecutiva),
      }));
    }
  };

  const handleOpenLinkedInModal = (ch: Challenge, sol: string, perf: any) => {
    setLinkedInChallenge(ch);
    setLinkedInSolution(sol);
    setLinkedInPerformance(perf);
    setIsLinkedInOpen(true);
  };

  const handleSaveConfig = (newConfig: UserConfig) => {
    setUserConfig(newConfig);
    const challengeForWorld = CHALLENGES.find((c) => c.worldId === newConfig.worldId);
    if (challengeForWorld) {
      setActiveChallenge(challengeForWorld);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Universal Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        xp={xp}
        tokens={tokens}
        levelName={levelName}
        onOpenGating={() => setIsGatingOpen(true)}
        onOpenWarmup={() => setIsWarmupOpen(true)}
        onOpenTitleScreen={() => setShowTitleScreen(true)}
      />

      {/* Arcade / RPG Title Screen */}
      {showTitleScreen && (
        <TitleScreen onStart={() => setShowTitleScreen(false)} />
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'roadmap' && (
          <WorldMap
            completedChallengeIds={completedChallengeIds}
            activeChallenge={activeChallenge}
            onSelectChallenge={(ch) => setActiveChallenge(ch)}
            onStartArena={() => setCurrentTab('arena')}
            xp={xp}
          />
        )}

        {currentTab === 'arena' && (
          <InterviewArena
            challenge={activeChallenge}
            config={userConfig}
            xp={xp}
            tokens={tokens}
            completedChallengeIds={completedChallengeIds}
            onUpdateXpAndTokens={handleUpdateXpAndTokens}
            onChallengeComplete={handleChallengeComplete}
            onOpenLinkedInModal={handleOpenLinkedInModal}
            onSelectNextChallenge={(nextCh) => setActiveChallenge(nextCh)}
            onBackToRoadmap={() => setCurrentTab('roadmap')}
          />
        )}

        {currentTab === 'bugs' && (
          <BugHuntArena
            completedChallengeIds={completedChallengeIds}
            xp={xp}
            onSelectChallengeForArena={(ch) => {
              setActiveChallenge(ch);
              setCurrentTab('arena');
            }}
            onUpdateXpAndTokens={handleUpdateXpAndTokens}
            onChallengeComplete={handleChallengeComplete}
            onOpenLinkedInModal={handleOpenLinkedInModal}
          />
        )}

        {currentTab === 'ficha' && (
          <RpgCharacterSheet
            xp={xp}
            tokens={tokens}
            levelName={levelName}
            completedChallengeIds={completedChallengeIds}
            attributes={attributes}
          />
        )}

        {currentTab === 'arquitetura' && <AdkArchitectureModal />}
      </main>

      {/* Global Modals */}
      <GatingModal
        isOpen={isGatingOpen}
        onClose={() => setIsGatingOpen(false)}
        config={userConfig}
        onSaveConfig={handleSaveConfig}
        onOpenWarmup={() => setIsWarmupOpen(true)}
      />

      <WarmupModal
        isOpen={isWarmupOpen}
        onClose={() => setIsWarmupOpen(false)}
        onAwardXp={(pts) => handleUpdateXpAndTokens(pts, 5)}
      />

      <PortfolioPostModal
        isOpen={isLinkedInOpen}
        onClose={() => setIsLinkedInOpen(false)}
        challenge={linkedInChallenge}
        solution={linkedInSolution}
        performance={linkedInPerformance}
      />

      {/* Quiet, unpretentious footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Simulador Agêntico de Entrevistas · Data Science & Riscos Financeiros</span>
          <span>12 SQL · 12 Python · 6 Caça ao Bug · Boss Final em 4 Atos com Pergunta Invertida</span>
        </div>
      </footer>
    </div>
  );
}
