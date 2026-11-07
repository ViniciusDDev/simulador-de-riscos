import React, { useState, useEffect } from 'react';
import { X, Clock, Sparkles, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { WARMUP_QUESTIONS, WarmupQuestion } from '../data/challenges';

interface WarmupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardXp: (amount: number) => void;
}

export const WarmupModal: React.FC<WarmupModalProps> = ({
  isOpen,
  onClose,
  onAwardXp,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  useEffect(() => {
    if (!isOpen) {
      resetQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setIsFinished(false);
    setTimeLeft(180);
  };

  if (!isOpen) return null;

  const currentQ: WarmupQuestion = WARMUP_QUESTIONS[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctOptionIndex;
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
      onAwardXp(35);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < WARMUP_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Aquecimento Rápido (Daily Warm-up)</h2>
              <div className="text-[11px] font-mono text-slate-400">
                Questão {currentQuestionIndex + 1} de {WARMUP_QUESTIONS.length} · {currentQ.conceptTag}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {!isFinished ? (
            <>
              {/* Question */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-sky-400">{currentQ.title}</span>
                <h3 className="text-sm font-semibold text-white leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctOptionIndex;

                  let borderClass = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700';
                  if (isSelected) {
                    borderClass = 'border-sky-500 bg-sky-950/40 text-white ring-1 ring-sky-500';
                  }
                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      borderClass = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 cursor-pointer disabled:cursor-default ${borderClass}`}
                    >
                      <span className="font-mono text-slate-500 font-bold shrink-0">
                        {String.fromCharCode(65 + idx)})
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation card after submit */}
              {isAnswerSubmitted && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                    selectedOption === currentQ.correctOptionIndex
                      ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                      : 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                  }`}
                >
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    {selectedOption === currentQ.correctOptionIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Excelente! Resposta correta (+35 XP).</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span>Atenção ao critério bancário:</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300">{currentQ.explanation}</p>
                </div>
              )}
            </>
          ) : (
            /* Finished Summary Card */
            <div className="py-6 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Aquecimento Concluído!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Você acertou <strong className="text-emerald-400">{correctAnswersCount}</strong> de{' '}
                  <strong>{WARMUP_QUESTIONS.length}</strong> conceitos rápidos.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 inline-block text-xs font-mono text-amber-300">
                +{correctAnswersCount * 35} XP conquistados para sua Ficha de Risco
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-t border-slate-800">
          {!isFinished ? (
            <>
              <div className="text-[11px] text-slate-500 font-mono">
                Treino conceitual para fixação imediata
              </div>
              <div>
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedOption === null}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                  >
                    Confirmar Resposta
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{currentQuestionIndex < WARMUP_QUESTIONS.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={resetQuiz}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repetir Aquecimento</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
