import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI client with telemetry header as required by guidelines
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', hasApiKey: !!apiKey });
});

// Chat endpoint with specialized Agent personas
app.post('/api/agent/chat', async (req: Request, res: Response) => {
  const { messages, persona, challengeContext, userConfig } = req.body;

  const systemInstructions = `
Você é o Agente de Entrevistas e Desafios de Riscos Financeiros da plataforma "Simulador Agêntico de Entrevistas - Riscos & Data Science", inspirado nas exigências técnicas para Data Scientist I (Riscos e Ferramentas de Projeções) em grandes instituições bancárias e normas do BACEN.

Sua Persona Atual:
${persona === 'impiedoso' 
  ? 'TECH LEAD CÉTICO E RIGOROSO (Impiedoso): Você é ultra técnico, focado em detalhes regulatórios (BACEN), exige clareza matemática e questiona premissas frágeis. Se o usuário sugerir acurácia simples para dados de inadimplência, ou não souber interpretar coeficientes de regressão logística, aponte imediatamente com firmeza educada.' 
  : persona === 'amigavel'
  ? 'MENTOR ENCORAJADOR (Amigável): Você é acolhedor, valoriza o esforço do candidato, celebra acertos e guia com perguntas socráticas amigáveis para quem está em início de carreira.'
  : 'ENTREVISTADOR CORPORATIVO EQUILIBRADO: Você simula fielmente uma entrevista técnica formal de banco. Faz perguntas incisivas, testa a consistência dos dados e busca concisão executiva.'
}

Contexto do Treino Atual:
${challengeContext || 'Sabatina Geral de Risco Financeiro'}

Perfil do Candidato:
- Nível declarado: ${userConfig?.experienceLevel || 'Iniciante / Estudante'}
- Trilha: ${userConfig?.currentWorld || 'Mundo 1: SQL Bancário'}

Regras Fundamentais:
1. Responda SEMPRE em português do Brasil, de forma envolvente, realista e instrutiva.
2. Não dê a resposta pronta do exercício diretamente, a menos que o usuário peça a resolução explicitamente.
3. Estimule o candidato a justificar o "porquê" de suas decisões (ex: por que usar AUC-ROC ou KS em vez de acurácia; como interpretar o Odds Ratio de uma variável de atraso; como evitar produto cartesiano em SQL ou vazamento de dados em Python).
4. No modo "Caça ao Bug", teste se o candidato sabe apontar a linha exata do bug silencioso e explicar o risco contábil/estatístico.
5. Se for o "Boss Final", no encerramento, invoque a "Mecânica da Pergunta Invertida" dizendo: "Agora a palavra é sua: faça 2 perguntas estratégicas para a nossa mesa de riscos do banco". Avalie a maturidade das perguntas.
`;

  if (!aiClient) {
    const fallbackResponse = generateDeterministicFallbackChat(messages, persona, challengeContext);
    return res.json({ text: fallbackResponse });
  }

  try {
    const chatContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction: systemInstructions,
      },
    });

    return res.json({ text: response.text || 'Entendi sua colocação. Pode prosseguir com sua resposta técnica?' });
  } catch (error: any) {
    console.error('Gemini API chat error:', error);
    const fallback = generateDeterministicFallbackChat(messages, persona, challengeContext);
    return res.json({ text: fallback, notice: 'Resposta gerada pelo motor local estruturado.' });
  }
});

