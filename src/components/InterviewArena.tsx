import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  ArrowLeft,
  ShieldAlert, 
  MessageSquare, 
  Code2, 
  Share2, 
  UserCheck, 
  Award,
  Loader2,
  Bug,
  HelpCircle,
  Layout,
  Columns,
  Terminal,
  BookOpen,
  Lock
} from 'lucide-react';
import { Challenge, CHALLENGES, checkChallengeUnlock } from '../data/challenges';
import { SqlSandbox } from './SqlSandbox';
import { PythonModelingSandbox } from './PythonModelingSandbox';
import { UserConfig } from './GatingModal';

interface Message {
  id: string;
  sender: 'interviewer' | 'candidate' | 'evaluator' | 'mentor';
  text: string;
  timestamp: string;
}

interface EvaluationResult {
  score: number;
  passed: boolean;
  xpEarned: number;
  radarAttributes: {
    sqlFinanceiro: number;
    regressaoLogistica: number;
    metricasValidacao: number;
    visaoNegocio: number;
    comunicacaoExecutiva: number;
  };
  feedbackTitle: string;
  strengths: string[];
  improvementPoints: string[];
  detailedFeedback: string;
  executiveVerdict: string;
}

interface InterviewArenaProps {
  challenge: Challenge;
  config: UserConfig;
  xp: number;
  tokens: number;
  completedChallengeIds?: string[];
  onUpdateXpAndTokens: (xpDelta: number, tokenDelta: number) => void;
  onChallengeComplete: (challengeId: string, evaluation: EvaluationResult) => void;
  onOpenLinkedInModal: (challenge: Challenge, solution: string, evalResult: EvaluationResult) => void;
  onSelectNextChallenge: (challenge: Challenge) => void;
  onBackToRoadmap?: () => void;
}

