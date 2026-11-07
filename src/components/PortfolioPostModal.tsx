import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, Sparkles, Loader2 } from 'lucide-react';
import { Challenge } from '../data/challenges';

interface PortfolioPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge | null;
  solution: string;
  performance: any;
}

export const PortfolioPostModal: React.FC<PortfolioPostModalProps> = ({
  isOpen,
  onClose,
  challenge,
  solution,
  performance,
}) => {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && challenge) {
      generatePost();
    }
  }, [isOpen, challenge]);

  const generatePost = async () => {
    if (!challenge) return;
    setLoading(true);

    try {
      const res = await fetch('/api/agent/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challenge,
          userSolution: solution,
          performance,
        }),
      });
      const data = await res.json();
      setPostContent(data.post || getDefaultPost(challenge));
    } catch (e) {
      setPostContent(getDefaultPost(challenge));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultPost = (ch: Challenge) => {
    return `🚀 **Novo Case Prático: Ciência de Dados & Risco Bancário**

Hoje concluí um desafio prático focado na modelagem de crédito e projeções financeiras:
📌 **Desafio:** ${ch.title}
📊 **Trilha:** ${ch.worldTitle}

Neste case, desenvolvi e validei uma solução técnica abordando:
- Extração de safras e tratamento de contratos reestruturados em SQL.
- Validação estatística rigorosa com foco em **AUC-ROC** e o índice **KS (Kolmogorov-Smirnov)**, superando o viés da acurácia simples em bases de dados desbalanceadas.
- Interpretação direta dos coeficientes por meio de **Odds Ratio** para atendimento às normas de explicabilidade e governança do Banco Central (BACEN).

Construir essa solução me permitiu conectar a teoria de dados com o impacto direto na rentabilidade e gestão de capital bancário.

#DataScience #CreditRisk #FinancialRisk #MachineLearning #Python #SQL #RiskManagement #Banking`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(postContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !challenge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Gerador de Portfólio (Post para LinkedIn)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          O <strong>Agente de Documentação & Portfólio</strong> estruturou a resolução do seu desafio em formato profissional para compartilhar na sua rede:
        </p>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-xs text-slate-400 font-mono">
            <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
            <span>O Agente está redigindo seu post de portfólio...</span>
          </div>
        ) : (
          <div className="relative">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={12}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed resize-y focus:outline-none focus:border-sky-500"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-500 font-mono">
            Dica: Adicione uma captura de tela da bancada de testes para gerar mais engajamento.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Fechar
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Post'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
