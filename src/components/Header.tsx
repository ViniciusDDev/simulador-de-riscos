import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Code2, 
  Compass, 
  Zap, 
  Bug, 
  ChevronDown, 
  Settings, 
  FolderCode, 
  Sparkles,
  Layers
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'roadmap' | 'arena' | 'bugs' | 'ficha' | 'arquitetura';
  setCurrentTab: (tab: 'roadmap' | 'arena' | 'bugs' | 'ficha' | 'arquitetura') => void;
  xp: number;
  tokens: number;
  levelName: string;
  onOpenGating: () => void;
  onOpenWarmup: () => void;
  onOpenTitleScreen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  xp,
  tokens,
  levelName,
  onOpenGating,
  onOpenWarmup,
  onOpenTitleScreen,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSelectTab = (tab: 'roadmap' | 'arena' | 'bugs' | 'ficha' | 'arquitetura') => {
    setCurrentTab(tab);
    setIsMenuOpen(false);
  };

  const isSecondaryActive = currentTab === 'bugs' || currentTab === 'ficha' || currentTab === 'arquitetura';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <button
          onClick={() => setCurrentTab('roadmap')}
          className="text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-950 border border-sky-800/80 text-sky-400 group-hover:border-sky-500 transition-colors shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors whitespace-nowrap block">
                Simulador de Riscos
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-0.5 block">
                Data Science & BACEN
              </span>
            </div>
          </div>
        </button>

        {/* Clean Center Navigation: Primary Tabs + Dropdown Menu */}
        <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
          {/* 1. Mundos de Treino */}
          <button
            onClick={() => setCurrentTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-medium ${
              currentTab === 'roadmap'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Mundos de Treino</span>
          </button>

          {/* 2. Resolver Exercício */}
          <button
            onClick={() => setCurrentTab('arena')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-medium ${
              currentTab === 'arena'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4 text-sky-400" />
            <span>Resolver Exercício</span>
          </button>

          {/* 3. Dropdown Menu: Recursos & Perfil */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-medium ${
                isSecondaryActive || isMenuOpen
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Menu</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Popover */}
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 p-2 shadow-2xl shadow-slate-950/90 space-y-1 animate-fade-in z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
                  Módulos e Recursos
                </div>

                <button
                  onClick={() => handleSelectTab('bugs')}
                  className={`w-full p-2.5 rounded-xl text-left transition-colors cursor-pointer flex items-start gap-3 ${
                    currentTab === 'bugs' ? 'bg-amber-950/40 border border-amber-600/40 text-amber-200' : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-amber-950/60 border border-amber-700/40 text-amber-400 shrink-0 mt-0.5">
                    <Bug className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Caça ao Bug</div>
                    <div className="text-[11px] text-slate-400 leading-tight">Auditoria forense em SQL e Python</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTab('ficha')}
                  className={`w-full p-2.5 rounded-xl text-left transition-colors cursor-pointer flex items-start gap-3 ${
                    currentTab === 'ficha' ? 'bg-sky-950/40 border border-sky-600/40 text-sky-200' : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-sky-950/60 border border-sky-700/40 text-sky-400 shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Ficha Hire-Ready</div>
                    <div className="text-[11px] text-slate-400 leading-tight">Radar de atributos & relatório do candidato</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectTab('arquitetura')}
                  className={`w-full p-2.5 rounded-xl text-left transition-colors cursor-pointer flex items-start gap-3 ${
                    currentTab === 'arquitetura' ? 'bg-emerald-950/40 border border-emerald-600/40 text-emerald-200' : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-700/40 text-emerald-400 shrink-0 mt-0.5">
                    <FolderCode className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Código & ADK Local</div>
                    <div className="text-[11px] text-slate-400 leading-tight">Arquivos do agente e guia para Ollama</div>
                  </div>
                </button>

                <div className="pt-1 mt-1 border-t border-slate-800/80 space-y-0.5">
                  {onOpenTitleScreen && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenTitleScreen();
                      }}
                      className="w-full p-2.5 rounded-xl text-left transition-colors cursor-pointer flex items-center gap-3 hover:bg-slate-800/80 text-slate-300 hover:text-white"
                    >
                      <div className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-700/40 text-purple-400 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">Tela Inicial (Intro)</div>
                        <div className="text-[11px] text-slate-400 leading-tight">Rever a tela de abertura do simulador</div>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenGating();
                    }}
                    className="w-full p-2.5 rounded-xl text-left transition-colors cursor-pointer flex items-center gap-3 hover:bg-slate-800/80 text-slate-300 hover:text-white"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 shrink-0">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Configurar Trilha</div>
                      <div className="text-[11px] text-slate-400 leading-tight">Nível, persona da banca e tokens</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Compact Stats & Quick Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Compact XP / Level Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-amber-400 font-bold tabular-nums">{tokens} Tk</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-sky-400 font-bold tabular-nums">{xp} XP</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-300 truncate max-w-[110px]">{levelName.replace(/Nível \d+: /, '')}</span>
          </div>

          {/* Quick Warm-up 3 min button */}
          <button
            onClick={onOpenWarmup}
            className="px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Aquecimento</span> 3 min
          </button>
        </div>
      </div>
    </header>
  );
};
