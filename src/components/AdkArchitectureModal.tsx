import React, { useState } from 'react';
import { Code2, Copy, Check, Download, FileText, Terminal, Laptop, ExternalLink } from 'lucide-react';
import { ADK_PROJECT_FILES, AdkFile } from '../data/adkFiles';

export const AdkArchitectureModal: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<AdkFile>(ADK_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (file: AdkFile) => {
    const isPython = file.name.endsWith('.py');
    const blob = new Blob([file.content], { 
      type: isPython ? 'text/x-python;charset=utf-8' : 'text/markdown;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    ADK_PROJECT_FILES.forEach((file, index) => {
      setTimeout(() => {
        handleDownloadFile(file);
      }, index * 150);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header Info Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-2">
          <div className="text-xs font-mono text-sky-400 flex items-center gap-2">
            <span>Arquitetura Profissional Google ADK</span>
            <span aria-hidden="true">·</span>
            <span>Pronto para Execução Local com Ollama</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Repositório de Arquivos & Estrutura de Agentes
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Aqui estão todos os arquivos estruturados do projeto (<code>AGENTS.md</code>, <code>SKILL.md</code>, <code>README.md</code>, <code>workflow.md</code> e código Python). Você pode inspecionar, copiar individualmente ou levar para o seu computador.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownloadAll}
            className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Todos os Arquivos</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + File Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Files List (4 cols) */}
        <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Arquivos da Estrutura ADK
          </div>

          {ADK_PROJECT_FILES.map((file) => {
            const isSelected = selectedFile.name === file.name;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-sky-500/10 border border-sky-500/40 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <FileText
                  className={`w-4 h-4 mt-0.5 shrink-0 ${
                    isSelected ? 'text-sky-400' : 'text-slate-500'
                  }`}
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold font-mono truncate">{file.name}</div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{file.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Code/Markdown Viewer (8 cols) */}
        <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {/* File Toolbar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-sky-400 font-semibold">{selectedFile.path}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>

              <button
                onClick={() => handleDownloadFile(selectedFile)}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar</span>
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-5 bg-slate-950 overflow-x-auto max-h-[600px] text-xs font-mono text-slate-200 leading-relaxed whitespace-pre selection:bg-sky-500/30">
            {selectedFile.content}
          </div>
        </div>
      </div>

      {/* Local Setup Tutorial Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <Laptop className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Transição para Execução Local 100% Gratuita (Sem Custos de Tokens)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Como colocar seu entrevistador para rodar na sua máquina quando terminar seus estudos no Google AI Studio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-mono text-sky-400 font-bold">1. Baixar o Ollama</span>
            <p className="text-slate-300 leading-relaxed">
              Instale o programa gratuito em <code>ollama.com</code>. Ele funciona como o motor local para rodar LLMs no seu PC.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-mono text-emerald-400 font-bold">2. Baixar o Modelo Qwen 2.5</span>
            <p className="text-slate-300 leading-relaxed">
              No terminal digite: <code>ollama run qwen2.5-coder:7b</code>. É o melhor modelo leve para SQL, Python e raciocínio lógico.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-mono text-purple-400 font-bold">3. Copiar os Prompts e Agentes</span>
            <p className="text-slate-300 leading-relaxed">
              Use o arquivo <code>ollama_local_guide.md</code> deste repositório para conectar seu script Python com zero custos!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