// Evaluation endpoint
app.post('/api/agent/evaluate', async (req: Request, res: Response) => {
  const { challenge, userCodeOrAnswer, conversationHistory } = req.body;

  const evaluationPrompt = `
Você é o Agente Avaliador (Juiz Técnico de Riscos Financeiros e Banca Examinadora Bancária).
Analise a resposta técnica do candidato para a vaga de Data Scientist I - Riscos (Ferramentas de Projeções).

DESAFIO:
Título: ${challenge.title}
Tipo: ${challenge.type} (SQL, Python, Caça ao Bug, Boss Final com Pergunta Invertida)
Enunciado: ${challenge.description}
Critérios Chave: ${challenge.expectedCriteria}
${challenge.bacenAlert ? `Alerta BACEN Ativo: ${challenge.bacenAlert}` : ''}
${challenge.isReverseQuestion ? 'Mecânica da Pergunta Invertida Ativa: O candidato deve formular 2 perguntas estratégicas para a banca.' : ''}

RESPOSTA / CÓDIGO DO CANDIDATO:
"""
${userCodeOrAnswer}
"""

Avalie com rigor técnico e devolva ESTRITAMENTE em formato JSON com o seguinte schema:
{
  "score": number (0 a 100),
  "passed": boolean (true se score >= 65),
  "xpEarned": number (entre 50 e 250 baseado na qualidade),
  "radarAttributes": {
    "sqlFinanceiro": number (0 a 100),
    "regressaoLogistica": number (0 a 100),
    "metricasValidacao": number (0 a 100),
    "visaoNegocio": number (0 a 100),
    "comunicacaoExecutiva": number (0 a 100)
  },
  "feedbackTitle": string,
  "strengths": string[],
  "improvementPoints": string[],
  "detailedFeedback": string,
  "executiveVerdict": string (ex: "Hire-Ready para a Safra", "Aprovado com Ressalvas", "Precisa Reforçar Conceitos")
}
`;

  if (!aiClient) {
    const mockEval = generateDeterministicEvaluation(challenge, userCodeOrAnswer);
    return res.json(mockEval);
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: evaluationPrompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Gemini evaluation error:', error);
    const fallback = generateDeterministicEvaluation(challenge, userCodeOrAnswer);
    return res.json(fallback);
  }
});

// Hint endpoint (Senior Mentor agent)
app.post('/api/agent/hint', async (req: Request, res: Response) => {
  const { challenge, level } = req.body;

  if (!aiClient) {
    return res.json({
      hint: challenge.hints[level - 1] || 'Revise as definições das safras e a métrica AUC-ROC para bases desbalanceadas.',
    });
  }

  try {
    const hintPrompt = `
Você é o Agente Mentor Sênior de Riscos Financeiros.
O usuário está no desafio "${challenge.title}".
Enunciado: ${challenge.description}
Critério esperado: ${challenge.expectedCriteria}

Forneça uma dica de Nível ${level}:
- Nível 1: Dica conceitual sem código.
- Nível 2: Dica prática de sintaxe ou estrutura.
- Nível 3: Resolução comentada e explicação didática.

Responda em português, de forma concisa.
`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: hintPrompt,
    });

    return res.json({ hint: response.text });
  } catch (error) {
    return res.json({
      hint: challenge.hints[level - 1] || 'Lembre-se de verificar se o agrupamento condicional e o Odds Ratio refletem as regras bancárias.',
    });
  }
});

// Portfolio post generator
app.post('/api/agent/portfolio', async (req: Request, res: Response) => {
  const { challenge, userSolution, performance } = req.body;

  const prompt = `
Você é o Agente de Documentação & Portfólio.
Crie um post de LinkedIn de alto impacto e profissional, mostrando a resolução de um desafio prático de Ciência de Dados para Risco de Crédito / Projeções Bancárias.

Dados do Desafio:
- Título: ${challenge.title}
- Trilha: ${challenge.worldTitle}
- Solução do Aluno: ${userSolution}
- Nota obtida: ${performance?.score || 90}/100

Retorne em Markdown limpo pronto para copiar.
`;

  if (!aiClient) {
    return res.json({ post: generateDeterministicPost(challenge, userSolution) });
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });
    return res.json({ post: response.text });
  } catch (e) {
    return res.json({ post: generateDeterministicPost(challenge, userSolution) });
  }
});

function generateDeterministicFallbackChat(messages: any[], persona: string, context: string): string {
  const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';

  if (lastMsg.includes('leakage') || lastMsg.includes('vazamento')) {
    return `Exatamente! Aplicar fit_transform antes do train_test_split vaza parâmetros populacionais do teste (como média e desvio padrão) para dentro do modelo de treino. Em produção, os dados reais não estarão disponíveis com antecedência, gerando uma queda brutal de performance. Como você reescreveria usando Pipeline do Scikit-Learn?`;
  }

  if (lastMsg.includes('cartesiano') || lastMsg.includes('duplicou') || lastMsg.includes('join')) {
    return `Perfeita observação de Code Review. O relacionamento entre contratos e faturas é de 1 para N. Fazer o SUM(valor_contratado) diretamente no JOIN duplica o valor tantas vezes quantas faturas houver. Como você pré-agrega as faturas antes do JOIN?`;
  }

  if (lastMsg.includes('bacen') || lastMsg.includes('vies') || lastMsg.includes('viés')) {
    return `Ponto crítico de governança! O Banco Central veta expressamente variáveis que criem discriminação velada ou redlining (como bairro ou CEP em certos contextos). Ao retirar essa variável, o modelo perde um pouco de KS imediato, mas ganha estabilidade regulatória e segurança jurídica. Que variável comportamental você incluiria no lugar?`;
  }

  if (persona === 'impiedoso') {
    return `Entendi sua colocação, mas vamos aprofundar: em um comitê executivo de risco de uma instituição financeira, como você defende esse número perante uma auditoria que questiona se a sua métrica KS não está sofrendo de overfitting temporal?`;
  }

  return `Muito interessante a sua linha de raciocínio. Na prática de riscos financeiros, conectar a métrica estatística com a governança contábil do banco é o diferencial de um Data Scientist I. Como você conclui sua resposta?`;
}