export const InterviewArena: React.FC<InterviewArenaProps> = ({
  challenge,
  config,
  xp,
  tokens,
  completedChallengeIds = [],
  onUpdateXpAndTokens,
  onChallengeComplete,
  onOpenLinkedInModal,
  onSelectNextChallenge,
  onBackToRoadmap,
}) => {
  // View mode within exercise: 'code_focus' (default IDE), 'split' (side-by-side), 'chat_focus'
  const [viewMode, setViewMode] = useState<'code_focus' | 'split' | 'chat_focus'>('code_focus');
  const [userCode, setUserCode] = useState(challenge.initialCode || '');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [showHintModal, setShowHintModal] = useState(false);

  // Synchronize state when challenge changes
  useEffect(() => {
    setUserCode(challenge.initialCode || '');
    setEvaluation(null);
    setMessages([
      {
        id: '1',
        sender: 'interviewer',
        text: challenge.isBugHunt
          ? `Bem-vindo ao Code Review do Desafio "${challenge.title}"!\n\nContexto de Negócio:\n"${challenge.businessContext}"\n\nAponte a linha onde ocorre o bug silencioso e escreva a versão corrigida na bancada de código.`
          : challenge.isReverseQuestion
          ? `Bem-vindo à Sabatina Final do Comitê de Risco!\n\n${challenge.description}\n\nAo final, acionaremos a Mecânica da Pergunta Invertida: você formulará 2 perguntas estratégicas para a banca sobre governança e safras do banco.`
          : `Olá! Sou o Tech Lead de Riscos Financeiros.\n\nContexto do Desafio:\n"${challenge.businessContext}"\n\nObjetivo:\n${challenge.description}\n\nVocê pode resolver diretamente na bancada de código ou debater sua hipótese comigo por aqui.`,
        timestamp: 'Início',
      },
    ]);
  }, [challenge.id]);

  const personaLabel =
    config.interviewerPersona === 'impiedoso'
      ? 'Tech Lead Cético (Impiedoso)'
      : config.interviewerPersona === 'amigavel'
      ? 'Mentor Encorajador (Amigável)'
      : 'Entrevistador Executivo (Equilibrado)';

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'candidate',
      text: inputText,
      timestamp: 'Agora',
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setLoadingAi(true);

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.sender === 'candidate' ? 'user' : 'model',
            content: m.text,
          })),
          persona: config.interviewerPersona,
          challengeContext: challenge.title + ' - ' + challenge.businessContext,
          userConfig: config,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'interviewer',
          text: data.text || 'Entendido. Como você implementa essa abordagem na bancada?',
          timestamp: 'Agora',
        },
      ]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'interviewer',
          text: 'Compreendo sua linha de raciocínio. Teste sua hipótese na bancada de código ao lado.',
          timestamp: 'Agora',
        },
      ]);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleRequestHint = async (level: number) => {
    const cost = level === 1 ? 5 : level === 2 ? 15 : 30;
    if (config.seniorTokensEnabled && tokens < cost) {
      alert(`Você não tem Senior Tokens suficientes (${tokens}/${cost}).`);
      return;
    }

    try {
      const res = await fetch('/api/agent/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challenge, level }),
      });
      const data = await res.json();

      if (config.seniorTokensEnabled) {
        onUpdateXpAndTokens(-cost, -cost);
      }

      setShowHintModal(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'mentor',
          text: `💡 **Dica do Mentor Sênior (Nível ${level}):**\n${data.hint}`,
          timestamp: 'Agora',
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitForEvaluation = async () => {
    setEvaluating(true);
    try {
      const response = await fetch('/api/agent/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge,
          userCodeOrAnswer: userCode || messages[messages.length - 1]?.text || 'Nenhum código fornecido',
          conversationHistory: messages,
        }),
      });

      const evalData: EvaluationResult = await response.json();
      setEvaluation(evalData);
      onUpdateXpAndTokens(evalData.xpEarned, 15);
      onChallengeComplete(challenge.id, evalData);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'evaluator',
          text: `📊 **Parecer da Banca Examinadora:**\nNota: **${evalData.score}/100** (${evalData.executiveVerdict})\n+${evalData.xpEarned} XP conquistados!\n\n${evalData.detailedFeedback}`,
          timestamp: 'Agora',
        },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  const currentIndex = CHALLENGES.findIndex((c) => c.id === challenge.id);
  const previousChallenge = currentIndex > 0 ? CHALLENGES[currentIndex - 1] : null;
  const nextChallenge = currentIndex >= 0 && currentIndex < CHALLENGES.length - 1 ? CHALLENGES[currentIndex + 1] : null;

  return (
    <div className="space-y-5 animate-fade-in max-w-7xl mx-auto">
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400 font-mono">
          {onBackToRoadmap && (
            <button
              onClick={onBackToRoadmap}
              className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Mundos de Treino</span>
            </button>
          )}
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span className="text-slate-300">{challenge.worldTitle}</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span className="text-white font-medium truncate max-w-[220px]">{challenge.title}</span>
        </div>

        {/* Quick Challenge Navigators */}
        <div className="flex items-center gap-2">
          {previousChallenge && (
            <button
              onClick={() => onSelectNextChallenge(previousChallenge)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
            >
              <ChevronLeft className="w-3 h-3" />
              <span>Anterior</span>
            </button>
          )}

          {nextChallenge && (
            <button
              onClick={() => {
                const status = checkChallengeUnlock(nextChallenge, xp, completedChallengeIds);
                if (!status.isUnlocked) {
                  alert(`🔒 Desafio Bloqueado: ${status.reason}`);
                  return;
                }
                onSelectNextChallenge(nextChallenge);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
            >
              <span>Próximo</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Challenge Header Card */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5 max-w-3xl">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="text-sky-400 font-semibold">{challenge.worldSubtitle}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-300">{challenge.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400">+{challenge.xpReward} XP</span>
            {challenge.isBugHunt && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-rose-400 flex items-center gap-1 font-semibold">
                  <Bug className="w-3 h-3" />
                  Code Review
                </span>
              </>
            )}
          </div>

          <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            {challenge.title}
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed">
            {challenge.businessContext}
          </p>
        </div>

        {/* View Mode Switcher and Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
          {/* View Mode Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('code_focus')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'code_focus'
                  ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Bancada de Código</span>
            </button>

            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'split'
                  ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Modo Dividido</span>
            </button>

            <button
              onClick={() => setViewMode('chat_focus')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'chat_focus'
                  ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Sabatina / Chat</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono hidden sm:inline">Avaliador:</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              {personaLabel}
            </span>

            {config.seniorTokensEnabled && (
              <button
                onClick={() => setShowHintModal(true)}
                className="px-2.5 py-1 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ml-2"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Dica</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* BACEN Regulatory Alert Banner */}
      {challenge.bacenAlert && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-xs text-rose-200 flex items-start gap-3 shadow-lg">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-rose-400 font-mono">
              Intervenção Regulatória do Banco Central (BACEN)
            </span>
            <p className="leading-relaxed text-slate-200">{challenge.bacenAlert}</p>
          </div>
        </div>
      )}

      {/* Reverse Questioning Banner */}
      {challenge.isReverseQuestion && (
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/80 text-xs text-purple-200 flex items-start gap-3 shadow-lg">
          <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-purple-400 font-mono">
              Mecânica da Pergunta Invertida Ativada
            </span>
            <p className="leading-relaxed text-slate-200">
              Ao final das respostas técnicas, você deve formular 2 perguntas estratégicas para a banca sobre governança de dados, auditoria do BACEN ou sensibilidade da carteira.
            </p>
          </div>
        </div>
      )}

      {/* Main Workspace based on viewMode */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chat (Shown in 'split' (5 cols) and 'chat_focus' (12 cols)) */}
        {(viewMode === 'split' || viewMode === 'chat_focus') && (
          <div
            className={`${
              viewMode === 'split' ? 'lg:col-span-5' : 'lg:col-span-12'
            } bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[650px]`}
          >
            {/* Chat Header */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Discussão Técnica com o Agente Entrevistador</span>
              </div>
              <div className="text-xs text-slate-500 font-mono">{personaLabel}</div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((m) => {
                const isUser = m.sender === 'candidate';
                const isEvaluator = m.sender === 'evaluator';
                const isMentor = m.sender === 'mentor';

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[11px] font-mono text-slate-500 mb-1 flex items-center gap-1.5">
                      {isUser ? (
                        <span>Você (Candidato)</span>
                      ) : isEvaluator ? (
                        <span className="text-purple-400 font-semibold flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Agente Avaliador (Banca)
                        </span>
                      ) : isMentor ? (
                        <span className="text-amber-400 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Mentor Sênior
                        </span>
                      ) : (
                        <span className="text-sky-400 font-semibold flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          {personaLabel}
                        </span>
                      )}
                      <span>·</span>
                      <span>{m.timestamp}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl max-w-[92%] leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-sky-600 text-white rounded-tr-none'
                          : isEvaluator
                          ? 'bg-purple-950/60 text-purple-100 border border-purple-800/60 rounded-tl-none'
                          : isMentor
                          ? 'bg-amber-950/50 text-amber-100 border border-amber-800/50 rounded-tl-none'
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {loadingAi && (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
                  <span>O Tech Lead está analisando seu ponto...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-slate-950 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Pergunte ao Tech Lead ou justifique seu raciocínio..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  disabled={loadingAi || !inputText.trim()}
                  className="p-2.5 bg-sky-400 text-slate-950 rounded-xl hover:bg-sky-300 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Right Column: Code Workstation (Shown in 'split' (7 cols) and 'code_focus' (12 cols)) */}
        {(viewMode === 'split' || viewMode === 'code_focus') && (
          <div
            className={`${
              viewMode === 'split' ? 'lg:col-span-7' : 'lg:col-span-12'
            } space-y-4`}
          >
            {/* Detailed Description Box for Code Focus */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="font-semibold text-sky-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  Enunciado & Critérios da Tarefa:
                </span>
                <span>{challenge.type.toUpperCase()}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {challenge.description}
              </p>
            </div>

            {/* Bug Hunt Code Preview if applicable */}
            {challenge.isBugHunt && challenge.buggyCode && (
              <div className="p-4 bg-slate-900 border border-amber-500/40 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                  <Bug className="w-4 h-4" />
                  <span>Código com Bug Silencioso sob Auditoria:</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-200/90 whitespace-pre overflow-x-auto leading-relaxed shadow-inner">
                  {challenge.buggyCode}
                </div>
              </div>
            )}

            {/* Sandbox Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-semibold text-white">
                    {challenge.type === 'sql'
                      ? 'Bancada Interativa de SQL Bancário'
                      : challenge.isBugHunt
                      ? 'Bancada de Code Review & Depuração'
                      : 'Bancada de Modelagem Python & Métricas de Risco'}
                  </h3>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  {challenge.datasetAvailable ? 'Cluster de Dados Conectado' : 'Ambiente Interativo'}
                </div>
              </div>

              {/* Sandbox Renderer */}
              {challenge.type === 'sql' ? (
                <SqlSandbox
                  initialCode={userCode}
                  onCodeChange={(code) => setUserCode(code)}
                  challengeTitle={challenge.title}
                />
              ) : (
                <PythonModelingSandbox
                  initialCode={userCode}
                  onCodeChange={(code) => setUserCode(code)}
                  challengeTitle={challenge.title}
                />
              )}

              {/* Submit Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  Terminou sua solução? Submeta para o Agente Avaliador emitir seu parecer.
                </div>

                <button
                  onClick={handleSubmitForEvaluation}
                  disabled={evaluating}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {evaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Avaliando pela Banca...</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Submeter para a Banca Examinadora</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Evaluator Verdict Card */}
            {evaluation && (
              <div className="p-5 rounded-2xl border border-purple-800/80 bg-gradient-to-b from-purple-950/30 to-slate-900 space-y-4 animate-fade-in shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-mono text-purple-300 flex items-center gap-2">
                      <span>Resultado do Agente Avaliador</span>
                      <span aria-hidden="true">·</span>
                      <span>Critérios Bradesco & BACEN</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">
                      {evaluation.feedbackTitle}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black font-mono text-purple-300 tabular-nums">
                      {evaluation.score}/100
                    </div>
                    <span className="text-xs font-mono text-emerald-400">+{evaluation.xpEarned} XP</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-purple-900/40">
                  {evaluation.detailedFeedback}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-emerald-950/30 border border-emerald-900/40 rounded-xl">
                    <span className="text-emerald-400 font-semibold block mb-1">Pontos Fortes:</span>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {evaluation.strengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded-xl">
                    <span className="text-amber-400 font-semibold block mb-1">Pontos de Atenção:</span>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {evaluation.improvementPoints.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenLinkedInModal(challenge, userCode, evaluation)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Share2 className="w-3.5 h-3.5 text-sky-400" />
                    Gerar Post para LinkedIn (Portfólio)
                  </button>

                  {nextChallenge && (
                    <button
                      onClick={() => {
                        setEvaluation(null);
                        onSelectNextChallenge(nextChallenge);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Próximo Desafio ({nextChallenge.title.slice(0, 24)}...)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Senior Tokens Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Agente Mentor Sênior (Dicas)</h3>
              </div>
              <span className="text-xs font-mono text-amber-400">{tokens} Tokens Restantes</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Em situações de trabalho reais, pedir ajuda a um colega sênior é incentivado, mas custa tempo da equipe. Escolha o nível de profundidade que você precisa:
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleRequestHint(1)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/50 hover:bg-amber-950/20 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-white">
                  <span>Nível 1: Dica Conceitual de Negócios</span>
                  <span className="text-amber-400 font-mono">-5 XP / Tokens</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Guia o raciocínio e a intuição sem entregar regras de código ou sintaxe.
                </p>
              </button>

              <button
                onClick={() => handleRequestHint(2)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/50 hover:bg-amber-950/20 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-white">
                  <span>Nível 2: Dica Prática de Sintaxe / Algoritmo</span>
                  <span className="text-amber-400 font-mono">-15 XP / Tokens</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Mostra a cláusula SQL ou o método matemático específico a ser aplicado.
                </p>
              </button>

              <button
                onClick={() => handleRequestHint(3)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/50 hover:bg-amber-950/20 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-white">
                  <span>Nível 3: Resolução Guiada e Código Comentado</span>
                  <span className="text-amber-400 font-mono">-30 XP / Tokens</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Explicação passo a passo da solução completa para estudo e fixação.
                </p>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHintModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