function generateDeterministicEvaluation(challenge: any, answer: string): any {
  const answerLower = (answer || '').toLowerCase();
  let score = 78;
  const strengths: string[] = [];
  const improvementPoints: string[] = [];

  if (challenge.isBugHunt) {
    if (answerLower.includes('join') || answerLower.includes('cartesiano') || answerLower.includes('leakage') || answerLower.includes('split') || answerLower.includes('vazamento')) {
      score += 15;
      strengths.push('Identificou com precisão cirúrgica a falha silenciosa no Code Review.');
    } else {
      score -= 15;
      improvementPoints.push('Não apontou a causa-raiz do erro silencioso no código.');
    }
  }

  if (challenge.bacenAlert && (answerLower.includes('bacen') || answerLower.includes('remover') || answerLower.includes('eliminar') || answerLower.includes('viés') || answerLower.includes('vies'))) {
    score += 8;
    strengths.push('Respeitou o Alerta de Compliance do BACEN removendo a feature discriminatória.');
  }

  if (challenge.isReverseQuestion) {
    if (answerLower.includes('?') || answerLower.includes('pergunta') || answerLower.includes('como o banco') || answerLower.includes('governança')) {
      score += 10;
      strengths.push('Formulou perguntas maduras e de alto calibre estratégico para a mesa de riscos.');
    } else {
      improvementPoints.push('Lembre-se de incluir as 2 perguntas estratégicas para a banca na Pergunta Invertida.');
    }
  }

  if (answerLower.includes('ks') || answerLower.includes('auc') || answerLower.includes('odds') || answerLower.includes('safra')) {
    score += 5;
    strengths.push('Domínio do vocabulário técnico e regulatório de crédito.');
  }

  score = Math.min(98, Math.max(50, score));
  const passed = score >= 65;

  return {
    score,
    passed,
    xpEarned: passed ? 130 + Math.floor(score * 0.7) : 45,
    radarAttributes: {
      sqlFinanceiro: challenge.type === 'sql' ? Math.min(100, score + 4) : 80,
      regressaoLogistica: challenge.type === 'python' ? Math.min(100, score + 2) : 78,
      metricasValidacao: Math.min(100, score + 3),
      visaoNegocio: Math.min(100, score),
      comunicacaoExecutiva: challenge.isReverseQuestion ? Math.min(100, score + 5) : 75,
    },
    feedbackTitle: passed ? 'Aprovado pela Banca Técnica!' : 'Revisão Recomendada',
    strengths,
    improvementPoints: improvementPoints.length ? improvementPoints : ['Continue exercitando a síntese executiva.'],
    detailedFeedback: `A avaliação demonstrou consistência técnica com as exigências de modelagem de risco para bancos e auditoria BACEN.`,
    executiveVerdict: passed ? 'Hire-Ready para a Trilha de Riscos e Projeções' : 'Aprofundar critérios regulatórios e depuração silenciosa',
  };
}

function generateDeterministicPost(challenge: any, solution: string): string {
  return `🚀 **Desafio Concluído: Modelagem de Risco e Governança Bancária**

Hoje resolvi um case prático focado em Ciência de Dados aplicada a **Riscos Financeiros**:
📌 **Tema:** ${challenge.title}
📊 **Trilha:** ${challenge.worldTitle}

Neste exercício, trabalhei na análise de crédito e modelagem preditiva com ênfase em:
- Métricas regulatórias robustas (**AUC-ROC** e índice **KS**).
- Conformidade com normativas do Banco Central (BACEN) e mitigação de viés algorítmico.
- Depuração de códigos legados e prevenção de Data Leakage em pipelines analíticos.

#DataScience #RiskAnalytics #CreditRisk #MachineLearning #Python #SQL #BankingCompliance`;
}

// Fullstack Vite mounting
async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
